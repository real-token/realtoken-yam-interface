import { useTranslation } from 'react-i18next';

import { useMantineTheme } from '@mantine/core';

import { OFFER_TYPE } from 'src/types/offer';

interface OFFER_TYPE_PARAM {
  colorCode: string;
  color: string;
  name: string;
}

type UseOfferType = () => {
  offersColor: Map<OFFER_TYPE, OFFER_TYPE_PARAM>;
  getColorCode: (offerType: OFFER_TYPE) => string | undefined;
  getColor: (offerType: OFFER_TYPE) => string | undefined;
  getI18OfferTypeName: (offerType: OFFER_TYPE) => string | undefined;
};

export const useOfferType: UseOfferType = () => {
  const { colors } = useMantineTheme();
  const { t } = useTranslation('buy', { keyPrefix: 'grid' });

  const OFFER_COLORS: Map<OFFER_TYPE, OFFER_TYPE_PARAM> = new Map<
    OFFER_TYPE,
    OFFER_TYPE_PARAM
  >([
    [
      OFFER_TYPE.BUY,
      {
        colorCode: colors.green[9],
        color: 'green',
        name: t('buy'),
      },
    ],
    [
      OFFER_TYPE.SELL,
      {
        colorCode: colors.red[9],
        color: 'red',
        name: t('sell'),
      },
    ],
    [
      OFFER_TYPE.EXCHANGE,
      {
        colorCode: colors.orange[6],
        color: 'orange',
        name: t('exchange'),
      },
    ],
  ]);

  const getI18OfferTypeName = (offerType: OFFER_TYPE): string | undefined => {
    return OFFER_COLORS.has(offerType)
      ? OFFER_COLORS.get(offerType)?.name
      : undefined;
  };

  const getColorCode = (offerType: OFFER_TYPE): string | undefined => {
    return OFFER_COLORS.has(offerType)
      ? OFFER_COLORS.get(offerType)?.colorCode
      : undefined;
  };

  const getColor = (offerType: OFFER_TYPE): string | undefined => {
    return OFFER_COLORS.has(offerType)
      ? OFFER_COLORS.get(offerType)?.color
      : undefined;
  };

  return {
    offersColor: OFFER_COLORS,
    getColorCode: getColorCode,
    getColor: getColor,
    getI18OfferTypeName: getI18OfferTypeName,
  };
};
