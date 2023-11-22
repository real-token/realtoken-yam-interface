// @ts-nocheck
import MeshCache from '@graphql-mesh/cache-localforage';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import GraphqlHandler from '@graphql-mesh/graphql';
import { MeshHTTPHandler, createMeshHTTPHandler } from '@graphql-mesh/http';
import StitchingMerger from '@graphql-mesh/merger-stitching';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import { MeshResolvedSource } from '@graphql-mesh/runtime';
import {
  MeshContext as BaseMeshContext,
  ExecuteMeshFn,
  MeshInstance,
  SubscribeMeshFn,
  getMesh,
} from '@graphql-mesh/runtime';
import { FsStoreStorageAdapter, MeshStore } from '@graphql-mesh/store';
import type { YamlConfig } from '@graphql-mesh/types';
import { MeshPlugin, MeshTransform } from '@graphql-mesh/types';
import { ImportFn } from '@graphql-mesh/types';
import { gql } from '@graphql-mesh/utils';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import { printWithCache } from '@graphql-mesh/utils';
import { fileURLToPath } from '@graphql-mesh/utils';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { fetch as fetchFn } from '@whatwg-node/fetch';

import {
  FieldNode,
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  SelectionSetNode,
} from 'graphql';

import { UrlTheGraphToken, UrlTheGraphYam } from 'src/constants';

import type { WalletGoerliTypes } from './sources/wallet-goerli/types';
import type { YamEthTypes } from './sources/yam-eth/types';
import type { YamGnosisTypes } from './sources/yam-gnosis/types';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Query = {
  account?: Maybe<Account>;
  accounts: Array<Account>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  offerPrice?: Maybe<OfferPrice>;
  offerPrices: Array<OfferPrice>;
  purchase?: Maybe<Purchase>;
  purchases: Array<Purchase>;
  offer?: Maybe<Offer>;
  offers: Array<Offer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  burnEvent?: Maybe<BurnEvent>;
  burnEvents: Array<BurnEvent>;
  mintEvent?: Maybe<MintEvent>;
  mintEvents: Array<MintEvent>;
  transferEvent?: Maybe<TransferEvent>;
  transferEvents: Array<TransferEvent>;
  allowance?: Maybe<Allowance>;
  allowances: Array<Allowance>;
  accountBalance?: Maybe<AccountBalance>;
  accountBalances: Array<AccountBalance>;
  accountBalanceSnapshot?: Maybe<AccountBalanceSnapshot>;
  accountBalanceSnapshots: Array<AccountBalanceSnapshot>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  tokenEvent?: Maybe<TokenEvent>;
  tokenEvents: Array<TokenEvent>;
};

export type QueryaccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryofferPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryofferPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OfferPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OfferPrice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerypurchaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerypurchasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Purchase_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Purchase_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryofferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryoffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Offer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Offer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type QueryburnEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryburnEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BurnEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BurnEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerymintEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerymintEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MintEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MintEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryallowanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryallowancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Allowance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allowance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryaccountBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryaccountBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AccountBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryaccountBalanceSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryaccountBalanceSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountBalanceSnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AccountBalanceSnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytokenEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytokenEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Subscription = {
  account?: Maybe<Account>;
  accounts: Array<Account>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  offerPrice?: Maybe<OfferPrice>;
  offerPrices: Array<OfferPrice>;
  purchase?: Maybe<Purchase>;
  purchases: Array<Purchase>;
  offer?: Maybe<Offer>;
  offers: Array<Offer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  burnEvent?: Maybe<BurnEvent>;
  burnEvents: Array<BurnEvent>;
  mintEvent?: Maybe<MintEvent>;
  mintEvents: Array<MintEvent>;
  transferEvent?: Maybe<TransferEvent>;
  transferEvents: Array<TransferEvent>;
  allowance?: Maybe<Allowance>;
  allowances: Array<Allowance>;
  accountBalance?: Maybe<AccountBalance>;
  accountBalances: Array<AccountBalance>;
  accountBalanceSnapshot?: Maybe<AccountBalanceSnapshot>;
  accountBalanceSnapshots: Array<AccountBalanceSnapshot>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  tokenEvent?: Maybe<TokenEvent>;
  tokenEvents: Array<TokenEvent>;
};

export type SubscriptionaccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionofferPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionofferPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OfferPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OfferPrice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionpurchaseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionpurchasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Purchase_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Purchase_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionofferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionoffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Offer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Offer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type SubscriptionburnEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionburnEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BurnEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BurnEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionmintEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionmintEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MintEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MintEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionallowanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionallowancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Allowance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allowance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionaccountBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionaccountBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AccountBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionaccountBalanceSnapshotArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionaccountBalanceSnapshotsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountBalanceSnapshot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AccountBalanceSnapshot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontokenEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontokenEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Account = {
  /**  Equals to: <accountAddress> */
  id: Scalars['ID'];
  /**  Account address  */
  address: Scalars['Bytes'];
  /**  User offers  */
  offers: Array<Offer>;
  /**  User purchases  */
  purchases: Array<Purchase>;
  /**  User sell  */
  sells: Array<Purchase>;
  /**  Purchase count  */
  purchaseCount: Scalars['BigInt'];
  /**  Sell count  */
  sellCount: Scalars['BigInt'];
  /**  Offer count  */
  offerCount: Scalars['BigInt'];
  /**  Token balances that this account holds  */
  balances: Array<AccountBalance>;
  /**  Allowances for Account  */
  allowances: Array<Allowance>;
};

export type AccountoffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Offer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Offer_filter>;
};

export type AccountpurchasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Purchase_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Purchase_filter>;
};

export type AccountsellsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Purchase_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Purchase_filter>;
};

export type AccountbalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AccountBalance_filter>;
};

export type AccountallowancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Allowance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allowance_filter>;
};

export type Account_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  offers?: InputMaybe<Array<Scalars['String']>>;
  offers_not?: InputMaybe<Array<Scalars['String']>>;
  offers_contains?: InputMaybe<Array<Scalars['String']>>;
  offers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  offers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  offers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  offers_?: InputMaybe<Offer_filter>;
  purchases?: InputMaybe<Array<Scalars['String']>>;
  purchases_not?: InputMaybe<Array<Scalars['String']>>;
  purchases_contains?: InputMaybe<Array<Scalars['String']>>;
  purchases_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  purchases_not_contains?: InputMaybe<Array<Scalars['String']>>;
  purchases_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  purchases_?: InputMaybe<Purchase_filter>;
  sells?: InputMaybe<Array<Scalars['String']>>;
  sells_not?: InputMaybe<Array<Scalars['String']>>;
  sells_contains?: InputMaybe<Array<Scalars['String']>>;
  sells_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  sells_not_contains?: InputMaybe<Array<Scalars['String']>>;
  sells_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  sells_?: InputMaybe<Purchase_filter>;
  purchaseCount?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_not?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_gt?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_lt?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_gte?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_lte?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sellCount?: InputMaybe<Scalars['BigInt']>;
  sellCount_not?: InputMaybe<Scalars['BigInt']>;
  sellCount_gt?: InputMaybe<Scalars['BigInt']>;
  sellCount_lt?: InputMaybe<Scalars['BigInt']>;
  sellCount_gte?: InputMaybe<Scalars['BigInt']>;
  sellCount_lte?: InputMaybe<Scalars['BigInt']>;
  sellCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sellCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerCount?: InputMaybe<Scalars['BigInt']>;
  offerCount_not?: InputMaybe<Scalars['BigInt']>;
  offerCount_gt?: InputMaybe<Scalars['BigInt']>;
  offerCount_lt?: InputMaybe<Scalars['BigInt']>;
  offerCount_gte?: InputMaybe<Scalars['BigInt']>;
  offerCount_lte?: InputMaybe<Scalars['BigInt']>;
  offerCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  balances_?: InputMaybe<AccountBalance_filter>;
  allowances_?: InputMaybe<Allowance_filter>;
};

export type Account_orderBy =
  | 'id'
  | 'address'
  | 'offers'
  | 'purchases'
  | 'sells'
  | 'purchaseCount'
  | 'sellCount'
  | 'offerCount'
  | 'balances'
  | 'allowances';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/**  Transaction entity  */
export type Transaction = {
  /**  Transaction block  */
  block: Scalars['BigInt'];
  /**  Transaction hash  */
  id: Scalars['String'];
  /**  Transaction timestamp  */
  timestamp: Scalars['BigInt'];
  /**  Yam contract  */
  to: Scalars['String'];
  /**  Transaction input */
  input: Scalars['String'];
  /**  Buyer token 0x */
  transferEvents: Array<TransferEvent>;
  
};

export type TransferEvent ={
  amount: Scalars['BigInt'];
  sender: Scalars['String'];
  token: {
    address: Scalars['String'];
    decimals: Scalars['BigInt'];
    fullName: Scalars['String'];
    symbol: Scalars['String'];
  };
}

/**  Offer entity  */
export type Offer = {
  balance: AccountBalance | null;
  allowance: Allowance | null;
  /**  Offer ID  */
  id: Scalars['ID'];
  /**  Seller 0x  */
  seller: Account;
  /**  Offer token 0x */
  offerToken: Token;
  /**  Buyer token 0x */
  buyerToken: Token;
  /**  Price array  */
  prices: Array<OfferPrice>;
  /**  Current price  */
  price: OfferPrice;
  /**  Available amount  */
  availableAmount: Scalars['BigDecimal'];
  /**  Purchase array  */
  purchases: Array<Purchase>;
  /**  Purchase count  */
  purchaseCount: Scalars['BigInt'];
  /**  Buyer if offer is private  */
  buyer?: Maybe<Account>;
  /**  Offer creation block  */
  createdAtBlock: Scalars['BigInt'];
  /**  Offer creation timestamp  */
  createdAtTimestamp: Scalars['BigInt'];
  /**  Offer removal block  */
  removedAtBlock?: Maybe<Scalars['BigInt']>;
  /**  Offer removal timestamp  */
  removedAtTimestamp?: Maybe<Scalars['BigInt']>;
};

/**  Offer entity  */
export type OfferpricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OfferPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OfferPrice_filter>;
};

/**  Offer entity  */
export type OfferpurchasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Purchase_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Purchase_filter>;
};

/**  OfferPrice entity  */
export type OfferPrice = {
  id: Scalars['ID'];
  /**  Offer entity  */
  offer: Offer;
  /**  Price  */
  price: Scalars['BigDecimal'];
  /**  Amount  */
  amount: Scalars['BigDecimal'];
  /**  Creation block  */
  createdAtBlock: Scalars['BigInt'];
  /**  Creation timestamp  */
  createdAtTimestamp: Scalars['BigInt'];
};

export type OfferPrice_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  offer?: InputMaybe<Scalars['String']>;
  offer_not?: InputMaybe<Scalars['String']>;
  offer_gt?: InputMaybe<Scalars['String']>;
  offer_lt?: InputMaybe<Scalars['String']>;
  offer_gte?: InputMaybe<Scalars['String']>;
  offer_lte?: InputMaybe<Scalars['String']>;
  offer_in?: InputMaybe<Array<Scalars['String']>>;
  offer_not_in?: InputMaybe<Array<Scalars['String']>>;
  offer_contains?: InputMaybe<Scalars['String']>;
  offer_contains_nocase?: InputMaybe<Scalars['String']>;
  offer_not_contains?: InputMaybe<Scalars['String']>;
  offer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  offer_starts_with?: InputMaybe<Scalars['String']>;
  offer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  offer_not_starts_with?: InputMaybe<Scalars['String']>;
  offer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  offer_ends_with?: InputMaybe<Scalars['String']>;
  offer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  offer_not_ends_with?: InputMaybe<Scalars['String']>;
  offer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  offer_?: InputMaybe<Offer_filter>;
  price?: InputMaybe<Scalars['BigDecimal']>;
  price_not?: InputMaybe<Scalars['BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BigDecimal']>;
  price_lt?: InputMaybe<Scalars['BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type OfferPrice_orderBy =
  | 'id'
  | 'offer'
  | 'price'
  | 'amount'
  | 'createdAtBlock'
  | 'createdAtTimestamp';

export type Offer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  seller?: InputMaybe<Scalars['String']>;
  seller_not?: InputMaybe<Scalars['String']>;
  seller_gt?: InputMaybe<Scalars['String']>;
  seller_lt?: InputMaybe<Scalars['String']>;
  seller_gte?: InputMaybe<Scalars['String']>;
  seller_lte?: InputMaybe<Scalars['String']>;
  seller_in?: InputMaybe<Array<Scalars['String']>>;
  seller_not_in?: InputMaybe<Array<Scalars['String']>>;
  seller_contains?: InputMaybe<Scalars['String']>;
  seller_contains_nocase?: InputMaybe<Scalars['String']>;
  seller_not_contains?: InputMaybe<Scalars['String']>;
  seller_not_contains_nocase?: InputMaybe<Scalars['String']>;
  seller_starts_with?: InputMaybe<Scalars['String']>;
  seller_starts_with_nocase?: InputMaybe<Scalars['String']>;
  seller_not_starts_with?: InputMaybe<Scalars['String']>;
  seller_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  seller_ends_with?: InputMaybe<Scalars['String']>;
  seller_ends_with_nocase?: InputMaybe<Scalars['String']>;
  seller_not_ends_with?: InputMaybe<Scalars['String']>;
  seller_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  seller_?: InputMaybe<Account_filter>;
  offerToken?: InputMaybe<Scalars['String']>;
  offerToken_not?: InputMaybe<Scalars['String']>;
  offerToken_gt?: InputMaybe<Scalars['String']>;
  offerToken_lt?: InputMaybe<Scalars['String']>;
  offerToken_gte?: InputMaybe<Scalars['String']>;
  offerToken_lte?: InputMaybe<Scalars['String']>;
  offerToken_in?: InputMaybe<Array<Scalars['String']>>;
  offerToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  offerToken_contains?: InputMaybe<Scalars['String']>;
  offerToken_contains_nocase?: InputMaybe<Scalars['String']>;
  offerToken_not_contains?: InputMaybe<Scalars['String']>;
  offerToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  offerToken_starts_with?: InputMaybe<Scalars['String']>;
  offerToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  offerToken_not_starts_with?: InputMaybe<Scalars['String']>;
  offerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  offerToken_ends_with?: InputMaybe<Scalars['String']>;
  offerToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  offerToken_not_ends_with?: InputMaybe<Scalars['String']>;
  offerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  offerToken_?: InputMaybe<Token_filter>;
  buyerToken?: InputMaybe<Scalars['String']>;
  buyerToken_not?: InputMaybe<Scalars['String']>;
  buyerToken_gt?: InputMaybe<Scalars['String']>;
  buyerToken_lt?: InputMaybe<Scalars['String']>;
  buyerToken_gte?: InputMaybe<Scalars['String']>;
  buyerToken_lte?: InputMaybe<Scalars['String']>;
  buyerToken_in?: InputMaybe<Array<Scalars['String']>>;
  buyerToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  buyerToken_contains?: InputMaybe<Scalars['String']>;
  buyerToken_contains_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_not_contains?: InputMaybe<Scalars['String']>;
  buyerToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_starts_with?: InputMaybe<Scalars['String']>;
  buyerToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_not_starts_with?: InputMaybe<Scalars['String']>;
  buyerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_ends_with?: InputMaybe<Scalars['String']>;
  buyerToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_not_ends_with?: InputMaybe<Scalars['String']>;
  buyerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_?: InputMaybe<Token_filter>;
  prices?: InputMaybe<Array<Scalars['String']>>;
  prices_not?: InputMaybe<Array<Scalars['String']>>;
  prices_contains?: InputMaybe<Array<Scalars['String']>>;
  prices_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  prices_not_contains?: InputMaybe<Array<Scalars['String']>>;
  prices_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  prices_?: InputMaybe<OfferPrice_filter>;
  price?: InputMaybe<Scalars['String']>;
  price_not?: InputMaybe<Scalars['String']>;
  price_gt?: InputMaybe<Scalars['String']>;
  price_lt?: InputMaybe<Scalars['String']>;
  price_gte?: InputMaybe<Scalars['String']>;
  price_lte?: InputMaybe<Scalars['String']>;
  price_in?: InputMaybe<Array<Scalars['String']>>;
  price_not_in?: InputMaybe<Array<Scalars['String']>>;
  price_contains?: InputMaybe<Scalars['String']>;
  price_contains_nocase?: InputMaybe<Scalars['String']>;
  price_not_contains?: InputMaybe<Scalars['String']>;
  price_not_contains_nocase?: InputMaybe<Scalars['String']>;
  price_starts_with?: InputMaybe<Scalars['String']>;
  price_starts_with_nocase?: InputMaybe<Scalars['String']>;
  price_not_starts_with?: InputMaybe<Scalars['String']>;
  price_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  price_ends_with?: InputMaybe<Scalars['String']>;
  price_ends_with_nocase?: InputMaybe<Scalars['String']>;
  price_not_ends_with?: InputMaybe<Scalars['String']>;
  price_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  price_?: InputMaybe<OfferPrice_filter>;
  availableAmount?: InputMaybe<Scalars['BigDecimal']>;
  availableAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  availableAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  availableAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  availableAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  availableAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  availableAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  availableAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  purchases?: InputMaybe<Array<Scalars['String']>>;
  purchases_not?: InputMaybe<Array<Scalars['String']>>;
  purchases_contains?: InputMaybe<Array<Scalars['String']>>;
  purchases_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  purchases_not_contains?: InputMaybe<Array<Scalars['String']>>;
  purchases_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  purchases_?: InputMaybe<Purchase_filter>;
  purchaseCount?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_not?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_gt?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_lt?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_gte?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_lte?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyer?: InputMaybe<Scalars['String']>;
  buyer_not?: InputMaybe<Scalars['String']>;
  buyer_gt?: InputMaybe<Scalars['String']>;
  buyer_lt?: InputMaybe<Scalars['String']>;
  buyer_gte?: InputMaybe<Scalars['String']>;
  buyer_lte?: InputMaybe<Scalars['String']>;
  buyer_in?: InputMaybe<Array<Scalars['String']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['String']>>;
  buyer_contains?: InputMaybe<Scalars['String']>;
  buyer_contains_nocase?: InputMaybe<Scalars['String']>;
  buyer_not_contains?: InputMaybe<Scalars['String']>;
  buyer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  buyer_starts_with?: InputMaybe<Scalars['String']>;
  buyer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_not_starts_with?: InputMaybe<Scalars['String']>;
  buyer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_ends_with?: InputMaybe<Scalars['String']>;
  buyer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_not_ends_with?: InputMaybe<Scalars['String']>;
  buyer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_?: InputMaybe<Account_filter>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removedAtBlock?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removedAtTimestamp?: InputMaybe<Scalars['BigInt']>;
  removedAtTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  removedAtTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  removedAtTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  removedAtTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  removedAtTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  removedAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removedAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Offer_orderBy =
  | 'id'
  | 'seller'
  | 'offerToken'
  | 'buyerToken'
  | 'prices'
  | 'price'
  | 'availableAmount'
  | 'purchases'
  | 'purchaseCount'
  | 'buyer'
  | 'createdAtBlock'
  | 'createdAtTimestamp'
  | 'removedAtBlock'
  | 'removedAtTimestamp';

/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc';

export type Purchase = {
  id: Scalars['ID'];
  /**  Offer entity  */
  offer: Offer;
  /**  Buyer 0x  */
  buyer: Account;
  /**  Price  */
  price: Scalars['BigDecimal'];
  /**  Quantity  */
  quantity: Scalars['BigDecimal'];
  /**  Creation block  */
  createdAtBlock: Scalars['BigInt'];
  /**  Creation timestamp  */
  createdAtTimestamp: Scalars['BigInt'];
};

export type Purchase_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  offer?: InputMaybe<Scalars['String']>;
  offer_not?: InputMaybe<Scalars['String']>;
  offer_gt?: InputMaybe<Scalars['String']>;
  offer_lt?: InputMaybe<Scalars['String']>;
  offer_gte?: InputMaybe<Scalars['String']>;
  offer_lte?: InputMaybe<Scalars['String']>;
  offer_in?: InputMaybe<Array<Scalars['String']>>;
  offer_not_in?: InputMaybe<Array<Scalars['String']>>;
  offer_contains?: InputMaybe<Scalars['String']>;
  offer_contains_nocase?: InputMaybe<Scalars['String']>;
  offer_not_contains?: InputMaybe<Scalars['String']>;
  offer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  offer_starts_with?: InputMaybe<Scalars['String']>;
  offer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  offer_not_starts_with?: InputMaybe<Scalars['String']>;
  offer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  offer_ends_with?: InputMaybe<Scalars['String']>;
  offer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  offer_not_ends_with?: InputMaybe<Scalars['String']>;
  offer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  offer_?: InputMaybe<Offer_filter>;
  buyer?: InputMaybe<Scalars['String']>;
  buyer_not?: InputMaybe<Scalars['String']>;
  buyer_gt?: InputMaybe<Scalars['String']>;
  buyer_lt?: InputMaybe<Scalars['String']>;
  buyer_gte?: InputMaybe<Scalars['String']>;
  buyer_lte?: InputMaybe<Scalars['String']>;
  buyer_in?: InputMaybe<Array<Scalars['String']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['String']>>;
  buyer_contains?: InputMaybe<Scalars['String']>;
  buyer_contains_nocase?: InputMaybe<Scalars['String']>;
  buyer_not_contains?: InputMaybe<Scalars['String']>;
  buyer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  buyer_starts_with?: InputMaybe<Scalars['String']>;
  buyer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_not_starts_with?: InputMaybe<Scalars['String']>;
  buyer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_ends_with?: InputMaybe<Scalars['String']>;
  buyer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_not_ends_with?: InputMaybe<Scalars['String']>;
  buyer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_?: InputMaybe<Account_filter>;
  price?: InputMaybe<Scalars['BigDecimal']>;
  price_not?: InputMaybe<Scalars['BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BigDecimal']>;
  price_lt?: InputMaybe<Scalars['BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  quantity?: InputMaybe<Scalars['BigDecimal']>;
  quantity_not?: InputMaybe<Scalars['BigDecimal']>;
  quantity_gt?: InputMaybe<Scalars['BigDecimal']>;
  quantity_lt?: InputMaybe<Scalars['BigDecimal']>;
  quantity_gte?: InputMaybe<Scalars['BigDecimal']>;
  quantity_lte?: InputMaybe<Scalars['BigDecimal']>;
  quantity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  quantity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Purchase_orderBy =
  | 'id'
  | 'offer'
  | 'buyer'
  | 'price'
  | 'quantity'
  | 'createdAtBlock'
  | 'createdAtTimestamp';

export type Token = {
  id: Scalars['ID'];
  /**  Token address  */
  address: Scalars['Bytes'];
  /**  Array of offers  */
  offers: Array<Offer>;
  /**  Array of purchases  */
  purchases: Array<Purchase>;
  /**  Purchase count  */
  purchaseCount: Scalars['BigInt'];
  /**  Dollars volume  */
  dollarsVolume: Scalars['BigDecimal'];
  /**  Offer count  */
  offerCount: Scalars['BigInt'];
  /**  TokenType: 0:NOWL|1:REALTOKEN|2:ERC20PERMIT|3:ERC20NOPERMIT  */
  tokenType: Scalars['Int'];
  /**  Number of decimals the token uses  */
  decimals: Scalars['Int'];
  /**  Token name  */
  name?: Maybe<Scalars['String']>;
  /**  Symbol of the token  */
  symbol: Scalars['String'];
  /**  Human-readable fullname of the token  */
  fullName: Scalars['String'];
  /**  Total number of events (all types) */
  eventCount: Scalars['BigInt'];
  /**  Total number of burn events  */
  burnEventCount: Scalars['BigInt'];
  /**  Total number of mint events  */
  mintEventCount: Scalars['BigInt'];
  /**  Total number of transfer events  */
  transferEventCount: Scalars['BigInt'];
  /**  Total number of approval events  */
  approveEventCount: Scalars['BigInt'];
  /**  Total token supply  */
  totalSupply: Scalars['BigDecimal'];
  /**  Total token burned  */
  totalBurned: Scalars['BigDecimal'];
  /**  Total token minted  */
  totalMinted: Scalars['BigDecimal'];
  /**  Total token transferred  */
  totalTransferred: Scalars['BigDecimal'];
  /**  List of approval events  */
  approveEvent: Array<Allowance>;
  /**  List of burn events  */
  burnEvents: Array<BurnEvent>;
  /**  List of mint events  */
  mintEvents: Array<MintEvent>;
  /**  List of token events  */
  transferEvents: Array<TransferEvent>;
  /**  List of transactions  */
  transactions: Array<Transaction>;
};

export type TokenoffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Offer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Offer_filter>;
};

export type TokenpurchasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Purchase_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Purchase_filter>;
};

export type TokenapproveEventArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Allowance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allowance_filter>;
};

export type TokenburnEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BurnEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BurnEvent_filter>;
};

export type TokenmintEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MintEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MintEvent_filter>;
};

export type TokentransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferEvent_filter>;
};

export type TokentransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
};

export type Token_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  offers?: InputMaybe<Array<Scalars['String']>>;
  offers_not?: InputMaybe<Array<Scalars['String']>>;
  offers_contains?: InputMaybe<Array<Scalars['String']>>;
  offers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  offers_not_contains?: InputMaybe<Array<Scalars['String']>>;
  offers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  offers_?: InputMaybe<Offer_filter>;
  purchases?: InputMaybe<Array<Scalars['String']>>;
  purchases_not?: InputMaybe<Array<Scalars['String']>>;
  purchases_contains?: InputMaybe<Array<Scalars['String']>>;
  purchases_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  purchases_not_contains?: InputMaybe<Array<Scalars['String']>>;
  purchases_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  purchases_?: InputMaybe<Purchase_filter>;
  purchaseCount?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_not?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_gt?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_lt?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_gte?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_lte?: InputMaybe<Scalars['BigInt']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dollarsVolume?: InputMaybe<Scalars['BigDecimal']>;
  dollarsVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  dollarsVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  dollarsVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  dollarsVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  dollarsVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  dollarsVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  dollarsVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  offerCount?: InputMaybe<Scalars['BigInt']>;
  offerCount_not?: InputMaybe<Scalars['BigInt']>;
  offerCount_gt?: InputMaybe<Scalars['BigInt']>;
  offerCount_lt?: InputMaybe<Scalars['BigInt']>;
  offerCount_gte?: InputMaybe<Scalars['BigInt']>;
  offerCount_lte?: InputMaybe<Scalars['BigInt']>;
  offerCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenType?: InputMaybe<Scalars['Int']>;
  tokenType_not?: InputMaybe<Scalars['Int']>;
  tokenType_gt?: InputMaybe<Scalars['Int']>;
  tokenType_lt?: InputMaybe<Scalars['Int']>;
  tokenType_gte?: InputMaybe<Scalars['Int']>;
  tokenType_lte?: InputMaybe<Scalars['Int']>;
  tokenType_in?: InputMaybe<Array<Scalars['Int']>>;
  tokenType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  fullName?: InputMaybe<Scalars['String']>;
  fullName_not?: InputMaybe<Scalars['String']>;
  fullName_gt?: InputMaybe<Scalars['String']>;
  fullName_lt?: InputMaybe<Scalars['String']>;
  fullName_gte?: InputMaybe<Scalars['String']>;
  fullName_lte?: InputMaybe<Scalars['String']>;
  fullName_in?: InputMaybe<Array<Scalars['String']>>;
  fullName_not_in?: InputMaybe<Array<Scalars['String']>>;
  fullName_contains?: InputMaybe<Scalars['String']>;
  fullName_contains_nocase?: InputMaybe<Scalars['String']>;
  fullName_not_contains?: InputMaybe<Scalars['String']>;
  fullName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  fullName_starts_with?: InputMaybe<Scalars['String']>;
  fullName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fullName_not_starts_with?: InputMaybe<Scalars['String']>;
  fullName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  fullName_ends_with?: InputMaybe<Scalars['String']>;
  fullName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  fullName_not_ends_with?: InputMaybe<Scalars['String']>;
  fullName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  eventCount?: InputMaybe<Scalars['BigInt']>;
  eventCount_not?: InputMaybe<Scalars['BigInt']>;
  eventCount_gt?: InputMaybe<Scalars['BigInt']>;
  eventCount_lt?: InputMaybe<Scalars['BigInt']>;
  eventCount_gte?: InputMaybe<Scalars['BigInt']>;
  eventCount_lte?: InputMaybe<Scalars['BigInt']>;
  eventCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  eventCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnEventCount?: InputMaybe<Scalars['BigInt']>;
  burnEventCount_not?: InputMaybe<Scalars['BigInt']>;
  burnEventCount_gt?: InputMaybe<Scalars['BigInt']>;
  burnEventCount_lt?: InputMaybe<Scalars['BigInt']>;
  burnEventCount_gte?: InputMaybe<Scalars['BigInt']>;
  burnEventCount_lte?: InputMaybe<Scalars['BigInt']>;
  burnEventCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnEventCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mintEventCount?: InputMaybe<Scalars['BigInt']>;
  mintEventCount_not?: InputMaybe<Scalars['BigInt']>;
  mintEventCount_gt?: InputMaybe<Scalars['BigInt']>;
  mintEventCount_lt?: InputMaybe<Scalars['BigInt']>;
  mintEventCount_gte?: InputMaybe<Scalars['BigInt']>;
  mintEventCount_lte?: InputMaybe<Scalars['BigInt']>;
  mintEventCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mintEventCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferEventCount?: InputMaybe<Scalars['BigInt']>;
  transferEventCount_not?: InputMaybe<Scalars['BigInt']>;
  transferEventCount_gt?: InputMaybe<Scalars['BigInt']>;
  transferEventCount_lt?: InputMaybe<Scalars['BigInt']>;
  transferEventCount_gte?: InputMaybe<Scalars['BigInt']>;
  transferEventCount_lte?: InputMaybe<Scalars['BigInt']>;
  transferEventCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transferEventCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  approveEventCount?: InputMaybe<Scalars['BigInt']>;
  approveEventCount_not?: InputMaybe<Scalars['BigInt']>;
  approveEventCount_gt?: InputMaybe<Scalars['BigInt']>;
  approveEventCount_lt?: InputMaybe<Scalars['BigInt']>;
  approveEventCount_gte?: InputMaybe<Scalars['BigInt']>;
  approveEventCount_lte?: InputMaybe<Scalars['BigInt']>;
  approveEventCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  approveEventCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBurned?: InputMaybe<Scalars['BigDecimal']>;
  totalBurned_not?: InputMaybe<Scalars['BigDecimal']>;
  totalBurned_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalBurned_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalBurned_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalBurned_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalBurned_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBurned_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalMinted?: InputMaybe<Scalars['BigDecimal']>;
  totalMinted_not?: InputMaybe<Scalars['BigDecimal']>;
  totalMinted_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalMinted_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalMinted_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalMinted_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalMinted_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalMinted_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalTransferred?: InputMaybe<Scalars['BigDecimal']>;
  totalTransferred_not?: InputMaybe<Scalars['BigDecimal']>;
  totalTransferred_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalTransferred_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalTransferred_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalTransferred_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalTransferred_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalTransferred_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  approveEvent_?: InputMaybe<Allowance_filter>;
  burnEvents_?: InputMaybe<BurnEvent_filter>;
  mintEvents_?: InputMaybe<MintEvent_filter>;
  transferEvents_?: InputMaybe<TransferEvent_filter>;
  transactions?: InputMaybe<Array<Scalars['String']>>;
  transactions_not?: InputMaybe<Array<Scalars['String']>>;
  transactions_contains?: InputMaybe<Array<Scalars['String']>>;
  transactions_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  transactions_not_contains?: InputMaybe<Array<Scalars['String']>>;
  transactions_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  transactions_?: InputMaybe<Transaction_filter>;
};

export type Token_orderBy =
  | 'id'
  | 'address'
  | 'offers'
  | 'purchases'
  | 'purchaseCount'
  | 'dollarsVolume'
  | 'offerCount'
  | 'tokenType'
  | 'decimals'
  | 'name'
  | 'symbol'
  | 'fullName'
  | 'eventCount'
  | 'burnEventCount'
  | 'mintEventCount'
  | 'transferEventCount'
  | 'approveEventCount'
  | 'totalSupply'
  | 'totalBurned'
  | 'totalMinted'
  | 'totalTransferred'
  | 'approveEvent'
  | 'burnEvents'
  | 'mintEvents'
  | 'transferEvents'
  | 'transactions';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type AccountBalance = {
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID'];
  /**  Account address  */
  account: Account;
  /**  Token address  */
  token: Token;
  /**  Current account balance  */
  amount: Scalars['BigDecimal'];
  /**  Allowances for AccountBalance  */
  allowances: Array<Allowance>;
  /**  Block number in which the balance was last modified  */
  block: Scalars['BigInt'];
  /**  Last modified timestamp in seconds  */
  modified: Scalars['BigInt'];
  /**  Hash of the last transaction that modified the balance  */
  transaction: Transaction;
};

export type AccountBalanceallowancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Allowance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Allowance_filter>;
};

export type AccountBalanceSnapshot = {
  /**  Equals to: <accountAddress>-<tokenAddress>-<timestamp> */
  id: Scalars['ID'];
  /**  Account address  */
  account: Account;
  /**  Token addess  */
  token: Token;
  /**  Account balance  */
  amount: Scalars['BigDecimal'];
  event: TransferEvent;
  /**  Block number  */
  block: Scalars['BigInt'];
  /**  Timestamp in seconds  */
  timestamp: Scalars['BigInt'];
  /**  Transaction hash  */
  transaction: Transaction;
};

export type AccountBalanceSnapshot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  account?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_filter>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  event?: InputMaybe<Scalars['String']>;
  event_not?: InputMaybe<Scalars['String']>;
  event_gt?: InputMaybe<Scalars['String']>;
  event_lt?: InputMaybe<Scalars['String']>;
  event_gte?: InputMaybe<Scalars['String']>;
  event_lte?: InputMaybe<Scalars['String']>;
  event_in?: InputMaybe<Array<Scalars['String']>>;
  event_not_in?: InputMaybe<Array<Scalars['String']>>;
  event_contains?: InputMaybe<Scalars['String']>;
  event_contains_nocase?: InputMaybe<Scalars['String']>;
  event_not_contains?: InputMaybe<Scalars['String']>;
  event_not_contains_nocase?: InputMaybe<Scalars['String']>;
  event_starts_with?: InputMaybe<Scalars['String']>;
  event_starts_with_nocase?: InputMaybe<Scalars['String']>;
  event_not_starts_with?: InputMaybe<Scalars['String']>;
  event_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  event_ends_with?: InputMaybe<Scalars['String']>;
  event_ends_with_nocase?: InputMaybe<Scalars['String']>;
  event_not_ends_with?: InputMaybe<Scalars['String']>;
  event_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  event_?: InputMaybe<TransferEvent_filter>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type AccountBalanceSnapshot_orderBy =
  | 'id'
  | 'account'
  | 'token'
  | 'amount'
  | 'event'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type AccountBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  account?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_filter>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  allowances_?: InputMaybe<Allowance_filter>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  modified?: InputMaybe<Scalars['BigInt']>;
  modified_not?: InputMaybe<Scalars['BigInt']>;
  modified_gt?: InputMaybe<Scalars['BigInt']>;
  modified_lt?: InputMaybe<Scalars['BigInt']>;
  modified_gte?: InputMaybe<Scalars['BigInt']>;
  modified_lte?: InputMaybe<Scalars['BigInt']>;
  modified_in?: InputMaybe<Array<Scalars['BigInt']>>;
  modified_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type AccountBalance_orderBy =
  | 'id'
  | 'account'
  | 'token'
  | 'amount'
  | 'allowances'
  | 'block'
  | 'modified'
  | 'transaction';

export type Allowance = {
  /**  Equals to: <accountAddress>-<tokenAddress>-<spenderAddress> */
  id: Scalars['ID'];
  /**  Spender address  */
  spender: Account;
  /**  Account address  */
  account: Account;
  /**  Token address  */
  token: Token;
  /**  Current allowance  */
  allowance: Scalars['BigDecimal'];
  /**  Account balance  */
  balance: AccountBalance;
};

export type Allowance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  spender?: InputMaybe<Scalars['String']>;
  spender_not?: InputMaybe<Scalars['String']>;
  spender_gt?: InputMaybe<Scalars['String']>;
  spender_lt?: InputMaybe<Scalars['String']>;
  spender_gte?: InputMaybe<Scalars['String']>;
  spender_lte?: InputMaybe<Scalars['String']>;
  spender_in?: InputMaybe<Array<Scalars['String']>>;
  spender_not_in?: InputMaybe<Array<Scalars['String']>>;
  spender_contains?: InputMaybe<Scalars['String']>;
  spender_contains_nocase?: InputMaybe<Scalars['String']>;
  spender_not_contains?: InputMaybe<Scalars['String']>;
  spender_not_contains_nocase?: InputMaybe<Scalars['String']>;
  spender_starts_with?: InputMaybe<Scalars['String']>;
  spender_starts_with_nocase?: InputMaybe<Scalars['String']>;
  spender_not_starts_with?: InputMaybe<Scalars['String']>;
  spender_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  spender_ends_with?: InputMaybe<Scalars['String']>;
  spender_ends_with_nocase?: InputMaybe<Scalars['String']>;
  spender_not_ends_with?: InputMaybe<Scalars['String']>;
  spender_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  spender_?: InputMaybe<Account_filter>;
  account?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_filter>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  allowance?: InputMaybe<Scalars['BigDecimal']>;
  allowance_not?: InputMaybe<Scalars['BigDecimal']>;
  allowance_gt?: InputMaybe<Scalars['BigDecimal']>;
  allowance_lt?: InputMaybe<Scalars['BigDecimal']>;
  allowance_gte?: InputMaybe<Scalars['BigDecimal']>;
  allowance_lte?: InputMaybe<Scalars['BigDecimal']>;
  allowance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  allowance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balance?: InputMaybe<Scalars['String']>;
  balance_not?: InputMaybe<Scalars['String']>;
  balance_gt?: InputMaybe<Scalars['String']>;
  balance_lt?: InputMaybe<Scalars['String']>;
  balance_gte?: InputMaybe<Scalars['String']>;
  balance_lte?: InputMaybe<Scalars['String']>;
  balance_in?: InputMaybe<Array<Scalars['String']>>;
  balance_not_in?: InputMaybe<Array<Scalars['String']>>;
  balance_contains?: InputMaybe<Scalars['String']>;
  balance_contains_nocase?: InputMaybe<Scalars['String']>;
  balance_not_contains?: InputMaybe<Scalars['String']>;
  balance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  balance_starts_with?: InputMaybe<Scalars['String']>;
  balance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  balance_not_starts_with?: InputMaybe<Scalars['String']>;
  balance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  balance_ends_with?: InputMaybe<Scalars['String']>;
  balance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  balance_not_ends_with?: InputMaybe<Scalars['String']>;
  balance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  balance_?: InputMaybe<AccountBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Allowance_orderBy =
  | 'id'
  | 'spender'
  | 'account'
  | 'token'
  | 'allowance'
  | 'balance';

export type BurnEvent = TokenEvent & {
  id: Scalars['ID'];
  /**  Token address  */
  token: Token;
  /**  Quantity of tokens burned  */
  amount: Scalars['BigDecimal'];
  /**  Transaction sender address  */
  sender: Scalars['Bytes'];
  /**  Address of burned account  */
  burner: Scalars['Bytes'];
  /**  Block number  */
  block: Scalars['BigInt'];
  /**  Event timestamp  */
  timestamp: Scalars['BigInt'];
  /**  Transaction hash  */
  transaction: Transaction;
};

export type BurnEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  burner?: InputMaybe<Scalars['Bytes']>;
  burner_not?: InputMaybe<Scalars['Bytes']>;
  burner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  burner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  burner_contains?: InputMaybe<Scalars['Bytes']>;
  burner_not_contains?: InputMaybe<Scalars['Bytes']>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type BurnEvent_orderBy =
  | 'id'
  | 'token'
  | 'amount'
  | 'sender'
  | 'burner'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type MintEvent = TokenEvent & {
  id: Scalars['ID'];
  /**  Token address  */
  token: Token;
  /**  Quantity of tokens minted  */
  amount: Scalars['BigDecimal'];
  /**  Transaction sender address  */
  sender: Scalars['Bytes'];
  /**  Address of destination account  */
  destination: Scalars['Bytes'];
  /**  Block number  */
  block: Scalars['BigInt'];
  /**  Event timestamp  */
  timestamp: Scalars['BigInt'];
  /**  Transaction hash  */
  transaction: Transaction;
};

export type MintEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  destination?: InputMaybe<Scalars['Bytes']>;
  destination_not?: InputMaybe<Scalars['Bytes']>;
  destination_in?: InputMaybe<Array<Scalars['Bytes']>>;
  destination_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  destination_contains?: InputMaybe<Scalars['Bytes']>;
  destination_not_contains?: InputMaybe<Scalars['Bytes']>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type MintEvent_orderBy =
  | 'id'
  | 'token'
  | 'amount'
  | 'sender'
  | 'destination'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type TokenEvent = {
  id: Scalars['ID'];
  /**  Token address  */
  token: Token;
  /**  Quantity of tokens  */
  amount: Scalars['BigDecimal'];
  /**  Transaction sender address  */
  sender: Scalars['Bytes'];
  /**  Block number  */
  block: Scalars['BigInt'];
  /**  Event timestamp  */
  timestamp: Scalars['BigInt'];
  /**  Transaction hash  */
  transaction: Transaction;
};

export type TokenEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TokenEvent_orderBy =
  | 'id'
  | 'token'
  | 'amount'
  | 'sender'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type Transaction = {
  /**  Transaction hash  */
  id: Scalars['ID'];
  /**  List of transfer events  */
  transferEvents: Array<TransferEvent>;
  /**  Input  */
  input: Scalars['Bytes'];
  /**  Value  */
  value: Scalars['BigInt'];
  /**  Block number  */
  block: Scalars['BigInt'];
  /**  Event timestamp  */
  timestamp: Scalars['BigInt'];
  /**  Transaction gas limit  */
  gasLimit: Scalars['BigInt'];
  /**  Transaction gas price  */
  gasPrice: Scalars['BigInt'];
  /**  Transaction cumulative gas used  */
  cumulativeGasUsed?: Maybe<Scalars['BigInt']>;
  /**  Transaction gas used  */
  gasUsed?: Maybe<Scalars['BigInt']>;
  /**  Interacted With (To)   */
  to?: Maybe<Scalars['Bytes']>;
};

export type TransactiontransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferEvent_filter>;
};

export type Transaction_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transferEvents_?: InputMaybe<TransferEvent_filter>;
  input?: InputMaybe<Scalars['Bytes']>;
  input_not?: InputMaybe<Scalars['Bytes']>;
  input_in?: InputMaybe<Array<Scalars['Bytes']>>;
  input_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  input_contains?: InputMaybe<Scalars['Bytes']>;
  input_not_contains?: InputMaybe<Scalars['Bytes']>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeGasUsed?: InputMaybe<Scalars['BigInt']>;
  cumulativeGasUsed_not?: InputMaybe<Scalars['BigInt']>;
  cumulativeGasUsed_gt?: InputMaybe<Scalars['BigInt']>;
  cumulativeGasUsed_lt?: InputMaybe<Scalars['BigInt']>;
  cumulativeGasUsed_gte?: InputMaybe<Scalars['BigInt']>;
  cumulativeGasUsed_lte?: InputMaybe<Scalars['BigInt']>;
  cumulativeGasUsed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cumulativeGasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Transaction_orderBy =
  | 'id'
  | 'transferEvents'
  | 'input'
  | 'value'
  | 'block'
  | 'timestamp'
  | 'gasLimit'
  | 'gasPrice'
  | 'cumulativeGasUsed'
  | 'gasUsed'
  | 'to';

export type TransferEvent = TokenEvent & {
  id: Scalars['ID'];
  /**  Token address  */
  token: Token;
  /**  Quantity of tokens transferred  */
  amount: Scalars['BigDecimal'];
  /**  Transaction sender address  */
  sender: Scalars['Bytes'];
  /**  Address of source account  */
  source: Scalars['Bytes'];
  /**  Address of destination account  */
  destination: Scalars['Bytes'];
  /**  Block number  */
  block: Scalars['BigInt'];
  /**  Event timestamp  */
  timestamp: Scalars['BigInt'];
  /**  Transaction hash  */
  transaction: Transaction;
};

export type TransferEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  source?: InputMaybe<Scalars['Bytes']>;
  source_not?: InputMaybe<Scalars['Bytes']>;
  source_in?: InputMaybe<Array<Scalars['Bytes']>>;
  source_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  source_contains?: InputMaybe<Scalars['Bytes']>;
  source_not_contains?: InputMaybe<Scalars['Bytes']>;
  destination?: InputMaybe<Scalars['Bytes']>;
  destination_not?: InputMaybe<Scalars['Bytes']>;
  destination_in?: InputMaybe<Array<Scalars['Bytes']>>;
  destination_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  destination_contains?: InputMaybe<Scalars['Bytes']>;
  destination_not_contains?: InputMaybe<Scalars['Bytes']>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TransferEvent_orderBy =
  | 'id'
  | 'token'
  | 'amount'
  | 'sender'
  | 'source'
  | 'destination'
  | 'block'
  | 'timestamp'
  | 'transaction';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Account: ResolverTypeWrapper<Account>;
  Account_filter: Account_filter;
  Account_orderBy: Account_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Offer: ResolverTypeWrapper<Offer>;
  OfferPrice: ResolverTypeWrapper<OfferPrice>;
  OfferPrice_filter: OfferPrice_filter;
  OfferPrice_orderBy: OfferPrice_orderBy;
  Offer_filter: Offer_filter;
  Offer_orderBy: Offer_orderBy;
  OrderDirection: OrderDirection;
  Purchase: ResolverTypeWrapper<Purchase>;
  Purchase_filter: Purchase_filter;
  Purchase_orderBy: Purchase_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Token: ResolverTypeWrapper<Token>;
  Token_filter: Token_filter;
  Token_orderBy: Token_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  AccountBalance: ResolverTypeWrapper<AccountBalance>;
  AccountBalanceSnapshot: ResolverTypeWrapper<AccountBalanceSnapshot>;
  AccountBalanceSnapshot_filter: AccountBalanceSnapshot_filter;
  AccountBalanceSnapshot_orderBy: AccountBalanceSnapshot_orderBy;
  AccountBalance_filter: AccountBalance_filter;
  AccountBalance_orderBy: AccountBalance_orderBy;
  Allowance: ResolverTypeWrapper<Allowance>;
  Allowance_filter: Allowance_filter;
  Allowance_orderBy: Allowance_orderBy;
  BurnEvent: ResolverTypeWrapper<BurnEvent>;
  BurnEvent_filter: BurnEvent_filter;
  BurnEvent_orderBy: BurnEvent_orderBy;
  MintEvent: ResolverTypeWrapper<MintEvent>;
  MintEvent_filter: MintEvent_filter;
  MintEvent_orderBy: MintEvent_orderBy;
  TokenEvent:
    | ResolversTypes['BurnEvent']
    | ResolversTypes['MintEvent']
    | ResolversTypes['TransferEvent'];
  TokenEvent_filter: TokenEvent_filter;
  TokenEvent_orderBy: TokenEvent_orderBy;
  Transaction: ResolverTypeWrapper<Transaction>;
  Transaction_filter: Transaction_filter;
  Transaction_orderBy: Transaction_orderBy;
  TransferEvent: ResolverTypeWrapper<TransferEvent>;
  TransferEvent_filter: TransferEvent_filter;
  TransferEvent_orderBy: TransferEvent_orderBy;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  Account: Account;
  Account_filter: Account_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Offer: Offer;
  OfferPrice: OfferPrice;
  OfferPrice_filter: OfferPrice_filter;
  Offer_filter: Offer_filter;
  Purchase: Purchase;
  Purchase_filter: Purchase_filter;
  String: Scalars['String'];
  Token: Token;
  Token_filter: Token_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
  AccountBalance: AccountBalance;
  AccountBalanceSnapshot: AccountBalanceSnapshot;
  AccountBalanceSnapshot_filter: AccountBalanceSnapshot_filter;
  AccountBalance_filter: AccountBalance_filter;
  Allowance: Allowance;
  Allowance_filter: Allowance_filter;
  BurnEvent: BurnEvent;
  BurnEvent_filter: BurnEvent_filter;
  MintEvent: MintEvent;
  MintEvent_filter: MintEvent_filter;
  TokenEvent:
    | ResolversParentTypes['BurnEvent']
    | ResolversParentTypes['MintEvent']
    | ResolversParentTypes['TransferEvent'];
  TokenEvent_filter: TokenEvent_filter;
  Transaction: Transaction;
  Transaction_filter: Transaction_filter;
  TransferEvent: TransferEvent;
  TransferEvent_filter: TransferEvent_filter;
}>;

export type entityDirectiveArgs = {};

export type entityDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = entityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = subgraphIdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = derivedFromDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  account?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<QueryaccountArgs, 'id' | 'subgraphError'>
  >;
  accounts?: Resolver<
    Array<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<QueryaccountsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  token?: Resolver<
    Maybe<ResolversTypes['Token']>,
    ParentType,
    ContextType,
    RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>
  >;
  tokens?: Resolver<
    Array<ResolversTypes['Token']>,
    ParentType,
    ContextType,
    RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  offerPrice?: Resolver<
    Maybe<ResolversTypes['OfferPrice']>,
    ParentType,
    ContextType,
    RequireFields<QueryofferPriceArgs, 'id' | 'subgraphError'>
  >;
  offerPrices?: Resolver<
    Array<ResolversTypes['OfferPrice']>,
    ParentType,
    ContextType,
    RequireFields<QueryofferPricesArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  purchase?: Resolver<
    Maybe<ResolversTypes['Purchase']>,
    ParentType,
    ContextType,
    RequireFields<QuerypurchaseArgs, 'id' | 'subgraphError'>
  >;
  purchases?: Resolver<
    Array<ResolversTypes['Purchase']>,
    ParentType,
    ContextType,
    RequireFields<QuerypurchasesArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  offer?: Resolver<
    Maybe<ResolversTypes['Offer']>,
    ParentType,
    ContextType,
    RequireFields<QueryofferArgs, 'id' | 'subgraphError'>
  >;
  offers?: Resolver<
    Array<ResolversTypes['Offer']>,
    ParentType,
    ContextType,
    RequireFields<QueryoffersArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  _meta?: Resolver<
    Maybe<ResolversTypes['_Meta_']>,
    ParentType,
    ContextType,
    Partial<Query_metaArgs>
  >;
  burnEvent?: Resolver<
    Maybe<ResolversTypes['BurnEvent']>,
    ParentType,
    ContextType,
    RequireFields<QueryburnEventArgs, 'id' | 'subgraphError'>
  >;
  burnEvents?: Resolver<
    Array<ResolversTypes['BurnEvent']>,
    ParentType,
    ContextType,
    RequireFields<QueryburnEventsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  mintEvent?: Resolver<
    Maybe<ResolversTypes['MintEvent']>,
    ParentType,
    ContextType,
    RequireFields<QuerymintEventArgs, 'id' | 'subgraphError'>
  >;
  mintEvents?: Resolver<
    Array<ResolversTypes['MintEvent']>,
    ParentType,
    ContextType,
    RequireFields<QuerymintEventsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  transferEvent?: Resolver<
    Maybe<ResolversTypes['TransferEvent']>,
    ParentType,
    ContextType,
    RequireFields<QuerytransferEventArgs, 'id' | 'subgraphError'>
  >;
  transferEvents?: Resolver<
    Array<ResolversTypes['TransferEvent']>,
    ParentType,
    ContextType,
    RequireFields<QuerytransferEventsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  allowance?: Resolver<
    Maybe<ResolversTypes['Allowance']>,
    ParentType,
    ContextType,
    RequireFields<QueryallowanceArgs, 'id' | 'subgraphError'>
  >;
  allowances?: Resolver<
    Array<ResolversTypes['Allowance']>,
    ParentType,
    ContextType,
    RequireFields<QueryallowancesArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  accountBalance?: Resolver<
    Maybe<ResolversTypes['AccountBalance']>,
    ParentType,
    ContextType,
    RequireFields<QueryaccountBalanceArgs, 'id' | 'subgraphError'>
  >;
  accountBalances?: Resolver<
    Array<ResolversTypes['AccountBalance']>,
    ParentType,
    ContextType,
    RequireFields<QueryaccountBalancesArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  accountBalanceSnapshot?: Resolver<
    Maybe<ResolversTypes['AccountBalanceSnapshot']>,
    ParentType,
    ContextType,
    RequireFields<QueryaccountBalanceSnapshotArgs, 'id' | 'subgraphError'>
  >;
  accountBalanceSnapshots?: Resolver<
    Array<ResolversTypes['AccountBalanceSnapshot']>,
    ParentType,
    ContextType,
    RequireFields<
      QueryaccountBalanceSnapshotsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  transaction?: Resolver<
    Maybe<ResolversTypes['Transaction']>,
    ParentType,
    ContextType,
    RequireFields<QuerytransactionArgs, 'id' | 'subgraphError'>
  >;
  transactions?: Resolver<
    Array<ResolversTypes['Transaction']>,
    ParentType,
    ContextType,
    RequireFields<QuerytransactionsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  tokenEvent?: Resolver<
    Maybe<ResolversTypes['TokenEvent']>,
    ParentType,
    ContextType,
    RequireFields<QuerytokenEventArgs, 'id' | 'subgraphError'>
  >;
  tokenEvents?: Resolver<
    Array<ResolversTypes['TokenEvent']>,
    ParentType,
    ContextType,
    RequireFields<QuerytokenEventsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
}>;

export type SubscriptionResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = ResolversObject<{
  account?: SubscriptionResolver<
    Maybe<ResolversTypes['Account']>,
    'account',
    ParentType,
    ContextType,
    RequireFields<SubscriptionaccountArgs, 'id' | 'subgraphError'>
  >;
  accounts?: SubscriptionResolver<
    Array<ResolversTypes['Account']>,
    'accounts',
    ParentType,
    ContextType,
    RequireFields<SubscriptionaccountsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  token?: SubscriptionResolver<
    Maybe<ResolversTypes['Token']>,
    'token',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontokenArgs, 'id' | 'subgraphError'>
  >;
  tokens?: SubscriptionResolver<
    Array<ResolversTypes['Token']>,
    'tokens',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontokensArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  offerPrice?: SubscriptionResolver<
    Maybe<ResolversTypes['OfferPrice']>,
    'offerPrice',
    ParentType,
    ContextType,
    RequireFields<SubscriptionofferPriceArgs, 'id' | 'subgraphError'>
  >;
  offerPrices?: SubscriptionResolver<
    Array<ResolversTypes['OfferPrice']>,
    'offerPrices',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionofferPricesArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  purchase?: SubscriptionResolver<
    Maybe<ResolversTypes['Purchase']>,
    'purchase',
    ParentType,
    ContextType,
    RequireFields<SubscriptionpurchaseArgs, 'id' | 'subgraphError'>
  >;
  purchases?: SubscriptionResolver<
    Array<ResolversTypes['Purchase']>,
    'purchases',
    ParentType,
    ContextType,
    RequireFields<SubscriptionpurchasesArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  offer?: SubscriptionResolver<
    Maybe<ResolversTypes['Offer']>,
    'offer',
    ParentType,
    ContextType,
    RequireFields<SubscriptionofferArgs, 'id' | 'subgraphError'>
  >;
  offers?: SubscriptionResolver<
    Array<ResolversTypes['Offer']>,
    'offers',
    ParentType,
    ContextType,
    RequireFields<SubscriptionoffersArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  _meta?: SubscriptionResolver<
    Maybe<ResolversTypes['_Meta_']>,
    '_meta',
    ParentType,
    ContextType,
    Partial<Subscription_metaArgs>
  >;
  burnEvent?: SubscriptionResolver<
    Maybe<ResolversTypes['BurnEvent']>,
    'burnEvent',
    ParentType,
    ContextType,
    RequireFields<SubscriptionburnEventArgs, 'id' | 'subgraphError'>
  >;
  burnEvents?: SubscriptionResolver<
    Array<ResolversTypes['BurnEvent']>,
    'burnEvents',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionburnEventsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  mintEvent?: SubscriptionResolver<
    Maybe<ResolversTypes['MintEvent']>,
    'mintEvent',
    ParentType,
    ContextType,
    RequireFields<SubscriptionmintEventArgs, 'id' | 'subgraphError'>
  >;
  mintEvents?: SubscriptionResolver<
    Array<ResolversTypes['MintEvent']>,
    'mintEvents',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionmintEventsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  transferEvent?: SubscriptionResolver<
    Maybe<ResolversTypes['TransferEvent']>,
    'transferEvent',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontransferEventArgs, 'id' | 'subgraphError'>
  >;
  transferEvents?: SubscriptionResolver<
    Array<ResolversTypes['TransferEvent']>,
    'transferEvents',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptiontransferEventsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  allowance?: SubscriptionResolver<
    Maybe<ResolversTypes['Allowance']>,
    'allowance',
    ParentType,
    ContextType,
    RequireFields<SubscriptionallowanceArgs, 'id' | 'subgraphError'>
  >;
  allowances?: SubscriptionResolver<
    Array<ResolversTypes['Allowance']>,
    'allowances',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionallowancesArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  accountBalance?: SubscriptionResolver<
    Maybe<ResolversTypes['AccountBalance']>,
    'accountBalance',
    ParentType,
    ContextType,
    RequireFields<SubscriptionaccountBalanceArgs, 'id' | 'subgraphError'>
  >;
  accountBalances?: SubscriptionResolver<
    Array<ResolversTypes['AccountBalance']>,
    'accountBalances',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionaccountBalancesArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  accountBalanceSnapshot?: SubscriptionResolver<
    Maybe<ResolversTypes['AccountBalanceSnapshot']>,
    'accountBalanceSnapshot',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionaccountBalanceSnapshotArgs,
      'id' | 'subgraphError'
    >
  >;
  accountBalanceSnapshots?: SubscriptionResolver<
    Array<ResolversTypes['AccountBalanceSnapshot']>,
    'accountBalanceSnapshots',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionaccountBalanceSnapshotsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  transaction?: SubscriptionResolver<
    Maybe<ResolversTypes['Transaction']>,
    'transaction',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontransactionArgs, 'id' | 'subgraphError'>
  >;
  transactions?: SubscriptionResolver<
    Array<ResolversTypes['Transaction']>,
    'transactions',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptiontransactionsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  tokenEvent?: SubscriptionResolver<
    Maybe<ResolversTypes['TokenEvent']>,
    'tokenEvent',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontokenEventArgs, 'id' | 'subgraphError'>
  >;
  tokenEvents?: SubscriptionResolver<
    Array<ResolversTypes['TokenEvent']>,
    'tokenEvents',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptiontokenEventsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
}>;

export type AccountResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offers?: Resolver<
    Array<ResolversTypes['Offer']>,
    ParentType,
    ContextType,
    RequireFields<AccountoffersArgs, 'skip' | 'first'>
  >;
  purchases?: Resolver<
    Array<ResolversTypes['Purchase']>,
    ParentType,
    ContextType,
    RequireFields<AccountpurchasesArgs, 'skip' | 'first'>
  >;
  sells?: Resolver<
    Array<ResolversTypes['Purchase']>,
    ParentType,
    ContextType,
    RequireFields<AccountsellsArgs, 'skip' | 'first'>
  >;
  purchaseCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sellCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offerCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  balances?: Resolver<
    Array<ResolversTypes['AccountBalance']>,
    ParentType,
    ContextType,
    RequireFields<AccountbalancesArgs, 'skip' | 'first'>
  >;
  allowances?: Resolver<
    Array<ResolversTypes['Allowance']>,
    ParentType,
    ContextType,
    RequireFields<AccountallowancesArgs, 'skip' | 'first'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type OfferResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Offer'] = ResolversParentTypes['Offer']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  offerToken?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  buyerToken?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  prices?: Resolver<
    Array<ResolversTypes['OfferPrice']>,
    ParentType,
    ContextType,
    RequireFields<OfferpricesArgs, 'skip' | 'first'>
  >;
  price?: Resolver<ResolversTypes['OfferPrice'], ParentType, ContextType>;
  availableAmount?: Resolver<
    ResolversTypes['BigDecimal'],
    ParentType,
    ContextType
  >;
  purchases?: Resolver<
    Array<ResolversTypes['Purchase']>,
    ParentType,
    ContextType,
    RequireFields<OfferpurchasesArgs, 'skip' | 'first'>
  >;
  purchaseCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  buyer?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtTimestamp?: Resolver<
    ResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  removedAtBlock?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  removedAtTimestamp?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OfferPriceResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['OfferPrice'] = ResolversParentTypes['OfferPrice']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  offer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtTimestamp?: Resolver<
    ResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PurchaseResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Purchase'] = ResolversParentTypes['Purchase']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  offer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtTimestamp?: Resolver<
    ResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offers?: Resolver<
    Array<ResolversTypes['Offer']>,
    ParentType,
    ContextType,
    RequireFields<TokenoffersArgs, 'skip' | 'first'>
  >;
  purchases?: Resolver<
    Array<ResolversTypes['Purchase']>,
    ParentType,
    ContextType,
    RequireFields<TokenpurchasesArgs, 'skip' | 'first'>
  >;
  purchaseCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  dollarsVolume?: Resolver<
    ResolversTypes['BigDecimal'],
    ParentType,
    ContextType
  >;
  offerCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eventCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  burnEventCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  mintEventCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transferEventCount?: Resolver<
    ResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  approveEventCount?: Resolver<
    ResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  totalSupply?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalBurned?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalMinted?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalTransferred?: Resolver<
    ResolversTypes['BigDecimal'],
    ParentType,
    ContextType
  >;
  approveEvent?: Resolver<
    Array<ResolversTypes['Allowance']>,
    ParentType,
    ContextType,
    RequireFields<TokenapproveEventArgs, 'skip' | 'first'>
  >;
  burnEvents?: Resolver<
    Array<ResolversTypes['BurnEvent']>,
    ParentType,
    ContextType,
    RequireFields<TokenburnEventsArgs, 'skip' | 'first'>
  >;
  mintEvents?: Resolver<
    Array<ResolversTypes['MintEvent']>,
    ParentType,
    ContextType,
    RequireFields<TokenmintEventsArgs, 'skip' | 'first'>
  >;
  transferEvents?: Resolver<
    Array<ResolversTypes['TransferEvent']>,
    ParentType,
    ContextType,
    RequireFields<TokentransferEventsArgs, 'skip' | 'first'>
  >;
  transactions?: Resolver<
    Array<ResolversTypes['Transaction']>,
    ParentType,
    ContextType,
    RequireFields<TokentransactionsArgs, 'skip' | 'first'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']
> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']
> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AccountBalanceResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['AccountBalance'] = ResolversParentTypes['AccountBalance']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  allowances?: Resolver<
    Array<ResolversTypes['Allowance']>,
    ParentType,
    ContextType,
    RequireFields<AccountBalanceallowancesArgs, 'skip' | 'first'>
  >;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  modified?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<
    ResolversTypes['Transaction'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AccountBalanceSnapshotResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['AccountBalanceSnapshot'] = ResolversParentTypes['AccountBalanceSnapshot']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['TransferEvent'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<
    ResolversTypes['Transaction'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AllowanceResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Allowance'] = ResolversParentTypes['Allowance']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  spender?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  allowance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['AccountBalance'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BurnEventResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['BurnEvent'] = ResolversParentTypes['BurnEvent']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  burner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<
    ResolversTypes['Transaction'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MintEventResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['MintEvent'] = ResolversParentTypes['MintEvent']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  destination?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<
    ResolversTypes['Transaction'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenEventResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['TokenEvent'] = ResolversParentTypes['TokenEvent']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'BurnEvent' | 'MintEvent' | 'TransferEvent',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<
    ResolversTypes['Transaction'],
    ParentType,
    ContextType
  >;
}>;

export type TransactionResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transferEvents?: Resolver<
    Array<ResolversTypes['TransferEvent']>,
    ParentType,
    ContextType,
    RequireFields<TransactiontransferEventsArgs, 'skip' | 'first'>
  >;
  input?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasLimit?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  cumulativeGasUsed?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  gasUsed?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransferEventResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['TransferEvent'] = ResolversParentTypes['TransferEvent']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  destination?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transaction?: Resolver<
    ResolversTypes['Transaction'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Account?: AccountResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Offer?: OfferResolvers<ContextType>;
  OfferPrice?: OfferPriceResolvers<ContextType>;
  Purchase?: PurchaseResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
  AccountBalance?: AccountBalanceResolvers<ContextType>;
  AccountBalanceSnapshot?: AccountBalanceSnapshotResolvers<ContextType>;
  Allowance?: AllowanceResolvers<ContextType>;
  BurnEvent?: BurnEventResolvers<ContextType>;
  MintEvent?: MintEventResolvers<ContextType>;
  TokenEvent?: TokenEventResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransferEvent?: TransferEventResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = YamGnosisTypes.Context &
  YamEthTypes.Context &
  WalletGoerliTypes.Context &
  BaseMeshContext;

const baseDir = pathModule.join(
  pathModule.dirname(fileURLToPath(import.meta.url)),
  '..'
);

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (
    pathModule.isAbsolute(moduleId)
      ? pathModule.relative(baseDir, moduleId)
      : moduleId
  )
    .split('\\')
    .join('/')
    .replace(baseDir + '/', '');
  switch (relativeModuleId) {
    case '.graphclient/sources/yam-gnosis/introspectionSchema':
      return import('./sources/yam-gnosis/introspectionSchema') as T;

    case '.graphclient/sources/yam-eth/introspectionSchema':
      return import('./sources/yam-eth/introspectionSchema') as T;

    case '.graphclient/sources/wallet-goerli/introspectionSchema':
      return import('./sources/wallet-goerli/introspectionSchema') as T;

    default:
      return Promise.reject(
        new Error(`Cannot find module '${relativeModuleId}'.`)
      );
  }
};

const rootStore = new MeshStore(
  '.graphclient',
  new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
    fileType: 'ts',
  }),
  {
    readonly: true,
    validate: false,
  }
);

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any;
export async function getMeshOptions(): Promise<GetMeshOptions> {
  const pubsub = new PubSub();
  const sourcesStore = rootStore.child('sources');
  const logger = new DefaultLogger('GraphClient');
  const cache = new (MeshCache as any)({
    ...({} as any),
    importFn,
    store: rootStore.child('cache'),
    pubsub,
    logger,
  } as any);

  const sources: MeshResolvedSource[] = [];
  const transforms: MeshTransform[] = [];
  const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
  const yamGnosisTransforms = [];
  const yamEthTransforms = [];
  const walletGoerliTransforms = [];
  const additionalTypeDefs = [] as any[];
  const yamGnosisHandler = new GraphqlHandler({
    name: 'yam-gnosis',
    config: {
      endpoint: UrlTheGraphYam.Gnosis,
    },
    baseDir,
    cache,
    pubsub,
    store: sourcesStore.child('yam-gnosis'),
    logger: logger.child('yam-gnosis'),
    importFn,
  });
  const yamEthHandler = new GraphqlHandler({
    name: 'yam-eth',
    config: {
      endpoint: UrlTheGraphYam.Gnosis,
    },
    baseDir,
    cache,
    pubsub,
    store: sourcesStore.child('yam-eth'),
    logger: logger.child('yam-eth'),
    importFn,
  });
  const walletGoerliHandler = new GraphqlHandler({
    name: 'wallet-goerli',
    config: {
      endpoint: UrlTheGraphToken.Goerli,
    },
    baseDir,
    cache,
    pubsub,
    store: sourcesStore.child('wallet-goerli'),
    logger: logger.child('wallet-goerli'),
    importFn,
  });
  sources[0] = {
    name: 'yam-gnosis',
    handler: yamGnosisHandler,
    transforms: yamGnosisTransforms,
  };
  sources[1] = {
    name: 'yam-eth',
    handler: yamEthHandler,
    transforms: yamEthTransforms,
  };
  sources[2] = {
    name: 'wallet-goerli',
    handler: walletGoerliHandler,
    transforms: walletGoerliTransforms,
  };
  const additionalResolvers = [] as any[];
  const merger = new (StitchingMerger as any)({
    cache,
    pubsub,
    logger: logger.child('stitchingMerger'),
    store: rootStore.child('stitchingMerger'),
  });

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
        {
          document: GetOffersDocument,
          get rawSDL() {
            return printWithCache(GetOffersDocument);
          },
          location: 'GetOffersDocument.graphql',
        },
      ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler(): MeshHTTPHandler<MeshContext> {
  return createMeshHTTPHandler<MeshContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  });
}

let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions()
      .then((meshOptions) => getMesh(meshOptions))
      .then((mesh) => {
        const id = mesh.pubsub.subscribe('destroy', () => {
          meshInstance$ = undefined;
          mesh.pubsub.unsubscribe(id);
        });
        return mesh;
      });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) =>
  getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) =>
  getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(
  globalContext?: TGlobalContext
) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) =>
    sdkRequesterFactory(globalContext)
  );
  return getSdk<TOperationContext, TGlobalContext>((...args) =>
    sdkRequester$.then((sdkRequester) => sdkRequester(...args))
  );
}
export type getOffersQueryVariables = Exact<{ [key: string]: never }>;

export type getOffersQuery = {
  offers: Array<
    Pick<Offer, 'id'> & {
      offerToken: Pick<Token, 'address' | 'name' | 'decimals' | 'symbol'>;
      prices: Array<Pick<OfferPrice, 'amount' | 'price'>>;
      seller: Pick<Account, 'id' | 'address'>;
      buyerToken: Pick<Token, 'name' | 'symbol' | 'address' | 'decimals'>;
      buyer?: Maybe<Pick<Account, 'address'>>;
    }
  >;
};

export const getOffersDocument = gql`
  query getOffers {
    offers {
      id
      offerToken {
        address
        name
        decimals
        symbol
      }
      prices {
        amount
        price
      }
      seller {
        id
        address
      }
      buyerToken {
        name
        symbol
        address
        decimals
      }
      buyer {
        address
      }
    }
  }
` as unknown as DocumentNode<getOffersQuery, getOffersQueryVariables>;

export type Requester<C = {}, E = unknown> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>;
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    getOffers(
      variables?: getOffersQueryVariables,
      options?: C
    ): Promise<getOffersQuery> {
      return requester<getOffersQuery, getOffersQueryVariables>(
        getOffersDocument,
        variables,
        options
      ) as Promise<getOffersQuery>;
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
