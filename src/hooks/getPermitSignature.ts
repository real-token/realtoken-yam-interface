import { BigNumberish, Signature, Wallet, constants } from 'ethers';
import { splitSignature } from 'ethers/lib/utils';

import { BridgeToken } from '../abis/types/BridgeToken';

export async function getPermitSignature(
  account: string,
  wallet: Wallet,
  token: BridgeToken,
  spender: string,
  value: BigNumberish = constants.MaxUint256,
  deadline = constants.MaxUint256,
  permitConfig?: {
    nonce?: BigNumberish;
    name?: string;
    chainId?: number;
    version?: string;
  }
): Promise<Signature> {
  const [nonce, name, version, chainId] = await Promise.all([
    permitConfig?.nonce ?? token.nonces(wallet.address),
    permitConfig?.name ?? token.name(),
    permitConfig?.version ?? '1',
    permitConfig?.chainId ?? wallet.getChainId(),
  ]);

  return splitSignature(
    await wallet._signTypedData(
      // eslint-disable-next-line object-shorthand
      {
        name,
        version,
        chainId,
        verifyingContract: token.address,
      },
      {
        Permit: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
          {
            name: 'nonce',
            type: 'uint256',
          },
          {
            name: 'deadline',
            type: 'uint256',
          },
        ],
      },
      // eslint-disable-next-line object-shorthand
      {
        owner: account,
        spender,
        value,
        nonce,
        deadline,
      }
    )
  );
}
