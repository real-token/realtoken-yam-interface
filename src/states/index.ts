import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Displays } from "src/types/Displays";

// MARKET
export const isRefreshedAutoAtom = atomWithStorage<boolean>("isRefreshedAuto",false);
export const nameFilterValueAtom = atom<string>("");

// INTERFACE 
export const displayChoosedAtom = atomWithStorage<Displays>("displayChoosed",Displays.TABLE);