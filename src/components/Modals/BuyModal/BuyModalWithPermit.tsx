import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Web3Provider } from '@ethersproject/providers';
import { Box, Button, Container, Group, Input, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';

import { BridgeToken, bridgeTokenABI } from 'src/abis';
import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain, useContract, useOffers } from 'src/hooks';
import erc20PermitSignature from 'src/hooks/erc20PermitSignature';
import { getContract } from 'src/utils';

import { NumberInput } from '../../NumberInput';

type BuyModalWithPermitProps = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
  triggerTableRefresh: Dispatch<SetStateAction<boolean>>;
};

type BuyWithPermitFormValues = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
};

export const BuyModalWithPermit: FC<
  ContextModalProps<BuyModalWithPermitProps>
> = ({
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
  const { connector, account, chainId, provider } = useWeb3React();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<BuyWithPermitFormValues>({
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
  const buyerToken = getContract<BridgeToken>(
    buyerTokenAddress,
    bridgeTokenABI,
    provider as Web3Provider,
    account
  );

  const {
    offers,
    refreshState: [isRefreshing],
  } = useOffers();
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
    async (formValues: BuyWithPermitFormValues) => {
      try {
        if (
          !account ||
          !provider ||
          !formValues.offerId ||
          !formValues.price ||
          !formValues.amount ||
          !swapCatUpgradeable ||
          !buyerToken
        ) {
          return;
        }

        setSubmitting(true);

        const amountInWei = new BigNumber(
          formValues.amount.toString()
        ).shiftedBy(Number(offerTokenDecimals));
        console.log('amountInWei to String', amountInWei.toString());

        const priceInWei = new BigNumber(formValues.price.toString()).shiftedBy(
          Number(buyerTokenDecimals)
        );

        const buyerTokenAmount = amountInWei
          .multipliedBy(priceInWei)
          .shiftedBy(-offerTokenDecimals)
          .plus(1);

        const currentDate = new Date();
        const permitDeadline = new BigNumber(
          Math.floor(currentDate.getTime() / 1000) + 60 * 60 * 24 * 365
        );

        console.log('buyerTokenAmount', buyerTokenAmount.toString());

        const { r, s, v, deadline }: any = await erc20PermitSignature(
          account,
          swapCatUpgradeable.address,
          buyerTokenAmount.toString(),
          buyerToken,
          provider
        );

        const transaction = await swapCatUpgradeable.buyWithPermit(
          formValues.offerId,
          priceInWei.toString(),
          amountInWei.toString(),
          deadline.toString(),
          v,
          r,
          s
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
        console.error('Error modal Buy with permit not working', e);
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
