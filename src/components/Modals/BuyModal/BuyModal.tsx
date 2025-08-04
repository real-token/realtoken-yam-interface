import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Container, Group, Input, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useCurrentNetwork } from '@real-token/core';
import { useSendTransaction } from '@real-token/web3';

import BigNumber from 'bignumber.js';
import { useAccount, usePublicClient } from 'wagmi';

import { NOTIFICATIONS, NotificationsID } from 'src/constants';

import { realTokenYamUpgradeableABI } from '../../../abis';
import { ExtendedChainConfig } from '../../../config/aaConfig';
import { usePublicOffers } from '../../../hooks/offers/usePublicOffers';
import { NumberInput } from '../../NumberInput';

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
  const { address: account } = useAccount();
  const publicClient = usePublicClient();

  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

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

  const [amountMax, setAmountMax] = useState<number>();

  const { offers } = usePublicOffers();

  const { t } = useTranslation('modals', { keyPrefix: 'buy' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  useEffect(() => {
    setAmountMax(
      Number(
        offers.find((offer) => offer.offerId === values.offerId)
          ?.amount as string
      )
    );
  }, [offers, values]);

  useEffect(() => {
    if (!amountMax) return;
    setFieldValue('amount', amountMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountMax]);

  const { sendTransaction, isPending: isSubmitting } = useSendTransaction({
    onSent: () => {
      showNotification(
        NOTIFICATIONS[NotificationsID.buyOfferLoading]({
          key: 'buy',
          hash: '',
          href: '',
        })
      );
    },
    onSuccess: (receipt) => {
      const notificationPayload = {
        key: 'buy',
        href: `${currentNetwork?.blockExplorerUrl}tx/${receipt.txHash}`,
        hash: receipt.txHash,
      };
      updateNotification(
        NOTIFICATIONS[NotificationsID.buyOfferSuccess](notificationPayload)
      );
      triggerTableRefresh(true);
      onClose();
    },
    onError: (error) => {
      console.error('Transaction error:', error);
      updateNotification(
        NOTIFICATIONS[NotificationsID.buyOfferError]({
          key: 'buy',
          hash: 'error',
          href: 'error',
        })
      );
    },
  });

  const onHandleSubmit = useCallback(
    async (formValues: BuyFormValues) => {
      try {
        if (
          !account ||
          !formValues.offerId ||
          !formValues.price ||
          !formValues.amount
        ) {
          return;
        }

        const contractAddress =
          currentNetwork?.contracts.realTokenYamUpgradeableAddress;
        if (!contractAddress) return;

        const price = new BigNumber(formValues.price.toString())
          .shiftedBy(Number(buyerTokenDecimals))
          .toString();

        const amount = new BigNumber(formValues.amount.toString())
          .shiftedBy(Number(offerTokenDecimals))
          .toString();

        sendTransaction({
          abi: realTokenYamUpgradeableABI,
          to: contractAddress as `0x${string}`,
          functionName: 'buy',
          args: [BigInt(formValues.offerId), BigInt(price), BigInt(amount)],
        });
      } finally {
      }
    },
    [
      account,
      buyerTokenDecimals,
      offerTokenDecimals,
      currentNetwork?.blockExplorerUrl,
      triggerTableRefresh,
      onClose,
    ]
  );

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
