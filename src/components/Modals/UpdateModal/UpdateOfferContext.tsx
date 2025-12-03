import { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { OFFER_TYPE } from '../../../types/offer';
import { useShield } from '../../../hooks/useShield';
import { Offer } from '../../../types/offer/Offer';

export type PriceUnit = 'dollar' | 'token';

type UpdateFormValues = {
  offerId: string;
  price: number;
  amount: number;
  offerTokenAddress: string;
  offerTokenDecimals: number;
  buyerTokenAddress: string;
  buyerTokenDecimals: number;
  choosedPrice?: number;
  useBuyTokenPrice?: boolean;
  priceUnit?: PriceUnit;
};

type Values = UpdateFormValues & {
  setFieldValue: UseFormReturnType<UpdateFormValues>['setFieldValue'];
  offerTokenPrice: number | undefined;
  buyerTokenPrice: number | undefined;
  offer: Offer;
  offerTokenSymbol: string | undefined;
  buyTokenSymbol: string | undefined;
};

export type UpdateOfferContextType = Values & {
  priceUnit: PriceUnit;
  setPriceUnit: (value: PriceUnit) => void;
  choosedPrice: number | undefined;
  setChoosedPrice: (value: number | undefined) => void;
  shieldError: boolean;
  maxPriceDifference: number;
  priceDifference: number;
};

const UpdateOfferContext = createContext<UpdateOfferContextType | undefined>(undefined);

interface UpdateOfferProviderProps {
  children: ReactNode;
  values: Values;
}

export const UpdateOfferProvider: React.FC<UpdateOfferProviderProps> = ({ children, values }) => {
  const [priceUnit, setPriceUnit] = useState<PriceUnit>(values.priceUnit || 'dollar');

  const setChoosedPrice = (value: number | undefined) => {
    values.setFieldValue('choosedPrice', value);
  };

  // Get choosedPrice from values, fallback to calculating from price if not set
  const choosedPrice = useMemo(() => {
    if (values.choosedPrice !== undefined) {
      return values.choosedPrice;
    }
    // Calculate from price if choosedPrice is not set
    if (values.price && values.buyerTokenPrice) {
      if (values.offer.type == OFFER_TYPE.BUY) {
        return (1 / values.price) * (values.offerTokenPrice || 1);
      } else {
        return values.price * values.buyerTokenPrice;
      }
    }
    return undefined;
  }, [values.choosedPrice, values.price, values.buyerTokenPrice, values.offerTokenPrice, values.offer.type]);

  const { isError: shieldError, maxPriceDifference, priceDifference } = useShield(
    values.offer.type || OFFER_TYPE.SELL,
    choosedPrice,
    values.offer.type == OFFER_TYPE.BUY ? values.buyerTokenPrice : values.offerTokenPrice
  );

  return (
    <UpdateOfferContext.Provider
      value={{
        priceUnit,
        setPriceUnit,
        shieldError,
        setChoosedPrice,
        maxPriceDifference,
        priceDifference: priceDifference ?? 0,
        choosedPrice,
        ...values,
      }}
    >
      {children}
    </UpdateOfferContext.Provider>
  );
};

export const useUpdateOfferContext = () => {
  const context = useContext(UpdateOfferContext);
  if (!context) {
    throw new Error('useUpdateOfferContext must be used within an UpdateOfferProvider');
  }
  return context;
};

