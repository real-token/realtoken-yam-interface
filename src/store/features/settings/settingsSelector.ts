import { RootState } from 'src/store/store';

export const selectAddress = (state: RootState): string =>
  state.settings.address.toLowerCase();
