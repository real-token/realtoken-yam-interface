import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Divider, Flex } from '@mantine/core';
import { useCurrentNetwork } from '@real-token/core';
import { useIsAA, useSendTransactions } from '@real-token/web3';
import { IconArrowBack } from '@tabler/icons';

import BigNumber from 'bignumber.js';
import { useAccount } from 'wagmi';
import { usePublicClient } from 'wagmi';

import { CreatedOffer } from 'src/types/offer/CreatedOffer';

import { ExtendedChainConfig } from '../../config/aaConfig';
import { getBatchApprove } from '../../hooks/getBatchApprove';
import { useOffers } from '../../hooks/interface/useOffers';
import { OFFER_TYPE } from '../../types/offer';
import {
  CreateOfferTransactionContext,
  createBatchOffersTransactions,
  createOfferTransactions,
} from '../../utils/tx/createOffer';
import { useRootStore } from '../../zustandStore/store';
import classes from './CreateOffer.module.css';
import { CreateOfferApprovePane } from './CreateOfferApprovePane';
import { CreateOfferPane } from './CreateOfferPane';

export const CreateOffer = () => {
  const { refetch } = useOffers();

  const [rawOffers, resetOffers, approvals, resetApprovals] = useRootStore(
    (state) => [
      state.offersToCreate,
      state.resetOffers,
      state.approvals,
      state.resetApprovals,
    ]
  );

  const offers: CreatedOffer[] = useMemo(() => {
    return rawOffers.map((offer) => {
      const amountDecimals =
        offer.offerType == OFFER_TYPE.SELL
          ? offer.offerTokenDecimal
          : offer.offerTokenDecimal;
      const priceDecimals =
        offer.offerType == OFFER_TYPE.SELL
          ? offer.buyerTokenDecimal
          : offer.buyerTokenDecimal;

      const amount =
        offer.offerType == OFFER_TYPE.BUY
          ? new BigNumber(offer.amount ?? 1).multipliedBy(
              offer.choosedPrice ?? 1
            )
          : new BigNumber(offer.amount ?? 1);

      return {
        ...offer,
        amount: amount.shiftedBy(amountDecimals ?? 18).toFixed(0),
        price: new BigNumber(offer.price ?? 1)
          .shiftedBy(priceDecimals ?? 18)
          .toFixed(0),
      };
    });
  }, [rawOffers]);

  const { t } = useTranslation('modals', { keyPrefix: 'sell' });

  const { address: account } = useAccount();
  const activeChain = useCurrentNetwork<ExtendedChainConfig>();

  const { approves } = getBatchApprove(offers);

  const publicClient = usePublicClient();
  const isAA = useIsAA();

  const { sendTransactions, isPending: isLoading } =
    useSendTransactions<CreateOfferTransactionContext>({
      initialContext: {
        account: account,
      },
      onAllComplete() {
        resetOffers();
        refetch();
      },
    });

  const handleSendTransactions = () => {
    if (offers.length == 1) {
      sendTransactions(
        createOfferTransactions(
          isAA,
          publicClient,
          activeChain,
          offers[0],
          offers[0].amount ?? '0'
        )
      );
    } else {
      sendTransactions(
        createBatchOffersTransactions(
          publicClient,
          activeChain,
          account,
          offers
        )
      );
    }
  };

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
            {showApprovePanel
              ? Object.keys(approves).map((token, index) => {
                  const approval = approves[token];
                  return (
                    <CreateOfferApprovePane
                      key={`approve-${index}`}
                      tokenAddress={token}
                      approval={approval}
                    />
                  );
                })
              : rawOffers?.map((offer: CreatedOffer, index: number) => (
                  <CreateOfferPane
                    key={`created-offer-${index}`}
                    isCreating={false}
                    offer={offer}
                  />
                ))}
          </Flex>
          {rawOffers.length > 0 ? <Divider /> : undefined}
          <CreateOfferPane isCreating={true} />
        </Flex>
        <Flex
          align={'center'}
          justify={showApprovePanel ? 'space-between' : 'center'}
          w={'100%'}
        >
          {showApprovePanel ? (
            <Button
              leftSection={<IconArrowBack />}
              color={'red'}
              onClick={() => setShowApprovePanel(false)}
              disabled={isLoading}
            >
              {'Back to offers'}
            </Button>
          ) : undefined}
          <Button
            disabled={rawOffers.length == 0 || isLoading}
            onClick={() => handleSendTransactions()}
            loading={isLoading}
          >
            {rawOffers.length < 2
              ? t('buttonCreateOffer')
              : t('approveOfferWithNumber', { nbr: rawOffers.length })}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
