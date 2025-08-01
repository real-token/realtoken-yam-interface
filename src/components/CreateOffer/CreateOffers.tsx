import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Divider, Flex } from '@mantine/core';
import { useAA } from '@real-token/aa-core';
import { useCurrentNetwork } from '@real-token/core';
import { IconArrowBack } from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';

import BigNumber from 'bignumber.js';
import { useAccount } from 'wagmi';
import { usePublicClient } from 'wagmi';

import { CreatedOffer } from 'src/types/offer/CreatedOffer';

import { ExtendedChainConfig } from '../../config/aaConfig';
import { getBatchApprove } from '../../hooks/getBatchApprove';
import { useOffers } from '../../hooks/interface/useOffers';
import { OFFER_TYPE } from '../../types/offer';
import { createBatchOffers, createOffer } from '../../utils/tx/createOffer';
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

  const aa = useAA();
  const publicClient = usePublicClient();

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (data) => {
      if (!aa || !publicClient || !activeChain || !account) {
        throw new Error('Missing required parameters');
      }

      if (offers.length == 1) {
        const offer = offers[0];
        if (!offer.amount) {
          throw new Error('Offer amount is undefined');
        }
        return createOffer(
          aa,
          account,
          publicClient,
          activeChain,
          offer,
          offer.amount
        );
      } else {
        return createBatchOffers(
          aa,
          account,
          publicClient,
          activeChain,
          offers
        );
      }
    },
    onSuccess: () => {
      resetOffers();
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

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
            onClick={() => mutate()}
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
