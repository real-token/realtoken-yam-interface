import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';

import {
  Affix,
  Card,
  Divider,
  Flex,
  Skeleton,
  Text,
  Transition,
} from '@mantine/core';
import { useAA } from '@real-token/aa-core';
import {
  IconError404,
  IconExclamationCircle,
  IconSettings,
} from '@tabler/icons';

import BigNumber from 'bignumber.js';

import { OfferText } from 'src/components/Offer/OfferText';
import { PropertyCard } from 'src/components/Offer/PropertyCard/PropertyCard';
import { useOffer } from 'src/hooks/offers/useOffer';
import { useOfferById } from 'src/hooks/offers/useOfferById';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { ConnectedProvider } from 'src/providers/ConnectProvider';
import { PropertiesToken } from 'src/types';
import { Offer } from 'src/types/offer/Offer';

import { BuyActionsWithPermit } from '../../src/components/Market/BuyActions';
import { DeleteActions } from '../../src/components/Market/DeleteActions';
import { UpdateActionsWithPermit } from '../../src/components/Market/UpdateActions';
import classes from './Offer.module.css';

const ShowOfferPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const offerId: number = parseInt(id as string);

  const { walletAddress: account } = useAA();
  // Essayer d'abord RPC direct (fonctionne même si TheGraph est down)
  const {
    offer: offerRPC,
    isLoading: isLoadingRPC,
    isError: isErrorRPC,
  } = useOfferById(offerId);

  // Fallback vers TheGraph si RPC échoue ou n'est pas disponible
  const {
    offer: offerGraph,
    isLoading: isLoadingGraph,
    hasError: hasErrorGraph,
  } = useOffer(offerId);

  // Utiliser RPC en priorité si disponible, sinon fallback vers GraphQL
  // offerRPC est Partial<Offer>, offerGraph est Offer | undefined
  const offer: Offer | undefined =
    offerRPC && Object.keys(offerRPC).length > 0
      ? (offerRPC as Offer)
      : offerGraph;
  const isLoading = isLoadingRPC || (isErrorRPC && isLoadingGraph);
  const hasError = isErrorRPC && hasErrorGraph;

  const isAccountOffer: boolean = useMemo(() => {
    if (!offer || !account) return false;
    return offer.sellerAddress == account.toLowerCase();
  }, [offer, account]);

  const { t } = useTranslation('modals', { keyPrefix: 'buy' });

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

  return (
    <ConnectedProvider>
      <Flex
        direction={'column'}
        my={'xl'}
        h={offer == undefined ? '100%' : 'unset'}
      >
        {isLoading || offer !== undefined ? (
          <Flex gap={'md'}>
            <Flex className={classes.container} direction={'column'} gap={'md'}>
              <Affix position={{ bottom: 80, right: 20 }}>
                <Transition
                  transition={'slide-up'}
                  mounted={isAccountOffer && offer !== undefined}
                >
                  {(transitionStyles) => (
                    <Card
                      withBorder={true}
                      shadow={'sm'}
                      radius={'md'}
                      style={transitionStyles}
                    >
                      <Card.Section
                        withBorder={true}
                        inheritPadding={true}
                        p={'xs'}
                      >
                        <Flex align={'center'} gap={'xs'}>
                          <IconSettings size={18} />
                          <Text>{'Actions'}</Text>
                        </Flex>
                      </Card.Section>
                      <Card.Section inheritPadding={true} mt={'sm'} pb={'md'}>
                        <Flex gap={'md'}>
                          {offer ? (
                            <>
                              <UpdateActionsWithPermit updateOffer={offer} />
                              <DeleteActions deleteOffer={offer} />
                            </>
                          ) : undefined}
                        </Flex>
                      </Card.Section>
                    </Card>
                  )}
                </Transition>
              </Affix>
              <div className={classes.offerId}>{offerId}</div>
              <Flex direction={'column'} gap={'md'}>
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
                  <Text fw={700}>{'Price'}</Text>
                  {offer?.offerTokenName &&
                  offer.buyerTokenName &&
                  offer?.price ? (
                    <Text>{`1 "${offer?.offerTokenName}" = ${offer?.price} "${offer.buyerTokenName}"`}</Text>
                  ) : (
                    <Skeleton height={25} width={400} />
                  )}
                  {offer?.offerTokenName &&
                  offer.buyerTokenName &&
                  offer?.price ? (
                    <Text>{`1 "${offer.buyerTokenName}" = ${new BigNumber(1)
                      .dividedBy(offer?.price)
                      .toFixed(5)} ${offer?.offerTokenName}`}</Text>
                  ) : (
                    <Skeleton height={25} width={400} />
                  )}
                </Flex>
              </Flex>
              <Divider />
              <BuyActionsWithPermit
                buyOffer={offer}
                loading={isLoading}
                buttonClassName={classes.buyButton}
              />
            </Flex>
            <Flex direction={'column'} gap={'md'} align={'center'} w={'100%'}>
              {propertyTokens && offer && propertyTokens.length > 0
                ? propertyTokens.map((token) => (
                    <PropertyCard
                      key={token.contractAddress}
                      propertyToken={token}
                      offer={offer}
                    />
                  ))
                : undefined}
            </Flex>
          </Flex>
        ) : (
          <Flex
            h={'100%'}
            w={'100%'}
            justify={'center'}
            align={'center'}
            direction={'column'}
          >
            {hasError ? (
              <>
                <IconExclamationCircle size={'200px'} color={'#AE740A'} />
                <Text size={'xl'}>
                  {'An error hapenned while loading offer'}
                </Text>
              </>
            ) : (
              <>
                <IconError404 size={'200px'} color={'#AE740A'} />
                <Text size={'xl'}>{"Offer don't exists"}</Text>
              </>
            )}
          </Flex>
        )}
      </Flex>
    </ConnectedProvider>
  );
};

export default ShowOfferPage;
