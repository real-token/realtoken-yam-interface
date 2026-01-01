import {
  Query,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import type { AppProps as NextAppProps } from 'next/app';

import '@mantine/core/styles.css';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import {
  ChainSelectConfig,
  Head,
  LanguageInit,
  Layout,
  MantineProviders,
  RealtProvider,
  Web3Providers,
  Websites,
  getConnectors,
  getReadOnlyConnector,
  getWalletConnectV2,
  gnosisHooks,
  gnosisSafe,
  initLanguage,
  metaMask,
  metaMaskHooks,
  parseAllowedChain,
} from '@realtoken/realt-commons';

import { Provider as JotaiProvider } from 'jotai';

import 'src/i18next';
import { resources } from 'src/i18next';

import { modals } from '../src/components';
import { HeaderNav } from '../src/components/HeaderNav';
import { OfferCacheProvider } from '../src/components/OfferCacheProvider';
import { TheGraphErrorNotification } from '../src/components/TheGraphErrorNotification';
import { AuthenticationErrorOverlay } from '../src/components/AuthenticationErrorOverlay';
import { FooterLinks } from '../src/components/footer/FooterLinks';
import { Banners } from '../src/components/header/Banners';
import { CHAINS, ChainsID, Chain as CustomChain } from '../src/constants';
import { modalStyles, theme } from '../src/theme';
import {
  REACT_QUERY_ERRORS,
  REACT_QUERY_ERRORS_DATA,
} from '../src/types/ReactQueryErrors';

export const i18n = initLanguage(resources);

const customChains: ChainSelectConfig<CustomChain> = {
  allowedChains: parseAllowedChain(ChainsID),
  chainsConfig: CHAINS,
  defaultChainId: ChainsID.Gnosis,
};

const showAllNetworks = process.env.NEXT_PUBLIC_SHOW_ALL_NETWORKS === 'true';

const env = process.env.NEXT_PUBLIC_ENV ?? 'development';
const walletConnectKey = process.env.NEXT_PUBLIC_WALLET_CONNECT_KEY ?? '';
// console.log("key: ", walletConnectKey)

const [walletConnectV2, walletConnectV2Hooks] = getWalletConnectV2<CustomChain>(
  customChains,
  env,
  walletConnectKey,
  showAllNetworks
);
const [readOnly, readOnlyHooks] = getReadOnlyConnector(customChains);

const libraryConnectors = getConnectors({
  metamask: [metaMask, metaMaskHooks],
  gnosisSafe: [gnosisSafe, gnosisHooks],
  walletConnectV2: [walletConnectV2, walletConnectV2Hooks],
  readOnly: [readOnly, readOnlyHooks],
});

type AppProps = NextAppProps;

// AuthService est initialisé dans getClientURL.ts
// Pas besoin d'initialisation supplémentaire ici

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err: unknown, query: Query) => {
      const errCode = query.meta?.errCode as REACT_QUERY_ERRORS;

      // Importer parseGraphQLError de manière dynamique pour éviter les problèmes de circular dependencies
      // Vérifier si c'est une erreur GraphQL liée à TheGraph ou d'authentification
      let isTheGraphError = false;
      let isAuthError = false;
      
      if (err && typeof err === 'object') {
        // Vérifier si c'est une erreur Apollo avec graphQLErrors
        if ('graphQLErrors' in err) {
          const apolloError = err as {
            graphQLErrors?: Array<{ 
              message?: string;
              extensions?: { code?: string } 
            }>;
          };
          
          // Vérifier les erreurs d'authentification
          if (apolloError.graphQLErrors?.some((e) => {
            const code = e.extensions?.code;
            const message = e.message?.toLowerCase() || '';
            return (
              code === 'THEGRAPH_AUTH_ERROR' ||
              code === 'AUTHENTICATION_ERROR' ||
              message.includes('invalid authentication token') ||
              message.includes('invalid authentication') ||
              message.includes('authentication failed') ||
              message.includes('unauthorized') ||
              message.includes('forbidden')
            );
          })) {
            isAuthError = true;
          }
          
          // Vérifier les erreurs TheGraph
          if (
            apolloError.graphQLErrors?.some(
              (e) => e.extensions?.code === 'SUBGRAPH_INDEXING_ERROR'
            )
          ) {
            isTheGraphError = true;
          }
        }
        
        // Vérifier les erreurs réseau (peut contenir des erreurs HTTP 401/403)
        if ('networkError' in err) {
          const networkError = err as { networkError?: any };
          const statusCode = networkError.networkError?.statusCode || networkError.networkError?.status;
          const errorMessage = networkError.networkError?.message?.toLowerCase() || '';
          
          if (
            statusCode === 401 ||
            statusCode === 403 ||
            errorMessage.includes('invalid authentication token') ||
            errorMessage.includes('invalid authentication') ||
            errorMessage.includes('authentication failed') ||
            errorMessage.includes('unauthorized') ||
            errorMessage.includes('forbidden')
          ) {
            isAuthError = true;
          }
        }
        
        // Vérifier si c'est une erreur GraphQL directe
        if ('errors' in err) {
          const graphQLError = err as {
            errors?: Array<{ 
              message?: string;
              extensions?: { code?: string } 
            }>;
          };
          
          // Vérifier les erreurs d'authentification
          if (graphQLError.errors?.some((e) => {
            const code = e.extensions?.code;
            const message = e.message?.toLowerCase() || '';
            return (
              code === 'THEGRAPH_AUTH_ERROR' ||
              code === 'AUTHENTICATION_ERROR' ||
              message.includes('invalid authentication token') ||
              message.includes('invalid authentication') ||
              message.includes('authentication failed') ||
              message.includes('unauthorized') ||
              message.includes('forbidden')
            );
          })) {
            isAuthError = true;
          }
          
          // Vérifier les erreurs TheGraph
          if (
            graphQLError.errors?.some(
              (e) => e.extensions?.code === 'SUBGRAPH_INDEXING_ERROR'
            )
          ) {
            isTheGraphError = true;
          }
        }
      }

      // Les erreurs d'authentification sont gérées par AuthenticationErrorOverlay
      // Ne pas afficher de notification générique
      if (isAuthError) {
        console.error('Authentication error detected, handled by AuthenticationErrorOverlay component');
        return;
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
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <RealtProvider value={{ env, showAllNetworks }}>
          <Web3Providers libraryConnectors={libraryConnectors}>
            <MantineProviders
              modals={modals}
              modalStyles={modalStyles}
              theme={theme}
              notificationsProps={{
                position: 'bottom-right',
              }}
            >
              <LanguageInit i={i18n} />
              <OfferCacheProvider>
                <AuthenticationErrorOverlay>
                  <Layout
                    currentWebsite={Websites.YAM}
                    chains={customChains}
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
                    <ReactQueryDevtools />
                    <TheGraphErrorNotification />
                    <Component {...pageProps} />
                  </Layout>
                </AuthenticationErrorOverlay>
              </OfferCacheProvider>
            </MantineProviders>
          </Web3Providers>
        </RealtProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export default App;
