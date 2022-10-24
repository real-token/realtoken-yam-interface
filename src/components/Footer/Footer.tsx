import { FC, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Box,
  Group,
  Image,
  Footer as MantineFooter,
  MediaQuery,
  Text,
  TextProps,
  Title,
} from '@mantine/core';
import { NextLink } from '@mantine/next';
import {
  IconBrandGithub,
  IconBrandMedium,
  IconBrandTelegram,
  IconBrandTwitter,
} from '@tabler/icons';

import { Logo } from 'src/assets';
import { FRC } from 'src/types';

import { Divider } from '../Divider';
import { styles } from './Footer.styles';

const LogoWithName: FC = () => {
  return (
    <Group align={'center'} spacing={'xs'}>
      <Image src={Logo.src} alt={'RealT Logo'} width={30} />
      <Title order={3}>{'RealT'}</Title>
    </Group>
  );
};

const FooterButtons: FC = () => {
  return (
    <Group>
      <ActionIcon
        variant={'subtle'}
        component={NextLink}
        href={'https://twitter.com/RealTPlatform/'}
        target={'_blank'}
      >
        <IconBrandTwitter />
      </ActionIcon>
      <ActionIcon
        variant={'subtle'}
        component={NextLink}
        href={'https://t.me/Realtoken_welcome/'}
        target={'_blank'}
      >
        <IconBrandTelegram />
      </ActionIcon>
      <ActionIcon
        variant={'subtle'}
        component={NextLink}
        href={'https://blog.realt.co/'}
        target={'_blank'}
      >
        <IconBrandMedium />
      </ActionIcon>
      <ActionIcon
        variant={'subtle'}
        component={NextLink}
        href={'https://github.com/real-token'}
        target={'_blank'}
      >
        <IconBrandGithub />
      </ActionIcon>
    </Group>
  );
};

const Copyright: FRC<TextProps, HTMLDivElement> = forwardRef((props, ref) => {
  const { t } = useTranslation('common', { keyPrefix: 'footer' });

  return (
    <Text {...props} ref={ref}>
      {t('copyright', { year: new Date().getFullYear() })}
    </Text>
  );
});
Copyright.displayName = 'Copyright';

export const Footer: FC = () => {
  return (
    <MantineFooter height={'auto'}>
      <Divider />
      <Box sx={styles.container}>
        <Group position={'apart'} align={'center'}>
          <LogoWithName />
          <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
            <Copyright />
          </MediaQuery>
          <FooterButtons />
        </Group>
        <MediaQuery largerThan={'xs'} styles={{ display: 'none' }}>
          <Copyright size={'sm'} mt={5} />
        </MediaQuery>
      </Box>
    </MantineFooter>
  );
};
