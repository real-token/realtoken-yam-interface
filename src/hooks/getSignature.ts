import type { Web3Provider } from '@ethersproject/providers';

import type { Contract } from 'ethers';
import { utils } from 'ethers';

import { BridgeToken } from 'src/abis';

const erc721PermitSignature = async (
  owner: string,
  spender: string,
  token: BridgeToken,
  contract: Contract,
  library: Web3Provider
) => {
  try {
    const transactionDeadline = Date.now() + 20 * 60;
    const nonce = await contract.nonces(owner);
    const contractName = await contract.name();
    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ];
    const domain = {
      name: contractName,
      version: '1',
      chainId: library.network.chainId,
      verifyingContract: contract.address,
    };
    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'token', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ];
    const tokenId = await token.name();
    // eslint-disable-next-line object-shorthand
    const message = {
      owner,
      spender,
      tokenId,
      nonce: nonce.toHexString(),
      deadline: transactionDeadline,
    };
    // eslint-disable-next-line object-shorthand
    const data = JSON.stringify({
      types: {
        EIP712Domain,
        Permit,
      },
      domain,
      primaryType: 'Permit',
      message,
    });

    const signature = await library.send('eth_signTypedData_v4', [owner, data]);
    const signData = utils.splitSignature(signature as string);
    const { r, s, v } = signData;
    // eslint-disable-next-line object-shorthand
    return {
      r,
      s,
      v,
      deadline: transactionDeadline,
    };
  } catch (e) {
    throw Error(`${e}`);
  }
};

export default erc721PermitSignature;
