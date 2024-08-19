import React, {
  FC,
  ReactNode,
  use,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { createStyles, em } from '@mantine/core';
import {
  Card,
  Space,
  useMantineColorScheme,
  SimpleGrid,
  Stack,
  Group,
  Text,
  CloseButton,
} from '@mantine/core';
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

import { TransactionView } from '../components/TransactionListView';

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
  containerGrid: {
    width: calcRem(1000),
  },
  containerMobile: {
    width: '100%',
  },
}));

interface OfferContainerProps {
  offer: Offer;
  children: ReactNode;
  side?: ReactNode;
  action?: string;
  withSeparatedHeader?: boolean;
  onClose?: () => void;
  isSideOpen?: boolean;
  closeSide?: () => void;
  backArrow?: boolean;
}

export const OfferContainer: FC<OfferContainerProps> = ({
  offer,
  children,
  side,
  action,
  withSeparatedHeader = true,
  onClose,
  isSideOpen = false,
  closeSide,
  backArrow,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const isSizeMax = useMediaQuery(`(max-width: ${em(1050)})`);
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
      dispatch({ type: buyOfferClose.type, payload: offer });
    }
  }, [dispatch, offer, onClose]);

  return (
    <div className={classes.center}>
      <div
        className={cx(
          classes.container,
          isMobile || (!isSideOpen && isSizeMax)
            ? classes.containerMobile
            : isSideOpen
              ? classes.containerGrid
              : undefined,
        )}
      >
        <OfferTitle
          offer={offer}
          onClose={onCloseView}
          action={action}
          backArrow={backArrow}
        ></OfferTitle>
        <OfferView
          withSeparatedHeader={withSeparatedHeader}
          header={
            <OfferHeader
              image={backgroundImage}
              title={offerProperty?.location?.aera ?? ''}
              country={offerProperty ? offerProperty.location?.country : ''}
              energy={
                offerProperty ? (offerProperty.energy?.join(', ') ?? '') : ''
              }
              offerTokenAddress={offer.offerTokenAddress}
              offerTokenName={offer.offerTokenName}
              buyerTokenAddress={offer.buyerTokenAddress}
              buyerTokenName={offer.buyerTokenName}
              offerType={offer.type ?? OFFER_TYPE.SELL}
            ></OfferHeader>
          }
          sideChildren={side}
          isSideOpen={isSideOpen}
          closeSide={closeSide}
          isMobile={isMobile}
        >
          {children}
        </OfferView>
      </div>
    </div>
  );
};

interface OfferViewProps {
  withSeparatedHeader?: boolean;
  header: ReactNode;
  children: ReactNode;
  sideChildren?: ReactNode;
  isSideOpen?: boolean;
  closeSide?: () => void;
  isMobile?: boolean;
}

export const OfferView: FC<OfferViewProps> = ({
  withSeparatedHeader = true,
  header,
  children,
  sideChildren,
  isSideOpen = false,
  closeSide,
  isMobile = false,
}) => {
  const [sideOpen, setSideOpen] = useState<boolean>(
    isSideOpen && sideChildren !== undefined,
  );
  useEffect(() => {
    setSideOpen(isSideOpen && sideChildren !== undefined);
  }, [isSideOpen, sideChildren]);

  return (
    <>
      <SimpleGrid
        cols={isMobile || !sideOpen ? 1 : 2}
        breakpoints={[
          //{ maxWidth: '1000px', cols: 2 },
          { maxWidth: 1000, cols: 1 },
        ]}
      >
        <div>
          <OfferContent
            header={header}
            withSeparatedHeader={withSeparatedHeader}
          >
            {children}
          </OfferContent>
        </div>
        {sideOpen && (
          <Stack>
            <CloseButton
              aria-label={'Close side'}
              variant={'transparent'}
              iconSize={'lg'}
              onClick={closeSide}
            />
            {sideChildren}
          </Stack>
        )}
      </SimpleGrid>
    </>
  );
};

interface TransactionsDetailsProps {
  offerId: string;
  isMobile?: boolean;
  /* eslint-disable  */
  setOfferDetailEnabled?: any;
  /* eslint-enable  */
}

export const TransactionsDetails: FC<TransactionsDetailsProps> = ({
  offerId,
  isMobile = false,
  setOfferDetailEnabled,
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <>
      <Stack>
        {!isMobile && false && <div style={{ height: '130px' }}></div>}
        <div style={{ height: '100%' }}>
          <Card
            radius={'lg'}
            h={'100%'}
            mih={'500px'}
            style={{
              backgroundColor: colorScheme === 'light' ? '#FFFFFF' : undefined,
            }}
          >
            <Card.Section inheritPadding={true} p={'lg'}>
              <Group position={'apart'}>
                <Text weight={500} fz={'xl'}>
                  {'Transactions'}
                </Text>
                <CloseButton
                  aria-label={'Close transaction'}
                  variant={'transparent'}
                  iconSize={'xl'}
                  onClick={() => {
                    if (setOfferDetailEnabled) setOfferDetailEnabled(false);
                  }}
                />
              </Group>
            </Card.Section>
            <TransactionView offerId={offerId}></TransactionView>
          </Card>
        </div>
      </Stack>
    </>
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
