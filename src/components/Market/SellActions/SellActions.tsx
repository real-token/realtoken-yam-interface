import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Checkbox, Group, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';

import { CoinBridgeToken, Erc20, Erc20ABI, coinBridgeTokenABI } from 'src/abis';
import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { ZERO_ADDRESS } from 'src/constants';
import { useActiveChain } from 'src/hooks';
import coinBridgeTokenPermitSignature from 'src/hooks/coinBridgeTokenPermitSignature';
import erc20PermitSignature from 'src/hooks/erc20PermitSignature';
import { useContract } from 'src/hooks/useContract';
import { getContract } from 'src/utils';

import { NumberInput } from '../../NumberInput';

type SellFormValues = {
  offerTokenAddress: string;
  buyerTokenAddress: string;
  price: number;
  amount: number;
  buyerAddress: string;
  isPrivateOffer: boolean;
};

export const SellActions = () => {
  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<SellFormValues>({
      // eslint-disable-next-line object-shorthand
      initialValues: {
        offerTokenAddress: '',
        buyerTokenAddress: '',
        price: 50,
        amount: 1,
        buyerAddress: ZERO_ADDRESS,
        isPrivateOffer: false,
      },
    });

  // const [isPrivateOffer, setIsPrivateOffer] = useState(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [amountMax, setAmountMax] = useState<number>();
  const activeChain = useActiveChain();

  const { t } = useTranslation('modals', { keyPrefix: 'sell' });

  // const sellerBalance = new BigNumber(
  // 	(await offerToken.balanceOf(account)).toString()
  // ).shiftedBy(-offerTokenDecimals);

  useEffect(() => {
    setAmountMax(1);
  }, [values]);

  useEffect(() => {
    if (!amountMax) return;
    setFieldValue('amount', amountMax);
  }, [amountMax, setFieldValue]);

  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );

  const onHandleSubmit = useCallback(
    async (formValues: SellFormValues) => {
      try {
        if (
          !account ||
          !provider ||
          !realTokenYamUpgradeable ||
          !formValues.offerTokenAddress ||
          !formValues.buyerTokenAddress ||
          !formValues.price ||
          !formValues.amount
        ) {
          return;
        }

        if (!provider || !account) {
          return;
        }

        setSubmitting(true);
        const offerToken = getContract<CoinBridgeToken>(
          formValues.offerTokenAddress,
          coinBridgeTokenABI,
          provider,
          account
        );
        const buyerToken = getContract<Erc20>(
          formValues.buyerTokenAddress,
          Erc20ABI,
          provider,
          account
        );

        if (!offerToken || !buyerToken) {
          console.log('offerToken or buyerToken not found');
          return;
        }
        const offerTokenDecimals = await offerToken.decimals();
        const buyerTokenDecimals = await buyerToken.decimals();

        const amountInWei = new BigNumber(
          formValues.amount.toString()
        ).shiftedBy(Number(offerTokenDecimals));
        const oldAllowance = await offerToken.allowance(
          account,
          realTokenYamUpgradeable.address
        );
        const amountInWeiToPermit = amountInWei.plus(
          new BigNumber(oldAllowance.toString())
        );

        const priceInWei = new BigNumber(formValues.price.toString()).shiftedBy(
          Number(buyerTokenDecimals)
        );

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

          const createOfferWithPermitTx =
            await realTokenYamUpgradeable.createOfferWithPermit(
              formValues.offerTokenAddress,
              formValues.buyerTokenAddress,
              formValues.isPrivateOffer === false
                ? ZERO_ADDRESS
                : formValues.buyerAddress,
              priceInWei.toString(),
              amountInWei.toString(),
              transactionDeadline.toString(),
              v,
              r,
              s
            );
          const notificationPayload = {
            key: createOfferWithPermitTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${createOfferWithPermitTx.hash}`,
            hash: createOfferWithPermitTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.createOfferLoading](
              notificationPayload
            )
          );

          createOfferWithPermitTx
            .wait()
            .then(({ status }) =>
              updateNotification(
                NOTIFICATIONS[
                  status === 1
                    ? NotificationsID.createOfferSuccess
                    : NotificationsID.createOfferError
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

          const createOfferWithPermitTx =
            await realTokenYamUpgradeable.createOfferWithPermit(
              formValues.offerTokenAddress,
              formValues.buyerTokenAddress,
              formValues.isPrivateOffer === false
                ? ZERO_ADDRESS
                : formValues.buyerAddress,
              priceInWei.toString(),
              amountInWei.toString(),
              transactionDeadline.toString(),
              v,
              r,
              s
            );
          const notificationPayload = {
            key: createOfferWithPermitTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${createOfferWithPermitTx.hash}`,
            hash: createOfferWithPermitTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.createOfferLoading](
              notificationPayload
            )
          );

          createOfferWithPermitTx
            .wait()
            .then(({ status }) =>
              updateNotification(
                NOTIFICATIONS[
                  status === 1
                    ? NotificationsID.createOfferSuccess
                    : NotificationsID.createOfferError
                ](notificationPayload)
              )
            );
        } else if (offerTokenType === 3) {
          // TokenType = 3: ERC20 Without Permit, do Approve/CreateOffer
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

          const createOfferTx = await realTokenYamUpgradeable.createOffer(
            formValues.offerTokenAddress,
            formValues.buyerTokenAddress,
            formValues.isPrivateOffer === false
              ? ZERO_ADDRESS
              : formValues.buyerAddress,
            priceInWei.toString(),
            amountInWei.toString()
          );

          const notificationCreateOffer = {
            key: createOfferTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${createOfferTx.hash}`,
            hash: createOfferTx.hash,
          };

          showNotification(
            NOTIFICATIONS[NotificationsID.createOfferLoading](
              notificationCreateOffer
            )
          );

          createOfferTx
            .wait()
            .then(({ status }) =>
              updateNotification(
                NOTIFICATIONS[
                  status === 1
                    ? NotificationsID.createOfferSuccess
                    : NotificationsID.createOfferError
                ](notificationCreateOffer)
              )
            );
        } else {
          console.log('Token is not whitelisted');
          showNotification(NOTIFICATIONS[NotificationsID.createOfferInvalid]());
        }
      } catch (error) {
        console.log('ERROR WHEN SELLING WITH PERMIT', error);
        showNotification(NOTIFICATIONS[NotificationsID.createOfferInvalid]());
      } finally {
        setSubmitting(false);
      }
    },
    [account, provider, realTokenYamUpgradeable, activeChain?.blockExplorerUrl]
  );
  const privateOffer = () => {
    if (getInputProps('isPrivateOffer', { type: 'checkbox' }).checked) {
      return <TextInput
      label={t('labelPrivateBuyerAddress')}
      placeholder={t('placeholderOfferPrivatBuyerAddress')}
      required={values.isPrivateOffer}
      disabled={!values.isPrivateOffer}
      {...getInputProps('buyerAddress')}
    />
    } else {
      return
    }
  }
  
  return (
    <Box sx={{ maxWidth: 400 }} mx={'auto'}>
      <h3>{t('titleFormCreateOffer')}</h3>
      <form onSubmit={onSubmit(onHandleSubmit)}>
        <Stack justify={'center'} align={'stretch'}>
          <TextInput
            label={t('offerTokenAddress')}
            placeholder={t('placeholderOfferSellTokenAddress')}
            required={true}
            {...getInputProps('offerTokenAddress')}
          />
          <TextInput
            label={t('buyerTokenAddress')}
            placeholder={t('placeholderOfferBuyTokenAddress')}
            required={true}
            {...getInputProps('buyerTokenAddress')}
          />
          <NumberInput
            label={t('price')}
            placeholder={t('price')}
            required={true}
            min={0.000001}
            max={undefined}
            step={undefined}
            showMax={false}
            sx={{ flexGrow: 1 }}
            {...getInputProps('price')}
          />
          <NumberInput
            label={t('amount')}
            placeholder={t('amount')}
            required={true}
            min={0.000001}
            max={undefined}
            step={undefined}
            showMax={false}
            sx={{ flexGrow: 1 }}
            {...getInputProps('amount')}
          />
          
          <Checkbox
            mt={'md'}
            label={t('checkboxLabelPrivateOffre')}
            {...getInputProps('isPrivateOffer', { type: 'checkbox' })}
            
          />
          {privateOffer()}
          <Group position={'left'} mt={'md'}>
            <Button
              type={'submit'}
              loading={isSubmitting}
              aria-label={'submit'}
            >
              {t('buttonCreateOffer')}
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};
