import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Divider,
  Flex,
  Group,
  Skeleton,
  Text,
  createStyles,
} from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { IconShoppingCart } from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import BigNumber from 'bignumber.js';

import { OfferText } from 'src/components/Offer/OfferText';
import { TextUrl } from 'src/components/TextUrl/TextUrl';
import { useOffer } from 'src/hooks/offers/useOffer';
import { useRefreshOffers } from 'src/hooks/offers/useRefreshOffers';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { useContextModals } from 'src/hooks/useModals';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { buyOfferOpen } from 'src/store/features/buyOffer/buyOfferSlice';
import { PropertiesToken } from 'src/types';
import { Offer } from 'src/types/offer';

const useStyle = createStyles((theme) => ({
  container: {
    alignItems: 'start',
  },
  title: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[8],
    fontWeight: 'bold',
  },

  propertyInfosContainer: {
    display: 'flex',
    borderStyle: 'solid',
    borderWidth: '3px',
    borderColor: theme.colors.brand,
    borderRadius: theme.radius.md,
    padding: theme.radius.lg,
    gap: theme.spacing.md,
  },
  offerId: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.brand,
    borderRadius: theme.radius.md,
    height: '40px',
    padding: `0 ${10}px`,
    color: 'black',
    fontWeight: 700,
    fontSize: theme.fontSizes.xl,
  },
  buyButton: {
    width: '125px',
    height: '50px',
  },
  propertyNameContainer: {
    display: 'flex',
    justifyContent: 'start',
    marginBottom: theme.spacing.sm,
  },
  propertyName: {
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
    borderBottomColor: 'transparent',
    '&:hover': {
      borderBottomColor: theme.colors.brand,
      cursor: 'pointer',
    },
  },
  textHeader: {
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
  textValue: {
    fontWeight: 600,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? undefined : theme.colors.gray[8],
  },
}));

type OfferModalProps = {
  offerId: number;
};

export const OfferModal: FC<ContextModalProps<OfferModalProps>> = ({
  context,
  id,
  innerProps: { offerId },
}) => {
  const { classes } = useStyle();
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const { offer, isLoading } = useOffer(offerId);

  const { refreshOffers } = useRefreshOffers(false);

  const { t } = useTranslation('modals', { keyPrefix: 'buy' });
  const { t: t2 } = useTranslation('modals');

  const modals = useContextModals(); // useModals();

  const [propertyTokens, setPropertyTokens] = useState<PropertiesToken[]>([]);
  const { getPropertyToken, propertiesIsloading } = usePropertiesToken();

  useEffect(() => {
    if (!offer || propertiesIsloading || propertyTokens.length > 0)
      return undefined;

    if (offer.buyerTokenType == 1) {
      const token = getPropertyToken(offer.buyerTokenAddress);
      if (token) setPropertyTokens((prev) => [...prev, token]);
    }

    if (offer.offerTokenType == 1) {
      const token = getPropertyToken(offer.offerTokenAddress);
      if (token) setPropertyTokens((prev) => [...prev, token]);
    }
  }, [getPropertyToken, offer, propertiesIsloading, propertyTokens.length]);

  const onOpenWalletModal = useCallback(() => {
    modals.openWalletModal();
  }, [modals]);

  const isAccountOffer: boolean = useMemo(() => {
    if (!offer || !account) return false;
    return offer.sellerAddress == account.toLowerCase();
  }, [offer, account]);

  const onOpenBuyModal = useCallback(
    (offer: Offer) => {
      dispatch({ type: buyOfferOpen, payload: offer });
      context.closeModal(id);
      //modals.openBuyModal(offer, refreshOffers);
    },
    [modals, refreshOffers]
  );

  const onClose = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  return (
    <>
      {isLoading || offer !== undefined ? (
        <Flex className={classes.container} direction={'column'} gap={'md'}>
          {/* <div className={classes.offerId}>{offerId}</div> */}
          <Flex direction={'column'} gap={'md'}>
            <div className={classes.title}>
              <TextUrl url={propertyTokens[0]?.marketplaceLink}>
                {propertyTokens[0]?.fullName}
              </TextUrl>
            </div>

            <OfferText
              title={t('offerTokenName')}
              value={offer?.offerTokenName}
            />
            <OfferText
              title={t('buyerTokenName')}
              value={offer?.buyerTokenName}
            />
            <OfferText
              title={t('sellerAddress')}
              value={offer?.sellerAddress}
            />
            <OfferText title={t('amount')} value={offer?.amount} />
            <Flex direction={'column'} gap={3}>
              <Text className={classes.textHeader}>{'Price'}</Text>
              {offer?.offerTokenName && offer.buyerTokenName && offer?.price ? (
                <Text
                  className={classes.textValue}
                >{`1 "${offer?.offerTokenName}" = ${offer?.price} "${offer.buyerTokenName}"`}</Text>
              ) : (
                <Skeleton height={25} width={400} />
              )}
              {offer?.offerTokenName && offer.buyerTokenName && offer?.price ? (
                <Text className={classes.textValue}>{`1 "${
                  offer.buyerTokenName
                }" = ${new BigNumber(1).dividedBy(offer?.price).toFixed(5)} ${
                  offer?.offerTokenName
                }`}</Text>
              ) : (
                <Skeleton height={25} width={400} />
              )}
            </Flex>
          </Flex>
          <Divider />

          <Group position={'center'}>
            <ActionIcon
              color={'red'}
              disabled={isAccountOffer}
              className={classes.buyButton}
              onClick={onClose}
            >
              {t2('offer.close')}
            </ActionIcon>
            <ActionIcon
              color={'green'}
              disabled={isAccountOffer}
              className={classes.buyButton}
              onClick={() =>
                account && offer ? onOpenBuyModal(offer) : onOpenWalletModal()
              }
            >
              {isAccountOffer ? (
                <Text fz={'sm'} align={'center'} p={6}>
                  {'Cannot buy your own offer'}
                </Text>
              ) : (
                <IconShoppingCart size={24} aria-label={'Buy'} />
              )}
            </ActionIcon>
          </Group>
          {/*  <Flex direction={'column'} gap={'md'} align={'center'}>
            {propertyTokens && offer && propertyTokens.length > 0
              ? propertyTokens.map((token) => (
                  <PropertyCard
                    key={token.contractAddress}
                    propertyToken={token}
                    offer={offer}
                  />
                ))
              : undefined}
          </Flex> */}
        </Flex>
      ) : (
        <div>{"Offer doesn't exist :/"}</div>
      )}
    </>
  );
};
