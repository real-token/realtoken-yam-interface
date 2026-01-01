import { useUserBalance } from "../hooks/interface/useUserBalance";
import { usePrices } from "../hooks/interface/usePrices";
import { useWlProperties } from "../hooks/interface/useWlProperties";
import { createLogger } from '../utils/logger';
const logger = createLogger('src/providers/InitStoreProvider');

interface InitStoreProps{
    children: React.ReactElement | React.ReactElement[]
}
export default function InitStoreProvider({ children }: InitStoreProps){

    // useProperties();
    // useUserBalance();
    // usePrices();
    // useWlProperties();

    // Fetch offers


    return (<>{children}</>)
}