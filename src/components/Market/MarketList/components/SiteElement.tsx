import React, { FC } from 'react';

import {
  Avatar,
  Badge,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { formatUsd } from 'src/utils/format';

import { OfferData } from '../Types';

interface SiteElementProps {
  offer: OfferData;
}
export const SiteElement: FC<SiteElementProps> = ({ offer }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const isSell = offer.sites.transfered.name !== '';
  const isBuy = offer.sites.requested.name !== '';

  const isCsmExchange = isSell && isBuy;
  const minWidth = isSell && isBuy ? 310 : 200;

  return (
    <Stack spacing={1}>
      <Group
        position={isCsmExchange ? 'left' : 'center'}
        miw={minWidth}
        sx={{ marginBottom: '3px' }}
      >
        {<Group position={'left'} miw={isCsmExchange ? 130 : 0}></Group>}
        {isSell && (
          <Group position={'left'} miw={65} spacing={2}>
            <Avatar
              src={offer.sites.transfered.image}
              alt={offer.id}
              radius={'xl'}
              size={25}
            />
            <Text fz={isCsmExchange ? 'xs' : 'sm'} fw={500}>
              {isCsmExchange
                ? offer.sites.transfered.shortName.replace('CSM-', '')
                : offer.sites.transfered.name}
            </Text>
          </Group>
        )}
        {isBuy && (
          <Group position={'left'} miw={65} spacing={2}>
            <Avatar
              src={offer.sites.requested.image}
              alt={offer.id}
              radius={'xl'}
              size={25}
            />
            <Text fz={isCsmExchange ? 'xs' : 'sm'} fw={500}>
              {isCsmExchange
                ? offer.sites.requested.shortName.replace('CSM-', '')
                : offer.sites.requested.name}
            </Text>
          </Group>
        )}
      </Group>
      <Badge
        variant={'light'}
        color={'lime'}
        radius={'sm'}
        miw={minWidth}
        style={{
          backgroundColor:
            theme.colorScheme === 'dark'
              ? `${theme.colors.brand[5]}0F`
              : `${theme.colors.brand[5]}0F`,
          color:
            theme.colorScheme === 'dark'
              ? `${theme.colors.brand[5]}`
              : `${theme.colors.brand[5]}`,
        }}
      >
        <Group position={'apart'}>
          <Text miw={120}>{'initial price'}</Text>
          {isSell && (
            <Text miw={65}>
              {formatUsd(offer.sites.transfered.tokenOfficialPrice)}
            </Text>
          )}
          {isBuy && (
            <Text miw={65}>
              {formatUsd(offer.sites.requested.tokenOfficialPrice)}
            </Text>
          )}
        </Group>
      </Badge>
      <Badge
        variant={'light'}
        color={'dark'}
        radius={'sm'}
        miw={minWidth}
        style={{
          backgroundColor:
            theme.colorScheme === 'dark'
              ? `${theme.colors.blue[2]}0F`
              : `${theme.colors.dark[7]}0F`,
          color:
            theme.colorScheme === 'dark'
              ? `${theme.colors.blue[2]}`
              : `${theme.colors.gray[6]}`,
        }}
      >
        <Group position={'apart'}>
          <Text miw={120}>{'initial date'}</Text>
          {isSell && (
            <Text miw={65}>{offer.sites.transfered.tokenSellDate}</Text>
          )}
          {isBuy && <Text miw={65}>{offer.sites.requested.tokenSellDate}</Text>}
        </Group>
      </Badge>
      <Badge
        variant={'light'}
        color={'yellow'}
        radius={'sm'}
        miw={minWidth}
        style={{
          backgroundColor:
            theme.colorScheme === 'dark'
              ? `${theme.colors.blue[2]}0F`
              : `${theme.colors.dark[7]}0F`,
          color:
            theme.colorScheme === 'dark'
              ? `${theme.colors.blue[2]}`
              : `${theme.colors.gray[6]}`,
        }}
      >
        <Group position={'apart'}>
          <Text miw={120}>{'elec. Price per kWh'}</Text>
          {isSell && (
            <Text miw={65}>
              {formatUsd(offer.sites.transfered.electricityPrice, 4)}
            </Text>
          )}
          {isBuy && (
            <Text miw={65}>
              {formatUsd(offer.sites.requested.electricityPrice, 4)}
            </Text>
          )}
        </Group>
      </Badge>
    </Stack>
  );
};
