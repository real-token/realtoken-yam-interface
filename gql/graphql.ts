/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  Int8: { input: any; output: any; }
};

/**  Account entity  */
export type Account = {
  __typename?: 'Account';
  /**  User address  */
  address: Scalars['Bytes']['output'];
  /**  Allowances for Account  */
  allowances: Array<Allowance>;
  /**  Token balances that this account holds  */
  balances: Array<AccountBalance>;
  /**  User address  */
  id: Scalars['ID']['output'];
  /**  Offer count  */
  offerCount: Scalars['BigInt']['output'];
  /**  User offers  */
  offers: Array<Offer>;
  /**  Purchase count  */
  purchaseCount: Scalars['BigInt']['output'];
  /**  User purchases  */
  purchases: Array<Purchase>;
  /**  Sell count  */
  sellCount: Scalars['BigInt']['output'];
  /**  User sell  */
  sells: Array<Purchase>;
};


/**  Account entity  */
export type AccountAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Allowance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Allowance_Filter>;
};


/**  Account entity  */
export type AccountBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AccountBalance_Filter>;
};


/**  Account entity  */
export type AccountOffersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Offer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Offer_Filter>;
};


/**  Account entity  */
export type AccountPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Purchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Purchase_Filter>;
};


/**  Account entity  */
export type AccountSellsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Purchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Purchase_Filter>;
};

export type AccountBalance = {
  __typename?: 'AccountBalance';
  /**  Account address  */
  account: Account;
  /**  Current account balance  */
  amount: Scalars['BigDecimal']['output'];
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID']['output'];
  /**  Token address  */
  token: Token;
};

export type AccountBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<AccountBalance_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<AccountBalance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum AccountBalance_OrderBy {
  Account = 'account',
  AccountAddress = 'account__address',
  AccountId = 'account__id',
  AccountOfferCount = 'account__offerCount',
  AccountPurchaseCount = 'account__purchaseCount',
  AccountSellCount = 'account__sellCount',
  Amount = 'amount',
  Id = 'id',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenDecimals = 'token__decimals',
  TokenDollarsVolume = 'token__dollarsVolume',
  TokenId = 'token__id',
  TokenName = 'token__name',
  TokenOfferCount = 'token__offerCount',
  TokenPurchaseCount = 'token__purchaseCount',
  TokenSymbol = 'token__symbol',
  TokenTokenType = 'token__tokenType'
}

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  allowances_?: InputMaybe<Allowance_Filter>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  balances_?: InputMaybe<AccountBalance_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offerCount?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offerCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offers_?: InputMaybe<Offer_Filter>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  purchaseCount?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  purchaseCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  purchases_?: InputMaybe<Purchase_Filter>;
  sellCount?: InputMaybe<Scalars['BigInt']['input']>;
  sellCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sellCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sellCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sellCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sellCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sellCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  sellCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sells_?: InputMaybe<Purchase_Filter>;
};

export enum Account_OrderBy {
  Address = 'address',
  Allowances = 'allowances',
  Balances = 'balances',
  Id = 'id',
  OfferCount = 'offerCount',
  Offers = 'offers',
  PurchaseCount = 'purchaseCount',
  Purchases = 'purchases',
  SellCount = 'sellCount',
  Sells = 'sells'
}

export type Allowance = {
  __typename?: 'Allowance';
  /**  Account address  */
  account: Account;
  /**  Current allowance  */
  allowance: Scalars['BigDecimal']['output'];
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID']['output'];
  /**  Token address  */
  token: Token;
};

export type Allowance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_starts_with?: InputMaybe<Scalars['String']['input']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  allowance?: InputMaybe<Scalars['BigDecimal']['input']>;
  allowance_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  allowance_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  allowance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  allowance_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  allowance_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  allowance_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  allowance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Allowance_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Allowance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Allowance_OrderBy {
  Account = 'account',
  AccountAddress = 'account__address',
  AccountId = 'account__id',
  AccountOfferCount = 'account__offerCount',
  AccountPurchaseCount = 'account__purchaseCount',
  AccountSellCount = 'account__sellCount',
  Allowance = 'allowance',
  Id = 'id',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenDecimals = 'token__decimals',
  TokenDollarsVolume = 'token__dollarsVolume',
  TokenId = 'token__id',
  TokenName = 'token__name',
  TokenOfferCount = 'token__offerCount',
  TokenPurchaseCount = 'token__purchaseCount',
  TokenSymbol = 'token__symbol',
  TokenTokenType = 'token__tokenType'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/**  Global stats entity  */
export type Global = {
  __typename?: 'Global';
  /**  Active offers counts */
  activeOffersCount: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
};

export type Global_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  activeOffersCount?: InputMaybe<Scalars['BigInt']['input']>;
  activeOffersCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  activeOffersCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  activeOffersCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  activeOffersCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  activeOffersCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  activeOffersCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  activeOffersCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Global_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Global_Filter>>>;
};

export enum Global_OrderBy {
  ActiveOffersCount = 'activeOffersCount',
  Id = 'id'
}

/**  Offer entity  */
export type Offer = {
  __typename?: 'Offer';
  /**  Allowance if =/= realtoken  */
  allowance?: Maybe<Allowance>;
  /**  Available amount  */
  availableAmount: Scalars['BigDecimal']['output'];
  /**  Account balance if =/= realtoken  */
  balance?: Maybe<AccountBalance>;
  /**  Buyer if offer is private  */
  buyer?: Maybe<Account>;
  /**  Buyer token 0x */
  buyerToken: Token;
  /**  Offer creation Block  */
  createdAtBlock: Scalars['BigInt']['output'];
  /**  Offer creation timestamp  */
  createdAtTimestamp: Scalars['BigInt']['output'];
  /**  Offer ID  */
  id: Scalars['ID']['output'];
  /**  Offer token 0x */
  offerToken: Token;
  /**  Current price  */
  price: OfferPrice;
  /**  Price array  */
  prices: Array<OfferPrice>;
  /**  Price length  */
  pricesLength: Scalars['BigInt']['output'];
  /**  Purchase count  */
  purchaseCount: Scalars['BigInt']['output'];
  /**  Purchase array  */
  purchases: Array<Purchase>;
  /**  Offer removal Block  */
  removedAtBlock?: Maybe<Scalars['BigInt']['output']>;
  /**  Offer removal timestamp  */
  removedAtTimestamp?: Maybe<Scalars['BigInt']['output']>;
  /**  Seller 0x  */
  seller: Account;
};


/**  Offer entity  */
export type OfferPricesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OfferPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OfferPrice_Filter>;
};


/**  Offer entity  */
export type OfferPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Purchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Purchase_Filter>;
};

/**  OfferPrice entity  */
export type OfferPrice = {
  __typename?: 'OfferPrice';
  /**  Amount  */
  amount: Scalars['BigDecimal']['output'];
  /**  Creation Block  */
  createdAtBlock: Scalars['BigInt']['output'];
  /**  Creation timestamp  */
  createdAtTimestamp: Scalars['BigInt']['output'];
  /**  offer id - position in list  */
  id: Scalars['ID']['output'];
  /**  Offer entity  */
  offer: Offer;
  /**  Price  */
  price: Scalars['BigDecimal']['output'];
};

export type OfferPrice_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<OfferPrice_Filter>>>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offer?: InputMaybe<Scalars['String']['input']>;
  offer_?: InputMaybe<Offer_Filter>;
  offer_contains?: InputMaybe<Scalars['String']['input']>;
  offer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  offer_ends_with?: InputMaybe<Scalars['String']['input']>;
  offer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  offer_gt?: InputMaybe<Scalars['String']['input']>;
  offer_gte?: InputMaybe<Scalars['String']['input']>;
  offer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  offer_lt?: InputMaybe<Scalars['String']['input']>;
  offer_lte?: InputMaybe<Scalars['String']['input']>;
  offer_not?: InputMaybe<Scalars['String']['input']>;
  offer_not_contains?: InputMaybe<Scalars['String']['input']>;
  offer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  offer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  offer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  offer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  offer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  offer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  offer_starts_with?: InputMaybe<Scalars['String']['input']>;
  offer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<OfferPrice_Filter>>>;
  price?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum OfferPrice_OrderBy {
  Amount = 'amount',
  CreatedAtBlock = 'createdAtBlock',
  CreatedAtTimestamp = 'createdAtTimestamp',
  Id = 'id',
  Offer = 'offer',
  OfferAvailableAmount = 'offer__availableAmount',
  OfferCreatedAtBlock = 'offer__createdAtBlock',
  OfferCreatedAtTimestamp = 'offer__createdAtTimestamp',
  OfferId = 'offer__id',
  OfferPricesLength = 'offer__pricesLength',
  OfferPurchaseCount = 'offer__purchaseCount',
  OfferRemovedAtBlock = 'offer__removedAtBlock',
  OfferRemovedAtTimestamp = 'offer__removedAtTimestamp',
  Price = 'price'
}

export type Offer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allowance?: InputMaybe<Scalars['String']['input']>;
  allowance_?: InputMaybe<Allowance_Filter>;
  allowance_contains?: InputMaybe<Scalars['String']['input']>;
  allowance_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  allowance_ends_with?: InputMaybe<Scalars['String']['input']>;
  allowance_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  allowance_gt?: InputMaybe<Scalars['String']['input']>;
  allowance_gte?: InputMaybe<Scalars['String']['input']>;
  allowance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  allowance_lt?: InputMaybe<Scalars['String']['input']>;
  allowance_lte?: InputMaybe<Scalars['String']['input']>;
  allowance_not?: InputMaybe<Scalars['String']['input']>;
  allowance_not_contains?: InputMaybe<Scalars['String']['input']>;
  allowance_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  allowance_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  allowance_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  allowance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  allowance_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  allowance_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  allowance_starts_with?: InputMaybe<Scalars['String']['input']>;
  allowance_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<Offer_Filter>>>;
  availableAmount?: InputMaybe<Scalars['BigDecimal']['input']>;
  availableAmount_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  availableAmount_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  availableAmount_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  availableAmount_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  availableAmount_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  availableAmount_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  availableAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  balance?: InputMaybe<Scalars['String']['input']>;
  balance_?: InputMaybe<AccountBalance_Filter>;
  balance_contains?: InputMaybe<Scalars['String']['input']>;
  balance_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  balance_ends_with?: InputMaybe<Scalars['String']['input']>;
  balance_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  balance_gt?: InputMaybe<Scalars['String']['input']>;
  balance_gte?: InputMaybe<Scalars['String']['input']>;
  balance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  balance_lt?: InputMaybe<Scalars['String']['input']>;
  balance_lte?: InputMaybe<Scalars['String']['input']>;
  balance_not?: InputMaybe<Scalars['String']['input']>;
  balance_not_contains?: InputMaybe<Scalars['String']['input']>;
  balance_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  balance_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  balance_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  balance_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  balance_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  balance_starts_with?: InputMaybe<Scalars['String']['input']>;
  balance_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer?: InputMaybe<Scalars['String']['input']>;
  buyerToken?: InputMaybe<Scalars['String']['input']>;
  buyerToken_?: InputMaybe<Token_Filter>;
  buyerToken_contains?: InputMaybe<Scalars['String']['input']>;
  buyerToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  buyerToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  buyerToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyerToken_gt?: InputMaybe<Scalars['String']['input']>;
  buyerToken_gte?: InputMaybe<Scalars['String']['input']>;
  buyerToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  buyerToken_lt?: InputMaybe<Scalars['String']['input']>;
  buyerToken_lte?: InputMaybe<Scalars['String']['input']>;
  buyerToken_not?: InputMaybe<Scalars['String']['input']>;
  buyerToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  buyerToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  buyerToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  buyerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyerToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  buyerToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  buyerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyerToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  buyerToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_?: InputMaybe<Account_Filter>;
  buyer_contains?: InputMaybe<Scalars['String']['input']>;
  buyer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_ends_with?: InputMaybe<Scalars['String']['input']>;
  buyer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_gt?: InputMaybe<Scalars['String']['input']>;
  buyer_gte?: InputMaybe<Scalars['String']['input']>;
  buyer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  buyer_lt?: InputMaybe<Scalars['String']['input']>;
  buyer_lte?: InputMaybe<Scalars['String']['input']>;
  buyer_not?: InputMaybe<Scalars['String']['input']>;
  buyer_not_contains?: InputMaybe<Scalars['String']['input']>;
  buyer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  buyer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  buyer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  buyer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_starts_with?: InputMaybe<Scalars['String']['input']>;
  buyer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offerToken?: InputMaybe<Scalars['String']['input']>;
  offerToken_?: InputMaybe<Token_Filter>;
  offerToken_contains?: InputMaybe<Scalars['String']['input']>;
  offerToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  offerToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  offerToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  offerToken_gt?: InputMaybe<Scalars['String']['input']>;
  offerToken_gte?: InputMaybe<Scalars['String']['input']>;
  offerToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  offerToken_lt?: InputMaybe<Scalars['String']['input']>;
  offerToken_lte?: InputMaybe<Scalars['String']['input']>;
  offerToken_not?: InputMaybe<Scalars['String']['input']>;
  offerToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  offerToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  offerToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  offerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  offerToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  offerToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  offerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  offerToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  offerToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Offer_Filter>>>;
  price?: InputMaybe<Scalars['String']['input']>;
  price_?: InputMaybe<OfferPrice_Filter>;
  price_contains?: InputMaybe<Scalars['String']['input']>;
  price_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  price_ends_with?: InputMaybe<Scalars['String']['input']>;
  price_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  price_gt?: InputMaybe<Scalars['String']['input']>;
  price_gte?: InputMaybe<Scalars['String']['input']>;
  price_in?: InputMaybe<Array<Scalars['String']['input']>>;
  price_lt?: InputMaybe<Scalars['String']['input']>;
  price_lte?: InputMaybe<Scalars['String']['input']>;
  price_not?: InputMaybe<Scalars['String']['input']>;
  price_not_contains?: InputMaybe<Scalars['String']['input']>;
  price_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  price_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  price_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  price_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  price_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  price_starts_with?: InputMaybe<Scalars['String']['input']>;
  price_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pricesLength?: InputMaybe<Scalars['BigInt']['input']>;
  pricesLength_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pricesLength_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pricesLength_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pricesLength_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pricesLength_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pricesLength_not?: InputMaybe<Scalars['BigInt']['input']>;
  pricesLength_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  prices_?: InputMaybe<OfferPrice_Filter>;
  purchaseCount?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  purchaseCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  purchases_?: InputMaybe<Purchase_Filter>;
  removedAtBlock?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  removedAtBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  removedAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  removedAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  removedAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  seller?: InputMaybe<Scalars['String']['input']>;
  seller_?: InputMaybe<Account_Filter>;
  seller_contains?: InputMaybe<Scalars['String']['input']>;
  seller_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_ends_with?: InputMaybe<Scalars['String']['input']>;
  seller_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_gt?: InputMaybe<Scalars['String']['input']>;
  seller_gte?: InputMaybe<Scalars['String']['input']>;
  seller_in?: InputMaybe<Array<Scalars['String']['input']>>;
  seller_lt?: InputMaybe<Scalars['String']['input']>;
  seller_lte?: InputMaybe<Scalars['String']['input']>;
  seller_not?: InputMaybe<Scalars['String']['input']>;
  seller_not_contains?: InputMaybe<Scalars['String']['input']>;
  seller_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  seller_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  seller_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  seller_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_starts_with?: InputMaybe<Scalars['String']['input']>;
  seller_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Offer_OrderBy {
  Allowance = 'allowance',
  AllowanceAllowance = 'allowance__allowance',
  AllowanceId = 'allowance__id',
  AvailableAmount = 'availableAmount',
  Balance = 'balance',
  BalanceAmount = 'balance__amount',
  BalanceId = 'balance__id',
  Buyer = 'buyer',
  BuyerToken = 'buyerToken',
  BuyerTokenAddress = 'buyerToken__address',
  BuyerTokenDecimals = 'buyerToken__decimals',
  BuyerTokenDollarsVolume = 'buyerToken__dollarsVolume',
  BuyerTokenId = 'buyerToken__id',
  BuyerTokenName = 'buyerToken__name',
  BuyerTokenOfferCount = 'buyerToken__offerCount',
  BuyerTokenPurchaseCount = 'buyerToken__purchaseCount',
  BuyerTokenSymbol = 'buyerToken__symbol',
  BuyerTokenTokenType = 'buyerToken__tokenType',
  BuyerAddress = 'buyer__address',
  BuyerId = 'buyer__id',
  BuyerOfferCount = 'buyer__offerCount',
  BuyerPurchaseCount = 'buyer__purchaseCount',
  BuyerSellCount = 'buyer__sellCount',
  CreatedAtBlock = 'createdAtBlock',
  CreatedAtTimestamp = 'createdAtTimestamp',
  Id = 'id',
  OfferToken = 'offerToken',
  OfferTokenAddress = 'offerToken__address',
  OfferTokenDecimals = 'offerToken__decimals',
  OfferTokenDollarsVolume = 'offerToken__dollarsVolume',
  OfferTokenId = 'offerToken__id',
  OfferTokenName = 'offerToken__name',
  OfferTokenOfferCount = 'offerToken__offerCount',
  OfferTokenPurchaseCount = 'offerToken__purchaseCount',
  OfferTokenSymbol = 'offerToken__symbol',
  OfferTokenTokenType = 'offerToken__tokenType',
  Price = 'price',
  PriceAmount = 'price__amount',
  PriceCreatedAtBlock = 'price__createdAtBlock',
  PriceCreatedAtTimestamp = 'price__createdAtTimestamp',
  PriceId = 'price__id',
  PricePrice = 'price__price',
  Prices = 'prices',
  PricesLength = 'pricesLength',
  PurchaseCount = 'purchaseCount',
  Purchases = 'purchases',
  RemovedAtBlock = 'removedAtBlock',
  RemovedAtTimestamp = 'removedAtTimestamp',
  Seller = 'seller',
  SellerAddress = 'seller__address',
  SellerId = 'seller__id',
  SellerOfferCount = 'seller__offerCount',
  SellerPurchaseCount = 'seller__purchaseCount',
  SellerSellCount = 'seller__sellCount'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Purchase = {
  __typename?: 'Purchase';
  /**  Buyer 0x  */
  buyer: Account;
  /**  Creation Block  */
  createdAtBlock: Scalars['BigInt']['output'];
  /**  Creation timestamp  */
  createdAtTimestamp: Scalars['BigInt']['output'];
  /**  tx hash - logindex  */
  id: Scalars['ID']['output'];
  /**  Offer entity  */
  offer: Offer;
  /**  Price  */
  price: Scalars['BigDecimal']['output'];
  /**  Quantity  */
  quantity: Scalars['BigDecimal']['output'];
  /**  seller 0x  */
  seller: Account;
};

export type Purchase_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Purchase_Filter>>>;
  buyer?: InputMaybe<Scalars['String']['input']>;
  buyer_?: InputMaybe<Account_Filter>;
  buyer_contains?: InputMaybe<Scalars['String']['input']>;
  buyer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_ends_with?: InputMaybe<Scalars['String']['input']>;
  buyer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_gt?: InputMaybe<Scalars['String']['input']>;
  buyer_gte?: InputMaybe<Scalars['String']['input']>;
  buyer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  buyer_lt?: InputMaybe<Scalars['String']['input']>;
  buyer_lte?: InputMaybe<Scalars['String']['input']>;
  buyer_not?: InputMaybe<Scalars['String']['input']>;
  buyer_not_contains?: InputMaybe<Scalars['String']['input']>;
  buyer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  buyer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  buyer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  buyer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  buyer_starts_with?: InputMaybe<Scalars['String']['input']>;
  buyer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offer?: InputMaybe<Scalars['String']['input']>;
  offer_?: InputMaybe<Offer_Filter>;
  offer_contains?: InputMaybe<Scalars['String']['input']>;
  offer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  offer_ends_with?: InputMaybe<Scalars['String']['input']>;
  offer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  offer_gt?: InputMaybe<Scalars['String']['input']>;
  offer_gte?: InputMaybe<Scalars['String']['input']>;
  offer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  offer_lt?: InputMaybe<Scalars['String']['input']>;
  offer_lte?: InputMaybe<Scalars['String']['input']>;
  offer_not?: InputMaybe<Scalars['String']['input']>;
  offer_not_contains?: InputMaybe<Scalars['String']['input']>;
  offer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  offer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  offer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  offer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  offer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  offer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  offer_starts_with?: InputMaybe<Scalars['String']['input']>;
  offer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Purchase_Filter>>>;
  price?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  quantity?: InputMaybe<Scalars['BigDecimal']['input']>;
  quantity_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  quantity_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  quantity_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  quantity_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  quantity_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  quantity_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  quantity_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  seller?: InputMaybe<Scalars['String']['input']>;
  seller_?: InputMaybe<Account_Filter>;
  seller_contains?: InputMaybe<Scalars['String']['input']>;
  seller_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_ends_with?: InputMaybe<Scalars['String']['input']>;
  seller_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_gt?: InputMaybe<Scalars['String']['input']>;
  seller_gte?: InputMaybe<Scalars['String']['input']>;
  seller_in?: InputMaybe<Array<Scalars['String']['input']>>;
  seller_lt?: InputMaybe<Scalars['String']['input']>;
  seller_lte?: InputMaybe<Scalars['String']['input']>;
  seller_not?: InputMaybe<Scalars['String']['input']>;
  seller_not_contains?: InputMaybe<Scalars['String']['input']>;
  seller_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  seller_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  seller_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  seller_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seller_starts_with?: InputMaybe<Scalars['String']['input']>;
  seller_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Purchase_OrderBy {
  Buyer = 'buyer',
  BuyerAddress = 'buyer__address',
  BuyerId = 'buyer__id',
  BuyerOfferCount = 'buyer__offerCount',
  BuyerPurchaseCount = 'buyer__purchaseCount',
  BuyerSellCount = 'buyer__sellCount',
  CreatedAtBlock = 'createdAtBlock',
  CreatedAtTimestamp = 'createdAtTimestamp',
  Id = 'id',
  Offer = 'offer',
  OfferAvailableAmount = 'offer__availableAmount',
  OfferCreatedAtBlock = 'offer__createdAtBlock',
  OfferCreatedAtTimestamp = 'offer__createdAtTimestamp',
  OfferId = 'offer__id',
  OfferPricesLength = 'offer__pricesLength',
  OfferPurchaseCount = 'offer__purchaseCount',
  OfferRemovedAtBlock = 'offer__removedAtBlock',
  OfferRemovedAtTimestamp = 'offer__removedAtTimestamp',
  Price = 'price',
  Quantity = 'quantity',
  Seller = 'seller',
  SellerAddress = 'seller__address',
  SellerId = 'seller__id',
  SellerOfferCount = 'seller__offerCount',
  SellerPurchaseCount = 'seller__purchaseCount',
  SellerSellCount = 'seller__sellCount'
}

export type Query = {
  __typename?: 'Query';
  yamEth?: Maybe<YamEthQuery>;
  yamGnosis?: Maybe<YamGnosisQuery>;
};

/**  Token entity  */
export type Token = {
  __typename?: 'Token';
  /**  Token address  */
  address: Scalars['Bytes']['output'];
  /**  Token decimal  */
  decimals?: Maybe<Scalars['Int']['output']>;
  /**  Dollars volume  */
  dollarsVolume: Scalars['BigDecimal']['output'];
  /**  Token address  */
  id: Scalars['ID']['output'];
  /**  Token name  */
  name?: Maybe<Scalars['String']['output']>;
  /**  Offer count  */
  offerCount: Scalars['BigInt']['output'];
  /**  Array of offers  */
  offers: Array<Offer>;
  /**  Purchase count  */
  purchaseCount: Scalars['BigInt']['output'];
  /**  Array of purchases  */
  purchases: Array<Purchase>;
  /**  Token symbol  */
  symbol?: Maybe<Scalars['String']['output']>;
  /**  TokenType: 0:NOWL|1:REALTOKEN|2:ERC20PERMIT|3:ERC20NOPERMIT  */
  tokenType: Scalars['Int']['output'];
};


/**  Token entity  */
export type TokenOffersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Offer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Offer_Filter>;
};


/**  Token entity  */
export type TokenPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Purchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Purchase_Filter>;
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dollarsVolume?: InputMaybe<Scalars['BigDecimal']['input']>;
  dollarsVolume_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dollarsVolume_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dollarsVolume_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dollarsVolume_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dollarsVolume_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dollarsVolume_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dollarsVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  offerCount?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offerCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  offerCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  offers_?: InputMaybe<Offer_Filter>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  purchaseCount?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  purchaseCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  purchases?: InputMaybe<Array<Scalars['String']['input']>>;
  purchases_?: InputMaybe<Purchase_Filter>;
  purchases_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  purchases_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  purchases_not?: InputMaybe<Array<Scalars['String']['input']>>;
  purchases_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  purchases_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenType?: InputMaybe<Scalars['Int']['input']>;
  tokenType_gt?: InputMaybe<Scalars['Int']['input']>;
  tokenType_gte?: InputMaybe<Scalars['Int']['input']>;
  tokenType_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tokenType_lt?: InputMaybe<Scalars['Int']['input']>;
  tokenType_lte?: InputMaybe<Scalars['Int']['input']>;
  tokenType_not?: InputMaybe<Scalars['Int']['input']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum Token_OrderBy {
  Address = 'address',
  Decimals = 'decimals',
  DollarsVolume = 'dollarsVolume',
  Id = 'id',
  Name = 'name',
  OfferCount = 'offerCount',
  Offers = 'offers',
  PurchaseCount = 'purchaseCount',
  Purchases = 'purchases',
  Symbol = 'symbol',
  TokenType = 'tokenType'
}

export type YamEthQuery = {
  __typename?: 'YamEthQuery';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountBalance?: Maybe<AccountBalance>;
  accountBalances: Array<AccountBalance>;
  accounts: Array<Account>;
  allowance?: Maybe<Allowance>;
  allowances: Array<Allowance>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  offer?: Maybe<Offer>;
  offerPrice?: Maybe<OfferPrice>;
  offerPrices: Array<OfferPrice>;
  offers: Array<Offer>;
  purchase?: Maybe<Purchase>;
  purchases: Array<Purchase>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type YamEthQuery_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type YamEthQueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamEthQueryAccountBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamEthQueryAccountBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountBalance_Filter>;
};


export type YamEthQueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type YamEthQueryAllowanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamEthQueryAllowancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Allowance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Allowance_Filter>;
};


export type YamEthQueryGlobalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamEthQueryGlobalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Global_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Global_Filter>;
};


export type YamEthQueryOfferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamEthQueryOfferPriceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamEthQueryOfferPricesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OfferPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OfferPrice_Filter>;
};


export type YamEthQueryOffersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Offer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Offer_Filter>;
};


export type YamEthQueryPurchaseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamEthQueryPurchasesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Purchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Purchase_Filter>;
};


export type YamEthQueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamEthQueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type YamGnosisQuery = {
  __typename?: 'YamGnosisQuery';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountBalance?: Maybe<AccountBalance>;
  accountBalances: Array<AccountBalance>;
  accounts: Array<Account>;
  allowance?: Maybe<Allowance>;
  allowances: Array<Allowance>;
  global?: Maybe<Global>;
  globals: Array<Global>;
  offer?: Maybe<Offer>;
  offerPrice?: Maybe<OfferPrice>;
  offerPrices: Array<OfferPrice>;
  offers: Array<Offer>;
  purchase?: Maybe<Purchase>;
  purchases: Array<Purchase>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type YamGnosisQuery_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type YamGnosisQueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamGnosisQueryAccountBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamGnosisQueryAccountBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountBalance_Filter>;
};


export type YamGnosisQueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type YamGnosisQueryAllowanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamGnosisQueryAllowancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Allowance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Allowance_Filter>;
};


export type YamGnosisQueryGlobalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamGnosisQueryGlobalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Global_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Global_Filter>;
};


export type YamGnosisQueryOfferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamGnosisQueryOfferPriceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamGnosisQueryOfferPricesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OfferPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OfferPrice_Filter>;
};


export type YamGnosisQueryOffersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Offer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Offer_Filter>;
};


export type YamGnosisQueryPurchaseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamGnosisQueryPurchasesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Purchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Purchase_Filter>;
};


export type YamGnosisQueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type YamGnosisQueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}
