

export type APIPropertiesToken = {
    fullName: string
    shortName: string
    symbol: string
    tokenPrice: number
    currency: string
    uuid: string,
    ethereumContract: string,
    xDaiContract: string,
    gnosisContract: string,
}

export type PropertiesToken = {
    uuid: string
    shortName: string
    fullName: string
    contractAddress: string
}