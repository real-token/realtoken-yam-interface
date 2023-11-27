import type { Web3Provider } from '@ethersproject/providers';

import { utils } from 'ethers';

import { CoinBridgeToken } from '../abis/types/CoinBridgeToken';

// This function is used for RealToken since the version is indicated within the token contract
const coinBridgeTokenPermitSignature = async (
  owner: string,
  spender: string,
  amount: string,
  transactionDeadline: number,
  contract: CoinBridgeToken,
  library: Web3Provider
) => {
  try {
    const nonce = await contract.nonces(owner); //BigNumber.from('2'); //await contract.nonces(owner);
    const contractName = await contract.name();
    //console.log('nonce contract: ', contractName, nonce);

    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ];

    const domain = {
      name: contractName,
      version: 3, //(await contract.VERSION()).toString(), // get version of token since RealToken is upgraded to V2, otherwise wrong signature
      chainId: library.network.chainId,
      verifyingContract: contract.address,
    };
    //console.log('domain: ', domain);

    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ];

    // eslint-disable-next-line object-shorthand
    const message = {
      owner,
      spender,
      value: amount.toString(),
      nonce: nonce.toHexString(),
      deadline: transactionDeadline,
    };
    //console.log('message: ', message);

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
    //console.log('data: ', data);

    const signature = await library.send('eth_signTypedData_v4', [owner, data]);
    //console.log('signature: ', signature);

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
