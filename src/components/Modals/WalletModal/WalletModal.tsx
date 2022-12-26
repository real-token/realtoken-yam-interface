import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk';

import {
  Anchor,
  Button,
  ButtonProps,
  Flex,
  Image,
  LoadingOverlay,
  Stack,
  Text,
} from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import { Connector } from '@web3-react/types';

import { GnosisSafe, MetaMask, WalletConnect } from 'src/assets';
import { gnosisSafe, metaMask, walletConnect } from 'src/connectors';

import { styles } from './WalletModal.styles';

type WalletModalButtonProps = {
  connector: Connector;
  title: string;
  src: string;
  buttonProps: ButtonProps;
  onSuccess: () => void;
  disabled?: boolean;
  disabledError?: string
};

const WalletModalButton: FC<WalletModalButtonProps> = ({
  connector,
  title,
  src,
  buttonProps,
  onSuccess,
  disabled = false,
  disabledError
}) => {
  const [isActivating, setIsActivating] = useState<boolean>(false);

  const onActivating = useCallback(async () => {
    try{
      setIsActivating(true);
      await connector.activate();
      setIsActivating(false);
      onSuccess();
    }catch(err){
      console.log(err)
    }
  }, [connector, onSuccess]);

  return (
    <Button
      aria-label={title}
      fullWidth={true}
      variant={'gradient'}
      rightIcon={<Image src={src} alt={title} fit={'contain'} width={30} radius={'xl'} />}
      styles={styles.button}
      onClick={onActivating}
      {...buttonProps}
      disabled={disabled}
    >
      <Flex direction={"column"}>
        <LoadingOverlay
          visible={isActivating}
          loaderProps={{ size: 'sm', variant: 'dots' }}
        />
        {
          disabled ? <Text color={"red"} hidden={!disabled}>{disabledError}</Text> : title
        }
      </Flex>
    </Button>
  );
};

export const WalletModal: FC<ContextModalProps> = ({ context, id }) => {
  const { t } = useTranslation('links', { keyPrefix: 'walletMenu' });

  const [gnosisDisabled,setGnosisDisabled] = useState<boolean>(true);

  useEffect(() => {
    const fetchIfGnosis = async () => {
      try {
        const gnosisSdk = new SafeAppsSDK()
        await gnosisSdk.safe.getInfo();
        setGnosisDisabled(false);
      } catch (e) {
        console.log('Gnosis Safe is not detected', e);
      }
    }
    fetchIfGnosis();
  },[])

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
        connector={gnosisSafe}
        title={'GnosisSafe'}
        src={GnosisSafe.src}
        buttonProps={{ gradient: { from: '#005233', to: '#00bb55' } }}
        onSuccess={onClose}
        disabled={gnosisDisabled}
        disabledError={"You need to open app in Gnosis App in order to use YAM with gnosis"}
      />
      <Anchor component={NextLink} href={t('href')} target={'_blank'}>
        {t('text')}
      </Anchor>
    </Stack>
  );
};
