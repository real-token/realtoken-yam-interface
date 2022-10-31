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

import { CoinBridgeToken, coinBridgeTokenABI } from 'src/abis';
import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain, useContract, useOffers } from 'src/hooks';
import coinBridgeTokenPermitSignature from 'src/hooks/coinBridgeTokenPermitSignature';
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
  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<BuyWithPermitFormValues>({
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

  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );
  const buyerToken = getContract<CoinBridgeToken>(
    buyerTokenAddress,
    coinBridgeTokenABI,
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
  }, [offers, values]);

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
          !realTokenYamUpgradeable ||
          !buyerToken
        ) {
          return;
        }

        setSubmitting(true);

        const amountInWei = new BigNumber(
          formValues.amount.toString()
        ).shiftedBy(Number(offerTokenDecimals));

        const priceInWei = new BigNumber(formValues.price.toString()).shiftedBy(
          Number(buyerTokenDecimals)
        );

        const buyerTokenAmount = amountInWei
          .multipliedBy(priceInWei)
          .shiftedBy(-offerTokenDecimals);
        const transactionDeadline = Date.now() + 3600; // permit valable during 1h

        const buyerTokenType = await realTokenYamUpgradeable.getTokenType(
          formValues.buyerTokenAddress
        );

        if (buyerTokenType === 1) {
          // TokenType = 1: RealToken
          const { r, s, v }: any = await coinBridgeTokenPermitSignature(
            account,
            realTokenYamUpgradeable.address,
            buyerTokenAmount.toString(),
            transactionDeadline,
            buyerToken,
            provider
          );
          console.log('token type: ', buyerTokenType);
          console.log('values: ', values);
          console.log('form values: ', formValues);

          const buyWithPermitTx = await realTokenYamUpgradeable.buyWithPermit(
            formValues.offerId,
            priceInWei.toString(),
            amountInWei.toString(),
            transactionDeadline.toString(),
            v,
            r,
            s
          );
          const notificationPayload = {
            key: buyWithPermitTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${buyWithPermitTx.hash}`,
            hash: buyWithPermitTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.buyOfferLoading](notificationPayload)
          );

          buyWithPermitTx
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
        } else if (buyerTokenType === 2) {
          // TokenType = 2: ERC20 With Permit
          const { r, s, v }: any = await erc20PermitSignature(
            account,
            realTokenYamUpgradeable.address,
            buyerTokenAmount.toString(),
            transactionDeadline,
            buyerToken,
            provider
          );
          console.log('token type: ', buyerTokenType);
          console.log('values: ', values);
          console.log('form values: ', formValues);

          const buyWithPermitTx = await realTokenYamUpgradeable.buyWithPermit(
            formValues.offerId,
            priceInWei.toString(),
            amountInWei.toString(),
            transactionDeadline.toString(),
            v,
            r,
            s
          );

          const notificationPayload = {
            key: buyWithPermitTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${buyWithPermitTx.hash}`,
            hash: buyWithPermitTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.buyOfferLoading](notificationPayload)
          );

          buyWithPermitTx
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
        } else if (buyerTokenType === 3) {
          console.log('token type: ', buyerTokenType);
          console.log('values: ', values);
          console.log('form values: ', formValues);
          // TokenType = 3: ERC20 Without Permit, do Approve/buy
          const approveTx = await buyerToken.approve(
            realTokenYamUpgradeable.address,
            buyerTokenAmount.toString()
          );

          const notificationApprove = {
            key: approveTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${approveTx.hash}`,
            hash: approveTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.approveOfferLoading](
              notificationApprove
            )
          );

          approveTx
            .wait()
            .then(({ status }) =>
              updateNotification(
                NOTIFICATIONS[
                  status === 1
                    ? NotificationsID.approveOfferSuccess
                    : NotificationsID.approveOfferError
                ](notificationApprove)
              )
            );

          await approveTx.wait(1);

          const buyTx = await realTokenYamUpgradeable.buy(
            formValues.offerId,
            priceInWei.toString(),
            amountInWei.toString()
          );

          const notificationBuy = {
            key: buyTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${buyTx.hash}`,
            hash: buyTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.buyOfferLoading](notificationBuy)
          );

          buyTx
            .wait()
            .then(({ status }) =>
              updateNotification(
                NOTIFICATIONS[
                  status === 1
                    ? NotificationsID.buyOfferSuccess
                    : NotificationsID.buyOfferError
                ](notificationBuy)
              )
            );
        } else {
          console.log('Token is not whitelisted');
          showNotification(NOTIFICATIONS[NotificationsID.buyOfferInvalid]());
        }
      } catch (e) {
        console.error('Error in BuyModalWithPermit', e);
        showNotification(NOTIFICATIONS[NotificationsID.buyOfferInvalid]());
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
      buyerToken,
      offerTokenDecimals,
      buyerTokenDecimals,
      activeChain?.blockExplorerUrl,
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
