import { RootState } from "src/store/store";
import { CreatedOffer } from "src/types/Offer/CreatedOffer";

export const selectCreateOffers = (state: RootState): CreatedOffer[] => state.createOffers.offers;