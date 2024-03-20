import { RootState } from 'src/store/store';
import { createSelector } from 'reselect';

// export const selectAddress = (state: RootState): string =>
//   state.settings.address.toLowerCase();

export const selectAddress = createSelector(
  (state: RootState) => state.settings.address.toLowerCase(), // Remplacez par la logique appropriée
  (address) => address,
);
