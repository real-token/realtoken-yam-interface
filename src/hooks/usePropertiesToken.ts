/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  selectProperties,
  selectPropertiesIsLoading,
} from 'src/store/features/interface/interfaceSelector';
import { PropertiesToken } from 'src/types/PropertiesToken';

import { Offer } from '../types/offer/Offer';

type usePropertiesTokenReturn = {
  propertiesToken: PropertiesToken[];
  propertiesIsloading: boolean;
  getPropertyToken: (address: string) => PropertiesToken | undefined;
};

export const usePropertiesToken = (): usePropertiesTokenReturn => {
  const propertiesToken = useSelector(selectProperties);
  const propertiesIsloading = useSelector(selectPropertiesIsLoading);

  const getPropertyToken = (address: string): PropertiesToken | undefined => {
    return propertiesToken.find(
      (propertyToken) =>
        propertyToken.contractAddress.toLocaleLowerCase() ==
        address.toLowerCase()
    );
  };

  return {
    propertiesToken,
    propertiesIsloading,
    getPropertyToken,
  };
};

type usePropertyTokenReturn = {
  propertiesToken: PropertiesToken | undefined;
  propertiesIsloading: boolean;
};

export const usePropertyToken = (
  offer: Offer | undefined
): usePropertyTokenReturn => {
  const propertiesTokens = useSelector(selectProperties);
  const propertiesIsloading = useSelector(selectPropertiesIsLoading);
  const [propertiesToken, setPropertiesToken] = useState<
    PropertiesToken | undefined
  >(undefined);

  const getPropertiesToken = (address: string): PropertiesToken | undefined => {
    return propertiesTokens.find(
      (properties) =>
        properties.contractAddress.toLocaleLowerCase() == address.toLowerCase()
    );
  };

  useEffect(() => {
    if (!offer || propertiesIsloading || propertiesToken) return undefined;

    if (offer.buyerTokenType == 1) {
      const token = getPropertiesToken(offer.buyerTokenAddress);
      if (token) setPropertiesToken(token);
    }

    if (offer.offerTokenType == 1) {
      const token = getPropertiesToken(offer.offerTokenAddress);
      if (token) setPropertiesToken(token);
    }
  }, [getPropertiesToken, offer, propertiesIsloading]);

  return {
    propertiesToken,
    propertiesIsloading,
  };
};
