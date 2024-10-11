// COMMING FROM COMMUNITY API

type BlockchainAddress = {
    chainName: string
    chainId: number
    contract: string
    distributor: string
    maintenance: string
}

export type APIPropertiesToken = {
    fullName: string
    shortName: string
    symbol: string
    tokenPrice: number
    currency: string
    uuid: string,
    ethereumContract: string
    xDaiContract: string
    gnosisContract: string
    marketplaceLink: string
    imageLink: string[]
    netRentYearPerToken: number
    tokenIdRules: number
    blockchainAddresses: {
        ethereum: BlockchainAddress
        xDai: BlockchainAddress
        gnosis: BlockchainAddress
        sepolia: BlockchainAddress
    }
}

export type ShortProperty = {
    contractAddress: string;
    name: string;
}

// USED IN APP
export type PropertiesToken = {
    uuid: string
    shortName: string
    fullName: string
    contractAddress: string
    officialPrice: number
    currency: string,
    marketplaceLink: string
    imageLink: string[]
    tokenIdRules: number
    netRentYearPerToken: number
    annualYield?: number
}

export type RmmPropertiesToken = {
    uuid?: string
    shortName?: string
    symbol?: string
    fullName?: string
    contractAddress?: string
    officialPrice?: number,
    currency?: string,
    marketplaceLink?: string
    imageLink?: string[]
    tokenIdRules?: number
    netRentYearPerToken?: number
    annualYield?: number
}