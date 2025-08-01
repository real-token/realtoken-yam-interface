import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useAA } from '@real-token/aa-core';
import { useCurrentNetwork } from '@real-token/core';
import { encodeTransaction } from '@real-token/web3';
import { useMutation } from '@tanstack/react-query';
import { multicall, readContract } from '@wagmi/core';

import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import {
  useAccount,
  useConfig,
  usePublicClient,
  useReadContracts,
} from 'wagmi';

import {
  CoinBridgeToken,
  coinBridgeTokenABI,
  realTokenYamUpgradeableABI,
} from 'src/abis';
import { NOTIFICATIONS, NotificationsID } from 'src/constants';
import coinBridgeTokenPermitSignature, {
  PermitSignature,
} from 'src/hooks/coinBridgeTokenPermitSignature';
import erc20PermitSignature from 'src/hooks/erc20PermitSignature';
import { Offer } from 'src/types/offer/Offer';
import { cleanNumber } from 'src/utils/number';

import { ExtendedChainConfig } from '../../../config/aaConfig';
import { useWalletERC20Balance } from '../../../hooks/useWalletERC20Balance';
import { OFFER_TYPE } from '../../../types/offer';
import { NumberInput } from '../../NumberInput';
import { WalletERC20Balance } from '../../WalletBalance/WalletERC20Balance';

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
  innerProps: { offer, triggerTableRefresh },
}) => {
  const { address: account } = useAccount();
  const config = useConfig();
  const publicClient = usePublicClient();
  const aa = useAA();

  const { getInputProps, onSubmit, reset, setFieldValue, values } =
    useForm<UpdateFormValues>({
      initialValues: {
        offerId: offer.offerId,
        price: parseFloat(offer.price),
        amount: parseFloat(offer.amount),
        offerTokenAddress: offer.offerTokenAddress,
        offerTokenDecimals: parseFloat(offer.offerTokenDecimals),
        buyerTokenAddress: offer.buyerTokenAddress,
        buyerTokenDecimals: parseFloat(offer.buyerTokenDecimals),
      },
    });

  const [amountMax, setAmountMax] = useState<number>();

  const activeChain = useCurrentNetwork<ExtendedChainConfig>();

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

  const { data: initialOffer } = useReadContracts({
    query: {
      enabled: !!account && !!offer.buyerTokenAddress,
    },
    contracts: [
      {
        abi: coinBridgeTokenABI,
        address: offer.buyerTokenAddress as `0x${string}`,
        functionName: 'symbol',
        args: [],
      },
      {
        abi: coinBridgeTokenABI,
        address: offer.offerTokenAddress as `0x${string}`,
        functionName: 'symbol',
        args: [],
      },
    ],
  });
  const buyTokenSymbol = initialOffer?.[0]?.result;
  const offerTokenSymbol = initialOffer?.[1]?.result;

  const total = values?.amount * values?.price;

  const { bigNumberbalance, balance } = useWalletERC20Balance(
    values.offerTokenAddress
  );

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: async (rawValues: UpdateFormValues) => {
      console.log('rawValues', rawValues);

      const getFormValues = () => {
        const amountDecimals = parseInt(
          offer.type == OFFER_TYPE.SELL
            ? offer.offerTokenDecimals
            : offer.offerTokenDecimals
        );
        const priceDecimals = parseInt(
          offer.type == OFFER_TYPE.SELL
            ? offer.buyerTokenDecimals
            : offer.buyerTokenDecimals
        );

        const choosedPrice =
          offer.type == OFFER_TYPE.BUY ? 1 / rawValues.price : rawValues.price;

        const amount =
          offer.type == OFFER_TYPE.BUY
            ? new BigNumber(rawValues.amount ?? 1).multipliedBy(choosedPrice)
            : new BigNumber(rawValues.amount ?? 1);

        const formValues = {
          ...rawValues,
          amount: amount.shiftedBy(amountDecimals ?? 18).toFixed(0),
          price: new BigNumber(rawValues.price ?? 1)
            .shiftedBy(priceDecimals ?? 18)
            .toFixed(0),
        };
        return formValues;
      };

      const formValues = getFormValues();

      if (
        !account ||
        !formValues.offerId ||
        !formValues.price ||
        !formValues.amount ||
        !config ||
        !activeChain ||
        !publicClient ||
        !aa
      ) {
        throw new Error('Missing required values');
      }

      const realTokenYamUpgradeableAddress =
        activeChain?.contracts.realTokenYamUpgradeableAddress;

      const multicallResult = await multicall(config, {
        contracts: [
          {
            abi: coinBridgeTokenABI,
            address: offer.offerTokenAddress as `0x${string}`,
            functionName: 'allowance',
            args: [account, offer.offerTokenAddress as `0x${string}`],
          },
          {
            abi: realTokenYamUpgradeableABI,
            address: realTokenYamUpgradeableAddress as `0x${string}`,
            functionName: 'getInitialOffer',
            args: [BigInt(offer.offerId)],
          },
        ],
      });

      const oldAllowanceOfferToken = multicallResult[0].result;
      const amount = multicallResult[1].result?.[5] ?? 0n;

      if (!oldAllowanceOfferToken || !amount) {
        throw new Error('Error getting allowance');
      }

      const oldAmountInWei = BigNumber(amount.toString());
      const oldAllowanceOfferTokenInWei = BigNumber(
        oldAllowanceOfferToken.toString()
      );

      /*
       * Si old allowance est supperieur au amount old Yam : retirer du old alowance le old YAM amount et ajouter le new Amount YAM
       * Si old allowance est inférieur au amount old Yam : set le nouvelle allowance
       */
      //TODO: a voir la gestion plus complexe de l'allowance avec multiple création d'offres
      const amountInWeiToPermit =
        oldAllowanceOfferTokenInWei.comparedTo(oldAmountInWei) > 0
          ? oldAllowanceOfferTokenInWei
              .plus(formValues.amount)
              .minus(oldAmountInWei)
          : BigNumber(formValues.amount);

      const accountCode = await publicClient.getCode({
        address: account as `0x${string}`,
      });
      const isAA = accountCode !== '0x';

      const offerTokenType = await readContract(config, {
        address: realTokenYamUpgradeableAddress,
        abi: realTokenYamUpgradeableABI,
        functionName: 'getTokenType',
        args: [formValues.offerTokenAddress as `0x${string}`],
      });

      const unsupportedTokenPermit = offerTokenType === 3;

      if (isAA || unsupportedTokenPermit) {
        const approveTxData = encodeTransaction({
          abi: coinBridgeTokenABI,
          functionName: 'approve',
          args: [
            realTokenYamUpgradeableAddress,
            BigInt(amountInWeiToPermit.toString(10)),
          ],
        });

        await aa.addTransaction({
          to: formValues.offerTokenAddress as `0x${string}`,
          data: approveTxData,
        });

        const { txHash: txsHashs } = await aa.confirmAllTxs();
        if (!txsHashs) {
          throw new Error('Error approving transaction');
        }
        const txHash = txsHashs[0];

        const notificationApprove = {
          key: txHash,
          href: `${activeChain?.blockExplorerUrl}tx/${txHash}`,
          hash: txHash,
        };

        showNotification(
          NOTIFICATIONS[NotificationsID.approveOfferLoading](
            notificationApprove
          )
        );

        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash as `0x${string}`,
        });
        const approveTxStatus = receipt.status;

        updateNotification(
          NOTIFICATIONS[
            approveTxStatus === 'success'
              ? NotificationsID.approveOfferSuccess
              : NotificationsID.approveOfferError
          ](notificationApprove)
        );

        // UPDATE OFFER
        const updateTxData = encodeTransaction({
          abi: realTokenYamUpgradeableABI,
          functionName: 'updateOffer',
          args: [
            BigInt(formValues.offerId),
            BigInt(formValues.price),
            BigInt(formValues.amount),
          ],
        });

        await aa.addTransaction({
          to: realTokenYamUpgradeableAddress as `0x${string}`,
          data: updateTxData,
        });

        const { txHash: txsHashsUpdate } = await aa.confirmAllTxs();
        if (!txsHashsUpdate) {
          throw new Error('Error updating offer');
        }
        const txHashUpdate = txsHashsUpdate[0];

        const notificationUpdate = {
          key: txHashUpdate,
          href: `${activeChain?.blockExplorerUrl}tx/${txHashUpdate}`,
          hash: txHashUpdate,
        };

        const receiptUpdate = await publicClient.waitForTransactionReceipt({
          hash: txHashUpdate as `0x${string}`,
        });
        const updateTxStatus = receiptUpdate.status;

        updateNotification(
          NOTIFICATIONS[
            updateTxStatus === 'success'
              ? NotificationsID.updateOfferSuccess
              : NotificationsID.updateOfferError
          ](notificationUpdate)
        );
      } else {
        const transactionDeadline = Math.floor(Date.now() / 1000) + 3600; // permit valable during 1h

        let signature: PermitSignature | undefined;
        if (offerTokenType === 1) {
          // TokenType = 1: RealToken
          signature = await coinBridgeTokenPermitSignature(
            account,
            realTokenYamUpgradeableAddress,
            amountInWeiToPermit.toString(10),
            transactionDeadline,
            offer.offerTokenAddress as `0x${string}`,
            publicClient,
            aa
          );
        } else if (offerTokenType === 2) {
          // TokenType = 2: ERC20 With Permit
          signature = await erc20PermitSignature(
            account,
            realTokenYamUpgradeableAddress,
            amountInWeiToPermit.toString(10),
            transactionDeadline,
            offer.offerTokenAddress as `0x${string}`,
            publicClient,
            aa
          );
        }

        if (!signature || !signature.v) {
          throw new Error('Error getting signature');
        }

        const { v, r, s } = signature;

        const updateWithPermitTxData = encodeTransaction({
          abi: realTokenYamUpgradeableABI,
          functionName: 'updateOfferWithPermit',
          args: [
            BigInt(formValues.offerId),
            BigInt(formValues.price),
            BigInt(formValues.amount),
            BigInt(amountInWeiToPermit.toString(10)),
            BigInt(transactionDeadline.toString()),
            Number(signature.v),
            signature.r,
            signature.s,
          ],
        });

        await aa.addTransaction({
          to: realTokenYamUpgradeableAddress as `0x${string}`,
          data: updateWithPermitTxData,
        });

        const { txHash: txsHashsUpdate } = await aa.confirmAllTxs();
        if (!txsHashsUpdate) {
          throw new Error('Error updating offer');
        }
        const txHashUpdate = txsHashsUpdate[0];

        const notificationUpdate = {
          key: txHashUpdate,
          href: `${activeChain?.blockExplorerUrl}tx/${txHashUpdate}`,
          hash: txHashUpdate,
        };

        const receiptUpdate = await publicClient.waitForTransactionReceipt({
          hash: txHashUpdate as `0x${string}`,
        });
        const updateTxStatus = receiptUpdate.status;

        updateNotification(
          NOTIFICATIONS[
            updateTxStatus === 'success'
              ? NotificationsID.updateOfferSuccess
              : NotificationsID.updateOfferError
          ](notificationUpdate)
        );
      }
    },
    onSuccess: () => {
      triggerTableRefresh(true);
    },
  });

  return (
    <form onSubmit={onSubmit(() => mutate(values))}>
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
          <WalletERC20Balance balance={balance} symbol={offerTokenSymbol} />
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
