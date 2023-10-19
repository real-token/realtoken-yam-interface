import { FC, useCallback } from 'react';

import {
  ActionIcon,
  Avatar,
  BackgroundImage,
  Box,
  Group,
  Space,
  Stack,
  Text,
  Title,
  createStyles,
  em,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useColorScheme } from '@mantine/hooks';
import { IconArrowLeft } from '@tabler/icons';

import { OfferBadge } from 'src/components/Offer/components/OfferTypeBadge';
import { useAppDispatch } from 'src/hooks/react-hooks';
import { useOfferType } from 'src/hooks/useOfferType';
import { buyOfferClose } from 'src/store/features/buyOffer/buyOfferSlice';
import { OFFER_TYPE } from 'src/types/offer/OfferType';

const useStyle = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
  },
}));
interface OfferTitleProps {
  offerId: string;
  offerType: OFFER_TYPE;
  action?: string;
  onClose: () => void;
}

export const OfferTitle: FC<OfferTitleProps> = ({
  offerId,
  offerType,
  action,
  onClose,
}) => {
  const { getI18OfferTypeName } = useOfferType();
  return (
    <>
      <ActionIcon
        variant={'transparent'}
        size={'lg'}
        color={'dark'}
        onClick={onClose}
      >
        <IconArrowLeft size={'50px'}></IconArrowLeft>
      </ActionIcon>
      <Space h={5}></Space>
      <Title>
        {action ? action : getI18OfferTypeName(offerType) + ' #' + offerId}
      </Title>
      {action && (
        <Text color={'dimmed'}>
          {'Offre ' +
            getI18OfferTypeName(offerType)?.toLowerCase() +
            ' #' +
            offerId}
        </Text>
      )}
      <Space h={'xl'}></Space>
    </>
  );
};

interface OfferHeaderProps {
  title: string;
  country: string;
  energy: string;
  image: string;
}

export const OfferHeader: FC<OfferHeaderProps> = ({
  title,
  image,
  country,
  energy,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Box sx={{ marginBottom: '0px' }}>
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
    </Box>
  );
};
