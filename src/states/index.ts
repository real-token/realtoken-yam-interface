import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Displays } from "src/types/Displays";
import { OFFER_TYPE } from "src/types/Offer";

// MARKET
export const isRefreshedAutoAtom = atomWithStorage<boolean>("isRefreshedAuto",false);
export const nameFilterValueAtom = atom<string>("");
export const sortValueAtom = atom<OFFER_TYPE|undefined>(undefined)

// INTERFACE 
export const displayChoosedAtom = atomWithStorage<Displays>("displayChoosed",Displays.TABLE);