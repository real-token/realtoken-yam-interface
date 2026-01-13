import { I18nextProvider } from 'react-i18next';

import type { AppProps as NextAppProps } from 'next/app';

import '@mantine/core/styles.css';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
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
import { OfferCacheProvider } from '../src/components/OfferCacheProvider';
import { TheGraphErrorNotification } from '../src/components/TheGraphErrorNotification';
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

      // Importer parseGraphQLError de manière dynamique pour éviter les problèmes de circular dependencies
      // Vérifier si c'est une erreur GraphQL liée à TheGraph
      let isTheGraphError = false;
      if (err && typeof err === 'object') {
        // Vérifier si c'est une erreur Apollo avec graphQLErrors
        if ('graphQLErrors' in err) {
          const apolloError = err as {
            graphQLErrors?: Array<{ extensions?: { code?: string } }>;
          };
          if (
            apolloError.graphQLErrors?.some(
              (e) => e.extensions?.code === 'SUBGRAPH_INDEXING_ERROR'
            )
          ) {
            isTheGraphError = true;
          }
        }
        // Vérifier si c'est une erreur GraphQL directe
        if ('errors' in err) {
          const graphQLError = err as {
            errors?: Array<{ extensions?: { code?: string } }>;
          };
          if (
            graphQLError.errors?.some(
              (e) => e.extensions?.code === 'SUBGRAPH_INDEXING_ERROR'
            )
          ) {
            isTheGraphError = true;
          }
        }
      }

      // Ne pas afficher de notification générique pour les erreurs TheGraph
      // Le composant TheGraphErrorNotification s'en charge
      if (isTheGraphError) {
        console.warn(
          'TheGraph error detected, handled by TheGraphErrorNotification component'
        );
        return;
      }

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
        // Ne pas afficher de notification pour les erreurs inconnues non-critiques
        // Seulement logger pour éviter de spammer l'utilisateur
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
              <OfferCacheProvider>
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
                  <TheGraphErrorNotification />
                  <Component {...pageProps} />
                </Layout>
              </OfferCacheProvider>
            </MantineProviders>
          </RealTokenUiProvider>
        </JotaiProvider>
      </I18nextProvider>
    </RealTokenWeb3Provider>
  );
};

export default App;
