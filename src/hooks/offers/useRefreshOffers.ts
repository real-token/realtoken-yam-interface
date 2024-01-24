import { useRootStore } from '../../zustandStore/store';

type UseRefreshOffers = () => {
    offersIsLoading: boolean
    refreshOffers: () => void
}
export const useRefreshOffers: UseRefreshOffers = () => {

  const [interfaceIsLoading, refreshInterfaceOffers] = useRootStore((state) => [state.interfaceIsLoading, state.refreshOffers]);

  const refreshOffers = () => refreshInterfaceOffers();

  // eslint-disable-next-line object-shorthand
  return{
    offersIsLoading: interfaceIsLoading,
    refreshOffers: refreshOffers
  }

};