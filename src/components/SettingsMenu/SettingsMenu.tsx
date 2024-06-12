import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Box,
  Center,
  Menu,
  SegmentedControl,
  Select,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLanguage,
  IconMoon,
  IconSettings,
  IconSun,
} from '@tabler/icons-react';

import { setCookie } from 'cookies-next';

const ColorSchemeMenuItem: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const { t } = useTranslation('menu', { keyPrefix: 'settings' });

  return (
    <Box px={5}>
      <SegmentedControl
        color={'brand'}
        fullWidth={true}
        value={colorScheme}
        onChange={() => toggleColorScheme()}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <IconSun size={16} />
                <Box ml={'xs'}>{t('light')}</Box>
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <IconMoon size={16} />
                <Box ml={'xs'}>{t('dark')}</Box>
              </Center>
            ),
          },
        ]}
      />
    </Box>
  );
};

const LanguageSelect: FC = () => {
  const { i18n, t } = useTranslation('menu', { keyPrefix: 'settings' });

  const updateLocale = useCallback(
    (updatedLocale: string) => {
      if (i18n.language !== updatedLocale) {
        setCookie('react-i18next', updatedLocale);
        i18n.changeLanguage(updatedLocale);
      }
    },
    [i18n],
  );

  return (
    <>
      <Menu.Label pb={0}>{t('title')}</Menu.Label>
      <Select
        p={5}
        value={i18n.language}
        onChange={updateLocale}
        data={[
          { value: 'fr', label: t('french') },
          { value: 'en', label: t('english') },
        ]}
        icon={<IconLanguage size={16} />}
      />
    </>
  );
};

export const SettingsMenu: FC = () => {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <Menu
      closeOnItemClick={false}
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
    >
      <Menu.Target>
        <ActionIcon size={36} color={'brand'}>
          <IconSettings size={20} aria-label={'Setting'} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <LanguageSelect />
        <Menu.Divider />
        <ColorSchemeMenuItem />
      </Menu.Dropdown>
    </Menu>
  );
};
