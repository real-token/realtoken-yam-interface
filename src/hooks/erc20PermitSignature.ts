import type { Web3Provider } from '@ethersproject/providers';
import { Contract, utils } from 'ethers';
import { gnosisAllowedTokens } from '../constants/allowedBuyTokens';

// This function is used for general tokens with permit function
const erc20PermitSignature = async (
  owner: string,
  spender: string,
  amount: string,
  transactionDeadline: number,
  contract: Contract,
  library: Web3Provider
) => {
  try {
    // const transactionDeadline = Date.now() + 3600; // permit valable during 1h

    let nonce;
    if(contract.address.toLowerCase() == gnosisAllowedTokens[2].contractAddress.toLowerCase()){
      nonce = await contract._nonces(owner);
    }else{
      nonce = await contract.nonces(owner);
    }
    
    let version = undefined;
    try{
      version = await contract.version();
    }catch(e){
      console.log('No version function in contract.')
    }

    let VERSION = undefined;
    try{
      VERSION = await contract.VERSION();
    }catch(e){
      console.log('No VERSION function in contract.')
    }

    const contractName = await contract.name();
    const rightVersion = version ?? VERSION;

    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ];
    const domain = {
      name: contractName,
      version: rightVersion.toString(),
      chainId: library.network.chainId,
      verifyingContract: contract.address,
    };
    console.log(domain)
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

    console.log(message)

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
    return e;
  }
};

export default erc20PermitSignature;
