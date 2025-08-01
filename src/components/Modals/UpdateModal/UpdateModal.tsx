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
import { useAccount } from 'wagmi';

import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';

import { realTokenYamUpgradeableABI } from '../../../abis';
import { ExtendedChainConfig } from '../../../config/aaConfig';
import { usePublicOffers } from '../../../hooks/offers/usePublicOffers';
import { NumberInput } from '../../NumberInput';

type UpdateModalProps = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
  triggerTableRefresh: Dispatch<SetStateAction<boolean>>;
};

type UpdateFormValues = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
};

export const UpdateModal: FC<ContextModalProps<UpdateModalProps>> = ({
  context,
  id,
  innerProps: {
    offerId,
    price,
    amount,
    offerTokenAddress,
    offerTokenDecimals,
    buyerTokenAddress,
    buyerTokenDecimals,
    triggerTableRefresh,
  },
}) => {
  const { address: account } = useAccount();
  const currentNetwork = useCurrentNetwork<ExtendedChainConfig>();

  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<UpdateFormValues>({
      initialValues: {
        offerId: offerId,
        price: price,
        amount: amount,
        offerTokenAddress: offerTokenAddress,
        offerTokenDecimals: offerTokenDecimals,
        buyerTokenAddress: buyerTokenAddress,
        buyerTokenDecimals: buyerTokenDecimals,
      },
    });

  const [amountMax, setAmountMax] = useState<number>();

  const { offers } = usePublicOffers();

  const { t } = useTranslation('modals', { keyPrefix: 'update' });

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
  }, [values]);

  useEffect(() => {
    if (!amountMax) return;
    setFieldValue('amount', amountMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountMax]);

  const { sendTransaction, isPending: isSubmitting } = useSendTransaction({
    onSent: () => {
      showNotification(
        NOTIFICATIONS[NotificationsID.updateOfferLoading]({
          key: 'update-offer',
          hash: '',
          href: '',
        })
      );
    },
    onSuccess: (tx) => {
      updateNotification(
        NOTIFICATIONS[NotificationsID.updateOfferSuccess]({
          key: 'update-offer',
          hash: tx.transactionHash,
          href: `${currentNetwork?.blockExplorerUrl}tx/${tx.transactionHash}`,
        })
      );
      triggerTableRefresh(true);
      onClose();
    },
    onError: (error) => {
      console.error('Error UpdateModal', error);
      updateNotification(
        NOTIFICATIONS[NotificationsID.updateOfferError]({
          key: 'update-offer',
          hash: '',
          href: '',
        })
      );
    },
  });

  const onHandleSubmit = useCallback(
    async (formValues: UpdateFormValues) => {
      try {
        if (
          !account ||
          !formValues.offerId ||
          !formValues.price ||
          !formValues.amount ||
          !currentNetwork
        ) {
          return;
        }

        const price = new BigNumber(formValues.price.toString())
          .shiftedBy(Number(buyerTokenDecimals))
          .toString();

        const amount = new BigNumber(formValues.amount.toString())
          .shiftedBy(Number(offerTokenDecimals))
          .toString();

        sendTransaction({
          abi: realTokenYamUpgradeableABI,
          to: currentNetwork?.contracts
            .realTokenYamUpgradeableAddress as `0x${string}`,
          functionName: 'updateOffer',
          args: [BigInt(formValues.offerId), BigInt(price), BigInt(amount)],
        });
      } catch (e) {
        console.error('Error UpdateModal', e);
      } finally {
      }
    },
    [account, onClose, triggerTableRefresh, currentNetwork, sendTransaction]
  );

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <Stack justify={'center'} align={'stretch'}>
        <Box>
          <Input.Label>{t('selectedOffer')}</Input.Label>
          <Container>{offerId ? offerId : 'Offer not found'}</Container>
        </Box>
        <NumberInput
          label={t('price')}
          required={true}
          min={0}
          // max={amountMax}
          // step={amountMax}
          showMax={true}
          placeholder={t('price')}
          style={{ flexGrow: 1 }}
          {...getInputProps('price')}
        />
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
          <Button color={'red'} onClick={onClose} varia-label={t('cancel')}>
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
