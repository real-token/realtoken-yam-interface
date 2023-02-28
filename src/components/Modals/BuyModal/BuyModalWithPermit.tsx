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
import { useERC20TokenInfo } from 'src/hooks/useERC20TokenInfo';
import { Offer, OFFER_TYPE } from 'src/types/offer';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import { useAtomValue } from 'jotai';
import { providerAtom } from 'src/states';

type BuyModalWithPermitProps = {
  offer: Offer,
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
    offer,
    triggerTableRefresh,
  },
}) => {

  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<BuyWithPermitFormValues>({
      // eslint-disable-next-line object-shorthand
      initialValues: {
        offerId: offer.offerId,
        price: parseFloat(offer.price),
        amount: 0,
        offerTokenAddress: offer.offerTokenAddress,
        offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals)
      },
    });

    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const activeChain = useActiveChain();
    
    const [offerTokenSellerBalance,setOfferTokenSellerBalance] = useState<string|undefined>("");
    const { name:offerTokenName, symbol:offerTokenSymbol  } = useERC20TokenInfo(offer.offerTokenAddress);
    const { symbol:buyTokenSymbol, address:buyerTokenAddress } = useERC20TokenInfo(offer.buyerTokenAddress);
    
    const realTokenYamUpgradeable = useContract(
      ContractsID.realTokenYamUpgradeable
    );
    const buyerToken = getContract<CoinBridgeToken>(
        offer.buyerTokenAddress,
        coinBridgeTokenABI,
        provider as Web3Provider,
        account
    );
    const offerToken = getContract<Erc20>(
          offer.offerTokenAddress,
          Erc20ABI,
          provider as Web3Provider,
          account
    )

  const getOfferTokenInfos = async () => {
    if(!offerToken) return;
    try{
      // console.log("offerToken: ", offerToken)
      // console.log("sellerAddress: ", sellerAddress)
      const balanceSeller = await offerToken.balanceOf(offer.sellerAddress)
      setOfferTokenSellerBalance((balanceSeller ?? BigNumber(0)).toString())
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    if(offerToken) getOfferTokenInfos();    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[offerToken])

  const { t } = useTranslation('modals', { keyPrefix: 'buy' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'sell' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  const { balance, WalletERC20Balance } = useWalletERC20Balance(buyerTokenAddress)

  const total = values?.amount * values?.price;

  const connector = useAtomValue(providerAtom);

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

        const amountInWei = new BigNumber(parseInt(new BigNumber(formValues.amount.toString()).shiftedBy(Number(offer.offerTokenDecimals)).toString()));

        console.log(amountInWei.toString())

        const priceInWei = new BigNumber(formValues.price.toString()).shiftedBy(
          Number(offer.buyerTokenDecimals)
        );

        const buyerTokenAmount = amountInWei
          .multipliedBy(priceInWei)
          .shiftedBy(-offer.offerTokenDecimals);
        const transactionDeadline = Math.floor(Date.now() / 1000) + 3600; // permit valable during 1h

        const buyerTokenType = await realTokenYamUpgradeable.getTokenType(
          formValues.buyerTokenAddress
        );

        if(connector == "gnosis-safe"){
            
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
            

        }else{
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
  
            const tx = await realTokenYamUpgradeable.buyWithPermit(
              formValues.offerId,
              priceInWei.toString(),
              amountInWei.toString(),
              transactionDeadline.toString(),
              v,
              r,
              s
            );
            
            const notificationPayload = {
              key: tx.hash,
              href: `${activeChain?.blockExplorerUrl}tx/${tx.hash}`,
              hash: tx.hash,
            };
  
            showNotification(
              NOTIFICATIONS[NotificationsID.buyOfferLoading](notificationPayload)
            );
  
            tx
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
        }

        onClose();
        triggerTableRefresh(true);

      } catch (e) {
        console.error('Error in BuyModalWithPermit', e);
        showNotification(NOTIFICATIONS[NotificationsID.buyOfferInvalid]());
        setSubmitting(false);
      }
    },
    [account, provider, realTokenYamUpgradeable, buyerToken, offer.offerTokenDecimals, offer.buyerTokenDecimals, connector, activeChain?.blockExplorerUrl, triggerTableRefresh, onClose]
  );

  const maxTokenBuy: number|undefined = useMemo(() => {
    if(!balance || !offer.price) return undefined;

    const b = new BigNumber(balance);
    const max = b.eq(0) ? new BigNumber(0) : b.dividedBy(offer.price);

    return max.isGreaterThanOrEqualTo(new BigNumber(offer.amount)) ? new BigNumber(offer.amount).toNumber() : parseFloat(max.toString());
  },[balance,offer]);

  const priceTranslation: Map<OFFER_TYPE,string> = new Map<OFFER_TYPE,string>([
    [OFFER_TYPE.BUY,t("buyOfferTypePrice")],
    [OFFER_TYPE.SELL,t("sellOfferTypePrice")],
    [OFFER_TYPE.EXCHANGE,t("exchangeOfferTypePrice")]
  ]);

  const amountTranslation: Map<OFFER_TYPE,string> = new Map<OFFER_TYPE,string>([
    [OFFER_TYPE.BUY,t("buyOfferTypeAmount")],
    [OFFER_TYPE.SELL,t("sellOfferTypeAmount")],
    [OFFER_TYPE.EXCHANGE,t("exchangeOfferTypeAmount")]
  ]);

  return (
    <form onSubmit={onSubmit(onHandleSubmit)} style={{ width: calcRem(500) }}>
      <Stack justify={'center'} align={'stretch'}>
        <Flex direction={"column"} gap={"sm"}>
          <Text size={"xl"}>{t('selectedOffer')}</Text>
          <Flex direction={"column"} gap={8}>
              <Flex direction={"column"}>
                <Text fw={700}>{t("offerId")}</Text>
                <Text>{offer.offerId}</Text>
              </Flex>
              <Flex direction={"column"}>
                <Text fw={700}>{t("offerTokenName")}</Text>
                <Text>{offerTokenName}</Text>
              </Flex>
              <Flex direction={"column"}>
                <Text fw={700}>{t("sellerAddress")}</Text>
                <Text>{offer.sellerAddress}</Text>
              </Flex>
              <Flex direction={"column"} >
                <Text fw={700}>{offer.type ? amountTranslation.get(offer.type) : ""}</Text>
                <Text>{BigNumber.minimum(offer.amount,offerTokenSellerBalance!).toString()}</Text>
              </Flex>
              <Flex direction={"column"}>
                  <Text fw={700}>{offer.type ? priceTranslation.get(offer.type) : ""}</Text>
                  <Text>{`${offer.price} ${buyTokenSymbol}`}</Text>
                </Flex>
          </Flex>
        </Flex>

        <Divider />

        <WalletERC20Balance 
          tokenAddress={offer.buyerTokenAddress}
          tokenDecimals={offer.buyerTokenDecimals}
        />

        <Flex direction={"column"} gap={"sm"} >
          <Text size={"xl"}>{t1("sell")}</Text>
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
