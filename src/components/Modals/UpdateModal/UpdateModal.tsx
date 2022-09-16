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
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';

import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain, useContract, useOffers } from 'src/hooks';

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
  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<UpdateFormValues>({
      // eslint-disable-next-line object-shorthand
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

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [amountMax, setAmountMax] = useState<number>();

  const activeChain = useActiveChain();
  const swapCatUpgradeable = useContract(ContractsID.swapCatUpgradeable);

  const {
    offers,
    refreshState: [isRefreshing],
  } = useOffers();

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

  const onHandleSubmit = useCallback(
    async (formValues: UpdateFormValues) => {
      try {
        if (
          !account ||
          !provider ||
          !formValues.offerId ||
          !formValues.price ||
          !formValues.amount ||
          !swapCatUpgradeable
        ) {
          return;
        }

        setSubmitting(true);

        const transaction = await swapCatUpgradeable.createOffer(
          formValues.offerTokenAddress,
          formValues.buyerTokenAddress,
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
          NOTIFICATIONS[NotificationsID.updateOfferLoading](notificationPayload)
        );

        transaction
          .wait()
          .then(({ status }) =>
            updateNotification(
              NOTIFICATIONS[
                status === 1
                  ? NotificationsID.updateOfferSuccess
                  : NotificationsID.updateOfferError
              ](notificationPayload)
            )
          );
      } catch (e) {
        console.error('Error update modal', e);
      } finally {
        setSubmitting(false);
        triggerTableRefresh(true);
        onClose();
      }
    },
    [
      account,
      activeChain,
      swapCatUpgradeable,
      onClose,
      provider,
      triggerTableRefresh,
    ]
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
          sx={{ flexGrow: 1 }}
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
          sx={{ flexGrow: 1 }}
          {...getInputProps('amount')}
        />
        <Group grow={true}>
          <Button color={'red'} onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button type={'submit'} loading={isSubmitting}>
            {t('confirm')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
