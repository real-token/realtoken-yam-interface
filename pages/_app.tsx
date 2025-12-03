import { I18nextProvider } from 'react-i18next';

import type { AppProps as NextAppProps } from 'next/app';

import '@mantine/core/styles.css';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  NetworkId,
  RealTokenUiProvider,
  SHOW_NETWORKS,
} from '@real-token/core';
import { LanguageInit, initLanguage } from '@real-token/i18n-locales';
import {
  Head,
  Layout,
  MantineProviders,
  Websites,
} from '@real-token/ui-components';
import { RealTokenWeb3Provider } from '@real-token/web3';
import {
  Query,
  QueryCache,
  QueryClient,
  QueryKey,
} from '@tanstack/react-query';

import i18next from 'i18next';

import { Provider as JotaiProvider } from 'jotai';

import { resources } from 'src/i18next';

import { modals } from '../src/components';
import { HeaderNav } from '../src/components/HeaderNav';
import { FooterLinks } from '../src/components/footer/FooterLinks';
import { Banners } from '../src/components/header/Banners';
import {
  ExtendedChainConfig,
  aaClient,
  networks,
} from '../src/config/aaConfig';
import { modalStyles, theme } from '../src/theme';
import {
  REACT_QUERY_ERRORS,
  REACT_QUERY_ERRORS_DATA,
} from '../src/types/ReactQueryErrors';

const showAllNetworks =
  process.env.NEXT_PUBLIC_SHOW_ALL_NETWORKS === 'true'
    ? SHOW_NETWORKS.ALL
    : SHOW_NETWORKS.MAINNETS;
// const env = process.env.NEXT_PUBLIC_ENV ?? Env.DEV;

type AppProps = NextAppProps;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({
    onError: (
      err: Error,
      query: Query<unknown, unknown, unknown, QueryKey>
    ) => {
      const errCode = query.meta?.errCode as REACT_QUERY_ERRORS;
      if (errCode) {
        console.error(`${errCode}: ${err}`);
        const errorData = REACT_QUERY_ERRORS_DATA[errCode];
        notifications.show({
          color: 'red',
          title: 'Error',
          autoClose: false,
          message: errorData.message,
        });
      } else {
        console.error('Unknown error: ', err);
        notifications.show({
          color: 'red',
          title: 'Error',
          autoClose: false,
          message: 'An unknown error occurred',
        });
      }
    },
  }),
});

const App = ({ Component, pageProps }: AppProps) => {
  initLanguage({ resources: resources, debug: false });
  return (
    <RealTokenWeb3Provider
      queryClient={queryClient}
      aaClientConfig={aaClient}
      providerConfig={{
        listenNewAaTx: true,
        listenNewWcTx: true,
      }}
    >
      <I18nextProvider i18n={i18next}>
        <JotaiProvider>
          <RealTokenUiProvider<ExtendedChainConfig>
            values={{
              // env,
              showNetworks: showAllNetworks,
              defaultNetworkId: NetworkId.gnosis,
              networksConfig: networks,
            }}
          >
            <MantineProviders
              modals={modals}
              modalStyles={modalStyles}
              theme={theme}
              notificationsProps={{
                position: 'bottom-right',
              }}
            >
              <Layout
                currentWebsite={Websites.YAM}
                head={
                  <Head
                    title={'YAM (You And Me)'}
                    description={'YAM (You And Me)'}
                  />
                }
                headerNav={<HeaderNav />}
                footerCustomLinks={<FooterLinks />}
                headerBanner={<Banners />}
              >
                <LanguageInit i={i18next} />
                <Component {...pageProps} />
              </Layout>
            </MantineProviders>
          </RealTokenUiProvider>
        </JotaiProvider>
      </I18nextProvider>
    </RealTokenWeb3Provider>
  );
};

export default App;
