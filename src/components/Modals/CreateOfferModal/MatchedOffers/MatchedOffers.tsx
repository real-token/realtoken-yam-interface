import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Divider,
  Flex,
  Loader,
  MantineTheme,
  createStyles,
} from '@mantine/core';
import { IconSwitchHorizontal } from '@tabler/icons-react';

import { OFFER_BEST_TYPE } from '../../../../hooks/useMatchedOfferBestType';
import { useMatchedOffers } from '../../../../hooks/useMatchedOffers';
import { OFFER_TYPE } from '../../../../types/offer';
import { MatchedOffer } from './MatchedOffer';
import { MultiPath } from './MultiPath';

const useStyles = createStyles((theme: MantineTheme) => ({
  container: {
    position: 'absolute',
    top: 0,
    left: '105%',
    borderRadius: '8px',
    width: '70%',
    backgroundColor: '#1A1B1E',
    overflow: 'hidden',
    maxHeight: '70%',
  },
  header: {
    borderRadius: '8px',
    backgroundColor: theme.colors.brand,
    color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5],
    padding: '10px',
  },
  body: {
    padding: '20px',
    overflowY: 'scroll',
  },
}));

interface MatchedOffersProps {
  offerType: OFFER_TYPE;
  offerTokenAddress: string;
  buyerTokenAddress: string;
  price: number | undefined;
  amount: number | undefined;
  closeModal: () => void;
}
export const MatchedOffers: FC<MatchedOffersProps> = ({
  offerType,
  offerTokenAddress,
  buyerTokenAddress,
  price,
  amount,
  closeModal,
}) => {
  const { t } = useTranslation('modals', { keyPrefix: 'offerMatching' });

  const { classes } = useStyles();
  const {
    bestPrice,
    multiPath,
    multiPathAmountFilled,
    multiPathAmountFilledPercentage,
    otherMatching,
  } = useMatchedOffers(
    offerType,
    offerTokenAddress,
    buyerTokenAddress,
    price,
    amount,
  );

  return (
    <Flex direction={'column'} className={classes.container}>
      <Flex gap={'sm'} className={classes.header}>
        <IconSwitchHorizontal />
        {t('title')}
      </Flex>
      <Flex direction={'column'} className={classes.body} gap={'sm'}>
        {!bestPrice &&
        !multiPath &&
        otherMatching &&
        otherMatching.length == 0 ? (
          <div>{t('noMatchingFound')}</div>
        ) : undefined}
        {!bestPrice && !multiPath && !otherMatching ? (
          <Flex align={'center'} gap={'sm'}>
            <Loader size={'sm'} />
            {t('waitingMatching')}
          </Flex>
        ) : undefined}
        {multiPath ? (
          <MultiPath
            offers={multiPath}
            amount={amount}
            multiPathAmountFilled={multiPathAmountFilled}
            multiPathAmountFilledPercentage={multiPathAmountFilledPercentage}
            closeModal={closeModal}
          />
        ) : (
          <>
            {bestPrice ? (
              <MatchedOffer
                offer={bestPrice}
                amount={amount}
                offerBestType={OFFER_BEST_TYPE.BEST_PRICE}
              />
            ) : undefined}
          </>
        )}
        {otherMatching && otherMatching.length > 1 ? (
          <>
            <Divider color={'brand'} />
            {otherMatching.map((offer) => (
              <MatchedOffer
                key={offer.createdAtTimestamp}
                offer={offer}
                amount={amount}
              />
            ))}
          </>
        ) : undefined}
      </Flex>
    </Flex>
  );
};
