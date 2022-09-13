type ShortenString = (
  value: string | undefined,
  shortenOptions?: number | [number, number]
) => string;

export const shortenString: ShortenString = (
  value,
  shortenOptions = [4, 3]
) => {
  const isNumber = typeof shortenOptions === 'number';

  return `${value?.substring(
    0,
    isNumber ? shortenOptions : shortenOptions[0]
  )}...${value?.substring(
    value.length - (isNumber ? shortenOptions : shortenOptions[1])
  )}`;
};

export type ShortenStringOptions = Parameters<typeof shortenString>['1'];
