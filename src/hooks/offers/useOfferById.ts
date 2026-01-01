import { useQuery, useQueryClient } from 'react-query';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from '@ethersproject/bignumber';
import { useMemo, useEffect, useState } from 'react';
import { OfferRPCService } from 'src/services/offerRPCService';
import { useContract } from '../useContract';
import { ContractsID } from 'src/constants/contracts';
import { useActiveChain } from '../useActiveChain';
import { Offer } from 'src/types/offer/Offer';
import { REACT_QUERY_ERRORS } from 'src/types/ReactQueryErrors';
import { offerCacheService } from 'src/services/offerCacheService';
import { createLogger } from '../../utils/logger';
const logger = createLogger('src/hooks/offers/useOfferById');

/**
 * Hook pour récupérer une offre par ID via RPC direct
 * Fonctionne même si TheGraph est down
 * Utilise Multicall3 pour optimiser les appels
 */
export function useOfferById(offerId: string | number | BigNumber) {
  const { provider, account, chainId } = useWeb3React();
  const activeChain = useActiveChain();
  const yamContract = useContract(ContractsID.realTokenYamUpgradeable);
  const queryClient = useQueryClient();

  // Note: L'écoute des événements est gérée globalement par OfferCacheProvider
  // Pas besoin de l'activer ici pour éviter les doublons

  const offerRPCService = useMemo(() => {
    if (!provider || !yamContract || !chainId) return null;

    try {
      return new OfferRPCService(provider, yamContract, chainId);
    } catch (error) {
      logger.error('Failed to create OfferRPCService:', error);
      return null;
    }
  }, [provider, yamContract, chainId]);

  const offerIdBN = useMemo(() => {
    if (!offerId) return null;
    if (offerId instanceof BigNumber) return offerId;
    return BigNumber.from(offerId.toString());
  }, [offerId]);

  // Charger le cache local au démarrage
  const [initialCachedOffer, setInitialCachedOffer] = useState<Partial<Offer> | undefined>(undefined);

  useEffect(() => {
    if (!chainId || !offerIdBN) return;

    offerCacheService
      .getOffer(chainId, offerIdBN.toString())
      .then((cached) => {
        if (cached) {
          setInitialCachedOffer(cached.offer as Partial<Offer>);
        }
      })
      .catch((err) => {
        logger.error('Error loading cached offer:', err);
      });
  }, [chainId, offerIdBN]);

  const {
    data: offer,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Partial<Offer>>({
    queryKey: ['offer', 'rpc', chainId, offerIdBN?.toString(), account],
    queryFn: async () => {
      if (!offerRPCService || !offerIdBN || !chainId) {
        throw new Error('OfferRPCService or offerId not available');
      }

      const offerIdStr = offerIdBN.toString();

      // 1. Vérifier le cache local (IndexedDB) en premier
      const cached = await offerCacheService.getOffer(chainId, offerIdStr);
      
      if (cached) {
        // Cache trouvé
        // Si l'offre a été mise à jour via événements (lastEventBlock présent),
        // on considère qu'elle est toujours à jour (pas de TTL)
        // Sinon, on applique un TTL de 5 minutes pour les données RPC
        const hasEventUpdate = cached.lastEventBlock !== undefined;
        const cacheAge = Date.now() - cached.lastUpdated;
        const rpcTTL = 5 * 60 * 1000; // 5 minutes pour RPC

        // Si mise à jour via événements OU cache récent, retourner immédiatement
        if (hasEventUpdate || (cached.source === 'rpc' && cacheAge < rpcTTL)) {
          // Retourner le cache immédiatement
          // Mise à jour en arrière-plan si cache > 1 minute
          if (cacheAge > 60 * 1000) {
            // Mise à jour en arrière-plan (non-bloquant)
            offerRPCService
              .getOfferWithAllData(offerIdBN)
              .then((freshOffer) => {
                offerCacheService.setOffer(chainId, offerIdStr, freshOffer, 'rpc');
                queryClient.setQueryData(
                  ['offer', 'rpc', chainId, offerIdStr, account],
                  freshOffer
                );
              })
              .catch((err) => {
                logger.error('Background refresh failed:', err);
              });
          }
          return cached.offer as Partial<Offer>;
        }
      }

      // 2. Si pas en cache ou stale, récupérer via RPC
      let fetchedOffer: Partial<Offer>;
      if (account) {
        fetchedOffer = await offerRPCService.getOfferWithUserData(offerIdBN, account);
      } else {
        fetchedOffer = await offerRPCService.getOfferWithAllData(offerIdBN);
      }

      // 3. Sauvegarder dans le cache local
      await offerCacheService.setOffer(
        chainId,
        offerIdStr,
        fetchedOffer,
        'rpc'
      );

      return fetchedOffer;
    },
    enabled: !!offerRPCService && !!offerIdBN && !!chainId,
    staleTime: Infinity, // Cache persistant - mise à jour via événements blockchain
    cacheTime: Infinity, // Conservé indéfiniment
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_OFFER_RPC },
    retry: 1, // Retry une seule fois en cas d'erreur réseau
    initialData: initialCachedOffer, // Utiliser le cache local comme données initiales
  });

  // Sauvegarder dans le cache quand les données changent
  useEffect(() => {
    if (offer && chainId && offerIdBN) {
      offerCacheService.setOffer(
        chainId,
        offerIdBN.toString(),
        offer,
        'rpc'
      ).catch((err) => {
        logger.error('Error saving offer to cache:', err);
      });
    }
  }, [offer, chainId, offerIdBN]);

  return {
    offer,
    isLoading,
    isError,
    error,
    refetch,
  };
}
