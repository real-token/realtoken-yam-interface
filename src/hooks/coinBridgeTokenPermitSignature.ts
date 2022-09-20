import type { Web3Provider } from '@ethersproject/providers';

import type { Contract } from 'ethers';
import { utils } from 'ethers';

import { CoinBridgeToken } from '../abis/types/CoinBridgeToken';

const coinBridgeTokenPermitSignature = async (
  owner: string,
  spender: string,
  amount: string,
  transactionDeadline: number,
  contract: CoinBridgeToken,
  // contract: Contract,
  library: Web3Provider
) => {
  try {
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
      version: (await contract.VERSION()).toString(), // get version of token since RealToken is upgraded to V2, otherwise wrong signature
      chainId: library.network.chainId,
      verifyingContract: contract.address,
    };
    // console.log('domain: ', domain);

    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ];

    const message = {
      owner,
      spender,
      value: amount.toString(),
      nonce: nonce.toHexString(),
      deadline: transactionDeadline,
    };
    // console.log('message: ', message);

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
    return {
      r,
      s,
      v,
    };
  } catch (e) {
    console.log('Error getting permit signature: ', e);
    return e;
  }
};

export default coinBridgeTokenPermitSignature;
