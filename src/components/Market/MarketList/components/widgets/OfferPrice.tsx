import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Group, Skeleton, Stack, Text, Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

import { BigNumber } from 'bignumber.js';

import { useAppSelector } from 'src/hooks/react-hooks';
import { selectPrices } from 'src/store/features/interface/interfaceSelector';
import { OFFER_TYPE } from 'src/types/offer/OfferType';
import { Price } from 'src/types/price';
import { formatPercent, formatUsd } from 'src/utils/format';

import { OfferData } from '../../Types';

interface OfferPriceProps {
  offer: OfferData;
  label: string;
  isLarge: boolean;
  textAlignRight: boolean;
}
export const OfferPrice: FC<OfferPriceProps> = ({
  offer,
  label,
  isLarge,
  textAlignRight,
}) => {
  const { t } = useTranslation('list');
  const prices: Price = useAppSelector(selectPrices);
  const priceDelta = calculatePriceDelta(offer, prices);

  const priceDeltaColor =
    priceDelta === 0
      ? 'dimmed'
      : (priceDelta < 0 && offer.type === OFFER_TYPE.BUY) ||
          (priceDelta > 0 && offer.type !== OFFER_TYPE.BUY)
        ? 'red'
        : 'teal';

  return (
    <Stack
      h={'100%'}
      align={'stretch'}
      justify={isLarge ? 'center' : 'flex-start'}
      spacing={0}
    >
      {!isLarge && (
        <Text fz={'md'} ta={'left'} color={'dimmed'}>
          {label}
        </Text>
      )}
      {offer.id !== '' ? (
        <div>
          <Text
            fz={isLarge ? 'md' : 'md'}
            ta={isLarge ? 'right' : 'left'}
            fw={500}
          >
            {formatUsd(offer.requestedPrice ?? offer.initialSellingPrice ?? 0)}
          </Text>
          <Tooltip
            label={
              t('initialPrice') +
              ' ' +
              formatUsd(offer.initialSellingPrice ?? 0)
            }
          >
            <Group position={isLarge ? 'right' : 'left'} spacing={2}>
              <IconInfoCircle size={14} />
              <Text
                fz={isLarge ? 'xs' : 'xs'}
                color={'dimmed'}
                ta={isLarge ? 'right' : 'left'}
              >
                {formatUsd(offer.initialSellingPrice ?? 0)}
                {/* {(priceDelta > 0 ? '+' : '') + formatPercent(priceDelta)} */}
              </Text>
            </Group>
          </Tooltip>
        </div>
      ) : (
        <Group position={isLarge ? 'right' : 'left'}>
          {' '}
          <Skeleton height={12} radius={'xl'} width={100} />
        </Group>
      )}
    </Stack>
  );
};

function calculatePriceDelta(offer: OfferData, prices: Price) {
  let priceDelta = offer.priceDelta;

  if (!priceDelta) {
    if (offer.initialSellingPrice) {
      const usdInitPerTokenForSale = new BigNumber(
        offer.sites.transfered.tokenOfficialPrice,
      );
      const usdInitPerTokenBuyWith = new BigNumber(
        offer.sites.requested.tokenOfficialPrice,
      );

      const numberOfTokenForSalePerTokenBuyWith = new BigNumber(1).dividedBy(
        offer.requestedRate,
      );

      const usdPerTokenForSale = usdInitPerTokenBuyWith.dividedBy(
        numberOfTokenForSalePerTokenBuyWith,
      );

      const usdDeltaPerTokenForSale = usdPerTokenForSale.minus(
        usdInitPerTokenForSale,
      );

      priceDelta = usdDeltaPerTokenForSale
        .dividedBy(usdInitPerTokenForSale)
        .toNumber();
    } else {
      const p1 = new BigNumber(
        prices[offer.requestedTokenAddress.toLowerCase()],
      );

      const p2 = new BigNumber(
        prices[offer.transferedTokenAddress.toLowerCase()],
      );

      priceDelta = p2
        .times(offer.requestedPrice)
        .minus(p1)
        .dividedBy(p2)
        .toNumber();
    }
  }

  return priceDelta;
}
