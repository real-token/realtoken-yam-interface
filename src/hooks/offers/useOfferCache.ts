import { useEffect, useRef, useMemo } from 'react';
import { useChainId } from 'wagmi';

import { useWalletGate } from 'src/wallet/useWalletGate';
import { BigNumber } from '@ethersproject/bignumber';
import { useQueryClient } from '@tanstack/react-query';
import { getSharedJsonRpcProvider } from 'src/utils/ethersProvider';
import { Contract } from '@ethersproject/contracts';
import { realTokenYamUpgradeableABI } from 'src/abis';
import { RealTokenYamUpgradeable } from 'src/abis/types/RealTokenYamUpgradeable';
import { networks, ExtendedChainConfig } from 'src/config/aaConfig';
import { offerCacheService } from 'src/services/offerCacheService';
import { Offer } from 'src/types/offer/Offer';

/**
 * Hook pour écouter les événements blockchain et mettre à jour le cache local
 * Écoute les événements : OfferCreated, OfferUpdated, OfferDeleted, OfferAccepted
 */
export function useOfferCacheEvents() {
  const chainId = useChainId();
  const { address: account, canFetch } = useWalletGate();
  const queryClient = useQueryClient();
  const listenersRef = useRef<Array<() => void>>([]);

  // Créer le provider ethers et le contrat à partir de la config réseau
  const { provider, yamContract } = useMemo(() => {
    if (!canFetch || !chainId || !account) return { provider: null, yamContract: null };

    const chainIdHex = `0x${chainId.toString(16)}`;
    const networkConfig = networks.find(
      (n: ExtendedChainConfig) => n.chainId === chainIdHex
    );

    if (!networkConfig) return { provider: null, yamContract: null };

    const ethersProvider = getSharedJsonRpcProvider(
      chainId,
      networkConfig.rpcTarget
    );
    const contract = new Contract(
      networkConfig.contracts.realTokenYamUpgradeableAddress,
      realTokenYamUpgradeableABI,
      ethersProvider
    ) as unknown as RealTokenYamUpgradeable;

    return { provider: ethersProvider, yamContract: contract };
  }, [canFetch, chainId, account]);

  useEffect(() => {
    if (!canFetch || !yamContract || !chainId || !provider || !account) return;

    const contract = yamContract;

    // Handler pour OfferCreated
    const handleOfferCreated = async (
      offerId: BigNumber,
      seller: string,
      buyer: string,
      offerToken: string,
      buyerToken: string,
      price: BigNumber,
      amount: BigNumber,
      event: any
    ) => {
      console.log('OfferCreated event:', offerId.toString());
      
      // Invalider le cache React Query pour forcer un re-fetch
      queryClient.invalidateQueries({ queryKey: ['offer', 'rpc', chainId, offerId.toString()] });
      
      // Le cache IndexedDB sera mis à jour lors du prochain fetch
    };

    // Handler pour OfferUpdated
    const handleOfferUpdated = async (
      offerId: BigNumber,
      newPrice: BigNumber,
      newAmount: BigNumber,
      event: any
    ) => {
      const offerIdStr = offerId.toString();
      console.log('OfferUpdated event:', offerIdStr);

      // Vérifier si l'offre est encore en cache (doit écouter les événements)
      const shouldListen = await offerCacheService.shouldListenToEvents(
        chainId,
        offerId
      );

      if (!shouldListen) {
        // L'offre n'est plus en cache ou trop ancienne, ignorer l'événement
        console.log(
          `Skipping OfferUpdated for offer ${offerIdStr} - not in cache or too old`
        );
        return;
      }

      const blockNumber = event.blockNumber;

      // Mettre à jour le cache local directement
      await offerCacheService.updateOffer(
        chainId,
        offerId,
        {
          price: newPrice.toString(),
          amount: newAmount.toString(),
          availableAmount: newAmount.toString(),
        },
        blockNumber
      );

      // Mettre à jour React Query
      const queryKey = ['offer', 'rpc', chainId, offerIdStr];
      const currentData = queryClient.getQueryData<Partial<Offer>>(queryKey);
      if (currentData) {
        queryClient.setQueryData<Partial<Offer>>(queryKey, {
          ...currentData,
          price: newPrice.toString(),
          amount: newAmount.toString(),
          availableAmount: newAmount.toString(),
        });
      }
    };

    // Handler pour OfferDeleted
    const handleOfferDeleted = async (offerId: BigNumber, event: any) => {
      const offerIdStr = offerId.toString();
      console.log('OfferDeleted event:', offerIdStr);

      // Vérifier si l'offre est encore en cache
      const shouldListen = await offerCacheService.shouldListenToEvents(
        chainId,
        offerId
      );

      if (!shouldListen) {
        // L'offre n'est plus en cache, ignorer l'événement
        console.log(
          `Skipping OfferDeleted for offer ${offerIdStr} - not in cache or too old`
        );
        return;
      }

      // Supprimer du cache local
      await offerCacheService.deleteOffer(chainId, offerId);

      // Supprimer de React Query
      queryClient.removeQueries({ queryKey: ['offer', 'rpc', chainId, offerIdStr] });
    };

    // Handler pour OfferAccepted
    const handleOfferAccepted = async (
      offerId: BigNumber,
      seller: string,
      buyer: string,
      offerToken: string,
      buyerToken: string,
      price: BigNumber,
      amount: BigNumber,
      event: any
    ) => {
      const offerIdStr = offerId.toString();
      console.log('OfferAccepted event:', offerIdStr);

      // Vérifier si l'offre est encore en cache
      const shouldListen = await offerCacheService.shouldListenToEvents(
        chainId,
        offerId
      );

      if (!shouldListen) {
        // L'offre n'est plus en cache, ignorer l'événement
        console.log(
          `Skipping OfferAccepted for offer ${offerIdStr} - not in cache or too old`
        );
        return;
      }

      // Marquer l'offre comme supprimée (acceptée = plus disponible)
      await offerCacheService.updateOffer(
        chainId,
        offerId,
        {
          removed: true,
          availableAmount: '0',
        },
        event.blockNumber
      );

      // Mettre à jour React Query
      const queryKey = ['offer', 'rpc', chainId, offerIdStr];
      const currentData = queryClient.getQueryData<Partial<Offer>>(queryKey);
      if (currentData) {
        queryClient.setQueryData<Partial<Offer>>(queryKey, {
          ...currentData,
          removed: true,
          availableAmount: '0',
        });
      }
    };

    // Écouter les événements
    contract.on('OfferCreated', handleOfferCreated);
    contract.on('OfferUpdated', handleOfferUpdated);
    contract.on('OfferDeleted', handleOfferDeleted);
    contract.on('OfferAccepted', handleOfferAccepted);

    // Stocker les fonctions de nettoyage
    listenersRef.current = [
      () => contract.off('OfferCreated', handleOfferCreated),
      () => contract.off('OfferUpdated', handleOfferUpdated),
      () => contract.off('OfferDeleted', handleOfferDeleted),
      () => contract.off('OfferAccepted', handleOfferAccepted),
    ];

    // Nettoyage périodique du cache (toutes les heures)
    const cleanupInterval = setInterval(async () => {
      try {
        const deleted = await offerCacheService.cleanExpiredOffers();
        if (deleted > 0) {
          console.log(`Cleaned ${deleted} expired offers from cache`);
        }
      } catch (error) {
        console.error('Error cleaning expired offers:', error);
      }
    }, 60 * 60 * 1000); // Toutes les heures

    // Cleanup
    return () => {
      listenersRef.current.forEach((cleanup) => cleanup());
      listenersRef.current = [];
      contract.removeAllListeners();
      clearInterval(cleanupInterval);
    };
  }, [canFetch, yamContract, chainId, provider, queryClient, account]);
}
