import { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { ComboboxItem } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { SellFormValues } from '../CreateOfferModal';
import { OFFER_TYPE } from '../../../../types/offer';
import { useShield } from '../../../../hooks/useShield';

type Values = SellFormValues & {
    setFieldValue: UseFormReturnType<SellFormValues>['setFieldValue'];
    offerTokens: ComboboxItem[];
    buyerTokens: ComboboxItem[];
    properties: ComboboxItem[];
    allowedTokens: ComboboxItem[];
    offerTokenPrice: number | undefined;
    buyerTokenPrice: number | undefined;
    isLoading: boolean;
    onSubmit: (values: SellFormValues) => void;
    offerType: OFFER_TYPE
} 

export type PriceUnit = 'dollar' | 'token';

export type CreateOfferContextType = Values & {
    priceUnit: PriceUnit;
    setPriceUnit: (value: PriceUnit) => void;
    buyerTokens: ComboboxItem[];
    offerTokens: ComboboxItem[];
    offerTokenSymbol: string | undefined;
    buyTokenSymbol: string | undefined;
    choosedPrice: number | undefined;
    setChoosedPrice: (value: number | undefined) => void;
    shieldError: boolean;
    maxPriceDifference: number;
    priceDifference: number;
}

const CreateOfferContext = createContext<CreateOfferContextType | undefined>(undefined);

interface CreateOfferProviderProps {
  children: ReactNode;
  values: Values;
}

export const CreateOfferProvider: React.FC<CreateOfferProviderProps> = ({ children, values }) => {

    const [priceUnit, setPriceUnit] = useState<PriceUnit>('dollar');
    const [choosedPrice, setChoosedPrice] = useState<number|undefined>();

    const offerTokenSymbol = useMemo(() => {
        return values.offerTokens.find((token) => token.value === values.offerTokenAddress)?.label;
    },[values]);

    const buyTokenSymbol = useMemo(() => {
        return values.buyerTokens.find(value => value.value == values.buyerTokenAddress)?.label;
    },[values]);

    const { isError: shieldError, maxPriceDifference, priceDifference } = useShield(values.offerType, choosedPrice, values.offerType == OFFER_TYPE.BUY ? values.buyerTokenPrice : values.offerTokenPrice );

    return (
        <CreateOfferContext.Provider
            value={{
                priceUnit,
                setPriceUnit,
                shieldError, 
                offerTokenSymbol, 
                buyTokenSymbol,
                choosedPrice,
                setChoosedPrice,
                maxPriceDifference,
                priceDifference: priceDifference ?? 0,
                ...values
            }}
        >
            {children}
        </CreateOfferContext.Provider>
    );
};

export const useCreateOfferContext = () => {
  const context = useContext(CreateOfferContext);
  if (!context) {
    throw new Error('useCreateOfferContext must be used within a CreateOfferProvider');
  }
  return context;
};
