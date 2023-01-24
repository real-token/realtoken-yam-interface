import { RootState } from "src/store/store";
import { CreatedOffer } from "src/types/offer/CreatedOffer";

export const selectCreateOffers = (state: RootState): CreatedOffer[] => state.createOffers.offers;