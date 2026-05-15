import { I18nextProvider } from 'react-i18next';

import { notifications } from '@mantine/notifications';
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
import { Outlet, createRootRoute } from '@tanstack/react-router';

import i18next from 'i18next';

import { Provider as JotaiProvider } from 'jotai';

import { modals } from 'src/components';
import { DefaultNetworkSync } from 'src/components/DefaultNetworkSync';
import { WatchedAddressRestore } from 'src/components/WatchedAddressRestore';
import { HeaderNav } from 'src/components/HeaderNav';
import { OfferCacheProvider } from 'src/components/OfferCacheProvider';
import { TheGraphErrorNotification } from 'src/components/TheGraphErrorNotification';
import { FooterLinks } from 'src/components/footer/FooterLinks';
import { Banners } from 'src/components/header/Banners';
import { YamHeaderButtons } from 'src/components/header/YamHeaderButtons';
import { ExtendedChainConfig, aaClient, networks } from 'src/config/aaConfig';
import { isAaWalletLoginEnabled } from 'src/config/web3AuthEnv';
import { resources } from 'src/i18next';
import { modalStyles, theme } from 'src/theme';
import {
  REACT_QUERY_ERRORS,
  REACT_QUERY_ERRORS_DATA,
} from 'src/types/ReactQueryErrors';

const showAllNetworks =
  import.meta.env.VITE_SHOW_ALL_NETWORKS === 'true'
    ? SHOW_NETWORKS.ALL
    : SHOW_NETWORKS.MAINNETS;

const aaWalletLoginEnabled = isAaWalletLoginEnabled();

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
      }
    },
  }),
});

function RootComponent() {
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
              showNetworks: showAllNetworks,
              defaultNetworkId: NetworkId.gnosis,
              networksConfig: networks,
              aaModalConfig: {
                connectionModeConfig: {
                  aa: {
                    showEmailPasswordless: true,
                  },
                  external: {
                    showReadOnly: true,
                  },
                },
                connectionModeVisibility: {
                  aa: aaWalletLoginEnabled,
                  external: true,
                  tba: false,
                },
              },
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
                <DefaultNetworkSync />
                <WatchedAddressRestore />
                <Layout
                  header={{
                    nav: <HeaderNav />,
                    banner: <Banners />,
                    buttons: <YamHeaderButtons disableWalletConnect />,
                    currentWebsite: Websites.YAM,
                    disableWalletConnect: true,
                  }}
                  head={
                    <Head
                      title={'YAM (You And Me)'}
                      description={'YAM (You And Me)'}
                    />
                  }
                  footerCustomLinks={<FooterLinks />}
                >
                  <LanguageInit i={i18next} />
                  <TheGraphErrorNotification />
                  <Outlet />
                </Layout>
              </OfferCacheProvider>
            </MantineProviders>
          </RealTokenUiProvider>
        </JotaiProvider>
      </I18nextProvider>
    </RealTokenWeb3Provider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
