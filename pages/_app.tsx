import type { AppProps as NextAppProps } from 'next/app';
import { ColorScheme, Image } from '@mantine/core';
import store from 'src/store/store';
import 'src/i18next';
import InitStoreProvider from 'src/providers/InitStoreProvider';
import { Provider as JotaiProvider} from 'jotai';
import { Provider as ReduxProvide } from 'react-redux';
import { QueryClient, QueryClientProvider } from "react-query";
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
  getWalletConnectV2, 
  gnosisHooks, 
  gnosisSafe, 
  initLanguage, 
  metaMask, 
  metaMaskHooks, 
  parseAllowedChain ,
} from '@realtoken/realt-commons';
import { resources } from 'src/i18next';
import { CHAINS, Chain as CustomChain, ChainsID } from '../src/constants';
import { modals } from '../src/components';
import { modalStyles, theme } from '../src/theme';
import { Logo } from 'src/assets';
import { HeaderNav } from '../src/components/HeaderNav';

export const i18n = initLanguage(resources);

const customChains: ChainSelectConfig<CustomChain> = {
  allowedChains: parseAllowedChain(ChainsID),
  chainsConfig: CHAINS
}

const showAllNetworks = false;

const env = process.env.NEXT_PUBLIC_ENV ?? "development";
const walletConnectKey = process.env.NEXT_PUBLIC_WALLET_CONNECT_KEY ?? "";
console.log("wallet connect key: ", walletConnectKey)

const [walletConnectV2, walletConnectV2Hooks] = getWalletConnectV2<CustomChain>(customChains,env, walletConnectKey, showAllNetworks);

const libraryConnectors = getConnectors(
  [metaMask, metaMaskHooks],
  [gnosisSafe, gnosisHooks],
  [walletConnectV2, walletConnectV2Hooks]
);

type AppProps = NextAppProps & { colorScheme: ColorScheme; locale: string };

const queryClient = new QueryClient({});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <RealtProvider value={{ env, showAllNetworks }}>
          <ReduxProvide store={store}>
            <Web3Providers libraryConnectors={libraryConnectors}>
              <InitStoreProvider>
                <MantineProviders modals={modals} modalStyles={modalStyles} theme={theme}>
                    <LanguageInit i={i18n} />
                    <Layout
                      chains={customChains}
                      head={<Head title={'CleanSatMining YAM'} description='CleanSatMining YAM'/>}
                      headerNav={<HeaderNav/>}
                      newWebsite={{
                        name: "CleanSatMining YAM",
                        url: "/",
                        logo: () => <Image src={Logo.src} alt={'CSM Logo'} width={36}/>,
                        comingSoon: false
                      }}
                      disableHeaderMultisite={true}
                    >
                      <Component {...pageProps} />
                    </Layout>
                </MantineProviders>
              </InitStoreProvider>
            </Web3Providers>
          </ReduxProvide>
        </RealtProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export default App;
