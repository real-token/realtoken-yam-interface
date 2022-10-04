import useSWR from 'swr';

// export const API = 'https://api.realt.community/v1/token/'; // use this for mainnet
export const API =
  'https://yam-marketplace-test-default-rtdb.europe-west1.firebasedatabase.app/'; // for testing
export type API = {
  fullName: string;
  shortName: string;
  symbol: string;
  tokenPrice: number;
  currency: string;
  ethereumContract: string | null;
  xDaiContract: string;
  lastUpdate: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
};

type UseAPI = (tokenAddress: string) => {
  api: API;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isError: any;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useAPI: UseAPI = (tokenAddress: string) => {
  const { data, error } = useSWR(API + tokenAddress + '.json', fetcher); // delete '.json' for mainnet

  return {
    api: data,
    isLoading: !error && !data,
    isError: error,
  };
};
