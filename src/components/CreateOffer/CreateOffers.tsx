import { Button, Divider, Flex } from "@mantine/core"
import { notifications, showNotification, updateNotification } from "@mantine/notifications";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CoinBridgeToken, coinBridgeTokenABI, Erc20, Erc20ABI } from "src/abis";
import { Chain, ContractsID, NOTIFICATIONS, NotificationsID } from "src/constants";
import { useActiveChain, useContract } from "src/hooks";
import { useRefreshOffers } from "src/hooks/offers/useRefreshOffers";
import { CreatedOffer } from "src/types/offer/CreatedOffer";
import { getContract } from "src/utils";
import { CreateOfferPane } from "./CreateOfferPane";
import erc20PermitSignature from "../../hooks/erc20PermitSignature";
import coinBridgeTokenPermitSignature from "../../hooks/coinBridgeTokenPermitSignature";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { useAtomValue } from "jotai";
import { providerAtom } from "../../states";
import classes from './CreateOffer.module.css';
import { useRootStore } from "../../zustandStore/store";
import { AvailableConnectors, ConnectorsDatas } from "@realtoken/realt-commons";
import { getBatchApprove } from "../../hooks/getBatchApprove";
import { IconArrowBack } from "@tabler/icons";
import { CreateOfferApprovePane } from "./CreateOfferApprovePane";

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

      notifications.show(
        NOTIFICATIONS[NotificationsID.approveOfferLoading](notificationApprove)
      );

      approveTx
        .wait()
        .then(({ status }) => 
          notifications.update({
            ...NOTIFICATIONS[
              status === 1
                ? NotificationsID.approveOfferSuccess
                : NotificationsID.approveOfferError
            ](notificationApprove)
          })
        );

      await approveTx.wait(1);

      resolve();
    } catch (err) {
      setSubmitting(false);
      reject(err);
    }
  });
};

export const CreateOffer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);

  const { refreshOffers } = useRefreshOffers();

  const [
    offers, 
    resetOffers, 
    approvals, 
    resetApprovals
  ] = useRootStore(state => [
    state.offersToCreate, 
    state.resetOffers, 
    state.approvals, 
    state.resetApprovals
  ]);
  console.log('approvals', approvals);

  const { t } = useTranslation('modals', { keyPrefix: 'sell' });

  const realTokenYamUpgradeable = useContract(
    ContractsID.realTokenYamUpgradeable
  );
  const { account, provider } = useWeb3React();
  const activeChain = useActiveChain();

  const connector = useAtomValue(providerAtom);

  const { approves } = getBatchApprove();

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
    console.log('createOffers');

    try {
      if (!account || !provider || !realTokenYamUpgradeable) return;

      setLoading(true);

      console.log(offers);

      if (offers.length == 1) {
        console.log('length=1');
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

        const offerTokenType = await realTokenYamUpgradeable.getTokenType(
          offer.offerTokenAddress
        );
        const buyerTokenDecimals = await buyerToken?.decimals();

        const priceInWei = new BigNumber(offer.price.toString())
          .shiftedBy(Number(buyerTokenDecimals))
          .toString(10);
        const transactionDeadline = Math.floor(Date.now() / 1000) + 3600;

        const isSafe = connector == ConnectorsDatas.get(AvailableConnectors.gnosisSafe)?.connectorKey;

        let permitAnswer: any | undefined = undefined;
        let needPermit = false;
        if (offerTokenType == 1 && !isSafe) {
          console.log(
            'coinBridgeTokenPermitSignature',
            account,
            realTokenYamUpgradeable.address,
            new BigNumber(offer.amount).toString(10),
            transactionDeadline
            //JSON.stringify(offerToken, null, 4)
          );
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
          console.log('erc20PermitSignature');
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
          console.log('approveOffer');
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

        console.log('pass2');

        if (needPermit && !permitAnswer) {
          setLoading(false);
          return;
        }

        console.log('pass permitAnswer');

        let createOfferTx;
        if ((offerTokenType == 1 || offerTokenType == 2) && !isSafe) {
          console.log(
            'Type 1 or 2 and is not safe',
            JSON.stringify(permitAnswer, null, 4)
          );
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
          console.log('TEST 1');
          createOfferTx = await realTokenYamUpgradeable.createOffer(
            offer.offerTokenAddress,
            offer.buyerTokenAddress,
            offer.buyerAddress,
            priceInWei,
            new BigNumber(offer.amount).toString(10)
          );
        }

        console.log('pass3');

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

        console.log('pass4');

        createOfferTx.wait()
          .then(({ status }) => {
            updateNotification(
              NOTIFICATIONS[
                status === 1
                  ? NotificationsID.createOfferSuccess
                  : NotificationsID.createOfferError
              ](notificationPayload)
            );

            if (status == 1) {
              console.log('test1')
              resetOffers()
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
            console.log('test2')
            resetOffers()
            refreshOffers();
          }
          setLoading(false);
        });
      }
    } catch (err) {
      console.log('Error when sending createBatch tx: ', err);
      setLoading(false);
      setNotification(true);
    }
  };

  const createBatchOffer = async () => {

    console.log('createBatchOffer');

    try{
      if (!account || !provider || !realTokenYamUpgradeable){
        console.error('account, provider or realTokenYamUpgradeable not found');
        return;
      };

      setLoading(true);

      // WANT TO CREATE MULTI OFFERS
      const _offerTokens = [];
      const _buyerTokens = [];
      const _buyers = [];
      const _prices = [];
      const _amounts = [];

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
          console.log('test2')
          resetOffers()
          refreshOffers();
          resetApprovals();
          setShowApprovePanel(false);
        }
        setLoading(false);
      });
      
    }catch(err){
      // TODO: Add error notification
      console.error(err);
      setLoading(false);
    }
  }

  const checkIfApproveNeeded = () => {
    if(offers.length > 1){

      // Batch offers, CANNOT permit
      // Only approve available
      setShowApprovePanel(true);

    }else{
      createOffers();
    }
  }

  const [showApprovePanel, setShowApprovePanel] = useState<boolean>(false);

  return (
    <Flex direction={'column'} align={'center'} justify={'center'}>
      <h3>{showApprovePanel ? 'Approve offer(s)' : 'Create offer(s)'}</h3>
      <Flex direction={'column'} w={'33%'} gap={'md'}>
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
            {showApprovePanel ? (
              Object.keys(approves).map((token) => {
                const amount = approves[token];
                return(
                  <CreateOfferApprovePane token={token} amount={amount}/>
                )
              })
            ):(
              offers?.map((offer: CreatedOffer, index: number) => (
                <CreateOfferPane
                  key={`created-offer-${index}`}
                  isCreating={false}
                  offer={offer}
                />
              ))
            )}
          </Flex>
          {offers.length > 0 ? <Divider /> : undefined}
          <CreateOfferPane isCreating={true} />
        </Flex>
        {/* {notification && (
          <Notification
            icon={<IconX size={'1.1rem'} />}
            color={'red'}
            sx={{ position: 'absolute', bottom: '50vh' }}
            onClose={() => {
              setNotification(() => false);
            }}
          >
            {'Error ! Offer(s) not created. Please retry.'}
          </Notification>
        )} */}
        <Flex align={'center'} justify={showApprovePanel ? 'space-between' : 'center'} w={'100%'}>
          {showApprovePanel ? (
            <Button 
              leftSection={<IconArrowBack/>}
              color={'red'}
              onClick={() => setShowApprovePanel(false)}
              disabled={loading}
            >
              {'Back to offers'}
            </Button>
          ): undefined}
          {showApprovePanel ? (
            <Button
              disabled={Object.values(approvals).some((approval) => !approval) || loading}
              onClick={() => createBatchOffer()}
              loading={loading}
            >
              {t('buttonCreateOfferWithNumber', { nbr: offers.length })}
            </Button>
          ):(
            <Button
              disabled={offers.length == 0 || loading}
              onClick={() => checkIfApproveNeeded()}
              loading={loading}
            >
              {offers.length < 2
                ? t('buttonCreateOffer')
                : t('approveOfferWithNumber', { nbr: offers.length })}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
