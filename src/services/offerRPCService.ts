import { Provider, JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { Interface } from '@ethersproject/abi';
import { RealTokenYamUpgradeable } from 'src/abis/types/RealTokenYamUpgradeable';
import { Offer } from 'src/types/offer/Offer';
import { CHAINS, ChainsID } from 'src/constants';
import { ContractsID } from 'src/constants/contracts';
import BigNumberJS from 'bignumber.js';

// Adresses Multicall3 sur différentes chaînes
const MULTICALL3_ADDRESSES: Record<number, string> = {
  1: '0xcA11bde05977b3631167028862bE2a173976CA11', // Ethereum
  100: '0xcA11bde05977b3631167028862bE2a173976CA11', // Gnosis
  11155111: '0xcA11bde05977b3631167028862bE2a173976CA11', // Sepolia
};

// ABI simplifié de Multicall3 (juste la fonction aggregate)
const MULTICALL3_ABI = [
  {
    inputs: [
      {
        components: [
          { name: 'target', type: 'address' },
          { name: 'callData', type: 'bytes' },
        ],
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', type: 'uint256' },
      { name: 'returnData', type: 'bytes[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

interface MulticallCall {
  target: string;
  callData: string;
}

interface OfferRPCData {
  offerToken: string;
  buyerToken: string;
  seller: string;
  buyer: string;
  price: BigNumber;
  amount: BigNumber;
}

interface OfferWithUserData extends Offer {
  userBalance: string;
  userAllowance: string;
}

export class OfferRPCService {
  private yamContract: RealTokenYamUpgradeable;
  private provider: Provider;
  private chainId: number;
  private multicallAddress: string;
  private yamContractAddress: string;

  constructor(
    provider: Provider,
    yamContract: RealTokenYamUpgradeable,
    chainId: number
  ) {
    // S'assurer qu'on utilise un provider en lecture seule (sans signer)
    // Si c'est un Web3Provider, on peut utiliser provider directement car callStatic ne nécessite pas de signer
    // Mais pour être sûr, on peut créer un JsonRpcProvider si nécessaire
    this.provider = provider;
    this.yamContract = yamContract;
    this.chainId = chainId;
    this.multicallAddress = MULTICALL3_ADDRESSES[chainId];

    if (!this.multicallAddress) {
      throw new Error(`Multicall3 not available on chain ${chainId}`);
    }

    // Récupérer l'adresse du contrat depuis la configuration de la chaîne
    const chain = CHAINS[chainId as ChainsID];
    if (!chain) {
      throw new Error(`Chain ${chainId} not supported`);
    }
    this.yamContractAddress = chain.contracts[ContractsID.realTokenYamUpgradeable].address;
  }

  /**
   * Exécute plusieurs appels RPC en un seul appel Multicall3
   * Utilise callStatic pour éviter d'avoir besoin d'un signer
   */
  private async aggregate(calls: MulticallCall[]): Promise<string[]> {
    const multicall = new Contract(
      this.multicallAddress,
      MULTICALL3_ABI,
      this.provider
    );

    // Utiliser callStatic pour les appels en lecture seule (pas besoin de signer)
    const [, returnData] = await multicall.callStatic.aggregate(calls);
    return returnData;
  }

  /**
   * Vérifie si une offre existe en appelant showOffer
   * Retourne true si l'offre existe, false sinon
   */
  async checkOfferExists(offerId: BigNumber): Promise<boolean> {
    try {
      const callData = this.yamContract.interface.encodeFunctionData(
        'showOffer',
        [offerId]
      );

      const calls: MulticallCall[] = [
        {
          target: this.yamContractAddress,
          callData,
        },
      ];

      await this.aggregate(calls);
      return true;
    } catch (error: any) {
      // Si l'erreur contient "execution reverted", l'offre n'existe pas
      const errorMessage = error?.message?.toLowerCase() || '';
      const errorCode = error?.code || '';
      const errorReason = error?.reason?.toLowerCase() || '';
      
      if (
        errorMessage.includes('execution reverted') ||
        errorMessage.includes('revert') ||
        errorCode === 'CALL_EXCEPTION' ||
        errorReason.includes('revert') ||
        error?.error?.message?.includes('execution reverted')
      ) {
        return false;
      }
      // Autre erreur, on la propage
      throw error;
    }
  }

  /**
   * Récupère les données d'une offre depuis la blockchain via RPC
   */
  async getOfferById(offerId: BigNumber): Promise<OfferRPCData> {
    const callData = this.yamContract.interface.encodeFunctionData(
      'showOffer',
      [offerId]
    );

    const calls: MulticallCall[] = [
      {
        target: this.yamContractAddress,
        callData,
      },
    ];

    const [result] = await this.aggregate(calls);
    const decoded = this.yamContract.interface.decodeFunctionResult(
      'showOffer',
      result
    );

    return {
      offerToken: decoded[0],
      buyerToken: decoded[1],
      seller: decoded[2],
      buyer: decoded[3],
      price: decoded[4],
      amount: decoded[5],
    };
  }

  /**
   * Récupère les informations d'un token ERC20 (name, symbol, decimals)
   */
  private async getTokenInfo(tokenAddress: string): Promise<{
    name: string;
    symbol: string;
    decimals: number;
  }> {
    const erc20Interface = new Interface([
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
    ]);

    const calls: MulticallCall[] = [
      {
        target: tokenAddress,
        callData: erc20Interface.encodeFunctionData('name', []),
      },
      {
        target: tokenAddress,
        callData: erc20Interface.encodeFunctionData('symbol', []),
      },
      {
        target: tokenAddress,
        callData: erc20Interface.encodeFunctionData('decimals', []),
      },
    ];

    const results = await this.aggregate(calls);

    return {
      name: erc20Interface.decodeFunctionResult('name', results[0])[0],
      symbol: erc20Interface.decodeFunctionResult('symbol', results[1])[0],
      decimals: erc20Interface.decodeFunctionResult('decimals', results[2])[0],
    };
  }

  /**
   * Récupère le type de token depuis le contrat YAM
   * Utilise callStatic pour éviter d'avoir besoin d'un signer
   */
  private async getTokenType(tokenAddress: string): Promise<number> {
    // Utiliser callStatic pour les appels en lecture seule
    const tokenType = await this.yamContract.callStatic.getTokenType(tokenAddress);
    return tokenType;
  }

  /**
   * Récupère les balances et allowances d'un utilisateur pour les tokens d'une offre
   */
  private async getUserTokenData(
    userAddress: string,
    offerTokenAddress: string,
    buyerTokenAddress: string
  ): Promise<{
    offerTokenBalance: string;
    offerTokenAllowance: string;
    buyerTokenBalance: string;
  }> {
    const erc20Interface = new Interface([
      'function balanceOf(address) view returns (uint256)',
      'function allowance(address,address) view returns (uint256)',
    ]);

    const yamAddress = this.yamContractAddress;

    const calls: MulticallCall[] = [
      // Balance offerToken
      {
        target: offerTokenAddress,
        callData: erc20Interface.encodeFunctionData('balanceOf', [userAddress]),
      },
      // Allowance offerToken
      {
        target: offerTokenAddress,
        callData: erc20Interface.encodeFunctionData('allowance', [
          userAddress,
          yamAddress,
        ]),
      },
      // Balance buyerToken
      {
        target: buyerTokenAddress,
        callData: erc20Interface.encodeFunctionData('balanceOf', [userAddress]),
      },
    ];

    const results = await this.aggregate(calls);

    return {
      offerTokenBalance: erc20Interface.decodeFunctionResult(
        'balanceOf',
        results[0]
      )[0].toString(),
      offerTokenAllowance: erc20Interface.decodeFunctionResult(
        'allowance',
        results[1]
      )[0].toString(),
      buyerTokenBalance: erc20Interface.decodeFunctionResult(
        'balanceOf',
        results[2]
      )[0].toString(),
    };
  }

  /**
   * Récupère une offre complète avec toutes les données nécessaires via RPC
   * Utilise Multicall3 pour optimiser les appels
   */
  async getOfferWithAllData(
    offerId: BigNumber,
    userAddress?: string
  ): Promise<Partial<Offer>> {
    // 1. Récupérer les données de base de l'offre
    const offerData = await this.getOfferById(offerId);

    // 2. Récupérer les infos des tokens en parallèle
    const [offerTokenInfo, buyerTokenInfo, offerTokenType, buyerTokenType] =
      await Promise.all([
        this.getTokenInfo(offerData.offerToken),
        this.getTokenInfo(offerData.buyerToken),
        this.getTokenType(offerData.offerToken),
        this.getTokenType(offerData.buyerToken),
      ]);

    // 3. Récupérer les données utilisateur si fourni
    let userTokenData = null;
    if (userAddress) {
      userTokenData = await this.getUserTokenData(
        userAddress,
        offerData.offerToken,
        offerData.buyerToken
      );
    }

    // 4. Construire l'objet Offer
    const offer: Partial<Offer> = {
      offerId: offerId.toString(),
      offerTokenAddress: offerData.offerToken.toLowerCase(),
      offerTokenName: offerTokenInfo.name,
      offerTokenDecimals: offerTokenInfo.decimals.toString(),
      offerTokenType: offerTokenType,
      buyerTokenAddress: offerData.buyerToken.toLowerCase(),
      buyerTokenName: buyerTokenInfo.name,
      buyerTokenDecimals: buyerTokenInfo.decimals.toString(),
      buyerTokenType: buyerTokenType,
      sellerAddress: offerData.seller.toLowerCase(),
      buyerAddress: offerData.buyer.toLowerCase(),
      price: new BigNumberJS(offerData.price.toString())
        .dividedBy(new BigNumberJS(10).pow(buyerTokenInfo.decimals))
        .toString(),
      amount: new BigNumberJS(offerData.amount.toString())
        .dividedBy(new BigNumberJS(10).pow(offerTokenInfo.decimals))
        .toString(),
      availableAmount: new BigNumberJS(offerData.amount.toString())
        .dividedBy(new BigNumberJS(10).pow(offerTokenInfo.decimals))
        .toString(),
      balanceWallet: userTokenData?.offerTokenBalance || '0',
      allowanceToken: userTokenData?.offerTokenAllowance || '0',
      removed: false,
      createdAtTimestamp: 0, // Non disponible via RPC, nécessiterait un événement
    };

    return offer;
  }

  /**
   * Récupère une offre avec les données utilisateur pour les modals
   * Version optimisée avec un seul appel Multicall3
   */
  async getOfferWithUserData(
    offerId: BigNumber,
    userAddress: string
  ): Promise<Partial<Offer>> {
    return this.getOfferWithAllData(offerId, userAddress);
  }
}
