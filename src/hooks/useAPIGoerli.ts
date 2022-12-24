import useSWR from 'swr';

// export const API = 'https://api.realt.community/v1/token/'; // use this for mainnet
export const APIUrlGoerli = 'https://api.preprod.realt.community/v1/token/'; // for testing
export const authGoerli =
  '?realtAuthToken=8c4df57f-preprod-1e94-f29e-dfc1eb62d619';

type UseAPI = (tokenAddress: string) => {
  api: usedAPIGoerli;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isError: any;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useAPIGoerli: UseAPI = (tokenAddress: string) => {
  const { data, error } = useSWR(
    APIUrlGoerli + tokenAddress + authGoerli,
    fetcher
  ); // TODO use other API for mainnet

  return {
    api: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export type usedAPIGoerli = {
  fullName: string;
  tokenPrice: number;
};

export type fullAPIGoerli = {
  fullName: string;
  shortName: string;
  symbol: string;
  tokenPrice: number;
  canal: string;
  currency: string;
  totalTokens: number;
  totalTokensRegSummed: number;
  uuid: string;
  ethereumContract: string;
  xDaiContract: string;
  gnosisContract: string;
  goerliContract: string;
  totalInvestment: number;
  grossRentYear: number;
  grossRentMonth: number;
  propertyManagement: number;
  propertyManagementPercent: number;
  realtPlatform: number;
  realtPlatformPercent: number;
  insurance: number;
  propertyTaxes: number;
  utilities: number;
  initialMaintenanceReserve: number;
  netRentDay: number;
  netRentMonth: number;
  netRentYear: number;
  netRentDayPerToken: number;
  netRentMonthPerToken: number;
  netRentYearPerToken: number;
  annualPercentageYield: number;
  coordinate: { lat: string; lng: string };
  marketplaceLink: string;
  imageLink: string[];
  propertyType: number | null;
  squareFeet: number | null;
  lotSize: number | null;
  bedroomBath: string | null;
  hasTenants: boolean;
  rentedUnits: number | null;
  totalUnits: number | null;
  termOfLease: string | null;
  renewalDate: string | null;
  section8paid: number | null;
  sellPropertyTo: string | null;
  secondaryMarketplace: { UniswapV1: number | null; UniswapV2: number | null };
  secondaryMarketplaces: [
    {
      chainId: number;
      chainName: string;
      dexName: string;
      contractPool: string;
      pair: {
        contract: string;
        symbol: string;
        name: string;
      };
    }
  ];
  blockchainAddresses: {
    ethereum: {
      chainName: string;
      chainId: number;
      contract: string;
      distributor: string;
      maintenance: string;
    };
    xDai: {
      chainName: string;
      chainId: number;
      contract: string;
      distributor: string;
      rmmPoolAddress: number;
      chainlinkPriceContract: string;
    };
    goerli: {
      chainName: string;
      chainId: number;
      contract: string;
      distributor: string;
      rmmPoolAddress: number;
      chainlinkPriceContract: number;
    };
  };
  underlyingAssetPrice: number | null;
  renovationReserve: string | null;
  propertyMaintenanceMonthly: number | null;
  rentStartDate: {
    date: string | null;
    timezone_type: number | null;
    timezone: string | null;
  };
  lastUpdate: {
    date: string | null;
    timezone_type: number | null;
    timezone: string | null;
  };
  originSecondaryMarketplaces: [
    {
      chainId: number | null;
      chainName: string | null;
      dexName: string | null;
      contractPool: string | null;
    }
  ];
  initialLaunchDate: {
    date: string | null;
    timezone_type: number | null;
    timezone: string | null;
  };
  seriesNumber: number | null;
  constructionYear: number | null;
  constructionType: string | null;
  roofType: string | null;
  assetParking: string | null;
  foundation: string | null;
  heating: string | null;
  cooling: string | null;
  tokenIdRules: number | null;
  rentCalculationType: string | null;
  realtListingFeePercent: string | null;
  realtListingFee: string | null;
  miscellaneousCosts: string | null;
  propertyStories: string | null;
};
