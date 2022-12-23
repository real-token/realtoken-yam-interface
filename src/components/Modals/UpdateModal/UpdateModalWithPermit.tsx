import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Text, Flex, Group, Stack, Divider } from '@mantine/core';
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
import { cleanNumber } from 'src/utils/number';

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

export const UpdateModalWithPermit: FC<ContextModalProps<UpdateModalProps>> = ({
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
  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );

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
  }, [offers, values]);

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
          !realTokenYamUpgradeable
        ) {
          return;
        }

        const offerToken = getContract<CoinBridgeToken>(
          offerTokenAddress,
          coinBridgeTokenABI,
          provider,
          account
        );
        if (!offerToken) {
          console.log('offerToken not found');
          return;
        }

        const oldAllowance = await offerToken.allowance(
          account,
          realTokenYamUpgradeable.address
        );

        const newAmountInWei = new BigNumber(
          formValues.amount.toString()
        ).shiftedBy(Number(offerTokenDecimals));

        const [, , , , , amount] =
          await realTokenYamUpgradeable.getInitialOffer(offerId);

        const oldAmountInWei = new BigNumber(amount.toString());

        const amountInWeiToPermit = new BigNumber(oldAllowance.toString())
          .plus(newAmountInWei)
          .minus(oldAmountInWei);

        setSubmitting(true);

        const transactionDeadline = Math.floor(Date.now() / 1000) + 3600; // permit valable during 1h

        const offerTokenType = await realTokenYamUpgradeable.getTokenType(
          formValues.offerTokenAddress
        );

        if (offerTokenType === 1) {
          // TokenType = 1: RealToken
          const { r, s, v }: any = await coinBridgeTokenPermitSignature(
            account,
            realTokenYamUpgradeable.address,
            amountInWeiToPermit.toString(),
            transactionDeadline,
            offerToken,
            provider
          );

          const updateOfferWithPermitTx =
            await realTokenYamUpgradeable.updateOfferWithPermit(
              formValues.offerId,
              new BigNumber(formValues.price.toString())
                .shiftedBy(Number(buyerTokenDecimals))
                .toString(),
              new BigNumber(formValues.amount.toString())
                .shiftedBy(Number(offerTokenDecimals))
                .toString(),
              transactionDeadline.toString(),
              v,
              r,
              s
            );

          const notificationPayload = {
            key: updateOfferWithPermitTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${updateOfferWithPermitTx.hash}`,
            hash: updateOfferWithPermitTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.updateOfferLoading](
              notificationPayload
            )
          );

          updateOfferWithPermitTx
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
        } else if (offerTokenType === 2) {
          // TokenType = 2: ERC20 With Permit
          const { r, s, v }: any = await erc20PermitSignature(
            account,
            realTokenYamUpgradeable.address,
            amountInWeiToPermit.toString(),
            transactionDeadline,
            offerToken,
            provider
          );

          const updateOfferWithPermitTx =
            await realTokenYamUpgradeable.updateOfferWithPermit(
              formValues.offerId,
              new BigNumber(formValues.price.toString())
                .shiftedBy(Number(buyerTokenDecimals))
                .toString(),
              new BigNumber(formValues.amount.toString())
                .shiftedBy(Number(offerTokenDecimals))
                .toString(),
              transactionDeadline.toString(),
              v,
              r,
              s
            );

          const notificationPayload = {
            key: updateOfferWithPermitTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${updateOfferWithPermitTx.hash}`,
            hash: updateOfferWithPermitTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.updateOfferLoading](
              notificationPayload
            )
          );

          updateOfferWithPermitTx
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
        } else if (offerTokenType === 3) {
          // TokenType = 3: ERC20 Without Permit, do Approve/buy
          const approveTx = await offerToken.approve(
            realTokenYamUpgradeable.address,
            amountInWeiToPermit.toString()
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

          const updateOfferTx = await realTokenYamUpgradeable.updateOffer(
            formValues.offerId,
            new BigNumber(formValues.price.toString())
              .shiftedBy(Number(buyerTokenDecimals))
              .toString(),
            new BigNumber(formValues.amount.toString())
              .shiftedBy(Number(offerTokenDecimals))
              .toString()
          );

          const notificationUpdate = {
            key: updateOfferTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${updateOfferTx.hash}`,
            hash: updateOfferTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.updateOfferLoading](
              notificationUpdate
            )
          );

          updateOfferTx
            .wait()
            .then(({ status }) =>
              updateNotification(
                NOTIFICATIONS[
                  status === 1
                    ? NotificationsID.updateOfferSuccess
                    : NotificationsID.updateOfferError
                ](notificationUpdate)
              )
            );
        }
      } catch (e) {
        console.error('Error UpdateModal', e);
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
      offerTokenAddress,
      offerTokenDecimals,
      offerId,
      buyerTokenDecimals,
      activeChain?.blockExplorerUrl,
      values,
      triggerTableRefresh,
      onClose,
    ]
  );

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <Stack justify={'center'} align={'stretch'}>
        
        <Flex direction={"column"} gap={"sm"}>
          <Text size={"xl"}>{t('selectedOffer')}</Text>
          <Flex direction={"column"} gap={8}>
              <Flex direction={"column"}>
                <Text fw={700}>{t("offerId")}</Text>
                <Text>{offerId ? offerId : 'Offer not found'}</Text>
              </Flex>
              <Flex direction={"column"}>
                <Text fw={700}>{t("price")}</Text>
                <Text>{price}</Text>
              </Flex>
              <Flex direction={"column"}>
                <Text fw={700}>{t("amount")}</Text>
                <Text>{amount}</Text>
              </Flex>
          </Flex>
        </Flex>

        <Divider/>

        <NumberInput
          label={t('price')}
          required={true}
          min={0}
          placeholder={t('price')}
          sx={{ flexGrow: 1 }}
          {...getInputProps('price')}
        />
        <NumberInput
          label={t('amount')}
          required={true}
          min={0}
          placeholder={t('amount')}
          sx={{ flexGrow: 1 }}
          {...getInputProps('amount')}
        />

        <Text size={"xl"}>{t("summary")}</Text>
        { values.price > 0 && values.amount > 0 && (
          <Text size={"md"} mb={10}>
            {/* {` ${t("summaryText1")} ${values?.amount} ${offerTokenSymbol} ${t("summaryText2")} ${cleanNumber(values?.price)} ${buyTokenSymbol} ${t("summaryText3")} ${total} ${buyTokenSymbol}`} */}
            {` ${t('summaryText1')} ${cleanNumber(price)} ${t('summaryText3')} ${cleanNumber(values.price)} ${t('summaryText2')} ${cleanNumber(amount)} ${t('summaryText3')} ${cleanNumber(values.amount)}`}
          </Text>
        )}

        <Group grow={true}>
          <Button color={'red'} onClick={onClose} aria-label={t('cancel')}>
            {t('cancel')}
          </Button>
          <Button
            type={'submit'}
            loading={isSubmitting}
            aria-label={t('confirm')}
            disabled={values.price == 0 || values.amount == 0 || values.price == undefined || values.amount == undefined}
          >
            {t('confirm')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
