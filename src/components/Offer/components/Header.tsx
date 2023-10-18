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
  onClose: () => void;
}

export const OfferTitle: FC<OfferTitleProps> = ({
  offerId,
  offerType,
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
      <Space h={'xs'}></Space>
      <Title>{getI18OfferTypeName(offerType) + ' #' + offerId}</Title>
      <Space h={'xl'}></Space>
    </>
  );
};

interface OfferHeaderProps {
  offerId: string;
  offerType: OFFER_TYPE;
  title: string;
  country: string;
  energy: string;
  image: string;
}

export const OfferHeader: FC<OfferHeaderProps> = ({
  offerId,
  offerType,
  title,
  image,
  country,
  energy,
}) => {
  const { classes, cx } = useStyle();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const dispatch = useAppDispatch();
  const { getI18OfferTypeName } = useOfferType();

  const onClose = useCallback(() => {
    dispatch({ type: buyOfferClose, payload: undefined });
  }, [dispatch]);

  return (
    <Box sx={{ marginBottom: '10px' }}>
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
      {/* <BackgroundImage src={''} className={cx(classes.header)} radius={'md'}>
        <Group position={'apart'}>
          <OfferBadge
            offerType={offerType}
            id={offerId}
            style={{
              borderBottomRightRadius: '7px',
              borderTopLeftRadius: '7px',
              margin: '-2px 0 0 0',
            }}
          ></OfferBadge>
          <CloseButton onClick={onClose} />
        </Group>
        <Center p={'md'} sx={{ marginTop: '-15px' }}>
          <Stack spacing={5} align={'center'}>
            <Avatar
              src={image}
              alt={"it's me"}
              radius={50}
              sx={{ marginTop: '-10px', width: '110px', height: '110px' }}
            ></Avatar>
            <Badge
              variant={'filled'}
              radius={'sm'}
              style={{
                backgroundColor: theme.colors.brand[5],
                height: isMobile ? undefined : '22px',
              }}
            >
              <Text fz={isMobile ? 'xs' : 14}>{title}</Text>
            </Badge>
          </Stack>
        </Center>
      </BackgroundImage> */}
    </Box>
  );
};
