import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Web3Provider } from '@ethersproject/providers';
import { Button, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import BigNumber from 'bignumber.js';
import { CoinBridgeToken, coinBridgeTokenABI, Erc20, Erc20ABI } from 'src/abis';
import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import coinBridgeTokenPermitSignature from 'src/hooks/coinBridgeTokenPermitSignature';
import erc20PermitSignature from 'src/hooks/erc20PermitSignature';
import { getContract } from 'src/utils';
import { NumberInput } from '../../NumberInput';
import { useWalletERC20Balance } from 'src/hooks/useWalletERC20Balance';
import { cleanNumber } from 'src/utils/number';
import { useWeb3React } from '@web3-react/core';
import { calcRem } from 'src/utils/style';

type BuyModalWithPermitProps = {
  offerId: string;
  price: number;
  offerAmount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
  sellerAddress: string;
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
> =  ({
  context,
  id,
  innerProps: {
    offerId,
    price,
    offerAmount,
    offerTokenAddress,
    offerTokenDecimals,
    buyerTokenAddress,
    buyerTokenDecimals,
    triggerTableRefresh,
    sellerAddress
  },
}) => {
  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<BuyWithPermitFormValues>({
      // eslint-disable-next-line object-shorthand
      initialValues: {
        offerId: offerId,
        price: price,
        amount: 0,
        offerTokenAddress: offerTokenAddress,
        offerTokenDecimals: offerTokenDecimals,
        buyerTokenAddress: buyerTokenAddress,
        buyerTokenDecimals: buyerTokenDecimals
      },
    });

    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const activeChain = useActiveChain();
    
    const [offerTokenName,setOfferTokenName] = useState<string|undefined>("");
    const [offerTokenSymbol,setOfferTokenSymbol] = useState<string|undefined>("");
    const [offerTokenSellerBalance,setOfferTokenSellerBalance] = useState<string|undefined>("");

    const [buyTokenSymbol,setBuyTokenSymbol] = useState<string|undefined>("");
    
    const realTokenYamUpgradeable = useContract(
      ContractsID.realTokenYamUpgradeable
      );
    const buyerToken = getContract<CoinBridgeToken>(
        buyerTokenAddress,
        coinBridgeTokenABI,
        provider as Web3Provider,
        account
      );
    const offerToken = getContract<Erc20>(
          offerTokenAddress,
          Erc20ABI,
          provider as Web3Provider,
          account
      )
    //const newOfferAmount = new BigNumber(((await offerToken?.balanceOf(sellerAddress))?._hex ?? '0')).toNumber();
    //console.log('DEBUG BuyWithPermitFormValues value',newOfferAmount,values)

  const getOfferTokenInfos = async () => {
    if(!offerToken) return;
    try{

      // console.log("offerToken: ", offerToken)
      // console.log("sellerAddress: ", sellerAddress)
      const tokenName = await offerToken.name();
      const tokenSymbol = await offerToken.symbol();
      const balanceSeller = await offerToken.balanceOf(sellerAddress)
      setOfferTokenSellerBalance((balanceSeller ?? BigNumber(0)).toString())
      setOfferTokenName(tokenName);
      setOfferTokenSymbol(tokenSymbol)

    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    if(offerToken) getOfferTokenInfos();    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[offerToken])

  const getBuyTokenInfos = async () => {

    try{
      const tokenSymbol = await buyerToken?.symbol();
      setBuyTokenSymbol(tokenSymbol);
    }catch(err){
      console.log(err)
    }

  }
  useEffect(() => {
    if(buyerToken) getBuyTokenInfos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[buyerToken])

  const { t } = useTranslation('modals', { keyPrefix: 'buy' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  const { bigNumberbalance, WalletERC20Balance } = useWalletERC20Balance(buyerTokenAddress)

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
        const transactionDeadline = Math.floor(Date.now() / 1000) + 3600; // permit valable during 1h

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
      values,
      activeChain?.blockExplorerUrl,
      triggerTableRefresh,
      onClose,
    ]
  );

  const total = values?.amount * values?.price;

  const maxTokenBuy: number|undefined = useMemo(() => {
    if(bigNumberbalance == undefined || !price) return undefined;

    const max = bigNumberbalance.eq(0) ? new BigNumber(0) : bigNumberbalance.dividedBy(price);

    return max.isGreaterThanOrEqualTo(BigNumber(offerAmount)) ? offerAmount : max.toNumber();
  },[bigNumberbalance,price,offerAmount])

  return (
    <form onSubmit={onSubmit(onHandleSubmit)} style={{ width: calcRem(500) }}>
      <Stack justify={'center'} align={'stretch'}>

      <Flex direction={"column"} gap={"sm"}>
        <Text size={"xl"}>{t('selectedOffer')}</Text>
        <Flex direction={"column"} gap={8}>
            <Flex direction={"column"}>
              <Text fw={700}>{t("offerId")}</Text>
              <Text>{offerId}</Text>
            </Flex>
            <Flex direction={"column"}>
              <Text fw={700}>{t("offerTokenName")}</Text>
              <Text>{offerTokenName}</Text>
            </Flex>
            <Flex direction={"column"}>
              <Text fw={700}>{t("sellerAddress")}</Text>
              <Text>{sellerAddress}</Text>
            </Flex>
            <Flex direction={"column"} >
              <Text fw={700}>{t("amount")}</Text>
              <Text>{BigNumber.minimum(offerAmount,offerTokenSellerBalance!).toString()}</Text>
            </Flex>
            <Flex direction={"column"}>
                <Text fw={700}>{t("price")}</Text>
                <Text>{`${price} ${buyTokenSymbol}`}</Text>
              </Flex>
        </Flex>
      </Flex>

      <Divider />

      <WalletERC20Balance 
        tokenAddress={buyerTokenAddress}
        tokenDecimals={buyerTokenDecimals}
      />

      <Flex direction={"column"} gap={"sm"} >
        <Text size={"xl"}>{t("buy")}</Text>
        <Flex direction={"column"} gap={8}>
          <NumberInput
            label={t('amount')}
            required={true}
            disabled={maxTokenBuy == 0 || maxTokenBuy == undefined}
            min={0}
            max={maxTokenBuy}
            showMax={true}
            placeholder={t('amount')}
            sx={{ flexGrow: 1 }}
            groupMarginBottom={16}
            setFieldValue={setFieldValue}
            {...getInputProps('amount')}
          />

          <Text size={"xl"}>{t("summary")}</Text>
          <Text size={"md"} mb={10}>
            {` ${t("summaryText1")} ${values?.amount} ${offerTokenSymbol} ${t("summaryText2")} ${cleanNumber(values?.price)} ${buyTokenSymbol} ${t("summaryText3")} ${total} ${buyTokenSymbol}`}
          </Text>
          
          <Group grow={true}>
            <Button color={'red'} onClick={onClose} aria-label={t('cancel')}>
              {t('cancel')}
            </Button>
            <Button
              type={'submit'}
              loading={isSubmitting}
              aria-label={t('confirm')}
              disabled={values?.amount == 0 || !values.amount}
            >
              {t('confirm')}
            </Button>
          </Group>
        </Flex>
      </Flex>
        
    </Stack>
    </form>
  );
};
