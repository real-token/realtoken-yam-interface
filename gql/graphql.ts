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
  realTokenEth_BigDecimal: { input: any; output: any; }
  realTokenEth_BigInt: { input: any; output: any; }
  realTokenEth_Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  realTokenEth_Int8: { input: any; output: any; }
  realTokenGnosis_BigDecimal: { input: any; output: any; }
  realTokenGnosis_BigInt: { input: any; output: any; }
  realTokenGnosis_Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  realTokenGnosis_Int8: { input: any; output: any; }
  yamGnosis_BigDecimal: { input: any; output: any; }
  yamGnosis_BigInt: { input: any; output: any; }
  yamGnosis_Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  yamGnosis_Int8: { input: any; output: any; }
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

export type AuthMutations = {
  __typename?: 'AuthMutations';
  changePassword: Scalars['Boolean']['output'];
  login: AuthPayload;
  sendInvitation: Scalars['Boolean']['output'];
  signup: Scalars['Boolean']['output'];
};


export type AuthMutationsChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type AuthMutationsLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type AuthMutationsSendInvitationArgs = {
  email: Scalars['String']['input'];
};


export type AuthMutationsSignupArgs = {
  input: SignupInput;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
};

export type AuthQueries = {
  __typename?: 'AuthQueries';
  _empty?: Maybe<Scalars['String']['output']>;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  newPasswordConf: Scalars['String']['input'];
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

export type Mutation = {
  __typename?: 'Mutation';
  auth: AuthMutations;
};

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
  auth: AuthQueries;
  realTokenEth?: Maybe<RealTokenEthQuery>;
  realTokenGnosis?: Maybe<RealTokenGnosisQuery>;
  yamEth?: Maybe<YamEthQuery>;
  yamGnosis?: Maybe<YamGnosisQuery>;
};

export type RealTokenEthQuery = {
  __typename?: 'RealTokenEthQuery';
  /** Access to subgraph metadata */
  _meta?: Maybe<RealTokenEth__Meta_>;
  account?: Maybe<RealTokenEth_Account>;
  accountBalance?: Maybe<RealTokenEth_AccountBalance>;
  accountBalanceSnapshot?: Maybe<RealTokenEth_AccountBalanceSnapshot>;
  accountBalanceSnapshots: Array<RealTokenEth_AccountBalanceSnapshot>;
  accountBalances: Array<RealTokenEth_AccountBalance>;
  accounts: Array<RealTokenEth_Account>;
  allowance?: Maybe<RealTokenEth_Allowance>;
  allowances: Array<RealTokenEth_Allowance>;
  burnEvent?: Maybe<RealTokenEth_BurnEvent>;
  burnEvents: Array<RealTokenEth_BurnEvent>;
  mintEvent?: Maybe<RealTokenEth_MintEvent>;
  mintEvents: Array<RealTokenEth_MintEvent>;
  token?: Maybe<RealTokenEth_Token>;
  tokenEvent?: Maybe<RealTokenEth_TokenEvent>;
  tokenEvents: Array<RealTokenEth_TokenEvent>;
  tokens: Array<RealTokenEth_Token>;
  transaction?: Maybe<RealTokenEth_Transaction>;
  transactions: Array<RealTokenEth_Transaction>;
  transferEvent?: Maybe<RealTokenEth_TransferEvent>;
  transferEvents: Array<RealTokenEth_TransferEvent>;
  trustedIntermediaries: Array<RealTokenEth_TrustedIntermediary>;
  trustedIntermediary?: Maybe<RealTokenEth_TrustedIntermediary>;
  userId?: Maybe<RealTokenEth_UserId>;
  userIds: Array<RealTokenEth_UserId>;
};


export type RealTokenEthQuery_MetaArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
};


export type RealTokenEthQueryAccountArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryAccountBalanceArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryAccountBalanceSnapshotArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryAccountBalanceSnapshotsArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_AccountBalanceSnapshot_Filter>;
};


export type RealTokenEthQueryAccountBalancesArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_AccountBalance_Filter>;
};


export type RealTokenEthQueryAccountsArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_Account_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_Account_Filter>;
};


export type RealTokenEthQueryAllowanceArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryAllowancesArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_Allowance_Filter>;
};


export type RealTokenEthQueryBurnEventArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryBurnEventsArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_BurnEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_BurnEvent_Filter>;
};


export type RealTokenEthQueryMintEventArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryMintEventsArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_MintEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_MintEvent_Filter>;
};


export type RealTokenEthQueryTokenArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryTokenEventArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryTokenEventsArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_TokenEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_TokenEvent_Filter>;
};


export type RealTokenEthQueryTokensArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_Token_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_Token_Filter>;
};


export type RealTokenEthQueryTransactionArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryTransactionsArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_Transaction_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_Transaction_Filter>;
};


export type RealTokenEthQueryTransferEventArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryTransferEventsArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_TransferEvent_Filter>;
};


export type RealTokenEthQueryTrustedIntermediariesArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_TrustedIntermediary_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_TrustedIntermediary_Filter>;
};


export type RealTokenEthQueryTrustedIntermediaryArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryUserIdArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
};


export type RealTokenEthQueryUserIdsArgs = {
  block?: InputMaybe<RealTokenEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_UserId_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenEth__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenEth_UserId_Filter>;
};

export type RealTokenGnosisQuery = {
  __typename?: 'RealTokenGnosisQuery';
  /** Access to subgraph metadata */
  _meta?: Maybe<RealTokenGnosis__Meta_>;
  account?: Maybe<RealTokenGnosis_Account>;
  accountBalance?: Maybe<RealTokenGnosis_AccountBalance>;
  accountBalanceSnapshot?: Maybe<RealTokenGnosis_AccountBalanceSnapshot>;
  accountBalanceSnapshots: Array<RealTokenGnosis_AccountBalanceSnapshot>;
  accountBalances: Array<RealTokenGnosis_AccountBalance>;
  accounts: Array<RealTokenGnosis_Account>;
  allowance?: Maybe<RealTokenGnosis_Allowance>;
  allowances: Array<RealTokenGnosis_Allowance>;
  burnEvent?: Maybe<RealTokenGnosis_BurnEvent>;
  burnEvents: Array<RealTokenGnosis_BurnEvent>;
  mintEvent?: Maybe<RealTokenGnosis_MintEvent>;
  mintEvents: Array<RealTokenGnosis_MintEvent>;
  token?: Maybe<RealTokenGnosis_Token>;
  tokenEvent?: Maybe<RealTokenGnosis_TokenEvent>;
  tokenEvents: Array<RealTokenGnosis_TokenEvent>;
  tokens: Array<RealTokenGnosis_Token>;
  transaction?: Maybe<RealTokenGnosis_Transaction>;
  transactions: Array<RealTokenGnosis_Transaction>;
  transferEvent?: Maybe<RealTokenGnosis_TransferEvent>;
  transferEvents: Array<RealTokenGnosis_TransferEvent>;
  trustedIntermediaries: Array<RealTokenGnosis_TrustedIntermediary>;
  trustedIntermediary?: Maybe<RealTokenGnosis_TrustedIntermediary>;
  userId?: Maybe<RealTokenGnosis_UserId>;
  userIds: Array<RealTokenGnosis_UserId>;
};


export type RealTokenGnosisQuery_MetaArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
};


export type RealTokenGnosisQueryAccountArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryAccountBalanceArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryAccountBalanceSnapshotArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryAccountBalanceSnapshotsArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_AccountBalanceSnapshot_Filter>;
};


export type RealTokenGnosisQueryAccountBalancesArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_AccountBalance_Filter>;
};


export type RealTokenGnosisQueryAccountsArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_Account_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_Account_Filter>;
};


export type RealTokenGnosisQueryAllowanceArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryAllowancesArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_Allowance_Filter>;
};


export type RealTokenGnosisQueryBurnEventArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryBurnEventsArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_BurnEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_BurnEvent_Filter>;
};


export type RealTokenGnosisQueryMintEventArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryMintEventsArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_MintEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_MintEvent_Filter>;
};


export type RealTokenGnosisQueryTokenArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryTokenEventArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryTokenEventsArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_TokenEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_TokenEvent_Filter>;
};


export type RealTokenGnosisQueryTokensArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_Token_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_Token_Filter>;
};


export type RealTokenGnosisQueryTransactionArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryTransactionsArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_Transaction_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_Transaction_Filter>;
};


export type RealTokenGnosisQueryTransferEventArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryTransferEventsArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_TransferEvent_Filter>;
};


export type RealTokenGnosisQueryTrustedIntermediariesArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_TrustedIntermediary_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_TrustedIntermediary_Filter>;
};


export type RealTokenGnosisQueryTrustedIntermediaryArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryUserIdArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
};


export type RealTokenGnosisQueryUserIdsArgs = {
  block?: InputMaybe<RealTokenGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_UserId_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGnosis_UserId_Filter>;
};

export type SignupInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConf: Scalars['String']['input'];
  token: Scalars['String']['input'];
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
  _meta?: Maybe<YamGnosis__Meta_>;
  account?: Maybe<YamGnosis_Account>;
  accountBalance?: Maybe<YamGnosis_AccountBalance>;
  accountBalances: Array<YamGnosis_AccountBalance>;
  accounts: Array<YamGnosis_Account>;
  allowance?: Maybe<YamGnosis_Allowance>;
  allowances: Array<YamGnosis_Allowance>;
  global?: Maybe<YamGnosis_Global>;
  globals: Array<YamGnosis_Global>;
  offer?: Maybe<YamGnosis_Offer>;
  offerPrice?: Maybe<YamGnosis_OfferPrice>;
  offerPrices: Array<YamGnosis_OfferPrice>;
  offers: Array<YamGnosis_Offer>;
  purchase?: Maybe<YamGnosis_Purchase>;
  purchases: Array<YamGnosis_Purchase>;
  token?: Maybe<YamGnosis_Token>;
  tokens: Array<YamGnosis_Token>;
};


export type YamGnosisQuery_MetaArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
};


export type YamGnosisQueryAccountArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
};


export type YamGnosisQueryAccountBalanceArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
};


export type YamGnosisQueryAccountBalancesArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<YamGnosis_AccountBalance_Filter>;
};


export type YamGnosisQueryAccountsArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Account_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<YamGnosis_Account_Filter>;
};


export type YamGnosisQueryAllowanceArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
};


export type YamGnosisQueryAllowancesArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Allowance_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<YamGnosis_Allowance_Filter>;
};


export type YamGnosisQueryGlobalArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
};


export type YamGnosisQueryGlobalsArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Global_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<YamGnosis_Global_Filter>;
};


export type YamGnosisQueryOfferArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
};


export type YamGnosisQueryOfferPriceArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
};


export type YamGnosisQueryOfferPricesArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_OfferPrice_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<YamGnosis_OfferPrice_Filter>;
};


export type YamGnosisQueryOffersArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Offer_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<YamGnosis_Offer_Filter>;
};


export type YamGnosisQueryPurchaseArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
};


export type YamGnosisQueryPurchasesArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Purchase_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<YamGnosis_Purchase_Filter>;
};


export type YamGnosisQueryTokenArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
};


export type YamGnosisQueryTokensArgs = {
  block?: InputMaybe<YamGnosis_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Token_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamGnosis__SubgraphErrorPolicy_;
  where?: InputMaybe<YamGnosis_Token_Filter>;
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

export type RealTokenEth_Account = {
  __typename?: 'realTokenEth_Account';
  /**  Account address  */
  address: Scalars['realTokenEth_Bytes']['output'];
  /**  Allowances for Account  */
  allowances: Array<RealTokenEth_Allowance>;
  /**  Token balances  */
  balances: Array<RealTokenEth_AccountBalance>;
  /**  Token balances history  */
  balancesHistory: Array<RealTokenEth_AccountBalanceSnapshot>;
  /**  Equals to: <accountAddress> */
  id: Scalars['ID']['output'];
  userIds: Array<RealTokenEth_UserId>;
};


export type RealTokenEth_AccountAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_Allowance_Filter>;
};


export type RealTokenEth_AccountBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_AccountBalance_Filter>;
};


export type RealTokenEth_AccountBalancesHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_AccountBalanceSnapshot_Filter>;
};


export type RealTokenEth_AccountUserIdsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_UserId_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_UserId_Filter>;
};

export type RealTokenEth_AccountBalance = {
  __typename?: 'realTokenEth_AccountBalance';
  /**  Account address  */
  account: RealTokenEth_Account;
  /**  Allowances for AccountBalance  */
  allowances: Array<RealTokenEth_Allowance>;
  /**  Current account balance  */
  amount: Scalars['realTokenEth_BigDecimal']['output'];
  /**  Block number in which the balance was last modified  */
  block: Scalars['realTokenEth_BigInt']['output'];
  history: Array<RealTokenEth_AccountBalanceSnapshot>;
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID']['output'];
  /**  Last modified timestamp in seconds  */
  modified: Scalars['realTokenEth_BigInt']['output'];
  /**  Token address  */
  token: RealTokenEth_Token;
  /**  Hash of the last transaction that modified the balance  */
  transaction: RealTokenEth_Transaction;
};


export type RealTokenEth_AccountBalanceAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_Allowance_Filter>;
};


export type RealTokenEth_AccountBalanceHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_AccountBalanceSnapshot_Filter>;
};

export type RealTokenEth_AccountBalanceSnapshot = {
  __typename?: 'realTokenEth_AccountBalanceSnapshot';
  /**  Account address  */
  account: RealTokenEth_Account;
  /**  Account balance  */
  accountBalance: RealTokenEth_AccountBalance;
  /**  Account balance  */
  amount: Scalars['realTokenEth_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenEth_BigInt']['output'];
  event: RealTokenEth_TransferEvent;
  /**  Equals to: <accountAddress>-<tokenAddress>-<timestamp> */
  id: Scalars['ID']['output'];
  /**  Timestamp in seconds  */
  timestamp: Scalars['realTokenEth_BigInt']['output'];
  /**  Token addess  */
  token: RealTokenEth_Token;
  /**  Transaction hash  */
  transaction: RealTokenEth_Transaction;
};

export type RealTokenEth_AccountBalanceSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  accountBalance?: InputMaybe<Scalars['String']['input']>;
  accountBalance_?: InputMaybe<RealTokenEth_AccountBalance_Filter>;
  accountBalance_contains?: InputMaybe<Scalars['String']['input']>;
  accountBalance_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accountBalance_ends_with?: InputMaybe<Scalars['String']['input']>;
  accountBalance_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accountBalance_gt?: InputMaybe<Scalars['String']['input']>;
  accountBalance_gte?: InputMaybe<Scalars['String']['input']>;
  accountBalance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accountBalance_lt?: InputMaybe<Scalars['String']['input']>;
  accountBalance_lte?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_contains?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accountBalance_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accountBalance_starts_with?: InputMaybe<Scalars['String']['input']>;
  accountBalance_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<RealTokenEth_Account_Filter>;
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
  amount?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_AccountBalanceSnapshot_Filter>>>;
  block?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  event?: InputMaybe<Scalars['String']['input']>;
  event_?: InputMaybe<RealTokenEth_TransferEvent_Filter>;
  event_contains?: InputMaybe<Scalars['String']['input']>;
  event_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  event_ends_with?: InputMaybe<Scalars['String']['input']>;
  event_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_gt?: InputMaybe<Scalars['String']['input']>;
  event_gte?: InputMaybe<Scalars['String']['input']>;
  event_in?: InputMaybe<Array<Scalars['String']['input']>>;
  event_lt?: InputMaybe<Scalars['String']['input']>;
  event_lte?: InputMaybe<Scalars['String']['input']>;
  event_not?: InputMaybe<Scalars['String']['input']>;
  event_not_contains?: InputMaybe<Scalars['String']['input']>;
  event_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  event_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  event_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  event_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  event_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_starts_with?: InputMaybe<Scalars['String']['input']>;
  event_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_AccountBalanceSnapshot_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenEth_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenEth_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenEth_AccountBalanceSnapshot_OrderBy {
  Account = 'account',
  AccountBalance = 'accountBalance',
  AccountBalanceAmount = 'accountBalance__amount',
  AccountBalanceBlock = 'accountBalance__block',
  AccountBalanceId = 'accountBalance__id',
  AccountBalanceModified = 'accountBalance__modified',
  AccountAddress = 'account__address',
  AccountId = 'account__id',
  Amount = 'amount',
  Block = 'block',
  Event = 'event',
  EventAmount = 'event__amount',
  EventBlock = 'event__block',
  EventDestination = 'event__destination',
  EventId = 'event__id',
  EventSender = 'event__sender',
  EventSource = 'event__source',
  EventTimestamp = 'event__timestamp',
  Id = 'id',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type RealTokenEth_AccountBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<RealTokenEth_Account_Filter>;
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
  allowances_?: InputMaybe<RealTokenEth_Allowance_Filter>;
  amount?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_AccountBalance_Filter>>>;
  block?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  history_?: InputMaybe<RealTokenEth_AccountBalanceSnapshot_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  modified?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  modified_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  modified_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  modified_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  modified_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  modified_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  modified_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  modified_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_AccountBalance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenEth_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenEth_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenEth_AccountBalance_OrderBy {
  Account = 'account',
  AccountAddress = 'account__address',
  AccountId = 'account__id',
  Allowances = 'allowances',
  Amount = 'amount',
  Block = 'block',
  History = 'history',
  Id = 'id',
  Modified = 'modified',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type RealTokenEth_Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  allowances_?: InputMaybe<RealTokenEth_Allowance_Filter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_Account_Filter>>>;
  balancesHistory_?: InputMaybe<RealTokenEth_AccountBalanceSnapshot_Filter>;
  balances_?: InputMaybe<RealTokenEth_AccountBalance_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_Account_Filter>>>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_?: InputMaybe<RealTokenEth_UserId_Filter>;
  userIds_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum RealTokenEth_Account_OrderBy {
  Address = 'address',
  Allowances = 'allowances',
  Balances = 'balances',
  BalancesHistory = 'balancesHistory',
  Id = 'id',
  UserIds = 'userIds'
}

export type RealTokenEth_Allowance = {
  __typename?: 'realTokenEth_Allowance';
  /**  Account address  */
  account: RealTokenEth_Account;
  /**  Current allowance  */
  allowance: Scalars['realTokenEth_BigDecimal']['output'];
  /**  Account balance  */
  balance: RealTokenEth_AccountBalance;
  /**  Equals to: <accountAddress>-<tokenAddress>-<spenderAddress> */
  id: Scalars['ID']['output'];
  /**  Spender address  */
  spender: RealTokenEth_Account;
  /**  Token address  */
  token: RealTokenEth_Token;
};

export type RealTokenEth_Allowance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<RealTokenEth_Account_Filter>;
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
  allowance?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  allowance_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  allowance_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  allowance_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  allowance_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  allowance_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  allowance_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  allowance_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_Allowance_Filter>>>;
  balance?: InputMaybe<Scalars['String']['input']>;
  balance_?: InputMaybe<RealTokenEth_AccountBalance_Filter>;
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
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_Allowance_Filter>>>;
  spender?: InputMaybe<Scalars['String']['input']>;
  spender_?: InputMaybe<RealTokenEth_Account_Filter>;
  spender_contains?: InputMaybe<Scalars['String']['input']>;
  spender_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_ends_with?: InputMaybe<Scalars['String']['input']>;
  spender_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_gt?: InputMaybe<Scalars['String']['input']>;
  spender_gte?: InputMaybe<Scalars['String']['input']>;
  spender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  spender_lt?: InputMaybe<Scalars['String']['input']>;
  spender_lte?: InputMaybe<Scalars['String']['input']>;
  spender_not?: InputMaybe<Scalars['String']['input']>;
  spender_not_contains?: InputMaybe<Scalars['String']['input']>;
  spender_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  spender_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  spender_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  spender_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_starts_with?: InputMaybe<Scalars['String']['input']>;
  spender_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenEth_Token_Filter>;
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

export enum RealTokenEth_Allowance_OrderBy {
  Account = 'account',
  AccountAddress = 'account__address',
  AccountId = 'account__id',
  Allowance = 'allowance',
  Balance = 'balance',
  BalanceAmount = 'balance__amount',
  BalanceBlock = 'balance__block',
  BalanceId = 'balance__id',
  BalanceModified = 'balance__modified',
  Id = 'id',
  Spender = 'spender',
  SpenderAddress = 'spender__address',
  SpenderId = 'spender__id',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount'
}

export type RealTokenEth_BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type RealTokenEth_Block_Height = {
  hash?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type RealTokenEth_BurnEvent = RealTokenEth_TokenEvent & {
  __typename?: 'realTokenEth_BurnEvent';
  /**  Quantity of tokens burned  */
  amount: Scalars['realTokenEth_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenEth_BigInt']['output'];
  /**  Address of burned account  */
  burner: Scalars['realTokenEth_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenEth_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenEth_BigInt']['output'];
  /**  Token address  */
  token: RealTokenEth_Token;
  /**  Transaction hash  */
  transaction: RealTokenEth_Transaction;
};

export type RealTokenEth_BurnEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_BurnEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  burner?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  burner_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  burner_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  burner_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  burner_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  burner_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  burner_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  burner_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  burner_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  burner_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_BurnEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenEth_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenEth_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenEth_BurnEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Burner = 'burner',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type RealTokenEth_MintEvent = RealTokenEth_TokenEvent & {
  __typename?: 'realTokenEth_MintEvent';
  /**  Quantity of tokens minted  */
  amount: Scalars['realTokenEth_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenEth_BigInt']['output'];
  /**  Address of destination account  */
  destination: Scalars['realTokenEth_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenEth_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenEth_BigInt']['output'];
  /**  Token address  */
  token: RealTokenEth_Token;
  /**  Transaction hash  */
  transaction: RealTokenEth_Transaction;
};

export type RealTokenEth_MintEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_MintEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  destination?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_MintEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenEth_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenEth_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenEth_MintEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Destination = 'destination',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

/** Defines the order direction, either ascending or descending */
export enum RealTokenEth_OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type RealTokenEth_Token = {
  __typename?: 'realTokenEth_Token';
  /**  Token address  */
  address: Scalars['realTokenEth_Bytes']['output'];
  /**  Total number of approval events  */
  approveEventCount: Scalars['realTokenEth_BigInt']['output'];
  /**  List of approval  */
  approves: Array<RealTokenEth_Allowance>;
  /**  Total number of burn events  */
  burnEventCount: Scalars['realTokenEth_BigInt']['output'];
  /**  List of burn events  */
  burnEvents: Array<RealTokenEth_BurnEvent>;
  /**  Number of decimals the token uses  */
  decimals: Scalars['Int']['output'];
  /**  Total number of events (all types) */
  eventCount: Scalars['realTokenEth_BigInt']['output'];
  /**  Human-readable fullname of the token  */
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /**  Total number of mint events  */
  mintEventCount: Scalars['realTokenEth_BigInt']['output'];
  /**  List of mint events  */
  mintEvents: Array<RealTokenEth_MintEvent>;
  /**  Trusted intermediaries order  */
  order: Array<Scalars['String']['output']>;
  /**  Symbol of the token  */
  symbol: Scalars['String']['output'];
  /**  Total token burned  */
  totalBurned: Scalars['realTokenEth_BigDecimal']['output'];
  /**  Total token minted  */
  totalMinted: Scalars['realTokenEth_BigDecimal']['output'];
  /**  Total token supply  */
  totalSupply: Scalars['realTokenEth_BigDecimal']['output'];
  /**  Total token transferred  */
  totalTransferred: Scalars['realTokenEth_BigDecimal']['output'];
  /**  List of transactions  */
  transactions: Array<RealTokenEth_Transaction>;
  /**  Total number of transfer events  */
  transferEventCount: Scalars['realTokenEth_BigInt']['output'];
  /**  List of token events  */
  transferEvents: Array<RealTokenEth_TransferEvent>;
  /**  Trusted intermediaries list  */
  trustedIntermediaries: Array<RealTokenEth_TrustedIntermediary>;
};


export type RealTokenEth_TokenApprovesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_Allowance_Filter>;
};


export type RealTokenEth_TokenBurnEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_BurnEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_BurnEvent_Filter>;
};


export type RealTokenEth_TokenMintEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_MintEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_MintEvent_Filter>;
};


export type RealTokenEth_TokenTransactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_Transaction_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_Transaction_Filter>;
};


export type RealTokenEth_TokenTransferEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_TransferEvent_Filter>;
};


export type RealTokenEth_TokenTrustedIntermediariesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_TrustedIntermediary_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_TrustedIntermediary_Filter>;
};

export type RealTokenEth_TokenEvent = {
  /**  Quantity of tokens  */
  amount: Scalars['realTokenEth_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenEth_BigInt']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenEth_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenEth_BigInt']['output'];
  /**  Token address  */
  token: RealTokenEth_Token;
  /**  Transaction hash  */
  transaction: RealTokenEth_Transaction;
};

export type RealTokenEth_TokenEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_TokenEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_TokenEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenEth_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenEth_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenEth_TokenEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type RealTokenEth_Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_Token_Filter>>>;
  approveEventCount?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  approveEventCount_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  approveEventCount_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  approveEventCount_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  approveEventCount_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  approveEventCount_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  approveEventCount_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  approveEventCount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  approves_?: InputMaybe<RealTokenEth_Allowance_Filter>;
  burnEventCount?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  burnEventCount_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  burnEventCount_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  burnEventCount_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  burnEventCount_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  burnEventCount_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  burnEventCount_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  burnEventCount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  burnEvents_?: InputMaybe<RealTokenEth_BurnEvent_Filter>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  eventCount?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  eventCount_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  eventCount_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  eventCount_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  eventCount_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  eventCount_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  eventCount_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  eventCount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  fullName_contains?: InputMaybe<Scalars['String']['input']>;
  fullName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fullName_ends_with?: InputMaybe<Scalars['String']['input']>;
  fullName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fullName_gt?: InputMaybe<Scalars['String']['input']>;
  fullName_gte?: InputMaybe<Scalars['String']['input']>;
  fullName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fullName_lt?: InputMaybe<Scalars['String']['input']>;
  fullName_lte?: InputMaybe<Scalars['String']['input']>;
  fullName_not?: InputMaybe<Scalars['String']['input']>;
  fullName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fullName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fullName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  fullName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fullName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fullName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  fullName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fullName_starts_with?: InputMaybe<Scalars['String']['input']>;
  fullName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  mintEventCount?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  mintEventCount_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  mintEventCount_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  mintEventCount_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  mintEventCount_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  mintEventCount_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  mintEventCount_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  mintEventCount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  mintEvents_?: InputMaybe<RealTokenEth_MintEvent_Filter>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_Token_Filter>>>;
  order?: InputMaybe<Array<Scalars['String']['input']>>;
  order_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  order_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
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
  totalBurned?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalBurned_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalBurned_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalBurned_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  totalBurned_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalBurned_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalBurned_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalBurned_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  totalMinted?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalMinted_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalMinted_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalMinted_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  totalMinted_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalMinted_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalMinted_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalMinted_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  totalTransferred?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalTransferred_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalTransferred_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalTransferred_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  totalTransferred_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalTransferred_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalTransferred_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  totalTransferred_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  transactions?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_?: InputMaybe<RealTokenEth_Transaction_Filter>;
  transactions_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  transferEventCount?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  transferEventCount_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  transferEventCount_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  transferEventCount_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  transferEventCount_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  transferEventCount_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  transferEventCount_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  transferEventCount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  transferEvents_?: InputMaybe<RealTokenEth_TransferEvent_Filter>;
  trustedIntermediaries?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_?: InputMaybe<RealTokenEth_TrustedIntermediary_Filter>;
  trustedIntermediaries_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum RealTokenEth_Token_OrderBy {
  Address = 'address',
  ApproveEventCount = 'approveEventCount',
  Approves = 'approves',
  BurnEventCount = 'burnEventCount',
  BurnEvents = 'burnEvents',
  Decimals = 'decimals',
  EventCount = 'eventCount',
  FullName = 'fullName',
  Id = 'id',
  MintEventCount = 'mintEventCount',
  MintEvents = 'mintEvents',
  Order = 'order',
  Symbol = 'symbol',
  TotalBurned = 'totalBurned',
  TotalMinted = 'totalMinted',
  TotalSupply = 'totalSupply',
  TotalTransferred = 'totalTransferred',
  Transactions = 'transactions',
  TransferEventCount = 'transferEventCount',
  TransferEvents = 'transferEvents',
  TrustedIntermediaries = 'trustedIntermediaries'
}

export type RealTokenEth_Transaction = {
  __typename?: 'realTokenEth_Transaction';
  /**  Block number  */
  block: Scalars['realTokenEth_BigInt']['output'];
  /**  Transaction cumulative gas used  */
  cumulativeGasUsed?: Maybe<Scalars['realTokenEth_BigInt']['output']>;
  /**  Transaction gas limit  */
  gasLimit: Scalars['realTokenEth_BigInt']['output'];
  /**  Transaction gas price  */
  gasPrice: Scalars['realTokenEth_BigInt']['output'];
  /**  Transaction gas used  */
  gasUsed?: Maybe<Scalars['realTokenEth_BigInt']['output']>;
  /**  Transaction hash  */
  id: Scalars['ID']['output'];
  /**  Input  */
  input: Scalars['realTokenEth_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenEth_BigInt']['output'];
  /**  Interacted With (To)   */
  to?: Maybe<Scalars['realTokenEth_Bytes']['output']>;
  /**  List of transfer events  */
  transferEvents: Array<RealTokenEth_TransferEvent>;
  /**  Value  */
  value: Scalars['realTokenEth_BigInt']['output'];
};


export type RealTokenEth_TransactionTransferEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenEth_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenEth_TransferEvent_Filter>;
};

export type RealTokenEth_Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_Transaction_Filter>>>;
  block?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  cumulativeGasUsed?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  cumulativeGasUsed_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  cumulativeGasUsed_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  cumulativeGasUsed_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  cumulativeGasUsed_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  cumulativeGasUsed_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  cumulativeGasUsed_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  cumulativeGasUsed_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  gasLimit?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasLimit_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasLimit_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasLimit_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  gasLimit_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasLimit_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasLimit_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  gasPrice?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  input?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  input_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  input_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  input_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  input_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  input_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  input_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  input_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  input_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  input_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_Transaction_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  to?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  to_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  transferEvents_?: InputMaybe<RealTokenEth_TransferEvent_Filter>;
  value?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  value_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
};

export enum RealTokenEth_Transaction_OrderBy {
  Block = 'block',
  CumulativeGasUsed = 'cumulativeGasUsed',
  GasLimit = 'gasLimit',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Id = 'id',
  Input = 'input',
  Timestamp = 'timestamp',
  To = 'to',
  TransferEvents = 'transferEvents',
  Value = 'value'
}

export type RealTokenEth_TransferEvent = RealTokenEth_TokenEvent & {
  __typename?: 'realTokenEth_TransferEvent';
  /**  Quantity of tokens transferred  */
  amount: Scalars['realTokenEth_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenEth_BigInt']['output'];
  /**  Address of destination account  */
  destination: Scalars['realTokenEth_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenEth_Bytes']['output'];
  /**  Address of source account  */
  source: Scalars['realTokenEth_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenEth_BigInt']['output'];
  /**  Token address  */
  token: RealTokenEth_Token;
  /**  Transaction hash  */
  transaction: RealTokenEth_Transaction;
};

export type RealTokenEth_TransferEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenEth_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_TransferEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  destination?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_TransferEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  source?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  source_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  source_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  source_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  source_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  source_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  source_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  source_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  source_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  source_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenEth_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenEth_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenEth_TransferEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Destination = 'destination',
  Id = 'id',
  Sender = 'sender',
  Source = 'source',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type RealTokenEth_TrustedIntermediary = {
  __typename?: 'realTokenEth_TrustedIntermediary';
  /**  trusted intermedidary address  */
  address: Scalars['realTokenEth_Bytes']['output'];
  /**  Equals to: <trustedAddress> */
  id: Scalars['ID']['output'];
  /**  weight  */
  weight: Scalars['realTokenEth_BigInt']['output'];
};

export type RealTokenEth_TrustedIntermediary_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenEth_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenEth_Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_TrustedIntermediary_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_TrustedIntermediary_Filter>>>;
  weight?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  weight_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  weight_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  weight_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  weight_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  weight_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  weight_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  weight_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
};

export enum RealTokenEth_TrustedIntermediary_OrderBy {
  Address = 'address',
  Id = 'id',
  Weight = 'weight'
}

export type RealTokenEth_UserId = {
  __typename?: 'realTokenEth_UserId';
  /**  Compliance registry attributeKeys  */
  attributeKeys: Array<Scalars['realTokenEth_BigInt']['output']>;
  /**  Compliance registry attributeValues  */
  attributeValues: Array<Scalars['realTokenEth_BigInt']['output']>;
  /**  Last block update  */
  block: Scalars['realTokenEth_BigInt']['output'];
  /**  Equals to: <trustedAddress-userId> */
  id: Scalars['ID']['output'];
  /**  Last timestamp update  */
  timestamp: Scalars['realTokenEth_BigInt']['output'];
  /**  Trusted intermediary  */
  trustedIntermediary: RealTokenEth_TrustedIntermediary;
  /**  Compliance registry userId  */
  userId: Scalars['realTokenEth_BigInt']['output'];
};

export type RealTokenEth_UserId_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenEth_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenEth_UserId_Filter>>>;
  attributeKeys?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeKeys_contains?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeKeys_contains_nocase?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeKeys_not?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeKeys_not_contains?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeKeys_not_contains_nocase?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeValues?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeValues_contains?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeValues_contains_nocase?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeValues_not?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeValues_not_contains?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  attributeValues_not_contains_nocase?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  block?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenEth_UserId_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  trustedIntermediary?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_?: InputMaybe<RealTokenEth_TrustedIntermediary_Filter>;
  trustedIntermediary_contains?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_ends_with?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_gt?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_gte?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_in?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediary_lt?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_lte?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_contains?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediary_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_starts_with?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  userId_gt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  userId_gte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  userId_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
  userId_lt?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  userId_lte?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  userId_not?: InputMaybe<Scalars['realTokenEth_BigInt']['input']>;
  userId_not_in?: InputMaybe<Array<Scalars['realTokenEth_BigInt']['input']>>;
};

export enum RealTokenEth_UserId_OrderBy {
  AttributeKeys = 'attributeKeys',
  AttributeValues = 'attributeValues',
  Block = 'block',
  Id = 'id',
  Timestamp = 'timestamp',
  TrustedIntermediary = 'trustedIntermediary',
  TrustedIntermediaryAddress = 'trustedIntermediary__address',
  TrustedIntermediaryId = 'trustedIntermediary__id',
  TrustedIntermediaryWeight = 'trustedIntermediary__weight',
  UserId = 'userId'
}

export type RealTokenEth__Block_ = {
  __typename?: 'realTokenEth__Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['realTokenEth_Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type RealTokenEth__Meta_ = {
  __typename?: 'realTokenEth__Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: RealTokenEth__Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum RealTokenEth__SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type RealTokenGnosis_Account = {
  __typename?: 'realTokenGnosis_Account';
  /**  Account address  */
  address: Scalars['realTokenGnosis_Bytes']['output'];
  /**  Allowances for Account  */
  allowances: Array<RealTokenGnosis_Allowance>;
  /**  Token balances  */
  balances: Array<RealTokenGnosis_AccountBalance>;
  /**  Token balances history  */
  balancesHistory: Array<RealTokenGnosis_AccountBalanceSnapshot>;
  /**  Equals to: <accountAddress> */
  id: Scalars['ID']['output'];
  userIds: Array<RealTokenGnosis_UserId>;
};


export type RealTokenGnosis_AccountAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_Allowance_Filter>;
};


export type RealTokenGnosis_AccountBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_AccountBalance_Filter>;
};


export type RealTokenGnosis_AccountBalancesHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_AccountBalanceSnapshot_Filter>;
};


export type RealTokenGnosis_AccountUserIdsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_UserId_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_UserId_Filter>;
};

export type RealTokenGnosis_AccountBalance = {
  __typename?: 'realTokenGnosis_AccountBalance';
  /**  Account address  */
  account: RealTokenGnosis_Account;
  /**  Allowances for AccountBalance  */
  allowances: Array<RealTokenGnosis_Allowance>;
  /**  Current account balance  */
  amount: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  Block number in which the balance was last modified  */
  block: Scalars['realTokenGnosis_BigInt']['output'];
  history: Array<RealTokenGnosis_AccountBalanceSnapshot>;
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID']['output'];
  /**  Last modified timestamp in seconds  */
  modified: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Token address  */
  token: RealTokenGnosis_Token;
  /**  Hash of the last transaction that modified the balance  */
  transaction: RealTokenGnosis_Transaction;
};


export type RealTokenGnosis_AccountBalanceAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_Allowance_Filter>;
};


export type RealTokenGnosis_AccountBalanceHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_AccountBalanceSnapshot_Filter>;
};

export type RealTokenGnosis_AccountBalanceSnapshot = {
  __typename?: 'realTokenGnosis_AccountBalanceSnapshot';
  /**  Account address  */
  account: RealTokenGnosis_Account;
  /**  Account balance  */
  accountBalance: RealTokenGnosis_AccountBalance;
  /**  Account balance  */
  amount: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenGnosis_BigInt']['output'];
  event: RealTokenGnosis_TransferEvent;
  /**  Equals to: <accountAddress>-<tokenAddress>-<timestamp> */
  id: Scalars['ID']['output'];
  /**  Timestamp in seconds  */
  timestamp: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Token addess  */
  token: RealTokenGnosis_Token;
  /**  Transaction hash  */
  transaction: RealTokenGnosis_Transaction;
};

export type RealTokenGnosis_AccountBalanceSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  accountBalance?: InputMaybe<Scalars['String']['input']>;
  accountBalance_?: InputMaybe<RealTokenGnosis_AccountBalance_Filter>;
  accountBalance_contains?: InputMaybe<Scalars['String']['input']>;
  accountBalance_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accountBalance_ends_with?: InputMaybe<Scalars['String']['input']>;
  accountBalance_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accountBalance_gt?: InputMaybe<Scalars['String']['input']>;
  accountBalance_gte?: InputMaybe<Scalars['String']['input']>;
  accountBalance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accountBalance_lt?: InputMaybe<Scalars['String']['input']>;
  accountBalance_lte?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_contains?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  accountBalance_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  accountBalance_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  accountBalance_starts_with?: InputMaybe<Scalars['String']['input']>;
  accountBalance_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<RealTokenGnosis_Account_Filter>;
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
  amount?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_AccountBalanceSnapshot_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  event?: InputMaybe<Scalars['String']['input']>;
  event_?: InputMaybe<RealTokenGnosis_TransferEvent_Filter>;
  event_contains?: InputMaybe<Scalars['String']['input']>;
  event_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  event_ends_with?: InputMaybe<Scalars['String']['input']>;
  event_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_gt?: InputMaybe<Scalars['String']['input']>;
  event_gte?: InputMaybe<Scalars['String']['input']>;
  event_in?: InputMaybe<Array<Scalars['String']['input']>>;
  event_lt?: InputMaybe<Scalars['String']['input']>;
  event_lte?: InputMaybe<Scalars['String']['input']>;
  event_not?: InputMaybe<Scalars['String']['input']>;
  event_not_contains?: InputMaybe<Scalars['String']['input']>;
  event_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  event_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  event_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  event_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  event_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  event_starts_with?: InputMaybe<Scalars['String']['input']>;
  event_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_AccountBalanceSnapshot_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGnosis_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenGnosis_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenGnosis_AccountBalanceSnapshot_OrderBy {
  Account = 'account',
  AccountBalance = 'accountBalance',
  AccountBalanceAmount = 'accountBalance__amount',
  AccountBalanceBlock = 'accountBalance__block',
  AccountBalanceId = 'accountBalance__id',
  AccountBalanceModified = 'accountBalance__modified',
  AccountAddress = 'account__address',
  AccountId = 'account__id',
  Amount = 'amount',
  Block = 'block',
  Event = 'event',
  EventAmount = 'event__amount',
  EventBlock = 'event__block',
  EventDestination = 'event__destination',
  EventId = 'event__id',
  EventSender = 'event__sender',
  EventSource = 'event__source',
  EventTimestamp = 'event__timestamp',
  Id = 'id',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type RealTokenGnosis_AccountBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<RealTokenGnosis_Account_Filter>;
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
  allowances_?: InputMaybe<RealTokenGnosis_Allowance_Filter>;
  amount?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_AccountBalance_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  history_?: InputMaybe<RealTokenGnosis_AccountBalanceSnapshot_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  modified?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  modified_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  modified_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  modified_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  modified_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  modified_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  modified_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  modified_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_AccountBalance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGnosis_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenGnosis_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenGnosis_AccountBalance_OrderBy {
  Account = 'account',
  AccountAddress = 'account__address',
  AccountId = 'account__id',
  Allowances = 'allowances',
  Amount = 'amount',
  Block = 'block',
  History = 'history',
  Id = 'id',
  Modified = 'modified',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type RealTokenGnosis_Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  allowances_?: InputMaybe<RealTokenGnosis_Allowance_Filter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_Account_Filter>>>;
  balancesHistory_?: InputMaybe<RealTokenGnosis_AccountBalanceSnapshot_Filter>;
  balances_?: InputMaybe<RealTokenGnosis_AccountBalance_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_Account_Filter>>>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_?: InputMaybe<RealTokenGnosis_UserId_Filter>;
  userIds_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum RealTokenGnosis_Account_OrderBy {
  Address = 'address',
  Allowances = 'allowances',
  Balances = 'balances',
  BalancesHistory = 'balancesHistory',
  Id = 'id',
  UserIds = 'userIds'
}

export type RealTokenGnosis_Allowance = {
  __typename?: 'realTokenGnosis_Allowance';
  /**  Account address  */
  account: RealTokenGnosis_Account;
  /**  Current allowance  */
  allowance: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  Account balance  */
  balance: RealTokenGnosis_AccountBalance;
  /**  Equals to: <accountAddress>-<tokenAddress>-<spenderAddress> */
  id: Scalars['ID']['output'];
  /**  Spender address  */
  spender: RealTokenGnosis_Account;
  /**  Token address  */
  token: RealTokenGnosis_Token;
};

export type RealTokenGnosis_Allowance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<RealTokenGnosis_Account_Filter>;
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
  allowance?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  allowance_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  allowance_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  allowance_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  allowance_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  allowance_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  allowance_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  allowance_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_Allowance_Filter>>>;
  balance?: InputMaybe<Scalars['String']['input']>;
  balance_?: InputMaybe<RealTokenGnosis_AccountBalance_Filter>;
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
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_Allowance_Filter>>>;
  spender?: InputMaybe<Scalars['String']['input']>;
  spender_?: InputMaybe<RealTokenGnosis_Account_Filter>;
  spender_contains?: InputMaybe<Scalars['String']['input']>;
  spender_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_ends_with?: InputMaybe<Scalars['String']['input']>;
  spender_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_gt?: InputMaybe<Scalars['String']['input']>;
  spender_gte?: InputMaybe<Scalars['String']['input']>;
  spender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  spender_lt?: InputMaybe<Scalars['String']['input']>;
  spender_lte?: InputMaybe<Scalars['String']['input']>;
  spender_not?: InputMaybe<Scalars['String']['input']>;
  spender_not_contains?: InputMaybe<Scalars['String']['input']>;
  spender_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  spender_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  spender_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  spender_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  spender_starts_with?: InputMaybe<Scalars['String']['input']>;
  spender_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGnosis_Token_Filter>;
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

export enum RealTokenGnosis_Allowance_OrderBy {
  Account = 'account',
  AccountAddress = 'account__address',
  AccountId = 'account__id',
  Allowance = 'allowance',
  Balance = 'balance',
  BalanceAmount = 'balance__amount',
  BalanceBlock = 'balance__block',
  BalanceId = 'balance__id',
  BalanceModified = 'balance__modified',
  Id = 'id',
  Spender = 'spender',
  SpenderAddress = 'spender__address',
  SpenderId = 'spender__id',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount'
}

export type RealTokenGnosis_BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type RealTokenGnosis_Block_Height = {
  hash?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type RealTokenGnosis_BurnEvent = RealTokenGnosis_TokenEvent & {
  __typename?: 'realTokenGnosis_BurnEvent';
  /**  Quantity of tokens burned  */
  amount: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Address of burned account  */
  burner: Scalars['realTokenGnosis_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenGnosis_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Token address  */
  token: RealTokenGnosis_Token;
  /**  Transaction hash  */
  transaction: RealTokenGnosis_Transaction;
};

export type RealTokenGnosis_BurnEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_BurnEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  burner?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  burner_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  burner_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  burner_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  burner_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  burner_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  burner_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  burner_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  burner_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  burner_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_BurnEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGnosis_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenGnosis_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenGnosis_BurnEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Burner = 'burner',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type RealTokenGnosis_MintEvent = RealTokenGnosis_TokenEvent & {
  __typename?: 'realTokenGnosis_MintEvent';
  /**  Quantity of tokens minted  */
  amount: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Address of destination account  */
  destination: Scalars['realTokenGnosis_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenGnosis_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Token address  */
  token: RealTokenGnosis_Token;
  /**  Transaction hash  */
  transaction: RealTokenGnosis_Transaction;
};

export type RealTokenGnosis_MintEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_MintEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  destination?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_MintEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGnosis_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenGnosis_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenGnosis_MintEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Destination = 'destination',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

/** Defines the order direction, either ascending or descending */
export enum RealTokenGnosis_OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type RealTokenGnosis_Token = {
  __typename?: 'realTokenGnosis_Token';
  /**  Token address  */
  address: Scalars['realTokenGnosis_Bytes']['output'];
  /**  Total number of approval events  */
  approveEventCount: Scalars['realTokenGnosis_BigInt']['output'];
  /**  List of approval  */
  approves: Array<RealTokenGnosis_Allowance>;
  /**  Total number of burn events  */
  burnEventCount: Scalars['realTokenGnosis_BigInt']['output'];
  /**  List of burn events  */
  burnEvents: Array<RealTokenGnosis_BurnEvent>;
  /**  Number of decimals the token uses  */
  decimals: Scalars['Int']['output'];
  /**  Total number of events (all types) */
  eventCount: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Human-readable fullname of the token  */
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /**  Total number of mint events  */
  mintEventCount: Scalars['realTokenGnosis_BigInt']['output'];
  /**  List of mint events  */
  mintEvents: Array<RealTokenGnosis_MintEvent>;
  /**  Trusted intermediaries order  */
  order: Array<Scalars['String']['output']>;
  /**  Symbol of the token  */
  symbol: Scalars['String']['output'];
  /**  Total token burned  */
  totalBurned: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  Total token minted  */
  totalMinted: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  Total token supply  */
  totalSupply: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  Total token transferred  */
  totalTransferred: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  List of transactions  */
  transactions: Array<RealTokenGnosis_Transaction>;
  /**  Total number of transfer events  */
  transferEventCount: Scalars['realTokenGnosis_BigInt']['output'];
  /**  List of token events  */
  transferEvents: Array<RealTokenGnosis_TransferEvent>;
  /**  Trusted intermediaries list  */
  trustedIntermediaries: Array<RealTokenGnosis_TrustedIntermediary>;
};


export type RealTokenGnosis_TokenApprovesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_Allowance_Filter>;
};


export type RealTokenGnosis_TokenBurnEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_BurnEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_BurnEvent_Filter>;
};


export type RealTokenGnosis_TokenMintEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_MintEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_MintEvent_Filter>;
};


export type RealTokenGnosis_TokenTransactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_Transaction_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_Transaction_Filter>;
};


export type RealTokenGnosis_TokenTransferEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_TransferEvent_Filter>;
};


export type RealTokenGnosis_TokenTrustedIntermediariesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_TrustedIntermediary_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_TrustedIntermediary_Filter>;
};

export type RealTokenGnosis_TokenEvent = {
  /**  Quantity of tokens  */
  amount: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenGnosis_BigInt']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenGnosis_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Token address  */
  token: RealTokenGnosis_Token;
  /**  Transaction hash  */
  transaction: RealTokenGnosis_Transaction;
};

export type RealTokenGnosis_TokenEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_TokenEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_TokenEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGnosis_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenGnosis_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenGnosis_TokenEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type RealTokenGnosis_Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_Token_Filter>>>;
  approveEventCount?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  approveEventCount_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  approveEventCount_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  approveEventCount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  approveEventCount_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  approveEventCount_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  approveEventCount_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  approveEventCount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  approves_?: InputMaybe<RealTokenGnosis_Allowance_Filter>;
  burnEventCount?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  burnEventCount_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  burnEventCount_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  burnEventCount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  burnEventCount_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  burnEventCount_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  burnEventCount_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  burnEventCount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  burnEvents_?: InputMaybe<RealTokenGnosis_BurnEvent_Filter>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  eventCount?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  eventCount_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  eventCount_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  eventCount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  eventCount_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  eventCount_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  eventCount_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  eventCount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  fullName_contains?: InputMaybe<Scalars['String']['input']>;
  fullName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fullName_ends_with?: InputMaybe<Scalars['String']['input']>;
  fullName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fullName_gt?: InputMaybe<Scalars['String']['input']>;
  fullName_gte?: InputMaybe<Scalars['String']['input']>;
  fullName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fullName_lt?: InputMaybe<Scalars['String']['input']>;
  fullName_lte?: InputMaybe<Scalars['String']['input']>;
  fullName_not?: InputMaybe<Scalars['String']['input']>;
  fullName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fullName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  fullName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  fullName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fullName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fullName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  fullName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  fullName_starts_with?: InputMaybe<Scalars['String']['input']>;
  fullName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  mintEventCount?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  mintEventCount_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  mintEventCount_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  mintEventCount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  mintEventCount_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  mintEventCount_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  mintEventCount_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  mintEventCount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  mintEvents_?: InputMaybe<RealTokenGnosis_MintEvent_Filter>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_Token_Filter>>>;
  order?: InputMaybe<Array<Scalars['String']['input']>>;
  order_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  order_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
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
  totalBurned?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalBurned_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalBurned_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalBurned_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  totalBurned_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalBurned_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalBurned_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalBurned_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  totalMinted?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalMinted_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalMinted_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalMinted_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  totalMinted_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalMinted_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalMinted_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalMinted_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  totalTransferred?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalTransferred_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalTransferred_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalTransferred_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  totalTransferred_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalTransferred_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalTransferred_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  totalTransferred_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  transactions?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_?: InputMaybe<RealTokenGnosis_Transaction_Filter>;
  transactions_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  transferEventCount?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  transferEventCount_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  transferEventCount_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  transferEventCount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  transferEventCount_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  transferEventCount_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  transferEventCount_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  transferEventCount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  transferEvents_?: InputMaybe<RealTokenGnosis_TransferEvent_Filter>;
  trustedIntermediaries?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_?: InputMaybe<RealTokenGnosis_TrustedIntermediary_Filter>;
  trustedIntermediaries_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum RealTokenGnosis_Token_OrderBy {
  Address = 'address',
  ApproveEventCount = 'approveEventCount',
  Approves = 'approves',
  BurnEventCount = 'burnEventCount',
  BurnEvents = 'burnEvents',
  Decimals = 'decimals',
  EventCount = 'eventCount',
  FullName = 'fullName',
  Id = 'id',
  MintEventCount = 'mintEventCount',
  MintEvents = 'mintEvents',
  Order = 'order',
  Symbol = 'symbol',
  TotalBurned = 'totalBurned',
  TotalMinted = 'totalMinted',
  TotalSupply = 'totalSupply',
  TotalTransferred = 'totalTransferred',
  Transactions = 'transactions',
  TransferEventCount = 'transferEventCount',
  TransferEvents = 'transferEvents',
  TrustedIntermediaries = 'trustedIntermediaries'
}

export type RealTokenGnosis_Transaction = {
  __typename?: 'realTokenGnosis_Transaction';
  /**  Block number  */
  block: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Transaction cumulative gas used  */
  cumulativeGasUsed?: Maybe<Scalars['realTokenGnosis_BigInt']['output']>;
  /**  Transaction gas limit  */
  gasLimit: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Transaction gas price  */
  gasPrice: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Transaction gas used  */
  gasUsed?: Maybe<Scalars['realTokenGnosis_BigInt']['output']>;
  /**  Transaction hash  */
  id: Scalars['ID']['output'];
  /**  Input  */
  input: Scalars['realTokenGnosis_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Interacted With (To)   */
  to?: Maybe<Scalars['realTokenGnosis_Bytes']['output']>;
  /**  List of transfer events  */
  transferEvents: Array<RealTokenGnosis_TransferEvent>;
  /**  Value  */
  value: Scalars['realTokenGnosis_BigInt']['output'];
};


export type RealTokenGnosis_TransactionTransferEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGnosis_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGnosis_TransferEvent_Filter>;
};

export type RealTokenGnosis_Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_Transaction_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  cumulativeGasUsed?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  cumulativeGasUsed_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  cumulativeGasUsed_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  cumulativeGasUsed_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  cumulativeGasUsed_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  cumulativeGasUsed_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  cumulativeGasUsed_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  cumulativeGasUsed_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  gasLimit?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasLimit_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasLimit_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasLimit_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  gasLimit_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasLimit_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasLimit_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  gasPrice?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  input?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  input_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  input_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  input_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  input_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  input_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  input_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  input_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  input_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  input_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_Transaction_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  to?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  to_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  transferEvents_?: InputMaybe<RealTokenGnosis_TransferEvent_Filter>;
  value?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  value_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
};

export enum RealTokenGnosis_Transaction_OrderBy {
  Block = 'block',
  CumulativeGasUsed = 'cumulativeGasUsed',
  GasLimit = 'gasLimit',
  GasPrice = 'gasPrice',
  GasUsed = 'gasUsed',
  Id = 'id',
  Input = 'input',
  Timestamp = 'timestamp',
  To = 'to',
  TransferEvents = 'transferEvents',
  Value = 'value'
}

export type RealTokenGnosis_TransferEvent = RealTokenGnosis_TokenEvent & {
  __typename?: 'realTokenGnosis_TransferEvent';
  /**  Quantity of tokens transferred  */
  amount: Scalars['realTokenGnosis_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Address of destination account  */
  destination: Scalars['realTokenGnosis_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenGnosis_Bytes']['output'];
  /**  Address of source account  */
  source: Scalars['realTokenGnosis_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Token address  */
  token: RealTokenGnosis_Token;
  /**  Transaction hash  */
  transaction: RealTokenGnosis_Transaction;
};

export type RealTokenGnosis_TransferEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGnosis_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_TransferEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  destination?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_TransferEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  source?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  source_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  source_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  source_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  source_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  source_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  source_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  source_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  source_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  source_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGnosis_Token_Filter>;
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
  transaction?: InputMaybe<Scalars['String']['input']>;
  transaction_?: InputMaybe<RealTokenGnosis_Transaction_Filter>;
  transaction_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_gt?: InputMaybe<Scalars['String']['input']>;
  transaction_gte?: InputMaybe<Scalars['String']['input']>;
  transaction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_lt?: InputMaybe<Scalars['String']['input']>;
  transaction_lte?: InputMaybe<Scalars['String']['input']>;
  transaction_not?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains?: InputMaybe<Scalars['String']['input']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with?: InputMaybe<Scalars['String']['input']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RealTokenGnosis_TransferEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Destination = 'destination',
  Id = 'id',
  Sender = 'sender',
  Source = 'source',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenSymbol = 'token__symbol',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount',
  Transaction = 'transaction',
  TransactionBlock = 'transaction__block',
  TransactionCumulativeGasUsed = 'transaction__cumulativeGasUsed',
  TransactionGasLimit = 'transaction__gasLimit',
  TransactionGasPrice = 'transaction__gasPrice',
  TransactionGasUsed = 'transaction__gasUsed',
  TransactionId = 'transaction__id',
  TransactionInput = 'transaction__input',
  TransactionTimestamp = 'transaction__timestamp',
  TransactionTo = 'transaction__to',
  TransactionValue = 'transaction__value'
}

export type RealTokenGnosis_TrustedIntermediary = {
  __typename?: 'realTokenGnosis_TrustedIntermediary';
  /**  trusted intermedidary address  */
  address: Scalars['realTokenGnosis_Bytes']['output'];
  /**  Equals to: <trustedAddress> */
  id: Scalars['ID']['output'];
  /**  weight  */
  weight: Scalars['realTokenGnosis_BigInt']['output'];
};

export type RealTokenGnosis_TrustedIntermediary_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenGnosis_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_TrustedIntermediary_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_TrustedIntermediary_Filter>>>;
  weight?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  weight_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  weight_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  weight_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  weight_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  weight_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  weight_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  weight_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
};

export enum RealTokenGnosis_TrustedIntermediary_OrderBy {
  Address = 'address',
  Id = 'id',
  Weight = 'weight'
}

export type RealTokenGnosis_UserId = {
  __typename?: 'realTokenGnosis_UserId';
  /**  Compliance registry attributeKeys  */
  attributeKeys: Array<Scalars['realTokenGnosis_BigInt']['output']>;
  /**  Compliance registry attributeValues  */
  attributeValues: Array<Scalars['realTokenGnosis_BigInt']['output']>;
  /**  Last block update  */
  block: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Equals to: <trustedAddress-userId> */
  id: Scalars['ID']['output'];
  /**  Last timestamp update  */
  timestamp: Scalars['realTokenGnosis_BigInt']['output'];
  /**  Trusted intermediary  */
  trustedIntermediary: RealTokenGnosis_TrustedIntermediary;
  /**  Compliance registry userId  */
  userId: Scalars['realTokenGnosis_BigInt']['output'];
};

export type RealTokenGnosis_UserId_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGnosis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGnosis_UserId_Filter>>>;
  attributeKeys?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeKeys_contains?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeKeys_contains_nocase?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeKeys_not?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeKeys_not_contains?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeKeys_not_contains_nocase?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeValues?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeValues_contains?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeValues_contains_nocase?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeValues_not?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeValues_not_contains?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  attributeValues_not_contains_nocase?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  block?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGnosis_UserId_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  trustedIntermediary?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_?: InputMaybe<RealTokenGnosis_TrustedIntermediary_Filter>;
  trustedIntermediary_contains?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_ends_with?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_gt?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_gte?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_in?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediary_lt?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_lte?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_contains?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediary_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_starts_with?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  userId_gt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  userId_gte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  userId_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
  userId_lt?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  userId_lte?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  userId_not?: InputMaybe<Scalars['realTokenGnosis_BigInt']['input']>;
  userId_not_in?: InputMaybe<Array<Scalars['realTokenGnosis_BigInt']['input']>>;
};

export enum RealTokenGnosis_UserId_OrderBy {
  AttributeKeys = 'attributeKeys',
  AttributeValues = 'attributeValues',
  Block = 'block',
  Id = 'id',
  Timestamp = 'timestamp',
  TrustedIntermediary = 'trustedIntermediary',
  TrustedIntermediaryAddress = 'trustedIntermediary__address',
  TrustedIntermediaryId = 'trustedIntermediary__id',
  TrustedIntermediaryWeight = 'trustedIntermediary__weight',
  UserId = 'userId'
}

export type RealTokenGnosis__Block_ = {
  __typename?: 'realTokenGnosis__Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['realTokenGnosis_Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type RealTokenGnosis__Meta_ = {
  __typename?: 'realTokenGnosis__Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: RealTokenGnosis__Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum RealTokenGnosis__SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

/**  Account entity  */
export type YamGnosis_Account = {
  __typename?: 'yamGnosis_Account';
  /**  User address  */
  address: Scalars['yamGnosis_Bytes']['output'];
  /**  Allowances for Account  */
  allowances: Array<YamGnosis_Allowance>;
  /**  Token balances that this account holds  */
  balances: Array<YamGnosis_AccountBalance>;
  /**  User address  */
  id: Scalars['ID']['output'];
  /**  Offer count  */
  offerCount: Scalars['yamGnosis_BigInt']['output'];
  /**  User offers  */
  offers: Array<YamGnosis_Offer>;
  /**  Purchase count  */
  purchaseCount: Scalars['yamGnosis_BigInt']['output'];
  /**  User purchases  */
  purchases: Array<YamGnosis_Purchase>;
  /**  Sell count  */
  sellCount: Scalars['yamGnosis_BigInt']['output'];
  /**  User sell  */
  sells: Array<YamGnosis_Purchase>;
};


/**  Account entity  */
export type YamGnosis_AccountAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Allowance_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamGnosis_Allowance_Filter>;
};


/**  Account entity  */
export type YamGnosis_AccountBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamGnosis_AccountBalance_Filter>;
};


/**  Account entity  */
export type YamGnosis_AccountOffersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Offer_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamGnosis_Offer_Filter>;
};


/**  Account entity  */
export type YamGnosis_AccountPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Purchase_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamGnosis_Purchase_Filter>;
};


/**  Account entity  */
export type YamGnosis_AccountSellsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Purchase_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamGnosis_Purchase_Filter>;
};

export type YamGnosis_AccountBalance = {
  __typename?: 'yamGnosis_AccountBalance';
  /**  Account address  */
  account: YamGnosis_Account;
  /**  Current account balance  */
  amount: Scalars['yamGnosis_BigDecimal']['output'];
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID']['output'];
  /**  Token address  */
  token: YamGnosis_Token;
};

export type YamGnosis_AccountBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamGnosis_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<YamGnosis_Account_Filter>;
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
  amount?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<YamGnosis_AccountBalance_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<YamGnosis_AccountBalance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<YamGnosis_Token_Filter>;
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

export enum YamGnosis_AccountBalance_OrderBy {
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

export type YamGnosis_Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamGnosis_BlockChangedFilter>;
  address?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['yamGnosis_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['yamGnosis_Bytes']['input']>>;
  allowances_?: InputMaybe<YamGnosis_Allowance_Filter>;
  and?: InputMaybe<Array<InputMaybe<YamGnosis_Account_Filter>>>;
  balances_?: InputMaybe<YamGnosis_AccountBalance_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offerCount?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  offerCount_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  offers_?: InputMaybe<YamGnosis_Offer_Filter>;
  or?: InputMaybe<Array<InputMaybe<YamGnosis_Account_Filter>>>;
  purchaseCount?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  purchaseCount_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  purchases_?: InputMaybe<YamGnosis_Purchase_Filter>;
  sellCount?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  sellCount_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  sellCount_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  sellCount_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  sellCount_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  sellCount_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  sellCount_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  sellCount_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  sells_?: InputMaybe<YamGnosis_Purchase_Filter>;
};

export enum YamGnosis_Account_OrderBy {
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

export type YamGnosis_Allowance = {
  __typename?: 'yamGnosis_Allowance';
  /**  Account address  */
  account: YamGnosis_Account;
  /**  Current allowance  */
  allowance: Scalars['yamGnosis_BigDecimal']['output'];
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID']['output'];
  /**  Token address  */
  token: YamGnosis_Token;
};

export type YamGnosis_Allowance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamGnosis_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<YamGnosis_Account_Filter>;
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
  allowance?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  allowance_gt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  allowance_gte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  allowance_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  allowance_lt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  allowance_lte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  allowance_not?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  allowance_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<YamGnosis_Allowance_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<YamGnosis_Allowance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<YamGnosis_Token_Filter>;
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

export enum YamGnosis_Allowance_OrderBy {
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

export type YamGnosis_BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type YamGnosis_Block_Height = {
  hash?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/**  Global stats entity  */
export type YamGnosis_Global = {
  __typename?: 'yamGnosis_Global';
  /**  Active offers counts */
  activeOffersCount: Scalars['yamGnosis_BigInt']['output'];
  id: Scalars['ID']['output'];
};

export type YamGnosis_Global_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamGnosis_BlockChangedFilter>;
  activeOffersCount?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  activeOffersCount_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  activeOffersCount_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  activeOffersCount_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  activeOffersCount_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  activeOffersCount_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  activeOffersCount_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  activeOffersCount_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<YamGnosis_Global_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<YamGnosis_Global_Filter>>>;
};

export enum YamGnosis_Global_OrderBy {
  ActiveOffersCount = 'activeOffersCount',
  Id = 'id'
}

/**  Offer entity  */
export type YamGnosis_Offer = {
  __typename?: 'yamGnosis_Offer';
  /**  Allowance if =/= realtoken  */
  allowance?: Maybe<YamGnosis_Allowance>;
  /**  Available amount  */
  availableAmount: Scalars['yamGnosis_BigDecimal']['output'];
  /**  Account balance if =/= realtoken  */
  balance?: Maybe<YamGnosis_AccountBalance>;
  /**  Buyer if offer is private  */
  buyer?: Maybe<YamGnosis_Account>;
  /**  Buyer token 0x */
  buyerToken: YamGnosis_Token;
  /**  Offer creation Block  */
  createdAtBlock: Scalars['yamGnosis_BigInt']['output'];
  /**  Offer creation timestamp  */
  createdAtTimestamp: Scalars['yamGnosis_BigInt']['output'];
  /**  Offer ID  */
  id: Scalars['ID']['output'];
  /**  Offer token 0x */
  offerToken: YamGnosis_Token;
  /**  Current price  */
  price: YamGnosis_OfferPrice;
  /**  Price array  */
  prices: Array<YamGnosis_OfferPrice>;
  /**  Price length  */
  pricesLength: Scalars['yamGnosis_BigInt']['output'];
  /**  Purchase count  */
  purchaseCount: Scalars['yamGnosis_BigInt']['output'];
  /**  Purchase array  */
  purchases: Array<YamGnosis_Purchase>;
  /**  Offer removal Block  */
  removedAtBlock?: Maybe<Scalars['yamGnosis_BigInt']['output']>;
  /**  Offer removal timestamp  */
  removedAtTimestamp?: Maybe<Scalars['yamGnosis_BigInt']['output']>;
  /**  Seller 0x  */
  seller: YamGnosis_Account;
};


/**  Offer entity  */
export type YamGnosis_OfferPricesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_OfferPrice_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamGnosis_OfferPrice_Filter>;
};


/**  Offer entity  */
export type YamGnosis_OfferPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Purchase_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamGnosis_Purchase_Filter>;
};

/**  OfferPrice entity  */
export type YamGnosis_OfferPrice = {
  __typename?: 'yamGnosis_OfferPrice';
  /**  Amount  */
  amount: Scalars['yamGnosis_BigDecimal']['output'];
  /**  Creation Block  */
  createdAtBlock: Scalars['yamGnosis_BigInt']['output'];
  /**  Creation timestamp  */
  createdAtTimestamp: Scalars['yamGnosis_BigInt']['output'];
  /**  offer id - position in list  */
  id: Scalars['ID']['output'];
  /**  Offer entity  */
  offer: YamGnosis_Offer;
  /**  Price  */
  price: Scalars['yamGnosis_BigDecimal']['output'];
};

export type YamGnosis_OfferPrice_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamGnosis_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<YamGnosis_OfferPrice_Filter>>>;
  createdAtBlock?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offer?: InputMaybe<Scalars['String']['input']>;
  offer_?: InputMaybe<YamGnosis_Offer_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<YamGnosis_OfferPrice_Filter>>>;
  price?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_gt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_gte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  price_lt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_lte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_not?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
};

export enum YamGnosis_OfferPrice_OrderBy {
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

export type YamGnosis_Offer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamGnosis_BlockChangedFilter>;
  allowance?: InputMaybe<Scalars['String']['input']>;
  allowance_?: InputMaybe<YamGnosis_Allowance_Filter>;
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
  and?: InputMaybe<Array<InputMaybe<YamGnosis_Offer_Filter>>>;
  availableAmount?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  availableAmount_gt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  availableAmount_gte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  availableAmount_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  availableAmount_lt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  availableAmount_lte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  availableAmount_not?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  availableAmount_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  balance?: InputMaybe<Scalars['String']['input']>;
  balance_?: InputMaybe<YamGnosis_AccountBalance_Filter>;
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
  buyerToken_?: InputMaybe<YamGnosis_Token_Filter>;
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
  buyer_?: InputMaybe<YamGnosis_Account_Filter>;
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
  createdAtBlock?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offerToken?: InputMaybe<Scalars['String']['input']>;
  offerToken_?: InputMaybe<YamGnosis_Token_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<YamGnosis_Offer_Filter>>>;
  price?: InputMaybe<Scalars['String']['input']>;
  price_?: InputMaybe<YamGnosis_OfferPrice_Filter>;
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
  pricesLength?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  pricesLength_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  pricesLength_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  pricesLength_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  pricesLength_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  pricesLength_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  pricesLength_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  pricesLength_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  prices_?: InputMaybe<YamGnosis_OfferPrice_Filter>;
  purchaseCount?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  purchaseCount_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  purchases_?: InputMaybe<YamGnosis_Purchase_Filter>;
  removedAtBlock?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtBlock_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtBlock_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtBlock_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  removedAtBlock_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtBlock_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtBlock_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtBlock_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  removedAtTimestamp?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtTimestamp_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtTimestamp_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtTimestamp_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  removedAtTimestamp_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtTimestamp_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtTimestamp_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  removedAtTimestamp_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  seller?: InputMaybe<Scalars['String']['input']>;
  seller_?: InputMaybe<YamGnosis_Account_Filter>;
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

export enum YamGnosis_Offer_OrderBy {
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
export enum YamGnosis_OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type YamGnosis_Purchase = {
  __typename?: 'yamGnosis_Purchase';
  /**  Buyer 0x  */
  buyer: YamGnosis_Account;
  /**  Creation Block  */
  createdAtBlock: Scalars['yamGnosis_BigInt']['output'];
  /**  Creation timestamp  */
  createdAtTimestamp: Scalars['yamGnosis_BigInt']['output'];
  /**  tx hash - logindex  */
  id: Scalars['ID']['output'];
  /**  Offer entity  */
  offer: YamGnosis_Offer;
  /**  Price  */
  price: Scalars['yamGnosis_BigDecimal']['output'];
  /**  Quantity  */
  quantity: Scalars['yamGnosis_BigDecimal']['output'];
  /**  seller 0x  */
  seller: YamGnosis_Account;
};

export type YamGnosis_Purchase_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamGnosis_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<YamGnosis_Purchase_Filter>>>;
  buyer?: InputMaybe<Scalars['String']['input']>;
  buyer_?: InputMaybe<YamGnosis_Account_Filter>;
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
  createdAtBlock?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offer?: InputMaybe<Scalars['String']['input']>;
  offer_?: InputMaybe<YamGnosis_Offer_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<YamGnosis_Purchase_Filter>>>;
  price?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_gt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_gte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  price_lt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_lte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_not?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  quantity?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  quantity_gt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  quantity_gte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  quantity_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  quantity_lt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  quantity_lte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  quantity_not?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  quantity_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  seller?: InputMaybe<Scalars['String']['input']>;
  seller_?: InputMaybe<YamGnosis_Account_Filter>;
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

export enum YamGnosis_Purchase_OrderBy {
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

/**  Token entity  */
export type YamGnosis_Token = {
  __typename?: 'yamGnosis_Token';
  /**  Token address  */
  address: Scalars['yamGnosis_Bytes']['output'];
  /**  Token decimal  */
  decimals?: Maybe<Scalars['Int']['output']>;
  /**  Dollars volume  */
  dollarsVolume: Scalars['yamGnosis_BigDecimal']['output'];
  /**  Token address  */
  id: Scalars['ID']['output'];
  /**  Token name  */
  name?: Maybe<Scalars['String']['output']>;
  /**  Offer count  */
  offerCount: Scalars['yamGnosis_BigInt']['output'];
  /**  Array of offers  */
  offers: Array<YamGnosis_Offer>;
  /**  Purchase count  */
  purchaseCount: Scalars['yamGnosis_BigInt']['output'];
  /**  Array of purchases  */
  purchases: Array<YamGnosis_Purchase>;
  /**  Token symbol  */
  symbol?: Maybe<Scalars['String']['output']>;
  /**  TokenType: 0:NOWL|1:REALTOKEN|2:ERC20PERMIT|3:ERC20NOPERMIT  */
  tokenType: Scalars['Int']['output'];
};


/**  Token entity  */
export type YamGnosis_TokenOffersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Offer_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamGnosis_Offer_Filter>;
};


/**  Token entity  */
export type YamGnosis_TokenPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamGnosis_Purchase_OrderBy>;
  orderDirection?: InputMaybe<YamGnosis_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamGnosis_Purchase_Filter>;
};

export type YamGnosis_Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamGnosis_BlockChangedFilter>;
  address?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['yamGnosis_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['yamGnosis_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['yamGnosis_Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<YamGnosis_Token_Filter>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dollarsVolume?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  dollarsVolume_gt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  dollarsVolume_gte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  dollarsVolume_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
  dollarsVolume_lt?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  dollarsVolume_lte?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  dollarsVolume_not?: InputMaybe<Scalars['yamGnosis_BigDecimal']['input']>;
  dollarsVolume_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigDecimal']['input']>>;
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
  offerCount?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  offerCount_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  offerCount_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  offers_?: InputMaybe<YamGnosis_Offer_Filter>;
  or?: InputMaybe<Array<InputMaybe<YamGnosis_Token_Filter>>>;
  purchaseCount?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_gt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_gte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  purchaseCount_lt?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_lte?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_not?: InputMaybe<Scalars['yamGnosis_BigInt']['input']>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['yamGnosis_BigInt']['input']>>;
  purchases?: InputMaybe<Array<Scalars['String']['input']>>;
  purchases_?: InputMaybe<YamGnosis_Purchase_Filter>;
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

export enum YamGnosis_Token_OrderBy {
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

export type YamGnosis__Block_ = {
  __typename?: 'yamGnosis__Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['yamGnosis_Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type YamGnosis__Meta_ = {
  __typename?: 'yamGnosis__Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: YamGnosis__Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum YamGnosis__SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}
