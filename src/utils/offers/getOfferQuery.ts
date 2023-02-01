export const getOfferQuery = (): string => {
    return `
        id
        seller {
            id
            address
        }
        removedAtBlock
        availableAmount
        allowance {
            allowance
        }
        balance {
            amount
        }
        offerToken {
            address
            name
            decimals
            symbol
            tokenType
        }
        price {
            price
            amount
        }
        buyerToken {
            name
            symbol
            address
            decimals
            tokenType
        }
        buyer {
            address
        }
        createdAtTimestamp
    `
}