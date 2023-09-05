import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Skeleton, Text, createStyles } from '@mantine/core';

import { OfferTypeBadge } from 'src/components/Offer/OfferTypeBadge';
import { OfferDeltaTable } from 'src/components/Table/OfferDeltaTable/OfferDeltaTable';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { PropertiesToken } from 'src/types';
import { OFFER_TYPE } from 'src/types/offer';
import { Offer } from 'src/types/offer/Offer';

import { BuyActionsWithPermit } from '../BuyActions';
import { ShowOfferAction } from '../ShowOfferAction/ShowOfferAction';

const useStyle = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.colors.brand,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    height: '100%',
  },
  header: {
    backgroundSize: '600px 200px',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[2],
    padding: theme.spacing.sm,
  },
  content: {
    height: '100%',
  },
  data: {
    flexGrow: 1,
  },
  offerTokenName: {
    color: 'white',
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
  },
  buyerTokenName: {
    fontStyle: 'italic',
    fontWeight: 500,
    color: theme.colors.gray[3],
  },
  buyButtonGroup: {
    width: '50%',
  },
  buyButton: {
    width: '100%',
    height: '35px',
  },
  showOfferButton: {
    width: '50%',
    height: '35px',
  },
  loader: {
    height: '500px',
    width: '500px',
  },
  offerId: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 ${theme.spacing.xl}px`,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.brand,
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    color: 'white',
  },
}));

interface GridPaneProps {
  offer: Offer;
}
export const GridPane: FC<GridPaneProps> = ({ offer }) => {
  const { t } = useTranslation('buy', { keyPrefix: 'table' });
  const { classes } = useStyle();

  const [url, setURL] = useState('');
  const [propertyTokens, setPropertyTokens] = useState<PropertiesToken[]>([]);
  const { getPropertyToken, propertiesIsloading } = usePropertiesToken();

  useEffect(() => {
    if (!offer || propertiesIsloading || propertyTokens.length > 0)
      return undefined;

    if (offer.buyerTokenType == 1) {
      const token = getPropertyToken(offer.buyerTokenAddress);
      if (token) {
        setPropertyTokens((prev) => [...prev, token]);
        setURL("url('" + token.imageLink[0] + "')");
      }
    }

    if (offer.offerTokenType == 1) {
      const token = getPropertyToken(offer.offerTokenAddress);
      if (token) {
        setPropertyTokens((prev) => [...prev, token]);
        setURL("url('" + token.imageLink[0] + "')");
      }
    }
  }, [getPropertyToken, offer, propertiesIsloading, propertyTokens.length]);

  return (
    <>
      {!offer.availableAmount ? (
        <Skeleton height={300} width={430} />
      ) : (
        <Flex className={classes.container}>
          <Flex
            direction={'column'}
            align={'start'}
            color={'brand'}
            className={classes.header}
            sx={{
              backgroundImage: url,
            }}
          >
            <Flex gap={'sm'} pb={12}>
              <Flex className={classes.offerId} mb={10}>
                {offer.offerId}
              </Flex>
              <OfferTypeBadge offerType={offer.type ?? OFFER_TYPE.SELL} />
            </Flex>
            <Text className={classes.offerTokenName}>
              {offer.offerTokenName}
            </Text>
            <Text className={classes.buyerTokenName}>
              {offer.buyerTokenName}
            </Text>
          </Flex>
          <Flex
            direction={'column'}
            p={'sm'}
            gap={'sm'}
            className={classes.content}
          >
            <Flex direction={'column'} mb={10} className={classes.data}>
              <Flex direction={'column'}>
                <Text fw={700}>{t('sellerAddress')}</Text>
                {offer.sellerAddress}
              </Flex>
              <Flex direction={'column'}>
                <Text fw={700}>{t('amount')}</Text>
                {offer.amount}
              </Flex>
              <Flex direction={'column'} mb={15}>
                <Text fw={700}>{t('price')}</Text>
                {offer.price}
              </Flex>
              {offer.type !== OFFER_TYPE.EXCHANGE ? (
                <OfferDeltaTable
                  offer={offer}
                  offerPrice={offer.offerPrice}
                  officialPrice={offer.officialPrice}
                  offerYield={offer.offerYield}
                  officialYield={offer.officialYield}
                />
              ) : undefined}
            </Flex>
            <Flex gap={'sm'}>
              <BuyActionsWithPermit
                buyOffer={offer}
                groupClassName={classes.buyButtonGroup}
                buttonClassName={classes.buyButton}
              />
              <ShowOfferAction
                offer={offer}
                className={classes.showOfferButton}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
