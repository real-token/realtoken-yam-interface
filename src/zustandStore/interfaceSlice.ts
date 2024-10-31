import { StateCreator } from "zustand";
import { RootStore } from "./store";
import { Offer } from "../types/offer";

export interface InterfaceSlice{
  offers: Offer[];

  interfaceIsLoading: boolean;
  theGraphHasIssue: boolean;
  setTheGraphIssue: (theGraphHasIssue: boolean) => void;
}

export const createInterfaceSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  InterfaceSlice
> = (set, get) => {
  return {
    offers: [],
    interfaceIsLoading: false,
    theGraphHasIssue: false,
    setTheGraphIssue: (theGraphHasIssue: boolean) => set({ theGraphHasIssue }),
  };
};