import type { AppProps as NextAppProps } from 'next/app';
import 'src/i18next';
import InitStoreProvider from 'src/providers/InitStoreProvider';
import { Provider as JotaiProvider} from 'jotai';
import { Query, QueryCache, QueryClient, QueryClientProvider } from "react-query";
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
  parseAllowedChain 
} from '@realtoken/realt-commons';
import { resources } from 'src/i18next';
import { CHAINS, Chain as CustomChain, ChainsID } from '../src/constants';
import { modals } from '../src/components';
import { HeaderNav } from '../src/components/HeaderNav';
import { modalStyles, theme } from '../src/theme';
import { ReactQueryDevtools } from 'react-query/devtools'
import { FooterLinks } from '../src/components/footer/FooterLinks';
import { notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Banners } from '../src/components/header/Banners';
import { REACT_QUERY_ERRORS, REACT_QUERY_ERRORS_DATA } from '../src/types/ReactQueryErrors';

export const i18n = initLanguage(resources);

const customChains: ChainSelectConfig<CustomChain> = {
  allowedChains: parseAllowedChain(ChainsID),
  chainsConfig: CHAINS,
  defaultChainId: ChainsID.Gnosis
}

const showAllNetworks = true;

const env = process.env.NEXT_PUBLIC_ENV ?? "development";
const walletConnectKey = process.env.NEXT_PUBLIC_WALLET_CONNECT_KEY ?? "";
// console.log("key: ", walletConnectKey)

const [walletConnectV2, walletConnectV2Hooks] = getWalletConnectV2<CustomChain>(customChains,env, walletConnectKey, showAllNetworks);
const [readOnly, readOnlyHooks] = getReadOnlyConnector(customChains);

const libraryConnectors = getConnectors({
  metamask: [metaMask, metaMaskHooks],
  gnosisSafe: [gnosisSafe, gnosisHooks],
  walletConnectV2: [walletConnectV2, walletConnectV2Hooks],
  readOnly: [readOnly, readOnlyHooks]
});

type AppProps = NextAppProps;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  },
  queryCache: new QueryCache({
    onError: (err: unknown, query: Query) => {
      const errCode = query.meta?.errCode as REACT_QUERY_ERRORS;
      if(errCode){
        console.error(`${errCode}: ${err}`)
        const errorData = REACT_QUERY_ERRORS_DATA[errCode];
        notifications.show({
          color: 'red',
          title: 'Error',
          autoClose: false,
          message: errorData.message,
        })
      }else {
        console.error('Unknown error: ', err);
        notifications.show({
          color: 'red',
          title: 'Error',
          autoClose: false,
          message: 'An unknown error occurred'
        })
      }
    }
  })
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
                  position: "bottom-right"
                }}
              >
                <LanguageInit i={i18n} />
                <Layout
                  currentWebsite={Websites.YAM}
                  chains={customChains}
                  head={<Head title='YAM (You And Me)' description='YAM (You And Me)'/>}
                  headerNav={<HeaderNav/>}
                  footerCustomLinks={<FooterLinks/>}
                  headerBanner={<Banners/>}
                >
                  <ReactQueryDevtools/>
                  <Component {...pageProps} />
                </Layout>
              </MantineProviders>
            </Web3Providers>
          </RealtProvider>
        </JotaiProvider>
      </QueryClientProvider>
  );
};

export default App;
