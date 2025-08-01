import { PropertiesToken } from '@real-token/types';
import { useQuery } from '@tanstack/react-query';

import { useChainId } from 'wagmi';

import { getExtendedTokens } from '../../constants/GetPriceToken';
import { REACT_QUERY_ERRORS } from '../../types/ReactQueryErrors';
import { mergeExtendedProperties } from '../../utils/properties';

type UseProperties = () => {
  propertiesAreLoading: boolean;
  properties: PropertiesToken[] | undefined;
};
export const useProperties: UseProperties = () => {
  const chainId = useChainId();

  // Fetch properties
  const {
    isLoading,
    data: properties,
    isSuccess,
  } = useQuery({
    queryKey: ['properties', chainId],
    meta: { errCode: REACT_QUERY_ERRORS.FETCH_WL_PROPERTIES },
    enabled: !!chainId,
    queryFn: async (): Promise<PropertiesToken[]> => {
      if (!chainId) return [];
      const response = await fetch(`/api/properties/${chainId}`);
      if (response.ok) {
        const responseJson: PropertiesToken[] = await response.json();
        return mergeExtendedProperties(
          responseJson,
          getExtendedTokens(chainId)
        );
      }
      return [];
    },
  });

  return {
    propertiesAreLoading: isLoading,
    properties: properties,
  };
};
