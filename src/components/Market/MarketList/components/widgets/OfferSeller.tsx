import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Group, Skeleton, Stack, Text } from '@mantine/core';

import { OfferData } from '../../Types';
import { truncateInMiddle } from '../../Utils';

interface OfferSellerProps {
  offer: OfferData;
  label: string;
  isLarge: boolean;
  textAlignRight: boolean;
}
export const OfferSeller: FC<OfferSellerProps> = ({
  offer,
  label,
  isLarge,
  textAlignRight,
}) => {
  const { t: t2 } = useTranslation('list');
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
          <Text fz={'md'} ta={isLarge ? 'right' : 'left'}>
            {t2(offer.requesterName)}
          </Text>
          <Text
            fz={isLarge ? 'xs' : 'xs'}
            color={'dimmed'}
            ta={isLarge ? 'right' : 'left'}
          >
            {truncateInMiddle(offer.requesterAddress)}
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
