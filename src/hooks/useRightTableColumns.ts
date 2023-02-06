import { ColumnDef } from "@tanstack/react-table";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { tableOfferTypeAtom } from "src/states";
import { Offer, OFFER_TYPE } from "src/types/offer";
import { amountColumn, buyerTokenNameColumn, buyShortTokenNameColumn, deleteOfferActionColumn, header, idColumn, modifyOfferActionColumn, offerShortTokenNameColumn, offerTokenNameColumn, offerYieldColumn, officialPriceColumn, officialYieldColumn, priceColumn, publicActionsColumn, sellerAddressColumn, viewActionColumn } from "./column";

export enum OFFERS_TYPE{
    PUBLIC,
    ADDRESS,
    PRIVATE
}

type UseRightTableColumn = (offersType: OFFERS_TYPE) => ColumnDef<Offer>[];
export const useRightTableColumn: UseRightTableColumn = (offersType)  => {

    const tableOfferType = useAtomValue(tableOfferTypeAtom);

    const { t } = useTranslation('buy', { keyPrefix: 'table' }); 

    // COLUMN BASE
    const basicSellColumns = useMemo(() => [
        idColumn(t,1),
        offerShortTokenNameColumn(t,2),
        buyerTokenNameColumn(t,2),
        officialYieldColumn(t,1),
        offerYieldColumn(t,1),
        sellerAddressColumn(t,1),
        officialPriceColumn(t,1),
        priceColumn(t,1),
        amountColumn(t,1),
    ],[t]);
    const basicBuyColumns = useMemo(() => [
        idColumn(t,1),
        offerTokenNameColumn(t,2),
        buyShortTokenNameColumn(t,2),
        officialYieldColumn(t,1),
        offerYieldColumn(t,1),
        sellerAddressColumn(t,1),
        officialPriceColumn(t,1),
        priceColumn(t,2),
        amountColumn(t,2)
    ],[t]);
    const basicExchangeColumns = useMemo(() => [
        idColumn(t,1),
        offerTokenNameColumn(t,2),
        buyShortTokenNameColumn(t,2),
        officialYieldColumn(t,1),
        offerYieldColumn(t,1),
        sellerAddressColumn(t,1),
        officialPriceColumn(t,1),
        priceColumn(t,2),
        amountColumn(t,2)
    ],[t]);

    // OFFER PUBLIC
    const sellPublicColumns = useMemo(() => [
        {
            id: 'title',
            header: () => header({ title: t('title') }),
            meta: { colSpan: 12 },
            columns: [
                ...basicSellColumns,
                publicActionsColumn(t,1)
            ]
        }
    ],[basicSellColumns, t]);
    const buyPublicColumns = useMemo(() => [
        {
            id: 'title',
            header: () => header({ title: t('title') }),
            meta: { colSpan: 14 },
            columns: [
                ...basicBuyColumns,
                publicActionsColumn(t,1)
            ]
        }
    ],[t,basicBuyColumns]);
    const exchangePublicColumn = useMemo(() => [
        {
            id: 'title',
            header: () => header({ title: t('title') }),
            meta: { colSpan: 11 },
            columns: [
                ...basicExchangeColumns,
                publicActionsColumn(t,1)
            ]
        }
    ],[t,basicExchangeColumns]);

    // OFFER ADDRESS
    const sellAddressColumns = useMemo(() => [
        {
            id: 'title',
            header: () => header({ title: t('title') }),
            meta: { colSpan: 12 },
            columns: [
                ...basicSellColumns,
                modifyOfferActionColumn(t,1),
                deleteOfferActionColumn(t,1),
                viewActionColumn(t,1)
            ]
        }
    ],[basicSellColumns, t]); 
    const buyAddressColumns = useMemo(() => [
        {
            id: 'title',
            header: () => header({ title: t('title') }),
            meta: { colSpan: 14 },
            columns: [
                ...basicBuyColumns,
                modifyOfferActionColumn(t,1),
                deleteOfferActionColumn(t,1),
                viewActionColumn(t,1)
            ]
        }
    ],[t,basicBuyColumns]);
    const exchangeAddressColumn = useMemo(() => [
        {
            id: 'title',
            header: () => header({ title: t('title') }),
            meta: { colSpan: 11 },
            columns: [
                ...basicExchangeColumns,
                modifyOfferActionColumn(t,1),
                deleteOfferActionColumn(t,1),
                viewActionColumn(t,1)
            ]
        }
    ],[t,basicExchangeColumns]);

    const publicColumns = useMemo(() => {
        return new Map<OFFER_TYPE,ColumnDef<Offer>[]>([
            [OFFER_TYPE.SELL,sellPublicColumns],
            [OFFER_TYPE.BUY,buyPublicColumns],
            [OFFER_TYPE.EXCHANGE,exchangePublicColumn]
        ]);
    },[buyPublicColumns, exchangePublicColumn, sellPublicColumns]) 
    const addressColumns = useMemo(() => {
        return new Map<OFFER_TYPE,ColumnDef<Offer>[]>([
            [OFFER_TYPE.SELL,sellAddressColumns],
            [OFFER_TYPE.BUY,buyAddressColumns],
            [OFFER_TYPE.EXCHANGE,exchangeAddressColumn]
        ]);
    },[buyAddressColumns, exchangeAddressColumn, sellAddressColumns]);

    const rightColumn: ColumnDef<Offer>[] = useMemo(() => {
        switch(offersType){
            case OFFERS_TYPE.PUBLIC:
                return publicColumns.get(tableOfferType);
            case OFFERS_TYPE.ADDRESS:
                return addressColumns.get(tableOfferType);
            case OFFERS_TYPE.PRIVATE:
                return publicColumns.get(tableOfferType);
            default:
                return publicColumns.get(tableOfferType);
        }
    },[addressColumns, offersType, publicColumns, tableOfferType])

    return rightColumn;

}