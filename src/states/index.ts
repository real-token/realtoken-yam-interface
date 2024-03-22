import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { Displays } from 'src/types/Displays';
import { DEFAULT_WL_TOKEN, WLToken } from 'src/types/WlToken';
import { OFFER_TYPE } from 'src/types/offer/OfferType';

// MARKET
export const isRefreshedAutoAtom = atomWithStorage<boolean>(
  'isRefreshedAuto',
  false,
);
export const nameFilterValueAtom = atom<string>('');
export const tableOfferTypeAtom = atom<OFFER_TYPE>(OFFER_TYPE.SELL);
export const statesFilterTokenAtom = atom<Map<string, boolean>>(new Map());

// INTERFACE
export const displayChoosedAtom = atomWithStorage<string>(
  'displayChoosed',
  Displays.LIST,
);
export const shieldDisabledAtom = atomWithStorage<boolean>(
  'shieldDisabled',
  false,
);
export const offerDetailEnabledAtom = atom<boolean>(false);

export const selectedOfferAtom = atom<string>('');

export const shieldValueAtom = atomWithStorage<number>('shieldValue', 0.05);
export const wlTokensAtom = atom<WLToken[]>([DEFAULT_WL_TOKEN]);
export const providerAtom = atomWithStorage<string>('provider', '');
export const multiPathMultiCurrencyAtom = atom<boolean>(true);
