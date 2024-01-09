import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Web3Provider } from '@ethersproject/providers';
import {
  Button,
  Divider,
  Flex,
  Notification,
  createStyles,
} from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';
import { Contract } from 'ethers';
import { useAtomValue } from 'jotai';

import { CoinBridgeToken, Erc20, Erc20ABI, coinBridgeTokenABI } from 'src/abis';
import {
  Chain,
  ContractsID,
  NOTIFICATIONS,
  NotificationsID,
} from 'src/constants';
import { useActiveChain, useContract } from 'src/hooks';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { useAppDispatch, useAppSelector } from 'src/hooks/react-hooks';
import { selectCreateOffers } from 'src/store/features/createOffers/createOffersSelector';
import { createOfferResetDispatchType } from 'src/store/features/createOffers/createOffersSlice';
import { CreatedOffer } from 'src/types/offer/CreatedOffer';
import { getContract } from 'src/utils';

import coinBridgeTokenPermitSignature from '../../hooks/coinBridgeTokenPermitSignature';
import erc20PermitSignature from '../../hooks/erc20PermitSignature';
import { providerAtom } from '../../states';
import { CreateOfferPane } from './CreateOfferPane';

const approveOffer = (
  offerTokenAddress: string,
  amountToApprove: BigNumber,
  provider: Web3Provider | undefined,
  account: string | undefined,
  realTokenYamUpgradeable: Contract | undefined,
  setSubmitting: (status: boolean) => void,
  activeChain: Chain | undefined
): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    if (
      !provider ||
      !realTokenYamUpgradeable ||
      !account ||
      !amountToApprove ||
      !offerTokenAddress
    )
      return;
    try {
      setSubmitting(true);
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
      const amountInWeiToPermit = amountToApprove
        .plus(new BigNumber(oldAllowance.toString()))
        .toString(10);

      console.log('amountInWei: ', amountToApprove.toString());
      console.log('oldAllowance: ', oldAllowance.toString());
      console.log('amountInWeiToPermit: ', amountInWeiToPermit);

      // TokenType = 3: ERC20 Without Permit, do Approve/CreateOffer
      BigNumber.set({ EXPONENTIAL_AT: 35 });
      const approveTx = await offerToken.approve(
        realTokenYamUpgradeable.address,
        amountInWeiToPermit
      );

      const notificationApprove = {
        key: approveTx.hash,
        href: `${activeChain?.blockExplorerUrl}tx/${approveTx.hash}`,
        hash: approveTx.hash,
      };

      showNotification(
        NOTIFICATIONS[NotificationsID.approveOfferLoading](notificationApprove)
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

      resolve();
    } catch (err) {
      setSubmitting(false);
      reject(err);
    }
  });
};

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    width: '33%',
    borderStyle: 'solid',
    borderColor: theme.colors.brand,
    borderWidth: '2px',
    borderRadius: theme.spacing.sm,
    padding: theme.spacing.md,
    height: '40vh',

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: '100%',
    },
  },
  offersContainer: {
    overflowY: 'scroll',
    // paddingRight: "20px"
  },
}));

export const CreateOffer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorNotification, setErrorNotification] = useState<boolean>(false);

  const { refreshOffers } = useRefreshOffers(false);

  const { classes } = useStyles();
  const offers = useAppSelector(selectCreateOffers);

  const { t } = useTranslation('modals', { keyPrefix: 'sell' });

  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );
  const { account, provider } = useWeb3React();
  const activeChain = useActiveChain();

  const dispatch = useAppDispatch();

  const connector = useAtomValue(providerAtom);

  // Group approves for same token in unique approve tx to reduce gas consumption
  const createApproves = async () => {
    const approves: { [key: string]: BigNumber } = {};
    offers.forEach((offer) => {
      if (!offer.amount) return;
      const approveForOfferToken = approves[offer.offerTokenAddress];
      if (approves[offer.offerTokenAddress]) {
        approves[offer.offerTokenAddress] = approveForOfferToken.plus(
          offer.amount
        );
      } else {
        approves[offer.offerTokenAddress] = new BigNumber(offer.amount);
      }
    });

    for await (const approveKey of Object.keys(approves)) {
      const amountToApprove = approves[approveKey];
      await approveOffer(
        approveKey,
        amountToApprove,
        provider,
        account,
        realTokenYamUpgradeable,
        setLoading,
        activeChain
      );
    }
  };

  const createOffers = async () => {
    try {
      if (!account || !provider || !realTokenYamUpgradeable) return;

      setLoading(true);

      console.log(offers);

      if (offers.length == 1) {
        const offer = offers[0];

        const offerToken = getContract<CoinBridgeToken>(
          offer.offerTokenAddress,
          coinBridgeTokenABI,
          provider,
          account
        );
        const buyerToken = getContract<Erc20>(
          offer.buyerTokenAddress,
          Erc20ABI,
          provider,
          account
        );

        if (!offer.price || !offer.amount || !offerToken) return;

        let offerTokenType = await realTokenYamUpgradeable.getTokenType(
          offer.offerTokenAddress
        );

        const buyerTokenDecimals = await buyerToken?.decimals();

        const priceInWei = new BigNumber(offer.price.toString())
          .shiftedBy(Number(buyerTokenDecimals))
          .toString(10);
        const transactionDeadline = Math.floor(Date.now() / 1000) + 3600;

        const isSafe = connector == 'gnosis-safe';

        let permitAnswer: any | undefined = undefined;
        let needPermit = false;
        try {
          if (offerTokenType == 1 && !isSafe) {
            // TokenType = 1: RealToken
            needPermit = true;
            permitAnswer = await coinBridgeTokenPermitSignature(
              account,
              realTokenYamUpgradeable.address,
              new BigNumber(offer.amount).toString(10),
              transactionDeadline,
              offerToken,
              provider
            );
          } else if (offerTokenType == 2 && !isSafe) {
            // TokenType = 2: ERC20 With Permit
            needPermit = true;
            permitAnswer = await erc20PermitSignature(
              account,
              realTokenYamUpgradeable.address,
              new BigNumber(offer.amount).toString(10),
              transactionDeadline,
              offerToken,
              provider
            );
          } else if (offerTokenType == 3 || isSafe) {
            await approveOffer(
              offer.offerTokenAddress,
              new BigNumber(offer.amount),
              provider,
              account,
              realTokenYamUpgradeable,
              setLoading,
              activeChain
            );
          }
        } catch (e) {
          const error: { code: number; message: string } = JSON.parse(
            JSON.stringify(e)
          );
          console.log('Error erc20PermitSignature', e, error.code);
          if (error.code === -32601 || error.code === undefined) {
            console.log(
              'Error erc20PermitSignature : BUY WITH PERMIT FAIL, TRY BUY WITHOUT PERMIT',
              error.code
            );
            offerTokenType = 3;
            needPermit = false;
            await approveOffer(
              offer.offerTokenAddress,
              new BigNumber(offer.amount),
              provider,
              account,
              realTokenYamUpgradeable,
              setLoading,
              activeChain
            );
          } else {
            console.log(
              'Error erc20PermitSignature : BUY WITH PERMIT FAIL',
              error.code
            );
            throw e;
          }
        }

        if (needPermit && !permitAnswer) {
          setLoading(false);
          return;
        }

        let createOfferTx;
        if ((offerTokenType == 1 || offerTokenType == 2) && !isSafe) {
          console.log('createOfferWithPermit');
          const { r, s, v } = permitAnswer;
          createOfferTx = await realTokenYamUpgradeable.createOfferWithPermit(
            offer.offerTokenAddress,
            offer.buyerTokenAddress,
            offer.buyerAddress,
            priceInWei,
            new BigNumber(offer.amount).toString(10),
            new BigNumber(offer.amount).toString(10),
            transactionDeadline,
            v,
            r,
            s
          );
        } else {
          createOfferTx = await realTokenYamUpgradeable.createOffer(
            offer.offerTokenAddress,
            offer.buyerTokenAddress,
            offer.buyerAddress,
            priceInWei,
            new BigNumber(offer.amount).toString(10)
          );
        }

        if (!createOfferTx) {
          setLoading(false);
          return;
        }

        const notificationPayload = {
          key: createOfferTx.hash,
          href: `${activeChain?.blockExplorerUrl}tx/${createOfferTx.hash}`,
          hash: createOfferTx.hash,
        };

        showNotification(
          NOTIFICATIONS[NotificationsID.createOfferLoading](notificationPayload)
        );

        createOfferTx.wait().then(({ status }) => {
          updateNotification(
            NOTIFICATIONS[
              status === 1
                ? NotificationsID.createOfferSuccess
                : NotificationsID.createOfferError
            ](notificationPayload)
          );

          if (status == 1) {
            dispatch({ type: createOfferResetDispatchType });
            refreshOffers();
          }
          setLoading(false);
        });
      } else {
        // WANT TO CREATE MULTI OFFERS
        const _offerTokens = [];
        const _buyerTokens = [];
        const _buyers = [];
        const _prices = [];
        const _amounts = [];

        // approve
        await createApproves();

        for await (const createdOffer of offers) {
          const offerToken = getContract<CoinBridgeToken>(
            createdOffer.offerTokenAddress,
            coinBridgeTokenABI,
            provider,
            account
          );
          const buyerToken = getContract<Erc20>(
            createdOffer.buyerTokenAddress,
            Erc20ABI,
            provider,
            account
          );

          const buyerTokenDecimals = await buyerToken?.decimals();

          if (!createdOffer.amount || !createdOffer.price) return;

          if (!offerToken) {
            console.log('offerToken not found');
            return;
          }

          BigNumber.set({ EXPONENTIAL_AT: 37 });

          const priceInWei = new BigNumber(createdOffer.price.toString())
            .shiftedBy(Number(buyerTokenDecimals))
            .toString(10);

          _offerTokens.push(createdOffer.offerTokenAddress);
          _buyerTokens.push(createdOffer.buyerTokenAddress);
          _buyers.push(createdOffer.buyerAddress);
          _prices.push(priceInWei);
          _amounts.push(new BigNumber(createdOffer.amount).toString(10));
        }

        console.log(_offerTokens, _buyerTokens, _buyers, _prices, _amounts);

        const createBatchOffersTx =
          await realTokenYamUpgradeable.createOfferBatch(
            _offerTokens,
            _buyerTokens,
            _buyers,
            _prices,
            _amounts
          );

        const notificationPayload = {
          key: createBatchOffersTx.hash,
          href: `${activeChain?.blockExplorerUrl}tx/${createBatchOffersTx.hash}`,
          hash: createBatchOffersTx.hash,
        };

        showNotification(
          NOTIFICATIONS[NotificationsID.createOfferLoading](notificationPayload)
        );

        createBatchOffersTx.wait().then(({ status }) => {
          updateNotification(
            NOTIFICATIONS[
              status === 1
                ? NotificationsID.createOfferSuccess
                : NotificationsID.createOfferError
            ](notificationPayload)
          );

          if (status == 1) {
            dispatch({ type: createOfferResetDispatchType });
            refreshOffers();
          }
          setLoading(false);
        });
      }
    } catch (err) {
      console.log('Error when sending createBatch tx: ', err);
      setLoading(false);
      setErrorNotification(true);
    }
  };

  return (
    <Flex direction={'column'} align={'center'}>
      <h3>{'Create offer(s)'}</h3>
      <Flex
        direction={'column'}
        className={classes.container}
        gap={'sm'}
        mb={'sm'}
      >
        <Flex
          direction={'column'}
          className={classes.offersContainer}
          gap={'sm'}
        >
          {offers?.map((offer: CreatedOffer, index: number) => (
            <CreateOfferPane
              key={`created-offer-${index}`}
              isCreating={false}
              offer={offer}
            />
          ))}
        </Flex>
        {false && offers.length > 0 ? <Divider /> : undefined}
        {offers.length === 0 && <CreateOfferPane isCreating={true} />}
      </Flex>
      {errorNotification && (
        <Notification
          icon={<IconX size={'1.1rem'} />}
          color={'red'}
          sx={{ position: 'absolute', bottom: '50vh' }}
          onClose={() => {
            setErrorNotification(() => false);
          }}
        >
          {'Error ! Offer(s) not created. Please retry.'}
        </Notification>
      )}

      <Button
        disabled={offers.length == 0 || loading}
        onClick={() => createOffers()}
        loading={loading}
      >
        {offers.length == 0
          ? t('buttonCreateOffer')
          : t('buttonCreateOfferWithNumber', { nbr: offers.length })}
      </Button>
    </Flex>
  );
};
