import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Container, Group, Input, Stack, Loader, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import BigNumber from 'bignumber.js';
import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import { NumberInput } from '../../NumberInput';
import { useWeb3React } from '@web3-react/core';
import { useOfferById } from '../../../hooks/offers/useOfferById';

type BuyModalProps = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenDecimals: number;
  buyerTokenDecimals: number;
  triggerTableRefresh: Dispatch<SetStateAction<boolean>>;
};

type BuyFormValues = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenDecimals: number;
  buyerTokenDecimals: number;
};

export const BuyModal: FC<ContextModalProps<BuyModalProps>> = ({
  context,
  id,
  innerProps: {
    offerId,
    price,
    amount,
    offerTokenDecimals,
    buyerTokenDecimals,
    triggerTableRefresh,
  },
}) => {
  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<BuyFormValues>({
      // eslint-disable-next-line object-shorthand
      initialValues: {
        offerId: offerId,
        price: price,
        amount: amount,
        offerTokenDecimals: offerTokenDecimals,
        buyerTokenDecimals: buyerTokenDecimals,
      },
    });

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [amountMax, setAmountMax] = useState<number>();

  const activeChain = useActiveChain();
  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );

  // Utiliser useOfferById pour charger uniquement l'offre nécessaire
  // Plus performant et fonctionne même si TheGraph est down
  const { offer, isLoading: offerLoading } = useOfferById(offerId);

  const { t } = useTranslation('modals', { keyPrefix: 'buy' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  // Utiliser directement l'offre chargée via useOfferById
  useEffect(() => {
    if (offer?.amount) {
      setAmountMax(Number(offer.amount));
    }
  }, [offer]);

  useEffect(() => {
    if (!amountMax) return;
    setFieldValue('amount', amountMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountMax]);

  const onHandleSubmit = useCallback(
    async (formValues: BuyFormValues) => {
      try {
        if (
          !account ||
          !provider ||
          !formValues.offerId ||
          !formValues.price ||
          !formValues.amount ||
          !realTokenYamUpgradeable
        ) {
          return;
        }

        setSubmitting(true);

        const transaction = await realTokenYamUpgradeable.buy(
          formValues.offerId,
          new BigNumber(formValues.price.toString())
            .shiftedBy(Number(buyerTokenDecimals))
            .toString(),
          new BigNumber(formValues.amount.toString())
            .shiftedBy(Number(offerTokenDecimals))
            .toString()
        );

        const notificationPayload = {
          key: transaction.hash,
          href: `${activeChain?.blockExplorerUrl}tx/${transaction.hash}`,
          hash: transaction.hash,
        };

        showNotification(
          NOTIFICATIONS[NotificationsID.buyOfferLoading](notificationPayload)
        );

        transaction
          .wait()
          .then(({ status }) =>
            updateNotification(
              NOTIFICATIONS[
                status === 1
                  ? NotificationsID.buyOfferSuccess
                  : NotificationsID.buyOfferError
              ](notificationPayload)
            )
          );
      } catch (e) {
        console.error('Error in BuyModal', e);
      } finally {
        setSubmitting(false);
        triggerTableRefresh(true);
        onClose();
      }
    },
    [
      account,
      provider,
      realTokenYamUpgradeable,
      buyerTokenDecimals,
      offerTokenDecimals,
      activeChain?.blockExplorerUrl,
      triggerTableRefresh,
      onClose,
    ]
  );

  // Afficher un loader pendant le chargement de l'offre
  if (offerLoading) {
    return (
      <Stack justify={'center'} align={'center'} p="xl">
        <Loader size="md" />
        <Text size="sm" c="dimmed">Loading offer data...</Text>
      </Stack>
    );
  }

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <Stack justify={'center'} align={'stretch'}>
        <Box>
          <Input.Label>{t('selectedOffer')}</Input.Label>
          <Container>{offerId ? offerId : 'Offer not found'}</Container>
        </Box>
        {/* <Box>
          <Input.Label>{t('offerTokenName')}</Input.Label>
          <Container>{offerTokenName ? offerTokenName : 'Offer not found'}</Container>
        </Box> */}
        <NumberInput
          label={t('amount')}
          required={true}
          // disabled={!amountMax}
          min={0}
          max={amountMax}
          step={amountMax}
          showMax={true}
          placeholder={t('amount')}
          style={{ flexGrow: 1 }}
          {...getInputProps('amount')}
        />
        <Group grow={true}>
          <Button color={'red'} onClick={onClose} aria-label={t('cancel')}>
            {t('cancel')}
          </Button>
          <Button
            type={'submit'}
            loading={isSubmitting}
            aria-label={t('confirm')}
          >
            {t('confirm')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};