// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { YamEthTypes } from './sources/yam-eth/types';
import type { YamGnosisTypes } from './sources/yam-gnosis/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

/**  Account entity  */
export type Account = {
  /**  User address  */
  id: Scalars['ID'];
  /**  User address  */
  address: Scalars['Bytes'];
  /**  User offers  */
  offers: Array<Offer>;
  /**  user purchases  */
  purchases: Array<Purchase>;
};


/**  Account entity  */
export type AccountoffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Offer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Offer_filter>;
};


/**  Account entity  */
export type AccountpurchasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Purchase_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Purchase_filter>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Account_orderBy =
  | 'id'
  | 'address'
  | 'offers'
  | 'purchases';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/**  Offer entity  */
export type Offer = {
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
  /**  Purchase array  */
  purchases: Array<Purchase>;
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
  price: Scalars['BigInt'];
  /**  Amount  */
  amount: Scalars['BigInt'];
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
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  purchases?: InputMaybe<Array<Scalars['String']>>;
  purchases_not?: InputMaybe<Array<Scalars['String']>>;
  purchases_contains?: InputMaybe<Array<Scalars['String']>>;
  purchases_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  purchases_not_contains?: InputMaybe<Array<Scalars['String']>>;
  purchases_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  purchases_?: InputMaybe<Purchase_filter>;
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
  | 'purchases'
  | 'buyer'
  | 'createdAtBlock'
  | 'createdAtTimestamp'
  | 'removedAtBlock'
  | 'removedAtTimestamp';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Purchase = {
  id: Scalars['ID'];
  /**  Offer entity  */
  offer: Offer;
  /**  Buyer 0x  */
  buyer: Account;
  /**  Price  */
  price: Scalars['BigInt'];
  /**  Quantity  */
  quantity: Scalars['BigInt'];
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
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantity?: InputMaybe<Scalars['BigInt']>;
  quantity_not?: InputMaybe<Scalars['BigInt']>;
  quantity_gt?: InputMaybe<Scalars['BigInt']>;
  quantity_lt?: InputMaybe<Scalars['BigInt']>;
  quantity_gte?: InputMaybe<Scalars['BigInt']>;
  quantity_lte?: InputMaybe<Scalars['BigInt']>;
  quantity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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

/**  Token entity  */
export type Token = {
  id: Scalars['ID'];
  /**  Token address  */
  address: Scalars['Bytes'];
  /**  Array of offers  */
  offers: Array<Offer>;
  /**  Array of purchases  */
  purchases: Array<Purchase>;
  /**  TokenType: 0:NOWL|1:REALTOKEN|2:ERC20PERMIT|3:ERC20NOPERMIT  */
  tokenType: Scalars['Int'];
  /**  Token decimal  */
  decimals?: Maybe<Scalars['BigInt']>;
  /**  Token name  */
  name?: Maybe<Scalars['String']>;
  /**  Token symbol  */
  symbol?: Maybe<Scalars['String']>;
};


/**  Token entity  */
export type TokenoffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Offer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Offer_filter>;
};


/**  Token entity  */
export type TokenpurchasesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Purchase_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Purchase_filter>;
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
  tokenType?: InputMaybe<Scalars['Int']>;
  tokenType_not?: InputMaybe<Scalars['Int']>;
  tokenType_gt?: InputMaybe<Scalars['Int']>;
  tokenType_lt?: InputMaybe<Scalars['Int']>;
  tokenType_gte?: InputMaybe<Scalars['Int']>;
  tokenType_lte?: InputMaybe<Scalars['Int']>;
  tokenType_in?: InputMaybe<Array<Scalars['Int']>>;
  tokenType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals?: InputMaybe<Scalars['BigInt']>;
  decimals_not?: InputMaybe<Scalars['BigInt']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']>;
  decimals_lt?: InputMaybe<Scalars['BigInt']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
};

export type Token_orderBy =
  | 'id'
  | 'address'
  | 'offers'
  | 'purchases'
  | 'tokenType'
  | 'decimals'
  | 'name'
  | 'symbol';

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
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
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
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryaccountArgs, 'id' | 'subgraphError'>>;
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  offerPrice?: Resolver<Maybe<ResolversTypes['OfferPrice']>, ParentType, ContextType, RequireFields<QueryofferPriceArgs, 'id' | 'subgraphError'>>;
  offerPrices?: Resolver<Array<ResolversTypes['OfferPrice']>, ParentType, ContextType, RequireFields<QueryofferPricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  purchase?: Resolver<Maybe<ResolversTypes['Purchase']>, ParentType, ContextType, RequireFields<QuerypurchaseArgs, 'id' | 'subgraphError'>>;
  purchases?: Resolver<Array<ResolversTypes['Purchase']>, ParentType, ContextType, RequireFields<QuerypurchasesArgs, 'skip' | 'first' | 'subgraphError'>>;
  offer?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType, RequireFields<QueryofferArgs, 'id' | 'subgraphError'>>;
  offers?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType, RequireFields<QueryoffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  account?: SubscriptionResolver<Maybe<ResolversTypes['Account']>, "account", ParentType, ContextType, RequireFields<SubscriptionaccountArgs, 'id' | 'subgraphError'>>;
  accounts?: SubscriptionResolver<Array<ResolversTypes['Account']>, "accounts", ParentType, ContextType, RequireFields<SubscriptionaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: SubscriptionResolver<Maybe<ResolversTypes['Token']>, "token", ParentType, ContextType, RequireFields<SubscriptiontokenArgs, 'id' | 'subgraphError'>>;
  tokens?: SubscriptionResolver<Array<ResolversTypes['Token']>, "tokens", ParentType, ContextType, RequireFields<SubscriptiontokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  offerPrice?: SubscriptionResolver<Maybe<ResolversTypes['OfferPrice']>, "offerPrice", ParentType, ContextType, RequireFields<SubscriptionofferPriceArgs, 'id' | 'subgraphError'>>;
  offerPrices?: SubscriptionResolver<Array<ResolversTypes['OfferPrice']>, "offerPrices", ParentType, ContextType, RequireFields<SubscriptionofferPricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  purchase?: SubscriptionResolver<Maybe<ResolversTypes['Purchase']>, "purchase", ParentType, ContextType, RequireFields<SubscriptionpurchaseArgs, 'id' | 'subgraphError'>>;
  purchases?: SubscriptionResolver<Array<ResolversTypes['Purchase']>, "purchases", ParentType, ContextType, RequireFields<SubscriptionpurchasesArgs, 'skip' | 'first' | 'subgraphError'>>;
  offer?: SubscriptionResolver<Maybe<ResolversTypes['Offer']>, "offer", ParentType, ContextType, RequireFields<SubscriptionofferArgs, 'id' | 'subgraphError'>>;
  offers?: SubscriptionResolver<Array<ResolversTypes['Offer']>, "offers", ParentType, ContextType, RequireFields<SubscriptionoffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type AccountResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offers?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType, RequireFields<AccountoffersArgs, 'skip' | 'first'>>;
  purchases?: Resolver<Array<ResolversTypes['Purchase']>, ParentType, ContextType, RequireFields<AccountpurchasesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type OfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Offer'] = ResolversParentTypes['Offer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  offerToken?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  buyerToken?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  prices?: Resolver<Array<ResolversTypes['OfferPrice']>, ParentType, ContextType, RequireFields<OfferpricesArgs, 'skip' | 'first'>>;
  purchases?: Resolver<Array<ResolversTypes['Purchase']>, ParentType, ContextType, RequireFields<OfferpurchasesArgs, 'skip' | 'first'>>;
  buyer?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  removedAtBlock?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  removedAtTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OfferPriceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OfferPrice'] = ResolversParentTypes['OfferPrice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  offer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PurchaseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Purchase'] = ResolversParentTypes['Purchase']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  offer?: Resolver<ResolversTypes['Offer'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAtTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offers?: Resolver<Array<ResolversTypes['Offer']>, ParentType, ContextType, RequireFields<TokenoffersArgs, 'skip' | 'first'>>;
  purchases?: Resolver<Array<ResolversTypes['Purchase']>, ParentType, ContextType, RequireFields<TokenpurchasesArgs, 'skip' | 'first'>>;
  tokenType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  decimals?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = YamGnosisTypes.Context & YamEthTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/yam-gnosis/introspectionSchema":
      return import("./sources/yam-gnosis/introspectionSchema") as T;
    
    case ".graphclient/sources/yam-eth/introspectionSchema":
      return import("./sources/yam-eth/introspectionSchema") as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const yamGnosisTransforms = [];
const yamEthTransforms = [];
const additionalTypeDefs = [] as any[];
const yamGnosisHandler = new GraphqlHandler({
              name: "yam-gnosis",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph-gnosis"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("yam-gnosis"),
              logger: logger.child("yam-gnosis"),
              importFn,
            });
const yamEthHandler = new GraphqlHandler({
              name: "yam-eth",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/realtoken-thegraph/yam-realt-subgraph"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("yam-eth"),
              logger: logger.child("yam-eth"),
              importFn,
            });
sources[0] = {
          name: 'yam-gnosis',
          handler: yamGnosisHandler,
          transforms: yamGnosisTransforms
        }
sources[1] = {
          name: 'yam-eth',
          handler: yamEthHandler,
          transforms: yamEthTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })

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
        location: 'GetOffersDocument.graphql'
      }
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
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type getOffersQueryVariables = Exact<{ [key: string]: never; }>;


export type getOffersQuery = { offers: Array<(
    Pick<Offer, 'id'>
    & { offerToken: Pick<Token, 'address' | 'name' | 'decimals' | 'symbol'>, prices: Array<Pick<OfferPrice, 'amount' | 'price'>>, seller: Pick<Account, 'id' | 'address'>, buyerToken: Pick<Token, 'name' | 'symbol' | 'address' | 'decimals'> }
  )> };


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
  }
}
    ` as unknown as DocumentNode<getOffersQuery, getOffersQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    getOffers(variables?: getOffersQueryVariables, options?: C): Promise<getOffersQuery> {
      return requester<getOffersQuery, getOffersQueryVariables>(getOffersDocument, variables, options) as Promise<getOffersQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;