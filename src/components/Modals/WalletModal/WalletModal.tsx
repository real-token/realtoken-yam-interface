import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Anchor,
  Button,
  ButtonProps,
  Image,
  LoadingOverlay,
  Stack,
} from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import { Connector } from '@web3-react/types';

import { CoinBaseWallet, MetaMask, WalletConnect } from 'src/assets';
import { coinbaseWallet, metaMask, walletConnect } from 'src/connectors';

import { styles } from './WalletModal.styles';

type WalletModalButtonProps = {
  connector: Connector;
  title: string;
  src: string;
  buttonProps: ButtonProps;
  onSuccess: () => void;
};

const WalletModalButton: FC<WalletModalButtonProps> = ({
  connector,
  title,
  src,
  buttonProps,
  onSuccess,
}) => {
  const [isActivating, setIsActivating] = useState<boolean>(false);

  const onActivating = useCallback(async () => {
    setIsActivating(true);
    await connector.activate();
    setIsActivating(false);
    onSuccess();
  }, [connector, onSuccess]);

  return (
    <Button
      fullWidth={true}
      variant={'gradient'}
      rightIcon={
        <Image src={src} alt={title} fit={'contain'} width={30} radius={'xl'} />
      }
      styles={styles.button}
      onClick={onActivating}
      {...buttonProps}
    >
      <LoadingOverlay
        visible={isActivating}
        loaderProps={{ size: 'sm', variant: 'dots' }}
      />
      {title}
    </Button>
  );
};

export const WalletModal: FC<ContextModalProps> = ({ context, id }) => {
  const { t } = useTranslation('links', { keyPrefix: 'walletMenu' });

  const onClose = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  return (
    <Stack justify={'center'} align={'center'}>
      <WalletModalButton
        connector={metaMask}
        title={'MetaMask'}
        src={MetaMask.src}
        buttonProps={{ gradient: { from: '#CD6116', to: '#F6851B' } }}
        onSuccess={onClose}
      />
      <WalletModalButton
        connector={walletConnect}
        title={'WalletConnect'}
        src={WalletConnect.src}
        buttonProps={{ gradient: { from: '#006FFF', to: '#5C9DF5' } }}
        onSuccess={onClose}
      />
      <WalletModalButton
        connector={coinbaseWallet}
        title={'Coinbase Wallet'}
        src={CoinBaseWallet.src}
        buttonProps={{ gradient: { from: '#0052FF', to: '#5C8FFF' } }}
        onSuccess={onClose}
      />
      <Anchor component={NextLink} href={t('href')} target={'_blank'}>
        {t('text')}
      </Anchor>
    </Stack>
  );
};
