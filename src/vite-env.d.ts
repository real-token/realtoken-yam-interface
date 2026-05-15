/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string
  readonly VITE_SEPOLIA_WSS_URL: string
  readonly VITE_SEPOLIA_RPC_URL: string
  readonly VITE_GNOSIS_WSS_URL: string
  readonly VITE_GNOSIS_RPC_URL: string
  readonly VITE_ETH_WSS_URL: string
  readonly VITE_ETH_RPC_URL: string
  readonly VITE_WEB3_AUTH_API_KEY: string
  readonly VITE_WEB3AUTH_NETWORK?: string
  readonly VITE_ENABLE_AA_WALLET_LOGIN?: string
  readonly VITE_WC_PROJECTID: string
  readonly VITE_WC_URL: string
  readonly VITE_ETHERSPOT_KEY: string
  readonly VITE_SHOW_ALL_NETWORKS: string
  readonly VITE_API_URL: string
  readonly VITE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Fix for @mantine/form internal types
declare module '@mantine/form/lib/types' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type SetFieldValue<Values> = any
}
