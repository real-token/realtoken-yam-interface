import React, { FC } from 'react';

import { Avatar, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { formatUsd } from 'src/utils/format';

import { OfferData } from '../Types';

const WIDTH_COL1 = 115;
const WIDTH_COL2 = 72;

interface SiteElementProps {
  offer: OfferData;
}
export const SiteElement: FC<SiteElementProps> = ({ offer }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: 384px`);
  const isSell = offer.sites.transfered.name !== '';
  const isBuy = offer.sites.requested.name !== '';

  const isCsmExchange = isSell && isBuy;
  const minWidth = isSell && isBuy ? 300 : 230;

  return (
    <Stack spacing={1} sx={{ marginLeft: isMobile ? '-16px' : undefined }}>
      <Group
        position={isCsmExchange ? 'left' : 'left'}
        miw={minWidth}
        sx={{ marginBottom: '3px', marginLeft: isCsmExchange ? 0 : '10px' }}
      >
        {isCsmExchange && (
          <Group position={'left'} miw={isCsmExchange ? WIDTH_COL1 : 0}></Group>
        )}
        {isSell && (
          <Group
            position={'left'}
            miw={WIDTH_COL2}
            spacing={isCsmExchange ? 2 : 10}
          >
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
          <Group
            position={'left'}
            miw={WIDTH_COL2}
            spacing={isCsmExchange ? 2 : 10}
          >
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
      <div
        style={{
          padding: '0 10px 0 10px',
          fontSize: '11px',
          fontWeight: 700,
          minWidth: minWidth,
          borderRadius: '4px',
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
        <Group position={'apart'} spacing={0}>
          <Text tt={'uppercase'} w={WIDTH_COL1}>
            {'initial price'}
          </Text>
          {isSell && (
            <Text tt={'uppercase'} miw={WIDTH_COL2}>
              {formatUsd(offer.sites.transfered.tokenOfficialPrice)}
            </Text>
          )}
          {isBuy && (
            <Text tt={'uppercase'} miw={WIDTH_COL2}>
              {formatUsd(offer.sites.requested.tokenOfficialPrice)}
            </Text>
          )}
        </Group>
      </div>
      <div
        style={{
          padding: '0 10px 0 10px',
          fontSize: '11px',
          fontWeight: 700,
          minWidth: minWidth,
          borderRadius: '4px',
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
        <Group position={'apart'} spacing={0}>
          <Text tt={'uppercase'} w={WIDTH_COL1}>
            {'initial date'}
          </Text>
          {isSell && (
            <Text tt={'uppercase'} miw={WIDTH_COL2}>
              {offer.sites.transfered.tokenSellDate}
            </Text>
          )}
          {isBuy && (
            <Text tt={'uppercase'} miw={WIDTH_COL2}>
              {offer.sites.requested.tokenSellDate}
            </Text>
          )}
        </Group>
      </div>
      <div
        style={{
          padding: '0 10px 0 10px',
          fontSize: '11px',
          fontWeight: 700,
          minWidth: minWidth,
          borderRadius: '4px',
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
        <Group position={'apart'} spacing={0}>
          <Text tt={'uppercase'} w={WIDTH_COL1}>
            {'elec. Price per kWh'}
          </Text>
          {isSell && (
            <Text tt={'uppercase'} miw={WIDTH_COL2}>
              {formatUsd(offer.sites.transfered.electricityPrice, 4)}
            </Text>
          )}
          {isBuy && (
            <Text tt={'uppercase'} miw={WIDTH_COL2}>
              {formatUsd(offer.sites.requested.electricityPrice, 4)}
            </Text>
          )}
        </Group>
      </div>
    </Stack>
  );
};
