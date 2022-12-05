import { atomWithStorage } from 'jotai/utils'

export const isRefreshedAutoAtom = atomWithStorage<boolean>("isRefreshedAuto",false);