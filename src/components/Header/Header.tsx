import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Link from 'next/link';

import {
  Box,
  Button,
  Group,
  Image,
  Header as MantineHeader,
  MediaQuery,
  Title,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useWeb3React } from '@web3-react/core';

import cssStyles from 'styles/Header.module.css';

import { Logo } from 'src/assets';

import { Divider } from '../Divider';
import { SettingsMenu } from '../SettingsMenu';
import { WalletMenu } from '../WalletMenu';
import { styles } from './Header.styles';

const LogoWithName: FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'header' });

  return (
    <Group align={'center'} spacing={'xs'}>
      <Image src={Logo.src} alt={'RealT Logo'} width={36} />
      <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
        <Title order={3}>{t('title')}</Title>
      </MediaQuery>
    </Group>
  );
};

const ConnectButton: FC = () => {
  const modals = useModals();

  const { t } = useTranslation('modals', { keyPrefix: 'wallet' });

  const onOpenWalletModal = useCallback(() => {
    modals.openContextModal('wallet', {
      title: <Title order={3}>{t('title')}</Title>,
      innerProps: {},
    });
  }, [modals, t]);

  return <Button onClick={onOpenWalletModal}>{t('title')}</Button>;
};

const HeaderButtons: FC = () => {
  const { account } = useWeb3React();

  return (
    <Group spacing={10}>
      {account ? <WalletMenu /> : <ConnectButton />}
      <SettingsMenu />
    </Group>
  );
};

export const Header: FC = () => {
  return (
    <MantineHeader height={'auto'}>
      <Box sx={styles.container}>
        <Group position={'apart'} align={'center'}>
          <LogoWithName />
          <Link href={'/'}>
            <a className={cssStyles.headerText}>{'Explore'}</a>
          </Link>
          <Link href={'/my-offers'}>
            <a className={cssStyles.headerText}>{'Your offers'}</a>
          </Link>
          <Link href={'/portfolio'}>
            <a className={cssStyles.headerText}>{'Portfolio'}</a>
          </Link>
          <HeaderButtons />
        </Group>
      </Box>
      <Divider />
    </MantineHeader>
  );
};
