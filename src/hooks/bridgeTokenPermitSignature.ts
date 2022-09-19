import type { Web3Provider } from '@ethersproject/providers';

import type { Contract } from 'ethers';
import { utils } from 'ethers';

const bridgeTokenPermitSignature = async (
  owner: string,
  spender: string,
  amount: string,
  transactionDeadline: number,
  contract: Contract,
  library: Web3Provider
) => {
  try {
    // const transactionDeadline = Date.now() + 3600; // permit valable during 1h
    const nonce = await contract.nonces(owner);
    console.log('nonce: ', nonce);
    const contractName = await contract.name();
    console.log('token name: ', contractName);
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

export default bridgeTokenPermitSignature;
