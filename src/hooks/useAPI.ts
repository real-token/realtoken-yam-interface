import useSWR from 'swr';

export const API = 'https://api.realt.community/v1/tokens';

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
}[];

type UseAPI = () => {
  api: API | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isError: any;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useAPI: UseAPI = () => {
  const { data, error } = useSWR(API, fetcher);

  return {
    api: data,
    isLoading: !error && !data,
    isError: error,
  };
};
