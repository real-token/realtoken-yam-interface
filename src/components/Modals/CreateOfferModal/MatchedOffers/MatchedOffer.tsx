import { ActionIcon, Button, Flex, Text } from '@mantine/core';
import { useCurrentNetwork } from '@real-token/core';
import { useSendTransactions } from '@real-token/web3';
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconCash,
  IconExternalLink,
  IconScale,
} from '@tabler/icons';

import { useAccount, usePublicClient } from 'wagmi';

import { ExtendedChainConfig } from '../../../../config/aaConfig';
import {
  OFFER_BEST_TYPE,
  useMatchedOfferBestType,
} from '../../../../hooks/useMatchedOfferBestType';
import { useOfferInfos } from '../../../../hooks/useOfferInfos';
import { OFFER_TYPE, Offer } from '../../../../types/offer';
import {
  BuyTransactionContext,
  buyTransactions,
} from '../../../../utils/tx/buy';
import { openInNewTab } from '../../../../utils/window';
import { OfferTypeBadge } from '../../../Offer/OfferTypeBadge/OfferTypeBadge';
import classes from './MatchedOffer.module.css';

interface MatchedOfferProps {
  offerBestType?: OFFER_BEST_TYPE;
  offer: Offer;
  amount: number | undefined;
}
export const MatchedOffer = ({
  offerBestType,
  offer,
  amount,
}: MatchedOfferProps) => {
  const { address: account } = useAccount();

  const { buyerTokenName, offerTokenName } = useOfferInfos(offer);

  const { getOfferBestTypeTranslation } = useMatchedOfferBestType();

  const publicClient = usePublicClient();
  const activeChain = useCurrentNetwork<ExtendedChainConfig>();

  const { sendTransactions, isPending: isSubmitting } =
    useSendTransactions<BuyTransactionContext>({
      initialContext: {
        account: account as `0x${string}`,
      },
    });

  const buyOffer = (amount: number) => {
    sendTransactions(
      buyTransactions(publicClient, activeChain, offer, amount)
    );
  };

  return (
    <Flex direction={'column'} className={classes.container}>
      <Flex gap={'xs'} direction={'column'} mb={10}>
        {offerBestType ? (
          <Flex
            style={(theme) => ({
              backgroundColor:
                offerBestType == OFFER_BEST_TYPE.BEST_AMOUNT
                  ? theme.colors.blue
                  : theme.colors.grape,
              borderRadius: theme.radius.md,
              fontWeight: 700,
              padding: `0 ${theme.spacing.sm}px`,
              color: 'white',
              justifyContent: 'center',
            })}
          >
            {getOfferBestTypeTranslation(offerBestType)}
          </Flex>
        ) : undefined}
        <Flex gap={'xs'}>
          <div className={classes.offerId}>{offer.offerId}</div>
          <OfferTypeBadge
            offerType={offer.type ?? OFFER_TYPE.EXCHANGE}
            sx={{ flexGrow: 1 }}
          />
          <ActionIcon
            color={'brand'}
            onClick={() => openInNewTab(`/offer/${offer.offerId}`)}
            style={{ height: '40px', width: '2.4rem' }}
            variant={'outline'}
          >
            <IconExternalLink size={24} />
          </ActionIcon>
        </Flex>
      </Flex>
      <Flex gap={'sm'} mt={6}>
        <IconArrowUpRight color={'red'} />
        <Text>{buyerTokenName}</Text>
      </Flex>
      <Flex gap={'sm'}>
        <IconArrowDownLeft color={'green'} />
        <Text>{offerTokenName}</Text>
      </Flex>
      <Flex gap={'sm'}>
        <IconCash />
        <Text>{offer.offerPrice}</Text>
      </Flex>
      <Flex gap={'sm'}>
        <IconScale />
        <Text>{offer.amount}</Text>
      </Flex>
      <Button
        className={classes.floatingButton}
        onClick={() => buyOffer(amount ?? 0)}
        disabled={!amount}
        loading={isSubmitting}
      >
        {!amount ? 'Please provide amount' : 'Buy'}
      </Button>
    </Flex>
  );
};
