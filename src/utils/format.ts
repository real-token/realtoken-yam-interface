import { TFunction } from 'react-i18next';

import { BigNumber } from 'bignumber.js';

export const formatUsd = (
  tvl: number,
  digit = 0,
  symbol = '$',
  currency = 'USD',
  oraclePrice = 1,
  hasData = true
) => {
  if (!hasData) return ' - ' + symbol;

  // TODO: bignum?
  if (oraclePrice) {
    tvl /= oraclePrice;
  }
  const order = Math.floor(Math.log10(tvl) / 3);

  const units = ['', 'k', 'M', 'B', 'T'];
  const shouldShowUnits = order > 1; // only use units if 1M+
  let unitToDisplay = '';
  let num = tvl;

  if (shouldShowUnits) {
    num = tvl / 1000 ** order;
    unitToDisplay = units[order] ?? '';
  }
  const prefix = symbol;
  const digitSmallNumber = digit === 0 ? 2 : digit;

  return num < 999
    ? prefix + num.toFixed(digitSmallNumber) + unitToDisplay
    : tvl.toLocaleString('en-US', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: digit,
        minimumFractionDigits: digit,
      });
};

export const formatSimpleUsd = (
  tvl: number,
  hasData = true,
  digit = 0,
  symbol = '$',
  currency = 'USD',
  oraclePrice = 1
) => {
  return formatUsd(tvl, digit, symbol, currency, oraclePrice, hasData);
};

/**
 * Formats a number to output as a percent% string
 * @param percent as decimal e.g. 0.01 to represent 1%
 * @param dp
 * @param placeholder
 */
export const formatPercent = (
  percent: number | null | undefined,
  dp = 2,
  placeholder = '?'
) => {
  if (!percent && percent !== 0) return placeholder;

  if (percent === 0) {
    return '0%';
  }

  // Convert to number
  const numberPercent: number = percent * 100;

  const units = ['', 'k', 'M', 'B', 'T', 'Q', 'S'];
  const order = Math.floor(Math.log10(numberPercent) / 3);

  // Show fire symbol if very large %
  if (order >= units.length - 1) return `🔥`;

  // Magnitude to display
  let unitToDisplay = '';
  let num: number = numberPercent;
  if (order > 1) {
    num = numberPercent / 1000 ** order;
    unitToDisplay = units[order];
  }

  // Format output
  return num < 999
    ? `${num.toFixed(dp)}${unitToDisplay}%`
    : numberPercent.toLocaleString('en-US', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }) + '%';
};

export function formatSmallPercent(
  percent: number,
  maxPlaces = 2,
  minPlaces = 0,
  formatZero = false,
  hasData = true
): string {
  if (!hasData) return '- %';
  return !formatZero && percent === 0
    ? '0%'
    : (percent * 100).toLocaleString('en-US', {
        maximumFractionDigits: maxPlaces,
        minimumFractionDigits: minPlaces,
      }) + '%';
}

export function formatBigNumber(num: number) {
  let value = new BigNumber(num);
  value = value.decimalPlaces(2, BigNumber.ROUND_FLOOR);

  if (value.isZero()) {
    return '0';
  }
  const order = getBigNumOrder(value);
  if (value.abs().gte(100)) {
    value = value.decimalPlaces(0, BigNumber.ROUND_FLOOR);
  }
  if (order < 2 && value.abs().gte(100)) {
    return value.toNumber().toLocaleString('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
  const units = ['', 'k', 'M', 'B', 'T'];

  return value.shiftedBy(-order * 3).toFixed(2) + units[order];
}

export function getBigNumOrder(num: BigNumber): number {
  const nEstr = num
    .abs()
    .decimalPlaces(0, BigNumber.ROUND_FLOOR)
    .toExponential();
  const parts = nEstr.split('e');
  const exp = parseInt(parts[1] || '0');
  return Math.floor(exp / 3);
}

export function formatFullNumber(
  num: number,
  maxDp = 2,
  roundMode: BigNumber.RoundingMode = BigNumber.ROUND_HALF_UP
) {
  let value = new BigNumber(num);
  value = value.decimalPlaces(2, BigNumber.ROUND_HALF_UP);
  return stripTrailingZeros(
    value.toFormat(maxDp, roundMode, {
      prefix: '',
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: '.',
      fractionGroupSize: 0,
      suffix: '',
    })
  );
}
export function formatFullBigNumber(
  value: BigNumber,
  maxDp = 2,
  roundMode: BigNumber.RoundingMode = BigNumber.ROUND_HALF_UP
) {
  value = value.decimalPlaces(2, BigNumber.ROUND_HALF_UP);
  return stripTrailingZeros(
    value.toFormat(maxDp, roundMode, {
      prefix: '',
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: '.',
      fractionGroupSize: 0,
      suffix: '',
    })
  );
}

export const stripTrailingZeros = (str: string) => {
  return str.replace(/(\.[0-9]*?)(0+$)/, '$1').replace(/\.$/, '');
};

export function formatBigDecimals(num: number, maxPlaces = 8, strip = true) {
  const value = new BigNumber(num);

  if (value.isZero() && strip) {
    return '0';
  }

  const fixed = value.toFixed(maxPlaces);
  return strip ? stripTrailingZeros(fixed) : fixed;
}

export function formatBTC(num: number, hasData = true) {
  return (hasData ? formatBigDecimals(num) : '- ') + ' BTC';
}

export function formatToken(num: number, symbol = '', digit = -1) {
  let maxDp = 2;
  if (num > 999 && digit === -1) {
    maxDp = 0;
  } else if (digit >= 0) {
    maxDp = digit;
  }
  return formatFullNumber(num, maxDp) + (symbol == '' ? '' : ' ' + symbol);
}

export function formatSmallToken(num: number, symbol = '', digit = -1) {
  let maxDp = 4;
  if (num > 99 && digit === -1) {
    maxDp = 0;
  } else if (num > 9 && digit === -1) {
    maxDp = 1;
  } else if (num > 1 && digit === -1) {
    maxDp = 2;
  } else if (digit >= 0) {
    maxDp = digit;
  }
  return formatBigDecimals(num, maxDp) + (symbol == '' ? '' : ' ' + symbol);
}

export function formatHashrate(num: number, hasData = true) {
  if (!hasData) return '- TH/s';
  const numBig = new BigNumber(num);
  const value = numBig.dividedBy(new BigNumber(10).exponentiatedBy(12));
  return formatFullBigNumber(value, 0, 0) + ' TH/s';
}

export const formatUsdCentsPerKWh = (
  tvl: number,
  digit = 4,
  symbol = '$',
  currency = 'USD',
  oraclePrice = 1
) => {
  const usd = formatUsd(tvl, digit, symbol, currency, oraclePrice);
  const suffix = ' cts/kWh';

  return usd + suffix;
};

export function formatPeriod(
  d: number,
  t: TFunction<'site', 'card'>,
  inDay = false
): string {
  let label = '';
  if (inDay) {
    label = d > 1 ? d + t('days') : d + t('day');
  } else if (d >= 360 && d <= 366) {
    label = 1 + t('year');
  } else if (Math.round(d / 30) === d / 30) {
    label =
      Math.round(d / 30) + (Math.round(d / 30) > 1 ? t('months') : t('month'));
  } else if (Math.round(d / 31) === d / 31) {
    label =
      Math.round(d / 31) + (Math.round(d / 31) > 1 ? t('months') : t('month'));
  } else if (Math.ceil(d / 30) >= d / 30 && Math.ceil(d / 31) <= d / 31) {
    label =
      Math.ceil(d / 31) + (Math.ceil(d / 31) > 1 ? t('months') : t('month'));
  } else {
    label = d > 1 ? d + t('days') : d + t('day');
  }

  return label;
}

export function formatParenthesis(text: string): string {
  return '(' + text + ')';
}

export function formatTimestamp(timestamp: number): string {
  // Convertir le timestamp en millisecondes en multipliant par 1000
  const date = new Date(timestamp * 1000);

  // Utiliser les méthodes de l'objet Date pour extraire les composants de la date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Retourner la date formatée
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
export function formatTimestampDay(timestamp: number): string {
  // Convertir le timestamp en millisecondes en multipliant par 1000
  const date = new Date(timestamp * 1000);

  // Utiliser les méthodes de l'objet Date pour extraire les composants de la date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // Retourner la date formatée
  return `${day}/${month}/${year}`;
}
export function formatTimestampHour(timestamp: number): string {
  // Convertir le timestamp en millisecondes en multipliant par 1000
  const date = new Date(timestamp * 1000);

  // Utiliser les méthodes de l'objet Date pour extraire les composants de la date
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Retourner la date formatée
  return `${hours}:${minutes}:${seconds}`;
}
