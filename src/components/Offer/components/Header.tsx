import { FC } from 'react';

import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Space,
  Stack,
  Text,
  Title,
  em,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowLeft } from '@tabler/icons';

import { useAllowedTokens } from 'src/hooks/useAllowedTokens';
import { useOfferType } from 'src/hooks/useOfferType';
import { OFFER_TYPE, Offer } from 'src/types/offer';

import { TokenExchangeElement } from './TokenExchangeElement';

interface OfferTitleProps {
  offer: Offer;
  action?: string;
  onClose: () => void;
  backArrow?: boolean;
}

export const OfferTitle: FC<OfferTitleProps> = ({
  offer,
  action,
  onClose,
  backArrow = true,
}) => {
  const { getI18OfferTypeName } = useOfferType();

  return (
    <>
      <>
        {backArrow && (
          <ActionIcon
            variant={'transparent'}
            size={'lg'}
            color={'dark'}
            onClick={onClose}
          >
            <IconArrowLeft size={'50px'}></IconArrowLeft>
          </ActionIcon>
        )}
        <Space h={5}></Space>
        <Title>
          {action
            ? action
            : getI18OfferTypeName(offer.type ?? OFFER_TYPE.SELL) +
              ' #' +
              offer.offerId}
        </Title>
        {action && (
          <Text color={'dimmed'}>
            {'Offre ' +
              getI18OfferTypeName(
                offer.type ?? OFFER_TYPE.SELL,
              )?.toLowerCase() +
              ' #' +
              offer.offerId}
          </Text>
        )}
        <Space h={'xl'}></Space>
      </>
    </>
  );
};

interface OfferHeaderProps {
  title: string;
  country: string;
  energy: string;
  image: string;
  offerTokenAddress: string;
  offerTokenName: string;
  buyerTokenAddress: string;
  buyerTokenName: string;
  offerType?: OFFER_TYPE;
}

export const OfferHeader: FC<OfferHeaderProps> = ({
  title,
  image,
  country,
  energy,
  offerTokenAddress,
  offerTokenName,
  buyerTokenAddress,
  buyerTokenName,
  offerType = OFFER_TYPE.SELL,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { allowedTokens } = useAllowedTokens();
  const allowedTokenOffer = allowedTokens
    ? allowedTokens.find(
        (t) =>
          t.contractAddress.toLowerCase() === offerTokenAddress.toLowerCase(),
      )
    : undefined;

  const allowedTokenBuy = allowedTokens
    ? allowedTokens.find(
        (t) =>
          t.contractAddress.toLowerCase() === buyerTokenAddress.toLowerCase(),
      )
    : undefined;

  const displaySite = offerType !== OFFER_TYPE.EXCHANGE;

  return (
    <Box sx={{ marginBottom: '0px' }}>
      {displaySite && (
        <Group position={'apart'}>
          <Stack justify={'flex-start'} spacing={0}>
            <Text
              fz={isMobile ? 'lg' : 24}
              fw={500}
              sx={{ marginBottom: '-5px' }}
            >
              {title}
            </Text>
            <Text
              fz={isMobile ? 'sm' : 'md'}
              fw={500}
              sx={{ marginBottom: '-5px' }}
            >
              {country}
            </Text>
            <Text fz={isMobile ? 'xs' : 'sm'} color={'dimmed'}>
              {energy}
            </Text>
          </Stack>
          <Avatar
            src={image}
            alt={"it's me"}
            radius={50}
            sx={{ marginTop: '5px', width: '50px', height: '50px' }}
          ></Avatar>
        </Group>
      )}

      {!displaySite && (
        <Group position={'center'}>
          <TokenExchangeElement
            token1={allowedTokenOffer?.symbol ?? offerTokenName}
            token2={allowedTokenBuy?.symbol ?? buyerTokenName}
            LogoToken1={allowedTokenOffer?.logo}
            LogoToken2={allowedTokenBuy?.logo}
            minWidth={false}
            marginTop={'0px'}
          ></TokenExchangeElement>
        </Group>
      )}
    </Box>
  );
};
