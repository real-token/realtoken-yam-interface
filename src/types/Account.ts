export interface Balance{
    amount: number
}

export interface Allowance{
    allowance: string
}

export interface Account{
    balance: number
    allowance: number
} 

export interface AccountRealtoken{
    address: string
    allowances: [{
        allowance:string
        token:{
            address: string
            fullName:string
        }
    }]
    balances: [{
        amount:string
        token:{
            address: string
            fullName:string
        }
    }]
} 