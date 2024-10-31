import { useUserBalance } from "../hooks/interface/useUserBalance";
import { usePrices } from "../hooks/interface/usePrices";
import { useWlProperties } from "../hooks/interface/useWlProperties";

interface InitStoreProps{
    children: React.ReactElement | React.ReactElement[]
}
export default function InitStoreProvider({ children }: InitStoreProps){

    // useProperties();
    // useUserBalance();
    // usePrices();
    // useWlProperties();

    // Fetch offers
    
    // console.log('OFFERS: ', offers, offersAreLoading);

    return (<>{children}</>)
}