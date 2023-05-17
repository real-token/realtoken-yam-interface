import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Displays } from "src/types/Displays";
import { OFFER_TYPE } from "src/types/offer/OfferType";
import { DEFAULT_WL_TOKEN, WLToken } from "src/types/WlToken";

// MARKET
export const isRefreshedAutoAtom = atomWithStorage<boolean>("isRefreshedAuto",false);
export const nameFilterValueAtom = atom<string>("");
export const tableOfferTypeAtom = atom<OFFER_TYPE>(OFFER_TYPE.SELL)

// INTERFACE 
export const displayChoosedAtom = atomWithStorage<string>("displayChoosed",Displays.TABLE);
export const shieldDisabledAtom = atomWithStorage<boolean>("shieldDisabled",false);
export const shieldValueAtom = atomWithStorage<number>("shieldValue",0.05);
export const wlTokensAtom = atom<WLToken[]>([DEFAULT_WL_TOKEN]);
export const providerAtom = atomWithStorage<string>("provider","");
export const multiPathMultiCurrencyAtom = atom<boolean>(true);