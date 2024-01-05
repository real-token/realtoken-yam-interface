import React, { FC } from 'react';

import {
  Group,
  Progress,
  RingProgress,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';

import { OFFER_TYPE } from 'src/types/offer';
import { formatPercent, formatToken, formatUsd } from 'src/utils/format';

import { OfferData } from '../../Types';

interface OfferAmountProps {
  offer: OfferData;
  label: string;
  isLarge: boolean;
  textAlignRight: boolean;
}
export const OfferAmount: FC<OfferAmountProps> = ({
  offer,
  label,
  isLarge,
  textAlignRight,
}) => {
  const offerTokenAmount =
    offer.type === OFFER_TYPE.BUY
      ? (offer.requestedAmount ?? 0) / offer.requestedPrice
      : offer.requestedAmount ?? 0;
  const offerTokenAmountInitial =
    offer.type === OFFER_TYPE.BUY
      ? (offer.initialAmount ?? 0) / offer.requestedPrice
      : offer.initialAmount ?? 0;

  return (
    <Stack
      h={'100%'}
      align={'stretch'}
      justify={offer.id === '' ? 'center' : isLarge ? 'flex-end' : 'flex-start'}
      spacing={0}
    >
      {!isLarge && (
        <Text fz={'md'} ta={textAlignRight ? 'right' : 'left'} color={'dimmed'}>
          {label}
        </Text>
      )}
      {!isLarge && (
        <>
          {offer.id !== '' ? (
            <div>
              <Group position={'right'}>
                <Text size={'xs'} align={'center'}>
                  {formatToken(offerTokenAmount) +
                    ' / ' +
                    formatToken(offerTokenAmountInitial)}
                </Text>
              </Group>
              <Progress
                color={'yellow'}
                value={(offerTokenAmount / offerTokenAmountInitial) * 100}
              />
              <Group position={'right'}>
                <Text size={'xs'} align={'center'}>
                  {formatPercent(offerTokenAmount / offerTokenAmountInitial)}
                </Text>
              </Group>
            </div>
          ) : (
            <Group position={'right'}>
              {' '}
              <Skeleton height={12} radius={'xl'} width={100} />
            </Group>
          )}
        </>
      )}

      {isLarge && (
        <Group w={'100%'} position={textAlignRight ? 'right' : 'left'}>
          {offer.id !== '' ? (
            <div>
              <RingProgress
                thickness={10}
                size={100}
                label={
                  <Text size={'xs'} align={'center'}>
                    {formatToken(offerTokenAmount) +
                      ' / ' +
                      formatToken(offerTokenAmountInitial)}
                  </Text>
                }
                sections={[
                  {
                    value: (offerTokenAmount / offerTokenAmountInitial) * 100,
                    color: 'yellow',
                  },
                ]}
              />
              <Text
                fz={isLarge ? 'xs' : 'xs'}
                color={'dimmed'}
                ta={isLarge || textAlignRight ? 'center' : 'left'}
                sx={{ marginTop: '-10px' }}
              >
                {formatUsd(offerTokenAmount * (offer.requestedPrice ?? 0))}
              </Text>
            </div>
          ) : (
            <Group position={isLarge ? 'right' : 'left'}>
              {' '}
              <Skeleton height={12} radius={'xl'} width={100} />
            </Group>
          )}
        </Group>
      )}
    </Stack>
  );
};
