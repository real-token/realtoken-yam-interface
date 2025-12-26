import { FC, useState, FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  TextInput,
  Button,
  Flex,
  Alert,
  Text,
  ActionIcon,
  Loader,
  Tooltip,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconSearch,
  IconArrowRight,
  IconCheck,
  IconX,
} from '@tabler/icons';
import { useDegradedMode } from 'src/hooks/interface/useDegradedMode';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from '@ethersproject/bignumber';
import { useMemo } from 'react';
import { OfferRPCService } from 'src/services/offerRPCService';
import { useContract } from 'src/hooks/useContract';
import { ContractsID } from 'src/constants/contracts';
import { useDebounce } from 'src/hooks/useDebounce';

/**
 * Composant pour saisir un ID d'offre et naviguer vers la page de l'offre
 * Affiche une alerte en mode dégradé pour encourager son utilisation
 */
export const OfferIdInput: FC = () => {
  const { t } = useTranslation('table', { keyPrefix: 'filters.offerIdInput' });
  const { t: tNotifications } = useTranslation('notifications');
  const router = useRouter();
  const { provider, chainId } = useWeb3React();
  const yamContract = useContract(ContractsID.realTokenYamUpgradeable);
  const [offerId, setOfferId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [validationStatus, setValidationStatus] = useState<
    'idle' | 'checking' | 'valid' | 'invalid'
  >('idle');
  const { isDegraded } = useDegradedMode();
  
  // Debounce de l'ID pour éviter trop de vérifications pendant la saisie
  const debouncedOfferId = useDebounce(offerId.trim(), 700); // 700ms après la dernière frappe
  const validationAbortRef = useRef<AbortController | null>(null);

  const offerRPCService = useMemo(() => {
    if (!provider || !yamContract || !chainId) return null;

    try {
      return new OfferRPCService(provider, yamContract, chainId);
    } catch (error) {
      console.error('Failed to create OfferRPCService:', error);
      return null;
    }
  }, [provider, yamContract, chainId]);

  // Vérification en temps réel de l'existence de l'offre (avec debounce)
  useEffect(() => {
    // Annuler la vérification précédente si elle existe
    if (validationAbortRef.current) {
      validationAbortRef.current.abort();
    }

    // Réinitialiser le statut si le champ est vide
    if (!debouncedOfferId) {
      setValidationStatus('idle');
      setError(null);
      return;
    }

    // Valider que c'est un nombre valide
    const idNumber = parseInt(debouncedOfferId, 10);
    if (isNaN(idNumber) || idNumber < 0) {
      setValidationStatus('invalid');
      setError(t('errorInvalid'));
      return;
    }

    // Si le service RPC n'est pas disponible, ne pas vérifier
    if (!offerRPCService) {
      setValidationStatus('idle');
      return;
    }

    // Vérifier l'existence de l'offre
    const abortController = new AbortController();
    validationAbortRef.current = abortController;

    setValidationStatus('checking');
    // Ne pas effacer l'erreur immédiatement si on était en statut 'invalid'
    // Elle sera mise à jour selon le résultat de la vérification
    if (validationStatus !== 'invalid') {
      setError(null);
    }

    const checkOffer = async () => {
      try {
        const offerIdBN = BigNumber.from(idNumber);
        const exists = await offerRPCService.checkOfferExists(offerIdBN);

        // Vérifier si la requête a été annulée
        if (abortController.signal.aborted) {
          return;
        }

        if (exists) {
          setValidationStatus('valid');
          setError(null);
        } else {
          setValidationStatus('invalid');
          setError(t('errorNotFound'));
        }
      } catch (err: any) {
        // Ignorer les erreurs si la requête a été annulée
        if (abortController.signal.aborted) {
          return;
        }

        // En cas d'erreur réseau, ne pas bloquer l'utilisateur
        // On laisse le statut à 'idle' pour permettre quand même la soumission
        console.error('Error checking offer existence:', err);
        setValidationStatus('idle');
        setError(null);
      }
    };

    checkOffer();

    // Cleanup
    return () => {
      if (validationAbortRef.current) {
        validationAbortRef.current.abort();
      }
    };
  }, [debouncedOfferId, offerRPCService, t]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Valider que l'ID est un nombre valide
    const id = offerId.trim();
    if (!id) {
      setError(t('errorEmpty'));
      return;
    }

    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber) || idNumber < 0) {
      setError(t('errorInvalid'));
      return;
    }

    // Si la validation en temps réel a déjà détecté que l'offre n'existe pas, ne pas rediriger
    const currentStatus = validationStatus;
    if (currentStatus === 'invalid') {
      return;
    }

    // Si la validation est en cours, attendre un peu (max 1.5 secondes)
    if (currentStatus === 'checking') {
      setIsChecking(true);
      const maxWait = 1500;
      const startTime = Date.now();
      
      // Attendre que la validation se termine
      while (Date.now() - startTime < maxWait) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        // Vérifier périodiquement si le statut a changé
        // Note: On ne peut pas utiliser validationStatus directement dans la condition
        // car TypeScript ne peut pas garantir qu'il changera
      }
      setIsChecking(false);
    }

    // Rediriger vers la page de l'offre
    // La validation en temps réel a déjà vérifié l'existence si possible
    // Si elle n'a pas pu vérifier (erreur réseau), on redirige quand même
    router.push(`/offer/${idNumber}`);
  };

  const handleQuickSearch = () => {
    if (offerId.trim()) {
      handleSubmit(new Event('submit') as any);
    }
  };

  return (
    <Flex direction="column" gap="sm" mb="md">
      {/* Alerte en mode dégradé */}
      {isDegraded && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title={tNotifications('degradedMode.title')}
          color="orange"
          mb="sm"
        >
          <Text size="sm" mb="xs">
            {tNotifications('degradedMode.message')}
          </Text>
          <Text size="sm" fw={500}>
            {tNotifications('degradedMode.tip')}
          </Text>
        </Alert>
      )}

      {/* Formulaire de saisie d'ID */}
      <form onSubmit={handleSubmit}>
        <Flex gap="xs" align="flex-end">
          <TextInput
            label={isDegraded ? t('labelDegraded') : t('label')}
            placeholder={t('placeholder')}
            value={offerId}
            onChange={(e) => {
              const newValue = e.currentTarget.value;
              setOfferId(newValue);
              
              // Si le champ est vide, réinitialiser le statut
              if (!newValue.trim()) {
                setValidationStatus('idle');
                setError(null);
                return;
              }

              // Si on était en statut 'invalid', garder l'erreur visible
              // Le useEffect avec debounce se chargera de la nouvelle validation
              // Ne pas réinitialiser le statut ici pour garder le feedback visuel
            }}
            error={error}
            style={{ flex: 1 }}
            rightSection={
              validationStatus === 'checking' ? (
                <Loader size={16} />
              ) : validationStatus === 'valid' ? (
                <Tooltip label={t('offerExists')}>
                  <IconCheck size={16} color="green" />
                </Tooltip>
              ) : validationStatus === 'invalid' ? (
                <Tooltip label={t('offerNotExists')}>
                  <IconX size={16} color="red" />
                </Tooltip>
              ) : (
                <ActionIcon
                  variant="subtle"
                  onClick={handleQuickSearch}
                  disabled={!offerId.trim()}
                >
                  <IconSearch size={16} />
                </ActionIcon>
              )
            }
          />
          <Button
            type="submit"
            leftSection={
              isChecking ? (
                <Loader size={16} />
              ) : (
                <IconArrowRight size={16} />
              )
            }
            disabled={
              !offerId.trim() ||
              isChecking ||
              validationStatus === 'checking' ||
              validationStatus === 'invalid'
            }
            loading={isChecking}
            color={validationStatus === 'valid' ? 'green' : undefined}
          >
            {isChecking ? t('checking') : t('button')}
          </Button>
        </Flex>
      </form>

      {/* Info en mode normal */}
      {!isDegraded && (
        <Text size="xs" c="dimmed">
          {t('info')}
        </Text>
      )}
    </Flex>
  );
};
