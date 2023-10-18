import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Badge,
  Flex,
  Group,
  Skeleton,
  Text,
  createStyles,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

import { OfferTypeBadge } from 'src/components/Offer/components/OfferTypeBadge';
import { OfferDeltaTable } from 'src/components/Table/OfferDeltaTable/OfferDeltaTable';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { PropertiesToken } from 'src/types';
import { OFFER_TYPE } from 'src/types/offer';
import { Offer } from 'src/types/offer/Offer';

import { BuyActionsWithPermit } from '../BuyActions';
import { ShowOfferAction } from '../ShowOfferAction/ShowOfferAction';

//box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; theme.colors.gray[5]
//box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;;
const useStyle = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    height: '100%',
    boxShadow:
      theme.colorScheme === 'dark'
        ? `2px 7px 12px 2px  ${theme.colors.dark[8]}`
        : `0px 7px 16px 0px ${theme.colors.gray[6]}`,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
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
    //fontSize: theme.fontSizes.lg,
    //fontWeight: 700,
  },
  buyerTokenName: {
    fontStyle: 'italic',
    fontWeight: 500,
    marginTop: '10px',
    //color: theme.colors.gray[3],
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
    padding: `4px 6px 4px 4px`,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.green[9],
    fontSize: theme.fontSizes.md,
    fontWeight: 700,
    color: 'white',
    maxHeight: '30px',
  },
}));

interface GridPaneProps {
  offer: Offer;
}
export const GridPane: FC<GridPaneProps> = ({ offer }) => {
  const { t } = useTranslation('buy', { keyPrefix: 'table' });
  const { classes } = useStyle();
  const colorScheme = useColorScheme();

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
            <Group
              position={'apart'}
              sx={{ width: '100%', alignItems: 'center' }}
            >
              <OfferTypeBadge
                offerType={offer.type ?? OFFER_TYPE.SELL}
                sx={{ fontSize: '16px', maxHeight: '30px', padding: `10px` }}
              />

              <Badge color={'gray'} size={'md'} variant={'filled'}>
                {offer.buyerTokenName}
              </Badge>
            </Group>
            <Badge
              color={'dark'}
              size={'xs'}
              variant={colorScheme === 'dark' ? 'outline' : 'transparent'}
              sx={{ marginTop: '3px' }}
            >
              {'n° ' + offer.offerId}
            </Badge>
            <Badge
              color={'green'}
              variant={'filled'}
              size={'md'}
              radius={'md'}
              sx={{ marginTop: '10px' }}
            >
              {'$ ' + offer.offerTokenName + ' $'}
            </Badge>
          </Flex>
          <Flex
            direction={'column'}
            p={'sm'}
            gap={'sm'}
            className={classes.content}
          >
            <Flex direction={'column'} mb={10} className={classes.data}>
              <Flex direction={'column'} fz={'sm'} sx={{ marginBottom: '6px' }}>
                <Text fz={'sm'}>{t('sellerName')}</Text>
                <Text fw={700} fz={'sm'} truncate={true}>
                  {t(offer.sellerName)}
                </Text>
              </Flex>
              <Flex direction={'column'} fz={'sm'} sx={{ marginBottom: '6px' }}>
                <Text fz={'sm'}>{t('sellerAddress')}</Text>
                <Text fw={700} fz={'sm'} truncate={true}>
                  {offer.sellerAddress}
                </Text>
              </Flex>
              <Flex direction={'column'} fz={'sm'} sx={{ marginBottom: '6px' }}>
                <Text fz={'sm'}>{t('amount')}</Text>
                <Text fw={700} fz={'sm'}>
                  {offer.amount}
                </Text>
              </Flex>
              <Flex direction={'column'} mb={15} fz={'sm'}>
                <Text fz={'sm'}>{t('price')}</Text>
                <Text fw={700} fz={'sm'}>
                  {offer.price}
                </Text>
              </Flex>
              {offer.type !== OFFER_TYPE.EXCHANGE ? (
                <OfferDeltaTable
                  offer={offer}
                  offerPrice={offer.offerPrice}
                  officialPrice={offer.officialPrice}
                  offerYield={offer.offerYield}
                  officialYield={
                    offer.officialYield ? offer.officialYield : undefined
                  }
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
