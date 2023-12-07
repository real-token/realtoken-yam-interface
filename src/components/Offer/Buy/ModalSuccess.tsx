import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Button,
  Card,
  Group,
  Image,
  Modal,
  Space,
  Text,
  Title,
} from '@mantine/core';

import { addErc20TokenToMetaMask } from 'src/components/Wallet/AddTokenToWallet';
import { UrlDashboard } from 'src/constants/urlExternal';
import { formatToken } from 'src/utils/format';
import { openInNewTab } from 'src/utils/window';

interface ModalSuccessProps {
  offerTokenAddress: string;
  buyAmount: number;
  offerTokenSymbol: string;
  offerTokenDecimals: number;
  offerTokenLogoUrl: string;
  modalFinishOpened: boolean;
  modalFinishClose: () => void;
}
export const ModalSuccess: FC<ModalSuccessProps> = ({
  offerTokenAddress,
  buyAmount,
  offerTokenSymbol,
  offerTokenDecimals,
  offerTokenLogoUrl,
  modalFinishOpened,
  modalFinishClose,
}) => {
  const { t } = useTranslation('buy', {
    keyPrefix: 'success',
  });
  const { t: t1 } = useTranslation('notifications', {
    keyPrefix: 'buyOfferFinish',
  });

  const handleAddErc20ToWallet = (
    erc20TokenAddress: string,
    erc20TokenSymbol: string,
    erc20TokenDecimal: number,
    erc20TokenImage: string
  ) => {
    addErc20TokenToMetaMask(
      erc20TokenAddress,
      erc20TokenSymbol,
      erc20TokenDecimal,
      erc20TokenImage
    );
  };
  return (
    <Modal
      opened={modalFinishOpened}
      onClose={modalFinishClose}
      title={<Title order={3}>{t1('title')}</Title>}
      centered={true}
      size={500}
      radius={'lg'}
    >
      <Text fw={'400'}>
        {t1('message') + formatToken(buyAmount, offerTokenSymbol) + '.'}
      </Text>
      <Space h={20}></Space>
      <Card withBorder={true}>
        <Text ta={'center'} fw={'400'}>
          {t1('question')}
        </Text>
        <Space h={'xl'}></Space>
        <Group position={'center'}>
          {/* <Button radius={'xl'} color={'red'} onClick={modalFinishClose}>
          {t('noThanks')}
        </Button> */}
          <Button
            color={'blue'}
            //variant={'outline'}
            leftIcon={
              <ActionIcon size={16} variant={'transparent'}>
                <Image
                  src={
                    'https://static.coingecko.com/s/metamask_fox-99d631a5c38b5b392fdb2edd238a525ba0657bc9ce045077c4bae090cfc5b90a.svg'
                  }
                  alt={'nft'}
                  height={16}
                ></Image>
              </ActionIcon>
            }
            radius={'xl'}
            onClick={() =>
              handleAddErc20ToWallet(
                offerTokenAddress,
                offerTokenSymbol,
                offerTokenDecimals,
                offerTokenLogoUrl
              )
            }
            //style={{ backgroundColor: theme.colors.brand[5] }}
          >
            {t('add')}
          </Button>
        </Group>
      </Card>
      <Space h={20}></Space>
      <Text fw={'400'} ta={'center'}>
        {t('message')}
      </Text>
      <Space h={'xl'}></Space>
      <Group position={'center'}>
        {/* <Button radius={'xl'} color={'red'} onClick={modalFinishClose}>
          {'Fermer'}
        </Button> */}
        <Button
          //variant={'outline'}
          leftIcon={
            <ActionIcon size={25} variant={'transparent'}>
              <Image src={getLogUrl()} alt={'nft'} height={25}></Image>
            </ActionIcon>
          }
          radius={'xl'}
          onClick={() => openInNewTab(UrlDashboard.url)}
          //style={{ backgroundColor: theme.colors.brand[5] }}
        >
          {t('accessDashboard')}
        </Button>
      </Group>
    </Modal>
  );
};

function getLogUrl(): string {
  const domaineDuSite = window.location.origin;

  return domaineDuSite + '/currency/csm.svg';
}
