/** Tokens RMM v3 (Gnosis) : permit via `EIP712_REVISION`, pas `version()`. */
export const RMM_V3_TOKEN_ADDRESSES = [
  '0x0ca4f5554dd9da6217d62d8df2816c82bba4157b',
  '0xed56f76e9cbc6a64b821e9c016eafbd3db5436d1',
] as const;

export const isRmmV3TokenAddress = (address: string): boolean =>
  RMM_V3_TOKEN_ADDRESSES.some(
    (known) => known.toLowerCase() === address.toLowerCase()
  );
