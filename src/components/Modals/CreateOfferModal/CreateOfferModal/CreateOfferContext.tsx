import { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { ComboboxItem } from '@mantine/core';
import { SellFormValues } from '../CreateOfferModal';
import { OFFER_TYPE } from '../../../../types/offer';

type Values = SellFormValues & {
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

export type CreateOfferContextType = Values & {
    shieldError: boolean;
    setShieldError: (value: boolean) => void;
    buyerTokens: ComboboxItem[];
    offerTokens: ComboboxItem[];
    offerTokenSymbol: string | undefined;
    buyTokenSymbol: string | undefined;
    choosedPrice: number | undefined;
    setChoosedPrice: (value: number | undefined) => void;
}

const CreateOfferContext = createContext<CreateOfferContextType | undefined>(undefined);

interface CreateOfferProviderProps {
  children: ReactNode;
  values: Values;
}

export const CreateOfferProvider: React.FC<CreateOfferProviderProps> = ({ children, values }) => {

    const [shieldError, setShieldError] = useState<boolean>(false);
    const [choosedPrice, setChoosedPrice] = useState<number | undefined>(undefined);

    const offerTokenSymbol = useMemo(() => {
        return values.offerTokens.find((token) => token.value === values.offerTokenAddress)?.label;
    },[values]);

    const buyTokenSymbol = useMemo(() => {
        return values.buyerTokens.find(value => value.value == values.buyerTokenAddress)?.label;
    },[values]); 

    return (
        <CreateOfferContext.Provider 
            value={{ 
                shieldError, 
                setShieldError,
                offerTokenSymbol, 
                buyTokenSymbol,
                setChoosedPrice,
                choosedPrice,
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
