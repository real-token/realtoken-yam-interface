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
    const nonce = await contract.nonces(owner);
    const contractName = await contract.name();

    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ];

    console.log(
      'CONTRACT NAME',
      contractName,
      (await contract.VERSION()).toString()
    );
    let version = '3';
    if (
      contractName === 'CleanSat Mining Alpha' ||
      contractName === 'CleanSat Mining Beta' ||
      contractName === 'CleanSat Mining Omega' ||
      contractName === 'CleanSat Mining Gamma' ||
      contractName === 'CleanSat Mining Delta'
    ) {
      version = '2';
    }
    console.log(
      'CONTRACT NAME',
      contractName,
      (await contract.VERSION()).toString() + ' vs ' + version
    );
    const domain = {
      name: contractName,
      version: version, //(await contract.VERSION()).toString(), // get version of token since RealToken is upgraded to V2, otherwise wrong signature
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

    // eslint-disable-next-line object-shorthand
    const message = {
      owner,
      spender,
      value: amount.toString(),
      nonce: nonce.toHexString(),
      deadline: transactionDeadline,
    };
    // console.log('message: ', message);

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
    return {
      r,
      s,
      v,
    };
  } catch (e) {
    console.log('Error getting permit signature: ', e);
    throw e;
  }
};

export default coinBridgeTokenPermitSignature;
