import { ColumnDef } from "@tanstack/react-table";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { tableOfferTypeAtom } from "src/states";
import { Offer, OFFER_TYPE } from "src/types/offer";
import { amountColumn, buyerTokenNameColumn, buyShortTokenNameColumn, header, idColumn, offerShortTokenNameColumn, offerTokenNameColumn, offerYieldColumn, officialPriceColumn, originalYieldColumn, priceColumn, publicActionsColumn, sellerAddressColumn, typeColumn } from "./column";

type UseRightTableColumn = () => ColumnDef<Offer>[]
export const useRightTableColumn: UseRightTableColumn = ()  => {

    const tableOfferType = useAtomValue(tableOfferTypeAtom);

    const { t } = useTranslation('buy', { keyPrefix: 'table' }); 

    const sellColumns = useMemo(() => [
        {
            id: 'title',
            header: () => header({ title: t('title') }),
            meta: { colSpan: 14 },
            columns: [
                idColumn(t,1),
                offerShortTokenNameColumn(t,2),
                buyerTokenNameColumn(t,2),
                originalYieldColumn(t,1),
                offerYieldColumn(t,1),
                sellerAddressColumn(t,1),
                officialPriceColumn(t,1),
                priceColumn(t,2),
                amountColumn(t,2),
                publicActionsColumn(t,1)
            ]
    }],[t]);

    const buyColumns = useMemo(() => [{
        id: 'title',
        header: () => header({ title: t('title') }),
        meta: { colSpan: 14 },
        columns: [
            idColumn(t,1),
            offerTokenNameColumn(t,2),
            buyShortTokenNameColumn(t,2),
            originalYieldColumn(t,1),
            offerYieldColumn(t,1),
            sellerAddressColumn(t,1),
            officialPriceColumn(t,1),
            priceColumn(t,2),
            amountColumn(t,2),
            publicActionsColumn(t,1)
        ]}
    ],[t]);

    const exchangeColumn = useMemo(() => [
        {
            id: 'title',
            header: () => header({ title: t('title') }),
            meta: { colSpan: 11 },
            columns: [
                idColumn(t,1),
                offerTokenNameColumn(t,2),
                buyerTokenNameColumn(t,2),
                sellerAddressColumn(t,1),
                priceColumn(t,2),
                amountColumn(t,2),
                publicActionsColumn(t,1)
            ]
        }
    ],[t])

    const rightColumn: ColumnDef<Offer>[] = useMemo(() => {
        switch(tableOfferType){
            case OFFER_TYPE.SELL:
                return sellColumns;
            case OFFER_TYPE.BUY:
                return buyColumns;
            case OFFER_TYPE.EXCHANGE:
                return exchangeColumn;
            default:
                return exchangeColumn;
        }
    },[buyColumns, exchangeColumn, sellColumns, tableOfferType])

    return rightColumn;

}