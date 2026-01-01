import { useQuery } from 'react-query';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from '@ethersproject/bignumber';
import { useMemo } from 'react';
import { OfferRPCService } from 'src/services/offerRPCService';
import { useContract } from '../useContract';
import { ContractsID } from 'src/constants/contracts';
import { Offer } from 'src/types/offer/Offer';
import { REACT_QUERY_ERRORS } from 'src/types/ReactQueryErrors';
import { createLogger } from '../../utils/logger';

const logger = createLogger('src/hooks/offers/useOfferDataForModal');

/**
 * Hook optimisé pour récupérer les données d'une offre avec les données utilisateur
 * pour les modals (Buy, Update, etc.)
 * 
 * Utilise Multicall3 pour récupérer toutes les données en un seul appel RPC :
 * - Données de l'offre (price, amount, tokens, etc.)
 * - Balance de l'utilisateur pour l'offerToken
 * - Allowance de l'utilisateur pour l'offerToken
 * - Balance de l'utilisateur pour le buyerToken
 * 
 * Avantages :
 * - Un seul appel RPC au lieu de plusieurs
 * - Données toujours à jour (directement depuis la blockchain)
 * - Fonctionne même si TheGraph est down
 * - Optimisation même en mode normal
 * 
 * @param offerId - ID de l'offre (string, number ou BigNumber)
 * @returns Données de l'offre avec les données utilisateur, état de chargement et erreur
 */
export function useOfferDataForModal(offerId: string | number | BigNumber) {
  const { provider, account, chainId } = useWeb3React();
  const yamContract = useContract(ContractsID.realTokenYamUpgradeable);

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

  const {
    data: offerData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Partial<Offer>>({
    queryKey: ['offer-data-modal', chainId, offerIdBN?.toString(), account],
    queryFn: async () => {
      if (!offerRPCService || !offerIdBN || !chainId) {
        throw new Error('OfferRPCService or offerId not available');
      }

      if (!account) {
        // Si pas de compte, récupérer seulement les données de l'offre
        return await offerRPCService.getOfferWithAllData(offerIdBN);
      }

      // Récupérer l'offre avec les données utilisateur (balance, allowance)
      return await offerRPCService.getOfferWithUserData(offerIdBN, account);
    },
    enabled: !!offerRPCService && !!offerIdBN && !!chainId,
    staleTime: 1000 * 30, // 30s - données pour modals, besoin de fraîcheur
    cacheTime: 1000 * 60 * 5, // 5 min - cache court pour modals
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_OFFER_RPC },
    retry: 1, // Retry une seule fois en cas d'erreur réseau
  });

  return {
    offerData,
    isLoading,
    isError,
    error,
    refetch,
  };
}
