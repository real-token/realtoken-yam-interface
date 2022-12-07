import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

export const isRefreshedAutoAtom = atomWithStorage<boolean>("isRefreshedAuto",false);
export const nameFilterValueAtom = atom<string>("");