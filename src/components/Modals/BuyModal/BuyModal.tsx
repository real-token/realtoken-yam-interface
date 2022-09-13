import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Input,
  Popover,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconQuestionMark } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain, useContract, useOffers } from 'src/hooks';
import { Offer } from 'src/hooks/types';

import { AssetSelect } from '../../AssetSelect';
import { NumberInput } from '../../NumberInput';

type BuyModalProps = {
  offerId: string;
  price: number;
  amount: number;
  triggerTableRefresh: Dispatch<SetStateAction<boolean>>;
};

type BuyFormValues = {
  offerId: string;
  price: number;
  amount: number;
};

export const BuyModal: FC<ContextModalProps<BuyModalProps>> = ({
  context,
  id,
  innerProps: { offerId, price, amount, triggerTableRefresh },
}) => {
  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<BuyFormValues>({
      initialValues: {
        offerId: offerId,
        price: price,
        amount: amount,
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
  console.log('Offers modal', offers);

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
  }, [values]);

  useEffect(() => {
    if (!amountMax) return;
    setFieldValue('amount', amountMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountMax]);

  const onHandleSubmit = useCallback(
    async (formValues: BuyFormValues) => {
      try {
        console.log('here');
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
        console.log('here2');

        console.log('form value', formValues);

        setSubmitting(true);

        const transaction = await swapCatUpgradeable.buy(
          formValues.offerId,
          formValues.price,
          formValues.amount
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
        console.error('ERROR here', e);
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