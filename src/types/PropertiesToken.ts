// COMMING FROM COMMUNITY API
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
    officialPrice?: number,
    currency: string,
    marketplaceLink: string
    imageLink: string[]
    netRentYearPerToken?: number
    annualYield?: number
}