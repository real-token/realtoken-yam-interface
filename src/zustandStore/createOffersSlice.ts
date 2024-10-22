import { StateCreator } from "zustand"
import { RootStore } from "./store"
import { CreatedOffer } from "../types/offer/CreatedOffer";

export interface CreateOffersSlice{
    offersToCreate: CreatedOffer[];
    addOffer: (offer: CreatedOffer) => void;
    addOffers: (offers: CreatedOffer[]) => void;
    removeOffer: (offerId: number) => void;
    modifyOffer: (offerId: number, offer: CreatedOffer) => void;

    approvals: { [key: string]: boolean },
    addApproval: (token: string, approved: boolean) => void;
    resetApprovals: () => void;

    resetOffers: () => void;
}

export const createCreateOfferSlice: StateCreator<
    RootStore,
    [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
    [],
    CreateOffersSlice
> = (set, get) => {
    return {
        offersToCreate: [],
        addOffer: (offer: CreatedOffer) => set({ offersToCreate: [...get().offersToCreate, offer] }),
        addOffers: (offers: CreatedOffer[]) => set({ offersToCreate: [...get().offersToCreate, ...offers] }),
        removeOffer: (offerId: number) => set({ offersToCreate: get().offersToCreate.filter(offer => offer.offerId !== offerId) }),
        modifyOffer: (offerId: number, offer: CreatedOffer) => set(state => {
            const offerIndex = state.offersToCreate.findIndex(o => o.offerId === offerId);
            const offers = [...state.offersToCreate];
            offers[offerIndex] = offer;
            return {
                ...state,
                offersToCreate: offers
            }
        }),
        approvals: {},
        addApproval: (token: string, approved: boolean) => set({ approvals: { ...get().approvals, [token]: approved } }),
        resetApprovals: () => set({ approvals: {} }),

        resetOffers: () => set({ offersToCreate: [] }),
    } 
}