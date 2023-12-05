import React, { FC } from 'react';

import { Group, Skeleton, Stack, Text } from '@mantine/core';

import { formatTimestampDay, formatTimestampHour } from 'src/utils/format';

import { OfferData } from '../../Types';

interface OfferDateProps {
  offer: OfferData;
  label: string;
  isLarge: boolean;
  textAlignRight: boolean;
}
export const OfferDate: FC<OfferDateProps> = ({
  offer,
  label,
  isLarge,
  textAlignRight,
}) => {
  return (
    <Stack
      h={'100%'}
      align={'stretch'}
      justify={isLarge ? 'center' : 'flex-start'}
      spacing={0}
    >
      {!isLarge && (
        <Text fz={'md'} ta={textAlignRight ? 'right' : 'left'} color={'dimmed'}>
          {label}
        </Text>
      )}
      {offer.id !== '' ? (
        <div>
          <Text
            fz={'md'}
            ta={isLarge || textAlignRight ? 'right' : 'left'}
            fw={500}
          >
            {formatTimestampDay(offer.createdAt)}
          </Text>
          <Text
            fz={'xs'}
            color={'dimmed'}
            ta={isLarge || textAlignRight ? 'right' : 'left'}
          >
            {formatTimestampHour(offer.createdAt)}
          </Text>
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
