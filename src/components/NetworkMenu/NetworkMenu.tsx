import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Menu,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAlertTriangle } from '@tabler/icons';
import { ChainList } from '../ChainSelect';
import { useActiveChain } from 'src/hooks';


const NetworkMenuItem: FC = () => {
  const { t } = useTranslation('menu', { keyPrefix: 'wallet' });

  return (
    <>
      <Menu.Label pb={0}>{t('network')}</Menu.Label>
      <ChainList></ChainList>
    </>
  );
};


const ChainSelectedIcon: FC = () => {
  const activeChain = useActiveChain();
  const [chain, setChain] = useState(activeChain);

  useEffect(() => {
    setChain(activeChain)
  }, [activeChain]);

  return (
    <>
      {
        chain ?
          <Image
            src={chain?.logo}
            alt={chain?.chainName}
            width={18}
            height={18}
            fit={'contain'}
          /> : <IconAlertTriangle size={20} aria-label={'Network'} />
      }

    </>
  );
};

export const NetworkMenu: FC = () => {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <Menu
      closeOnItemClick={true}
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
    >
      <Menu.Target>
        <ActionIcon size={36} variant={'outline'} color={'brand'}>
          <ChainSelectedIcon />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <NetworkMenuItem />
      </Menu.Dropdown>
    </Menu>
  );
};
