import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GetServerSidePropsContext } from 'next';
import type { AppProps as NextAppProps } from 'next/app';

import { ColorScheme } from '@mantine/core';

import { getCookie } from 'cookies-next';

import 'src/i18next';
import { Layout } from 'src/layouts/Layout';
import { MantineProviders, Web3Providers } from 'src/providers';

import { Head } from '../src/components';

import { Provider } from 'jotai';

type TestProps = {
  initialLocale: string;
};

const LanguageInit: FC<TestProps> = ({ initialLocale }) => {
  const { i18n } = useTranslation();
  const [lng] = useState<string>(initialLocale);

  useEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [i18n, lng]);

  return null;
};

type AppProps = NextAppProps & { colorScheme: ColorScheme; locale: string };

const App = ({ Component, pageProps, colorScheme, locale }: AppProps) => {
  return (
    <>
      <Head title={'Realtoken YAM'} />
      <Provider>
        <Web3Providers>
          <MantineProviders initialColorScheme={colorScheme}>
            <LanguageInit initialLocale={locale} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MantineProviders>
        </Web3Providers>
      </Provider>
    </>
  );
};

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
  locale: getCookie('react-i18next', ctx) || 'fr',
});

export default App;
