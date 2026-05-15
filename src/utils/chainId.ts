/**
 * Convertit un chainId hex (0x64) ou décimal en nombre pour wagmi / viem.
 */
export function parseChainId(chainId: string | number): number {
  if (typeof chainId === 'number') {
    return chainId;
  }
  const value = chainId.trim();
  if (value.startsWith('0x') || value.startsWith('0X')) {
    return parseInt(value, 16);
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid chain id: ${chainId}`);
  }
  return parsed;
}

export function toChainIdHex(chainId: number): `0x${string}` {
  return `0x${chainId.toString(16)}`;
}
