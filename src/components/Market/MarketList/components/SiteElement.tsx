import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Avatar, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { SimpleTextUrl } from 'src/components/TextUrl/TextUrl';
import { usePropertyToken } from 'src/hooks/usePropertyToken';
import { formatUsd } from 'src/utils/format';

import { SPOT_ACCESS_KEY } from '../Constants';
import { OfferData } from '../Types';

const WIDTH_COL1 = 115;
const WIDTH_COL2 = 76;

interface SiteElementProps {
  offer: OfferData;
}
export const SiteElement: FC<SiteElementProps> = ({ offer }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: 384px`);
  const isSell = offer.sites.transfered.name !== '';
  const isBuy = offer.sites.requested.name !== '';
  const { t } = useTranslation('list');
  const isOnlyCsmExchange = isSell && isBuy;
  const isCSMTokenExchange = isSell || isBuy;
  const minWidth = isSell && isBuy ? 300 : 230;
  const { propertyToken: sellerPropertyToken } = usePropertyToken(
    offer.requestedTokenAddress
  );
  const { propertyToken: buyerPropertyToken } = usePropertyToken(
    offer.transferedTokenAddress
  );

  const elecSpotBuyer = buyerPropertyToken
    ? buyerPropertyToken.electricitySpotPriceUrl
    : undefined;

  const elecSpotSeller = buyerPropertyToken
    ? buyerPropertyToken.electricitySpotPriceUrl
    : undefined;

  return (
    <>
      {isCSMTokenExchange && (
        <Stack
          spacing={1}
          sx={{
            marginLeft: isMobile && isOnlyCsmExchange ? '-16px' : undefined,
          }}
        >
          <Group
            position={isMobile ? 'left' : 'left'}
            miw={minWidth}
            sx={{
              marginBottom: '3px',
              marginLeft: isOnlyCsmExchange ? 0 : '10px',
            }}
          >
            {isOnlyCsmExchange && (
              <Group
                position={'left'}
                miw={isOnlyCsmExchange ? WIDTH_COL1 : 0}
              ></Group>
            )}
            {isSell && (
              <Group
                position={'left'}
                miw={WIDTH_COL2}
                spacing={isOnlyCsmExchange ? 2 : 10}
              >
                <Avatar
                  src={offer.sites.transfered.image}
                  alt={offer.id}
                  radius={'xl'}
                  size={25}
                />
                <Text fz={isOnlyCsmExchange ? 'xs' : 'sm'} fw={500}>
                  {isOnlyCsmExchange
                    ? offer.sites.transfered.shortName.replace('CSM-', '')
                    : offer.sites.transfered.name}
                </Text>
              </Group>
            )}
            {isBuy && (
              <Group
                position={'left'}
                miw={WIDTH_COL2}
                spacing={isOnlyCsmExchange ? 2 : 10}
              >
                <Avatar
                  src={offer.sites.requested.image}
                  alt={offer.id}
                  radius={'xl'}
                  size={25}
                />
                <Text fz={isOnlyCsmExchange ? 'xs' : 'sm'} fw={500}>
                  {isOnlyCsmExchange
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
                {t('initialPrice')}
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
                {t('initialDate')}
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
                {t('electricityPrice')}
              </Text>
              {isSell && (
                <Group spacing={0} miw={WIDTH_COL2}>
                  {elecSpotSeller && (
                    <SimpleTextUrl
                      url={elecSpotSeller}
                      accessKey={SPOT_ACCESS_KEY}
                    >
                      {'SPOT'}
                    </SimpleTextUrl>
                  )}
                  <Text tt={'uppercase'}>
                    {(elecSpotSeller ? '+' : '') +
                      formatUsd(offer.sites.transfered.electricityPrice, 4)}
                  </Text>
                </Group>
              )}
              {isBuy && (
                <Group spacing={0} miw={WIDTH_COL2}>
                  {elecSpotBuyer && (
                    <SimpleTextUrl
                      url={elecSpotBuyer}
                      accessKey={SPOT_ACCESS_KEY}
                    >
                      {'SPOT'}
                    </SimpleTextUrl>
                  )}
                  <Text tt={'uppercase'} miw={WIDTH_COL2}>
                    {(elecSpotBuyer ? 'SPOT+' : '') +
                      formatUsd(offer.sites.requested.electricityPrice, 4)}
                  </Text>
                </Group>
              )}
            </Group>
          </div>
        </Stack>
      )}
    </>
  );
};
