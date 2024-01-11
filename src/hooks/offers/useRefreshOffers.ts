import { useRootStore } from '../../zustandStore/store';

type UseRefreshOffers = () => {
    offersIsLoading: boolean
    refreshOffers: () => void
}
export const useRefreshOffers: UseRefreshOffers = () => {

  const [offersAreLoading, setAskForRefresh] = useRootStore((state) => [state.offersAreLoading, state.setAskForRefresh]);

  const refreshOffers = () => setAskForRefresh(true);

  // eslint-disable-next-line object-shorthand
  return{
    offersIsLoading: offersAreLoading,
    refreshOffers: refreshOffers
  }

};