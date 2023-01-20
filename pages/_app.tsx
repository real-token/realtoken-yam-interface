import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetServerSidePropsContext } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import { ColorScheme } from '@mantine/core';
import store from 'src/store/store';
import { getCookie } from 'cookies-next';
import 'src/i18next';
import { Layout } from 'src/layouts/Layout';
import { MantineProviders, Web3Providers } from 'src/providers';
import { Head } from '../src/components';
import InitStoreProvider from 'src/providers/InitStoreProvider';
import { Provider as JotaiProvider} from 'jotai';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from "react-query";

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

const queryClient = new QueryClient({});

const App = ({ Component, pageProps, colorScheme, locale }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Providers>
        <Provider store={store}>
          <InitStoreProvider>
            <Head title={'Realtoken YAM'} />
            <JotaiProvider>
              <MantineProviders initialColorScheme={colorScheme}>
                  <LanguageInit initialLocale={locale} />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
              </MantineProviders>
            </JotaiProvider>
          </InitStoreProvider>
        </Provider>
      </Web3Providers>
    </QueryClientProvider>
  );
};

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
  locale: getCookie('react-i18next', ctx) || 'fr',
});

export default App;
