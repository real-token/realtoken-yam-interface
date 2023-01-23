import { useMantineTheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { OFFER_TYPE } from "src/types/offer";

interface OFFER_TYPE_PARAM{
    color: string,
    name: string
}

type UseOfferType = () => {
    offersColor: Map<OFFER_TYPE,OFFER_TYPE_PARAM>;
    getColor: (offerType: OFFER_TYPE) => string|undefined;
    getI18OfferTypeName: (offerType: OFFER_TYPE) => string|undefined
}

export const useOfferType: UseOfferType = () => {

    const { colors } = useMantineTheme();
    const { t } = useTranslation('buy', { keyPrefix: 'grid' })

    const OFFER_COLORS: Map<OFFER_TYPE,OFFER_TYPE_PARAM> = new Map<OFFER_TYPE,OFFER_TYPE_PARAM>([
        [OFFER_TYPE.BUY,{ 
            color: colors.green[9],
            name: t("buy")
        }],
        [OFFER_TYPE.SELL,{ 
            color: colors.red[9],
            name: t("sell"),
        }],
        [OFFER_TYPE.EXCHANGE,{ 
            color: colors.orange[6],
            name: t("exchange")
        }]
    ]);

    const getI18OfferTypeName = (offerType: OFFER_TYPE): string|undefined => {
        return OFFER_COLORS.has(offerType) ? OFFER_COLORS.get(offerType)?.name : undefined;
    }

    const getColor = (offerType: OFFER_TYPE): string|undefined  => {
        return OFFER_COLORS.has(offerType) ? OFFER_COLORS.get(offerType)?.color : undefined;
    }

    return{
        offersColor: OFFER_COLORS,
        getColor: getColor,
        getI18OfferTypeName: getI18OfferTypeName
    }
}