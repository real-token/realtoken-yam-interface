import { FC, ReactNode, useState } from 'react';

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';

import { setCookies } from 'cookies-next';

import { modals } from 'src/components';
import { modalStyles, theme } from 'src/theme';

type MantineProvidersProps = {
  initialColorScheme: ColorScheme;
  children: ReactNode;
};

export const MantineProviders: FC<MantineProvidersProps> = ({
  children,
  initialColorScheme,
}) => {
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(initialColorScheme);

  const toggleColorScheme = (
    nextColorScheme: ColorScheme = colorScheme === 'dark' ? 'light' : 'dark'
  ) => {
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme);
  };

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles={true}
        withNormalizeCSS={true}
        theme={{ colorScheme, ...theme }}
      >
        <NotificationsProvider autoClose={6000}>
          <ModalsProvider
            modals={modals}
            modalProps={{
              centered: true,
              withCloseButton: false,
              styles: modalStyles,
            }}
          >
            {children}
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
