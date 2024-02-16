import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';

import { createStyles, em } from '@mantine/core';
import { Card, Space, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { getOfferPropertyAddress } from 'src/components/Offer/Utils';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { usePropertiesToken } from 'src/hooks/usePropertiesToken';
import { buyOfferClose } from 'src/store/features/buyOffer/buyOfferSlice';
import { fetchProperties } from 'src/store/features/interface/interfaceSlice';
import { OFFER_TYPE, Offer } from 'src/types/offer';
import { calcRem } from 'src/utils/style';
import { selectedOfferAtom } from 'src/states';
import { OfferHeader, OfferTitle } from './Header';
import { useAtom } from 'jotai';

const useStyle = createStyles((theme) => ({
  center: {
    justifyContent: 'left',
    alignItems: 'left',
    textAlign: 'center',
  },
  container: {
    fontSize: theme.fontSizes.sm,
    display: 'inline-block',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'start',
    width: calcRem(500),
  },
  containerMobile: {
    width: '100%',
  },
}));

interface OfferContainerProps {
  offer: Offer;
  children: ReactNode;
  action?: string;
  withSeparatedHeader?: boolean;
  onClose?: () => void;
}

export const OfferContainer: FC<OfferContainerProps> = ({
  offer,
  children,
  action,
  withSeparatedHeader = true,
  onClose,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { classes, cx } = useStyle();
  const dispatch = useAppDispatch();
  const { getPropertyToken, propertiesIsloading } = usePropertiesToken();
  const offerProperty = getPropertyToken(getOfferPropertyAddress(offer));
  const [backgroundImage, setBackgroundImage] = useState<string>(
    offerProperty ? offerProperty.imageLink[0] : '',
  );
  if (offerProperty?.location === undefined) {
    dispatch(fetchProperties());
  }
  const [, setOfferSelected] = useAtom(selectedOfferAtom);

  useEffect(() => {
    if (!offer || propertiesIsloading) return;

    if (offer.buyerTokenType === 1) {
      const offerProperty = getPropertyToken(offer.buyerTokenAddress);
      if (offerProperty) {
        setBackgroundImage(offerProperty.imageLink[0]);
      }
    }

    if (offer.offerTokenType === 1) {
      const offerProperty = getPropertyToken(offer.offerTokenAddress);
      if (offerProperty) {
        setBackgroundImage(offerProperty.imageLink[0]);
      }
    }
  }, [getPropertyToken, offer, propertiesIsloading]);

  const onCloseView = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setOfferSelected('');
      dispatch({ type: buyOfferClose, payload: offer });
    }
  }, [dispatch, offer, onClose]);

  return (
    <div className={classes.center}>
      <div
        className={cx(
          classes.container,
          isMobile ? classes.containerMobile : undefined,
        )}
      >
        <OfferTitle
          offer={offer}
          onClose={onCloseView}
          action={action}
        ></OfferTitle>
        <OfferContent
          withSeparatedHeader={withSeparatedHeader}
          header={
            <OfferHeader
              image={backgroundImage}
              title={offerProperty?.location?.aera ?? ''}
              country={offerProperty ? offerProperty.location?.country : ''}
              energy={
                offerProperty ? offerProperty.energy?.join(', ') ?? '' : ''
              }
              offerTokenAddress={offer.offerTokenAddress}
              offerTokenName={offer.offerTokenName}
              buyerTokenAddress={offer.buyerTokenAddress}
              buyerTokenName={offer.buyerTokenName}
              offerType={offer.type ?? OFFER_TYPE.SELL}
            ></OfferHeader>
          }
        >
          {children}
        </OfferContent>
      </div>
    </div>
  );
};

interface OfferContentProps {
  withSeparatedHeader?: boolean;
  header: ReactNode;
  children: ReactNode;
}

export const OfferContent: FC<OfferContentProps> = ({
  withSeparatedHeader = true,
  header,
  children,
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <>
      {withSeparatedHeader && (
        <>
          <Card
            radius={'lg'}
            style={{
              backgroundColor: colorScheme === 'light' ? '#FFFFFF' : undefined,
            }}
          >
            {header}
          </Card>
          <Space h={'md'}></Space>
        </>
      )}
      <Card
        radius={'lg'}
        style={{
          backgroundColor: colorScheme === 'light' ? '#FFFFFF' : undefined,
        }}
      >
        {!withSeparatedHeader && (
          <>
            {header}
            <Space h={'md'}></Space>
          </>
        )}
        {children}
      </Card>
    </>
  );
};
