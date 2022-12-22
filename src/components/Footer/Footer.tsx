import { FC, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Box,
  Group,
  Image,
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

  const { t } = useTranslation("common");

  const FooterButtons: FC = () => {
    return (
      <Group>
        <ActionIcon 
          variant={'subtle'}
          component={NextLink}
          href={"/faq"}
        >
          {t("footer.faq")}
        </ActionIcon>
        <ActionIcon
          variant={'subtle'}
          component={NextLink}
          href={'https://twitter.com/RealTPlatform/'}
          aria-label={'Twitter'}
          target={'_blank'}
        >
          <IconBrandTwitter />
        </ActionIcon>
        <ActionIcon
          variant={'subtle'}
          component={NextLink}
          href={'https://t.me/Realtoken_welcome/'}
          aria-label={'Telegram'}
          target={'_blank'}
        >
          <IconBrandTelegram />
        </ActionIcon>
        <ActionIcon
          variant={'subtle'}
          component={NextLink}
          href={'https://realt.co/blog/'}
          aria-label={'Blog'}
          target={'_blank'}
        >
          <IconBrandMedium />
        </ActionIcon>
        <ActionIcon
          variant={'subtle'}
          component={NextLink}
          href={'https://github.com/real-token'}
          aria-label={'GitHub'}
          target={'_blank'}
        >
          <IconBrandGithub />
        </ActionIcon>
      </Group>
    );
  };

  return (
    <div>
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
    </div>
  );
};
