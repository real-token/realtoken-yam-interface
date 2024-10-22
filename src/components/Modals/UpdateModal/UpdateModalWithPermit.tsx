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
import { Button, Divider, Flex, Group, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';

import { CoinBridgeToken, Erc20, Erc20ABI, coinBridgeTokenABI } from 'src/abis';
import { ContractsID, NOTIFICATIONS, NotificationsID } from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import coinBridgeTokenPermitSignature from 'src/hooks/coinBridgeTokenPermitSignature';
import erc20PermitSignature from 'src/hooks/erc20PermitSignature';
import { Offer } from 'src/types/offer/Offer';
import { getContract } from 'src/utils';
import { cleanNumber } from 'src/utils/number';

import { NumberInput } from '../../NumberInput';
import { ethers } from 'ethers';
import { useAtomValue } from 'jotai';
import { providerAtom } from '../../../states';
import { AvailableConnectors, ConnectorsDatas } from '@realtoken/realt-commons';
import { useQuery } from 'react-query';
import { OFFER_TYPE } from '../../../types/offer';
import { WalletERC20Balance } from '../../WalletBalance/WalletERC20Balance';
import { useWalletERC20Balance } from '../../../hooks/useWalletERC20Balance';

type UpdateModalProps = {
  offer: Offer;
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
    offer,
    triggerTableRefresh,
  },
}) => {

  const { account, provider } = useWeb3React();
  const { getInputProps, onSubmit, reset, setFieldValue, values, setInitialValues } = useForm<UpdateFormValues>({
    initialValues: {
      offerId: offer.offerId,
      price: parseFloat(offer.price),
      amount: parseFloat(offer.amount),
      offerTokenAddress: offer.offerTokenAddress,
      offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
      buyerTokenAddress: offer.buyerTokenAddress,
      buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals),
    }
  });

  // useEffect(() => {
  //   if(!offer) return;

  //   const offerType = offer.type;

  //   const amount = 

  //   const initialValues: UpdateFormValues = {
  //     offerId: offer.offerId,
  //     price: parseFloat(offer.price),
  //     amount: parseFloat(offer.amount),
  //     offerTokenAddress: offer.offerTokenAddress,
  //     offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
  //     buyerTokenAddress: offer.buyerTokenAddress,
  //     buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals),
  //   }

  //   setInitialValues(values);

  // },[])

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [amountMax, setAmountMax] = useState<number>();

  const activeChain = useActiveChain();
  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );

  const { t } = useTranslation('modals', { keyPrefix: 'update' });
  const { t: t1 } = useTranslation('modals', { keyPrefix: 'sell' });

  const onClose = useCallback(() => {
    reset();
    context.closeModal(id);
  }, [context, id, reset]);

  useEffect(() => {
    setAmountMax(Number(offer?.amount as string));
  }, [offer, values]);

  useEffect(() => {
    if (!amountMax) return;
    setFieldValue('amount', amountMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountMax]);

  const connector = useAtomValue(providerAtom);

  const onHandleSubmit = useCallback(
    async (rawValues: UpdateFormValues) => {

      console.log('rawValues', rawValues);

      try {

        const getFormValues = () => {

          const amountDecimals = parseInt(offer.type == OFFER_TYPE.SELL ? offer.offerTokenDecimals : offer.offerTokenDecimals);
          const priceDecimals = parseInt(offer.type == OFFER_TYPE.SELL ? offer.buyerTokenDecimals : offer.buyerTokenDecimals);

          const choosedPrice = offer.type == OFFER_TYPE.BUY ? 1 / rawValues.price : rawValues.price;

          const amount = offer.type == OFFER_TYPE.BUY ?
            new BigNumber(rawValues.amount ?? 1).multipliedBy(choosedPrice)
          : 
            new BigNumber(rawValues.amount ?? 1);

          const formValues = {
            ...rawValues,
            amount: amount.shiftedBy(amountDecimals ?? 18).toFixed(0),
            price: new BigNumber(rawValues.price ?? 1).shiftedBy(priceDecimals ?? 18).toFixed(0)
          }
          return formValues;
        }

        const formValues = getFormValues();
        console.log('formValues', formValues);

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
          offer.offerTokenAddress,
          coinBridgeTokenABI,
          provider,
          account
        );
        if (!offerToken) {
          console.log('offerToken not found');
          return;
        }

        const oldAllowanceOfferToken = await offerToken.allowance(
          account,
          realTokenYamUpgradeable.address
        );

        const [, , , , , amount] =
          await realTokenYamUpgradeable.getInitialOffer(offer.offerId);

        const oldAmountInWei = BigNumber(amount._hex);
        console.log('oldAmountInWei', oldAmountInWei.toString(10));

        /*
         * Si old allowance est supperieur au amount old Yam : retirer du old alowance le old YAM amount et ajouter le new Amount YAM
         * Si old allowance est inférieur au amount old Yam : set le nouvelle allowance
         */
        //TODO: a voir la gestion plus complexe de l'allowance avec multiple création d'offres
        const amountInWeiToPermit =
          BigNumber(oldAllowanceOfferToken._hex).comparedTo(oldAmountInWei) > 0
            ? BigNumber(oldAllowanceOfferToken._hex)
                .plus(formValues.amount)
                .minus(oldAmountInWei)
            : BigNumber(formValues.amount);

        setSubmitting(true);

        //TODO: rendre configurable par le user
        const transactionDeadline = Math.floor(Date.now() / 1000) + 3600; // permit valable during 1h

        const offerTokenType = await realTokenYamUpgradeable.getTokenType(
          formValues.offerTokenAddress
        );

        const isSafe = connector == ConnectorsDatas.get(AvailableConnectors.gnosisSafe)?.connectorKey;;

        // APPROVE OR PERMIT
        let signature: any;
        if (offerTokenType === 1 && !isSafe) {
          // TokenType = 1: RealToken
          signature = await coinBridgeTokenPermitSignature(
            account,
            realTokenYamUpgradeable.address,
            amountInWeiToPermit.toString(10),
            transactionDeadline,
            offerToken,
            provider
          );

        } else if (offerTokenType === 2 && !isSafe) {
          // TokenType = 2: ERC20 With Permit
          signature = await erc20PermitSignature(
            account,
            realTokenYamUpgradeable.address,
            amountInWeiToPermit.toString(10),
            transactionDeadline,
            offerToken,
            provider
          );

        } else if (offerTokenType === 3 || isSafe) {
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
          
        }

        const price = formValues.price;
        const amountUpdate = formValues.amount;
        
        let updateTx: ethers.providers.TransactionResponse|undefined = undefined;
        if (offerTokenType === 1 && !isSafe) {

          const { v, r, s } = signature;

          updateTx = await realTokenYamUpgradeable.updateOfferWithPermit(
            offer.offerId,
            price,
            amountUpdate,
            amountInWeiToPermit.toString(10),
            transactionDeadline.toString(),
            v,
            r,
            s
          );

        }else if(offerTokenType === 2&& !isSafe){

          const { v, r, s } = signature;

          updateTx = await realTokenYamUpgradeable.updateOfferWithPermit(
            formValues.offerId,
            price,
            amountUpdate,
            amountInWeiToPermit.toString(10),
            transactionDeadline.toString(),
            v,
            r,
            s
          );

        }else if(offerTokenType === 3 || isSafe){
          updateTx = await realTokenYamUpgradeable.updateOffer(
            formValues.offerId,
            price,
            amountUpdate,
          );
        }

        if(updateTx){

          const notificationPayload = {
            key: updateTx.hash,
            href: `${activeChain?.blockExplorerUrl}tx/${updateTx.hash}`,
            hash: updateTx.hash,
          };
  
          showNotification(
            NOTIFICATIONS[NotificationsID.updateOfferLoading](
              notificationPayload
            )
          );
  
          updateTx
              .wait()
              .then(({ status }) => {
                updateNotification(
                  NOTIFICATIONS[
                    status === 1
                      ? NotificationsID.updateOfferSuccess
                      : NotificationsID.updateOfferError
                  ](notificationPayload)
                )
                if(status == 1){
                  triggerTableRefresh(true);
                  onClose();
                }
                setSubmitting(false);
              }
            );
        }

      } catch (e) {
        console.error('Error UpdateModal', e);
        setSubmitting(false);
      }
    },
    [account, provider,connector, realTokenYamUpgradeable, offer.offerTokenAddress, offer.offerId, offer.buyerTokenDecimals, offer.offerTokenDecimals, activeChain?.blockExplorerUrl, triggerTableRefresh, onClose]
  );

  const [offerTokenSymbol, setOfferTokenSymbol] = useState<string | undefined>(
    ''
  );
  const [buyTokenSymbol, setBuyTokenSymbol] = useState<string | undefined>('');

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
  );

  const getOfferTokenInfos = async () => {
    try {
      const tokenSymbol = await offerToken?.symbol();
      setOfferTokenSymbol(tokenSymbol);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (offerToken) getOfferTokenInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerToken]);

  const getBuyTokenInfos = async () => {
    try {
      const tokenSymbol = await buyerToken?.symbol();
      setBuyTokenSymbol(tokenSymbol);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (buyerToken) getBuyTokenInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyerToken]);

  const total = values?.amount * values?.price;

  const { bigNumberbalance, balance } = useWalletERC20Balance(values.offerTokenAddress);

  return (
    <form onSubmit={onSubmit(onHandleSubmit)}>
      <Stack justify={'center'} align={'stretch'}>
        <Flex direction={'column'} gap={'sm'}>
          <Text size={'xl'}>{t('selectedOffer')}</Text>
          <Flex direction={'column'} gap={8}>
            <Flex direction={'column'}>
              <Text fw={700}>{t('offerId')}</Text>
              <Text>{offer.offerId ? offer.offerId : 'Offer not found'}</Text>
            </Flex>
            <Flex direction={'column'}>
              <Text fw={700}>{t('price')}</Text>
              <Text>{offer.price}</Text>
            </Flex>
            <Flex direction={'column'}>
              <Text fw={700}>{t('amount')}</Text>
              <Text>{offer.amount}</Text>
            </Flex>
          </Flex>
        </Flex>

        <Divider />

        <NumberInput
          label={`${t('price')} (${buyTokenSymbol})`}
          required={true}
          min={0}
          decimalScale={parseInt(offer.buyerTokenDecimals)}
          placeholder={t('price')}
          style={{ flexGrow: 1 }}
          {...getInputProps('price')}
        />

        <Divider />

        <Flex direction={'column'} gap={'md'}>
          <WalletERC20Balance balance={balance} symbol={offerTokenSymbol}/>
          <NumberInput
            label={t('amount')}
            required={true}
            min={0}
            placeholder={t('amount')}
            style={{ flexGrow: 1 }}
            decimalScale={parseInt(offer.offerTokenDecimals)}
            max={parseFloat(balance ?? '0')}
            // showMax={true}
            {...getInputProps('amount')}
          />
        </Flex>

        <Text size={'xl'}>{t('summary')}</Text>
        {values.price > 0 && values.amount > 0 && (
          <Text size={'md'} mb={10}>
            {` ${t1('summaryText1')} ${values?.amount} ${offerTokenSymbol} ${t1(
              'summaryText2'
            )} ${cleanNumber(values?.price)} ${buyTokenSymbol} ${t1(
              'summaryText3'
            )} ${total} ${buyTokenSymbol}`}
            {/* {` ${t1('summaryText1')} ${cleanNumber(price)} ${t1('summaryText3')} ${cleanNumber(values.price)} ${t1('summaryText2')} ${cleanNumber(amount)} ${t1('summaryText3')} ${cleanNumber(values.amount)}`} */}
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
            disabled={
              values.price == 0 ||
              values.amount == 0 ||
              values.price == undefined ||
              values.amount == undefined
            }
          >
            {t('confirm')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
