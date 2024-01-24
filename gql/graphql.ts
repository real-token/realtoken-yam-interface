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
  bridgeGoerli_BigDecimal: { input: any; output: any; }
  bridgeGoerli_BigInt: { input: any; output: any; }
  bridgeGoerli_Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  bridgeGoerli_Int8: { input: any; output: any; }
  bridgeSepolia_BigDecimal: { input: any; output: any; }
  bridgeSepolia_BigInt: { input: any; output: any; }
  bridgeSepolia_Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  bridgeSepolia_Int8: { input: any; output: any; }
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
  realTokenGoerli_BigDecimal: { input: any; output: any; }
  realTokenGoerli_BigInt: { input: any; output: any; }
  realTokenGoerli_Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  realTokenGoerli_Int8: { input: any; output: any; }
  realTokenSepolia_BigDecimal: { input: any; output: any; }
  realTokenSepolia_BigInt: { input: any; output: any; }
  realTokenSepolia_Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  realTokenSepolia_Int8: { input: any; output: any; }
  yamEth_BigDecimal: { input: any; output: any; }
  yamEth_BigInt: { input: any; output: any; }
  yamEth_Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  yamEth_Int8: { input: any; output: any; }
  yamGnosis_BigDecimal: { input: any; output: any; }
  yamGnosis_BigInt: { input: any; output: any; }
  yamGnosis_Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  yamGnosis_Int8: { input: any; output: any; }
};

export type AddDomainInput = {
  value: Scalars['String']['input'];
};

export type AuthMutations = {
  __typename?: 'AuthMutations';
  addDomain: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  deleteDomain: Scalars['Boolean']['output'];
  login: AuthPayload;
  sendInvitation: Scalars['Boolean']['output'];
  signup: Scalars['Boolean']['output'];
};


export type AuthMutationsAddDomainArgs = {
  input: AddDomainInput;
};


export type AuthMutationsChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type AuthMutationsDeleteDomainArgs = {
  uuid: Scalars['String']['input'];
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
  getAuthorizedDomains?: Maybe<Array<Maybe<Domain>>>;
};

export type BridgeGoerliQuery = {
  __typename?: 'BridgeGoerliQuery';
  /** Access to subgraph metadata */
  _meta?: Maybe<BridgeGoerli__Meta_>;
  adminFix?: Maybe<BridgeGoerli_AdminFix>;
  adminFixes: Array<BridgeGoerli_AdminFix>;
  collectedSignatureEntities: Array<BridgeGoerli_CollectedSignatureEntity>;
  collectedSignatureEntity?: Maybe<BridgeGoerli_CollectedSignatureEntity>;
  execution?: Maybe<BridgeGoerli_Execution>;
  executions: Array<BridgeGoerli_Execution>;
  requestBridgeToken?: Maybe<BridgeGoerli_RequestBridgeToken>;
  requestBridgeTokens: Array<BridgeGoerli_RequestBridgeToken>;
  requestFixFail?: Maybe<BridgeGoerli_RequestFixFail>;
  requestFixFails: Array<BridgeGoerli_RequestFixFail>;
  requiredSignature?: Maybe<BridgeGoerli_RequiredSignature>;
  requiredSignatures: Array<BridgeGoerli_RequiredSignature>;
  token?: Maybe<BridgeGoerli_Token>;
  tokens: Array<BridgeGoerli_Token>;
};


export type BridgeGoerliQuery_MetaArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
};


export type BridgeGoerliQueryAdminFixArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
};


export type BridgeGoerliQueryAdminFixesArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeGoerli_AdminFix_OrderBy>;
  orderDirection?: InputMaybe<BridgeGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeGoerli_AdminFix_Filter>;
};


export type BridgeGoerliQueryCollectedSignatureEntitiesArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeGoerli_CollectedSignatureEntity_OrderBy>;
  orderDirection?: InputMaybe<BridgeGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeGoerli_CollectedSignatureEntity_Filter>;
};


export type BridgeGoerliQueryCollectedSignatureEntityArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
};


export type BridgeGoerliQueryExecutionArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
};


export type BridgeGoerliQueryExecutionsArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeGoerli_Execution_OrderBy>;
  orderDirection?: InputMaybe<BridgeGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeGoerli_Execution_Filter>;
};


export type BridgeGoerliQueryRequestBridgeTokenArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
};


export type BridgeGoerliQueryRequestBridgeTokensArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeGoerli_RequestBridgeToken_OrderBy>;
  orderDirection?: InputMaybe<BridgeGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeGoerli_RequestBridgeToken_Filter>;
};


export type BridgeGoerliQueryRequestFixFailArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
};


export type BridgeGoerliQueryRequestFixFailsArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeGoerli_RequestFixFail_OrderBy>;
  orderDirection?: InputMaybe<BridgeGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeGoerli_RequestFixFail_Filter>;
};


export type BridgeGoerliQueryRequiredSignatureArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
};


export type BridgeGoerliQueryRequiredSignaturesArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeGoerli_RequiredSignature_OrderBy>;
  orderDirection?: InputMaybe<BridgeGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeGoerli_RequiredSignature_Filter>;
};


export type BridgeGoerliQueryTokenArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
};


export type BridgeGoerliQueryTokensArgs = {
  block?: InputMaybe<BridgeGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeGoerli_Token_OrderBy>;
  orderDirection?: InputMaybe<BridgeGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeGoerli_Token_Filter>;
};

export type BridgeSepoliaQuery = {
  __typename?: 'BridgeSepoliaQuery';
  /** Access to subgraph metadata */
  _meta?: Maybe<BridgeSepolia__Meta_>;
  adminFix?: Maybe<BridgeSepolia_AdminFix>;
  adminFixes: Array<BridgeSepolia_AdminFix>;
  collectedSignatureEntities: Array<BridgeSepolia_CollectedSignatureEntity>;
  collectedSignatureEntity?: Maybe<BridgeSepolia_CollectedSignatureEntity>;
  execution?: Maybe<BridgeSepolia_Execution>;
  executions: Array<BridgeSepolia_Execution>;
  requestBridgeToken?: Maybe<BridgeSepolia_RequestBridgeToken>;
  requestBridgeTokens: Array<BridgeSepolia_RequestBridgeToken>;
  requestFixFail?: Maybe<BridgeSepolia_RequestFixFail>;
  requestFixFails: Array<BridgeSepolia_RequestFixFail>;
  requiredSignature?: Maybe<BridgeSepolia_RequiredSignature>;
  requiredSignatures: Array<BridgeSepolia_RequiredSignature>;
  token?: Maybe<BridgeSepolia_Token>;
  tokens: Array<BridgeSepolia_Token>;
};


export type BridgeSepoliaQuery_MetaArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
};


export type BridgeSepoliaQueryAdminFixArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
};


export type BridgeSepoliaQueryAdminFixesArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeSepolia_AdminFix_OrderBy>;
  orderDirection?: InputMaybe<BridgeSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeSepolia_AdminFix_Filter>;
};


export type BridgeSepoliaQueryCollectedSignatureEntitiesArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeSepolia_CollectedSignatureEntity_OrderBy>;
  orderDirection?: InputMaybe<BridgeSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeSepolia_CollectedSignatureEntity_Filter>;
};


export type BridgeSepoliaQueryCollectedSignatureEntityArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
};


export type BridgeSepoliaQueryExecutionArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
};


export type BridgeSepoliaQueryExecutionsArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeSepolia_Execution_OrderBy>;
  orderDirection?: InputMaybe<BridgeSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeSepolia_Execution_Filter>;
};


export type BridgeSepoliaQueryRequestBridgeTokenArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
};


export type BridgeSepoliaQueryRequestBridgeTokensArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeSepolia_RequestBridgeToken_OrderBy>;
  orderDirection?: InputMaybe<BridgeSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeSepolia_RequestBridgeToken_Filter>;
};


export type BridgeSepoliaQueryRequestFixFailArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
};


export type BridgeSepoliaQueryRequestFixFailsArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeSepolia_RequestFixFail_OrderBy>;
  orderDirection?: InputMaybe<BridgeSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeSepolia_RequestFixFail_Filter>;
};


export type BridgeSepoliaQueryRequiredSignatureArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
};


export type BridgeSepoliaQueryRequiredSignaturesArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeSepolia_RequiredSignature_OrderBy>;
  orderDirection?: InputMaybe<BridgeSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeSepolia_RequiredSignature_Filter>;
};


export type BridgeSepoliaQueryTokenArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
};


export type BridgeSepoliaQueryTokensArgs = {
  block?: InputMaybe<BridgeSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeSepolia_Token_OrderBy>;
  orderDirection?: InputMaybe<BridgeSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: BridgeSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<BridgeSepolia_Token_Filter>;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  newPasswordConf: Scalars['String']['input'];
};

export type Domain = {
  __typename?: 'Domain';
  uuid: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  auth: AuthMutations;
};

export type Query = {
  __typename?: 'Query';
  auth: AuthQueries;
  bridgeGoerli?: Maybe<BridgeGoerliQuery>;
  bridgeSepolia?: Maybe<BridgeSepoliaQuery>;
  realTokenEth?: Maybe<RealTokenEthQuery>;
  realTokenGnosis?: Maybe<RealTokenGnosisQuery>;
  realTokenGoerli?: Maybe<RealTokenGoerliQuery>;
  realTokenSepolia?: Maybe<RealTokenSepoliaQuery>;
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

export type RealTokenGoerliQuery = {
  __typename?: 'RealTokenGoerliQuery';
  /** Access to subgraph metadata */
  _meta?: Maybe<RealTokenGoerli__Meta_>;
  account?: Maybe<RealTokenGoerli_Account>;
  accountBalance?: Maybe<RealTokenGoerli_AccountBalance>;
  accountBalanceSnapshot?: Maybe<RealTokenGoerli_AccountBalanceSnapshot>;
  accountBalanceSnapshots: Array<RealTokenGoerli_AccountBalanceSnapshot>;
  accountBalances: Array<RealTokenGoerli_AccountBalance>;
  accounts: Array<RealTokenGoerli_Account>;
  allowance?: Maybe<RealTokenGoerli_Allowance>;
  allowances: Array<RealTokenGoerli_Allowance>;
  burnEvent?: Maybe<RealTokenGoerli_BurnEvent>;
  burnEvents: Array<RealTokenGoerli_BurnEvent>;
  mintEvent?: Maybe<RealTokenGoerli_MintEvent>;
  mintEvents: Array<RealTokenGoerli_MintEvent>;
  token?: Maybe<RealTokenGoerli_Token>;
  tokenEvent?: Maybe<RealTokenGoerli_TokenEvent>;
  tokenEvents: Array<RealTokenGoerli_TokenEvent>;
  tokens: Array<RealTokenGoerli_Token>;
  transaction?: Maybe<RealTokenGoerli_Transaction>;
  transactions: Array<RealTokenGoerli_Transaction>;
  transferEvent?: Maybe<RealTokenGoerli_TransferEvent>;
  transferEvents: Array<RealTokenGoerli_TransferEvent>;
  trustedIntermediaries: Array<RealTokenGoerli_TrustedIntermediary>;
  trustedIntermediary?: Maybe<RealTokenGoerli_TrustedIntermediary>;
  userId?: Maybe<RealTokenGoerli_UserId>;
  userIds: Array<RealTokenGoerli_UserId>;
};


export type RealTokenGoerliQuery_MetaArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
};


export type RealTokenGoerliQueryAccountArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryAccountBalanceArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryAccountBalanceSnapshotArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryAccountBalanceSnapshotsArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_AccountBalanceSnapshot_Filter>;
};


export type RealTokenGoerliQueryAccountBalancesArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_AccountBalance_Filter>;
};


export type RealTokenGoerliQueryAccountsArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_Account_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_Account_Filter>;
};


export type RealTokenGoerliQueryAllowanceArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryAllowancesArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_Allowance_Filter>;
};


export type RealTokenGoerliQueryBurnEventArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryBurnEventsArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_BurnEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_BurnEvent_Filter>;
};


export type RealTokenGoerliQueryMintEventArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryMintEventsArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_MintEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_MintEvent_Filter>;
};


export type RealTokenGoerliQueryTokenArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryTokenEventArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryTokenEventsArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_TokenEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_TokenEvent_Filter>;
};


export type RealTokenGoerliQueryTokensArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_Token_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_Token_Filter>;
};


export type RealTokenGoerliQueryTransactionArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryTransactionsArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_Transaction_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_Transaction_Filter>;
};


export type RealTokenGoerliQueryTransferEventArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryTransferEventsArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_TransferEvent_Filter>;
};


export type RealTokenGoerliQueryTrustedIntermediariesArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_TrustedIntermediary_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_TrustedIntermediary_Filter>;
};


export type RealTokenGoerliQueryTrustedIntermediaryArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryUserIdArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
};


export type RealTokenGoerliQueryUserIdsArgs = {
  block?: InputMaybe<RealTokenGoerli_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_UserId_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenGoerli__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenGoerli_UserId_Filter>;
};

export type RealTokenSepoliaQuery = {
  __typename?: 'RealTokenSepoliaQuery';
  /** Access to subgraph metadata */
  _meta?: Maybe<RealTokenSepolia__Meta_>;
  account?: Maybe<RealTokenSepolia_Account>;
  accountBalance?: Maybe<RealTokenSepolia_AccountBalance>;
  accountBalanceSnapshot?: Maybe<RealTokenSepolia_AccountBalanceSnapshot>;
  accountBalanceSnapshots: Array<RealTokenSepolia_AccountBalanceSnapshot>;
  accountBalances: Array<RealTokenSepolia_AccountBalance>;
  accounts: Array<RealTokenSepolia_Account>;
  allowance?: Maybe<RealTokenSepolia_Allowance>;
  allowances: Array<RealTokenSepolia_Allowance>;
  burnEvent?: Maybe<RealTokenSepolia_BurnEvent>;
  burnEvents: Array<RealTokenSepolia_BurnEvent>;
  mintEvent?: Maybe<RealTokenSepolia_MintEvent>;
  mintEvents: Array<RealTokenSepolia_MintEvent>;
  token?: Maybe<RealTokenSepolia_Token>;
  tokenEvent?: Maybe<RealTokenSepolia_TokenEvent>;
  tokenEvents: Array<RealTokenSepolia_TokenEvent>;
  tokens: Array<RealTokenSepolia_Token>;
  transaction?: Maybe<RealTokenSepolia_Transaction>;
  transactions: Array<RealTokenSepolia_Transaction>;
  transferEvent?: Maybe<RealTokenSepolia_TransferEvent>;
  transferEvents: Array<RealTokenSepolia_TransferEvent>;
  trustedIntermediaries: Array<RealTokenSepolia_TrustedIntermediary>;
  trustedIntermediary?: Maybe<RealTokenSepolia_TrustedIntermediary>;
  userId?: Maybe<RealTokenSepolia_UserId>;
  userIds: Array<RealTokenSepolia_UserId>;
};


export type RealTokenSepoliaQuery_MetaArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
};


export type RealTokenSepoliaQueryAccountArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryAccountBalanceArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryAccountBalanceSnapshotArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryAccountBalanceSnapshotsArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_AccountBalanceSnapshot_Filter>;
};


export type RealTokenSepoliaQueryAccountBalancesArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_AccountBalance_Filter>;
};


export type RealTokenSepoliaQueryAccountsArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_Account_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_Account_Filter>;
};


export type RealTokenSepoliaQueryAllowanceArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryAllowancesArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_Allowance_Filter>;
};


export type RealTokenSepoliaQueryBurnEventArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryBurnEventsArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_BurnEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_BurnEvent_Filter>;
};


export type RealTokenSepoliaQueryMintEventArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryMintEventsArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_MintEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_MintEvent_Filter>;
};


export type RealTokenSepoliaQueryTokenArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryTokenEventArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryTokenEventsArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_TokenEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_TokenEvent_Filter>;
};


export type RealTokenSepoliaQueryTokensArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_Token_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_Token_Filter>;
};


export type RealTokenSepoliaQueryTransactionArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryTransactionsArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_Transaction_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_Transaction_Filter>;
};


export type RealTokenSepoliaQueryTransferEventArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryTransferEventsArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_TransferEvent_Filter>;
};


export type RealTokenSepoliaQueryTrustedIntermediariesArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_TrustedIntermediary_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_TrustedIntermediary_Filter>;
};


export type RealTokenSepoliaQueryTrustedIntermediaryArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryUserIdArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
};


export type RealTokenSepoliaQueryUserIdsArgs = {
  block?: InputMaybe<RealTokenSepolia_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_UserId_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: RealTokenSepolia__SubgraphErrorPolicy_;
  where?: InputMaybe<RealTokenSepolia_UserId_Filter>;
};

export type SignupInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConf: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type YamEthQuery = {
  __typename?: 'YamEthQuery';
  /** Access to subgraph metadata */
  _meta?: Maybe<YamEth__Meta_>;
  account?: Maybe<YamEth_Account>;
  accountBalance?: Maybe<YamEth_AccountBalance>;
  accountBalances: Array<YamEth_AccountBalance>;
  accounts: Array<YamEth_Account>;
  allowance?: Maybe<YamEth_Allowance>;
  allowances: Array<YamEth_Allowance>;
  global?: Maybe<YamEth_Global>;
  globals: Array<YamEth_Global>;
  offer?: Maybe<YamEth_Offer>;
  offerPrice?: Maybe<YamEth_OfferPrice>;
  offerPrices: Array<YamEth_OfferPrice>;
  offers: Array<YamEth_Offer>;
  purchase?: Maybe<YamEth_Purchase>;
  purchases: Array<YamEth_Purchase>;
  token?: Maybe<YamEth_Token>;
  tokens: Array<YamEth_Token>;
};


export type YamEthQuery_MetaArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
};


export type YamEthQueryAccountArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamEth__SubgraphErrorPolicy_;
};


export type YamEthQueryAccountBalanceArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamEth__SubgraphErrorPolicy_;
};


export type YamEthQueryAccountBalancesArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamEth__SubgraphErrorPolicy_;
  where?: InputMaybe<YamEth_AccountBalance_Filter>;
};


export type YamEthQueryAccountsArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Account_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamEth__SubgraphErrorPolicy_;
  where?: InputMaybe<YamEth_Account_Filter>;
};


export type YamEthQueryAllowanceArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamEth__SubgraphErrorPolicy_;
};


export type YamEthQueryAllowancesArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Allowance_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamEth__SubgraphErrorPolicy_;
  where?: InputMaybe<YamEth_Allowance_Filter>;
};


export type YamEthQueryGlobalArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamEth__SubgraphErrorPolicy_;
};


export type YamEthQueryGlobalsArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Global_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamEth__SubgraphErrorPolicy_;
  where?: InputMaybe<YamEth_Global_Filter>;
};


export type YamEthQueryOfferArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamEth__SubgraphErrorPolicy_;
};


export type YamEthQueryOfferPriceArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamEth__SubgraphErrorPolicy_;
};


export type YamEthQueryOfferPricesArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_OfferPrice_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamEth__SubgraphErrorPolicy_;
  where?: InputMaybe<YamEth_OfferPrice_Filter>;
};


export type YamEthQueryOffersArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Offer_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamEth__SubgraphErrorPolicy_;
  where?: InputMaybe<YamEth_Offer_Filter>;
};


export type YamEthQueryPurchaseArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamEth__SubgraphErrorPolicy_;
};


export type YamEthQueryPurchasesArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Purchase_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamEth__SubgraphErrorPolicy_;
  where?: InputMaybe<YamEth_Purchase_Filter>;
};


export type YamEthQueryTokenArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: YamEth__SubgraphErrorPolicy_;
};


export type YamEthQueryTokensArgs = {
  block?: InputMaybe<YamEth_Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Token_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: YamEth__SubgraphErrorPolicy_;
  where?: InputMaybe<YamEth_Token_Filter>;
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

export type BridgeGoerli_AdminFix = {
  __typename?: 'bridgeGoerli_AdminFix';
  block: Scalars['bridgeGoerli_BigInt']['output'];
  from: Scalars['bridgeGoerli_Bytes']['output'];
  id: Scalars['ID']['output'];
  messageId: Scalars['bridgeGoerli_Bytes']['output'];
  timestamp: Scalars['bridgeGoerli_BigInt']['output'];
  txHash: Scalars['bridgeGoerli_Bytes']['output'];
};

export type BridgeGoerli_AdminFix_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeGoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeGoerli_AdminFix_Filter>>>;
  block?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  from?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  from_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  messageId?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageId_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeGoerli_AdminFix_Filter>>>;
  timestamp?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  txHash?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
};

export enum BridgeGoerli_AdminFix_OrderBy {
  Block = 'block',
  From = 'from',
  Id = 'id',
  MessageId = 'messageId',
  Timestamp = 'timestamp',
  TxHash = 'txHash'
}

export type BridgeGoerli_BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type BridgeGoerli_Block_Height = {
  hash?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type BridgeGoerli_CollectedSignatureEntity = {
  __typename?: 'bridgeGoerli_CollectedSignatureEntity';
  blockNumber: Scalars['bridgeGoerli_BigInt']['output'];
  id: Scalars['ID']['output'];
  messageData: Scalars['bridgeGoerli_Bytes']['output'];
  messageHash: Scalars['bridgeGoerli_Bytes']['output'];
  messageId: Scalars['bridgeGoerli_Bytes']['output'];
  ready: Scalars['Boolean']['output'];
  signatures: Array<Scalars['bridgeGoerli_Bytes']['output']>;
  txHash: Scalars['bridgeGoerli_Bytes']['output'];
  type: BridgeGoerli_RequestType;
};

export type BridgeGoerli_CollectedSignatureEntity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeGoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeGoerli_CollectedSignatureEntity_Filter>>>;
  blockNumber?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  messageData?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageData_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageData_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageData_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageData_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageData_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageData_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageData_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageData_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageData_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageHash?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageHash_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageId?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageId_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeGoerli_CollectedSignatureEntity_Filter>>>;
  ready?: InputMaybe<Scalars['Boolean']['input']>;
  ready_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  ready_not?: InputMaybe<Scalars['Boolean']['input']>;
  ready_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  signatures?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  signatures_contains?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  signatures_contains_nocase?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  signatures_not?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  signatures_not_contains?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  signatures_not_contains_nocase?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  txHash?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  type?: InputMaybe<BridgeGoerli_RequestType>;
  type_in?: InputMaybe<Array<BridgeGoerli_RequestType>>;
  type_not?: InputMaybe<BridgeGoerli_RequestType>;
  type_not_in?: InputMaybe<Array<BridgeGoerli_RequestType>>;
};

export enum BridgeGoerli_CollectedSignatureEntity_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  MessageData = 'messageData',
  MessageHash = 'messageHash',
  MessageId = 'messageId',
  Ready = 'ready',
  Signatures = 'signatures',
  TxHash = 'txHash',
  Type = 'type'
}

export type BridgeGoerli_Execution = {
  __typename?: 'bridgeGoerli_Execution';
  block: Scalars['bridgeGoerli_BigInt']['output'];
  id: Scalars['ID']['output'];
  messageId: Scalars['bridgeGoerli_Bytes']['output'];
  status: Scalars['Boolean']['output'];
  timestamp: Scalars['bridgeGoerli_BigInt']['output'];
  txHash: Scalars['bridgeGoerli_Bytes']['output'];
};

export type BridgeGoerli_Execution_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeGoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeGoerli_Execution_Filter>>>;
  block?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  messageId?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageId_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeGoerli_Execution_Filter>>>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  status_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  status_not?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  timestamp?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  txHash?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
};

export enum BridgeGoerli_Execution_OrderBy {
  Block = 'block',
  Id = 'id',
  MessageId = 'messageId',
  Status = 'status',
  Timestamp = 'timestamp',
  TxHash = 'txHash'
}

/** Defines the order direction, either ascending or descending */
export enum BridgeGoerli_OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type BridgeGoerli_RequestBridgeToken = {
  __typename?: 'bridgeGoerli_RequestBridgeToken';
  amounts: Array<Scalars['bridgeGoerli_BigInt']['output']>;
  block: Scalars['bridgeGoerli_BigInt']['output'];
  from: Scalars['bridgeGoerli_Bytes']['output'];
  id: Scalars['ID']['output'];
  messageHash: Scalars['bridgeGoerli_Bytes']['output'];
  messageId: Scalars['bridgeGoerli_Bytes']['output'];
  recipient: Scalars['bridgeGoerli_Bytes']['output'];
  requiredSignature: Scalars['bridgeGoerli_BigInt']['output'];
  timestamp: Scalars['bridgeGoerli_BigInt']['output'];
  tokens: Array<BridgeGoerli_Token>;
  tokensOrder: Array<Scalars['bridgeGoerli_Bytes']['output']>;
  txHash: Scalars['bridgeGoerli_Bytes']['output'];
  type: BridgeGoerli_RequestType;
};


export type BridgeGoerli_RequestBridgeTokenTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeGoerli_Token_OrderBy>;
  orderDirection?: InputMaybe<BridgeGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BridgeGoerli_Token_Filter>;
};

export type BridgeGoerli_RequestBridgeToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeGoerli_BlockChangedFilter>;
  amounts?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  amounts_contains?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  amounts_contains_nocase?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  amounts_not?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  amounts_not_contains_nocase?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<BridgeGoerli_RequestBridgeToken_Filter>>>;
  block?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  from?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  from_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  messageHash?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageHash_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageId?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageId_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeGoerli_RequestBridgeToken_Filter>>>;
  recipient?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  recipient_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  recipient_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  recipient_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  recipient_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  recipient_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  recipient_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  requiredSignature?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  requiredSignature_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  tokens?: InputMaybe<Array<Scalars['String']['input']>>;
  tokensOrder?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  tokensOrder_contains?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  tokensOrder_contains_nocase?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  tokensOrder_not?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  tokensOrder_not_contains?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  tokensOrder_not_contains_nocase?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  tokens_?: InputMaybe<BridgeGoerli_Token_Filter>;
  tokens_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_not?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  type?: InputMaybe<BridgeGoerli_RequestType>;
  type_in?: InputMaybe<Array<BridgeGoerli_RequestType>>;
  type_not?: InputMaybe<BridgeGoerli_RequestType>;
  type_not_in?: InputMaybe<Array<BridgeGoerli_RequestType>>;
};

export enum BridgeGoerli_RequestBridgeToken_OrderBy {
  Amounts = 'amounts',
  Block = 'block',
  From = 'from',
  Id = 'id',
  MessageHash = 'messageHash',
  MessageId = 'messageId',
  Recipient = 'recipient',
  RequiredSignature = 'requiredSignature',
  Timestamp = 'timestamp',
  Tokens = 'tokens',
  TokensOrder = 'tokensOrder',
  TxHash = 'txHash',
  Type = 'type'
}

export type BridgeGoerli_RequestFixFail = {
  __typename?: 'bridgeGoerli_RequestFixFail';
  block: Scalars['bridgeGoerli_BigInt']['output'];
  id: Scalars['ID']['output'];
  messageHash: Scalars['bridgeGoerli_Bytes']['output'];
  messageId: Scalars['bridgeGoerli_Bytes']['output'];
  messageIdToFix: Scalars['bridgeGoerli_Bytes']['output'];
  requiredSignature: Scalars['bridgeGoerli_BigInt']['output'];
  timestamp: Scalars['bridgeGoerli_BigInt']['output'];
  txHash: Scalars['bridgeGoerli_Bytes']['output'];
  type: BridgeGoerli_RequestType;
};

export type BridgeGoerli_RequestFixFail_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeGoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeGoerli_RequestFixFail_Filter>>>;
  block?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  messageHash?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageHash_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageHash_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageId?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageIdToFix?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageIdToFix_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageIdToFix_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageIdToFix_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageIdToFix_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageIdToFix_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageIdToFix_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageIdToFix_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageIdToFix_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageIdToFix_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageId_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  messageId_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeGoerli_RequestFixFail_Filter>>>;
  requiredSignature?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  requiredSignature_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  requiredSignature_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  txHash?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  type?: InputMaybe<BridgeGoerli_RequestType>;
  type_in?: InputMaybe<Array<BridgeGoerli_RequestType>>;
  type_not?: InputMaybe<BridgeGoerli_RequestType>;
  type_not_in?: InputMaybe<Array<BridgeGoerli_RequestType>>;
};

export enum BridgeGoerli_RequestFixFail_OrderBy {
  Block = 'block',
  Id = 'id',
  MessageHash = 'messageHash',
  MessageId = 'messageId',
  MessageIdToFix = 'messageIdToFix',
  RequiredSignature = 'requiredSignature',
  Timestamp = 'timestamp',
  TxHash = 'txHash',
  Type = 'type'
}

export enum BridgeGoerli_RequestType {
  BuyBack = 'BuyBack',
  FixFailedMsg = 'FixFailedMsg',
  PropertyVault = 'PropertyVault',
  Simple = 'Simple'
}

export type BridgeGoerli_RequiredSignature = {
  __typename?: 'bridgeGoerli_RequiredSignature';
  amount: Scalars['bridgeGoerli_BigInt']['output'];
  id: Scalars['ID']['output'];
};

export type BridgeGoerli_RequiredSignature_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeGoerli_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<BridgeGoerli_RequiredSignature_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeGoerli_RequiredSignature_Filter>>>;
};

export enum BridgeGoerli_RequiredSignature_OrderBy {
  Amount = 'amount',
  Id = 'id'
}

export type BridgeGoerli_Token = {
  __typename?: 'bridgeGoerli_Token';
  bridgedVolume: Scalars['bridgeGoerli_BigInt']['output'];
  id: Scalars['ID']['output'];
  localAddress: Scalars['bridgeGoerli_Bytes']['output'];
  remoteAddress: Scalars['bridgeGoerli_Bytes']['output'];
};

export type BridgeGoerli_Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeGoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeGoerli_Token_Filter>>>;
  bridgedVolume?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  bridgedVolume_gt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  bridgedVolume_gte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  bridgedVolume_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  bridgedVolume_lt?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  bridgedVolume_lte?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  bridgedVolume_not?: InputMaybe<Scalars['bridgeGoerli_BigInt']['input']>;
  bridgedVolume_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  localAddress?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  localAddress_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  localAddress_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  localAddress_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  localAddress_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  localAddress_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  localAddress_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  localAddress_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  localAddress_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  localAddress_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeGoerli_Token_Filter>>>;
  remoteAddress?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  remoteAddress_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  remoteAddress_gt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  remoteAddress_gte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  remoteAddress_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
  remoteAddress_lt?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  remoteAddress_lte?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  remoteAddress_not?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  remoteAddress_not_contains?: InputMaybe<Scalars['bridgeGoerli_Bytes']['input']>;
  remoteAddress_not_in?: InputMaybe<Array<Scalars['bridgeGoerli_Bytes']['input']>>;
};

export enum BridgeGoerli_Token_OrderBy {
  BridgedVolume = 'bridgedVolume',
  Id = 'id',
  LocalAddress = 'localAddress',
  RemoteAddress = 'remoteAddress'
}

export type BridgeGoerli__Block_ = {
  __typename?: 'bridgeGoerli__Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['bridgeGoerli_Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type BridgeGoerli__Meta_ = {
  __typename?: 'bridgeGoerli__Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: BridgeGoerli__Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum BridgeGoerli__SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type BridgeSepolia_AdminFix = {
  __typename?: 'bridgeSepolia_AdminFix';
  block: Scalars['bridgeSepolia_BigInt']['output'];
  from: Scalars['bridgeSepolia_Bytes']['output'];
  id: Scalars['ID']['output'];
  messageId: Scalars['bridgeSepolia_Bytes']['output'];
  timestamp: Scalars['bridgeSepolia_BigInt']['output'];
  txHash: Scalars['bridgeSepolia_Bytes']['output'];
};

export type BridgeSepolia_AdminFix_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeSepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeSepolia_AdminFix_Filter>>>;
  block?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  from?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  from_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  messageId?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageId_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeSepolia_AdminFix_Filter>>>;
  timestamp?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  txHash?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
};

export enum BridgeSepolia_AdminFix_OrderBy {
  Block = 'block',
  From = 'from',
  Id = 'id',
  MessageId = 'messageId',
  Timestamp = 'timestamp',
  TxHash = 'txHash'
}

export type BridgeSepolia_BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type BridgeSepolia_Block_Height = {
  hash?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type BridgeSepolia_CollectedSignatureEntity = {
  __typename?: 'bridgeSepolia_CollectedSignatureEntity';
  blockNumber: Scalars['bridgeSepolia_BigInt']['output'];
  id: Scalars['ID']['output'];
  messageData: Scalars['bridgeSepolia_Bytes']['output'];
  messageHash: Scalars['bridgeSepolia_Bytes']['output'];
  messageId: Scalars['bridgeSepolia_Bytes']['output'];
  ready: Scalars['Boolean']['output'];
  signatures: Array<Scalars['bridgeSepolia_Bytes']['output']>;
  txHash: Scalars['bridgeSepolia_Bytes']['output'];
  type: BridgeSepolia_RequestType;
};

export type BridgeSepolia_CollectedSignatureEntity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeSepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeSepolia_CollectedSignatureEntity_Filter>>>;
  blockNumber?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  messageData?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageData_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageData_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageData_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageData_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageData_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageData_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageData_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageData_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageData_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageHash?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageHash_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageId?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageId_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeSepolia_CollectedSignatureEntity_Filter>>>;
  ready?: InputMaybe<Scalars['Boolean']['input']>;
  ready_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  ready_not?: InputMaybe<Scalars['Boolean']['input']>;
  ready_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  signatures?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  signatures_contains?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  signatures_contains_nocase?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  signatures_not?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  signatures_not_contains?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  signatures_not_contains_nocase?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  txHash?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  type?: InputMaybe<BridgeSepolia_RequestType>;
  type_in?: InputMaybe<Array<BridgeSepolia_RequestType>>;
  type_not?: InputMaybe<BridgeSepolia_RequestType>;
  type_not_in?: InputMaybe<Array<BridgeSepolia_RequestType>>;
};

export enum BridgeSepolia_CollectedSignatureEntity_OrderBy {
  BlockNumber = 'blockNumber',
  Id = 'id',
  MessageData = 'messageData',
  MessageHash = 'messageHash',
  MessageId = 'messageId',
  Ready = 'ready',
  Signatures = 'signatures',
  TxHash = 'txHash',
  Type = 'type'
}

export type BridgeSepolia_Execution = {
  __typename?: 'bridgeSepolia_Execution';
  block: Scalars['bridgeSepolia_BigInt']['output'];
  id: Scalars['ID']['output'];
  messageId: Scalars['bridgeSepolia_Bytes']['output'];
  status: Scalars['Boolean']['output'];
  timestamp: Scalars['bridgeSepolia_BigInt']['output'];
  txHash: Scalars['bridgeSepolia_Bytes']['output'];
};

export type BridgeSepolia_Execution_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeSepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeSepolia_Execution_Filter>>>;
  block?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  messageId?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageId_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeSepolia_Execution_Filter>>>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  status_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  status_not?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  timestamp?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  txHash?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
};

export enum BridgeSepolia_Execution_OrderBy {
  Block = 'block',
  Id = 'id',
  MessageId = 'messageId',
  Status = 'status',
  Timestamp = 'timestamp',
  TxHash = 'txHash'
}

/** Defines the order direction, either ascending or descending */
export enum BridgeSepolia_OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type BridgeSepolia_RequestBridgeToken = {
  __typename?: 'bridgeSepolia_RequestBridgeToken';
  amounts: Array<Scalars['bridgeSepolia_BigInt']['output']>;
  block: Scalars['bridgeSepolia_BigInt']['output'];
  from: Scalars['bridgeSepolia_Bytes']['output'];
  id: Scalars['ID']['output'];
  messageHash: Scalars['bridgeSepolia_Bytes']['output'];
  messageId: Scalars['bridgeSepolia_Bytes']['output'];
  recipient: Scalars['bridgeSepolia_Bytes']['output'];
  requiredSignature: Scalars['bridgeSepolia_BigInt']['output'];
  timestamp: Scalars['bridgeSepolia_BigInt']['output'];
  tokens: Array<BridgeSepolia_Token>;
  tokensOrder: Array<Scalars['bridgeSepolia_Bytes']['output']>;
  txHash: Scalars['bridgeSepolia_Bytes']['output'];
  type: BridgeSepolia_RequestType;
};


export type BridgeSepolia_RequestBridgeTokenTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BridgeSepolia_Token_OrderBy>;
  orderDirection?: InputMaybe<BridgeSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BridgeSepolia_Token_Filter>;
};

export type BridgeSepolia_RequestBridgeToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeSepolia_BlockChangedFilter>;
  amounts?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  amounts_contains?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  amounts_contains_nocase?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  amounts_not?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  amounts_not_contains_nocase?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<BridgeSepolia_RequestBridgeToken_Filter>>>;
  block?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  from?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  from_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  messageHash?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageHash_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageId?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageId_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeSepolia_RequestBridgeToken_Filter>>>;
  recipient?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  recipient_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  recipient_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  recipient_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  recipient_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  recipient_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  recipient_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  requiredSignature?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  requiredSignature_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  tokens?: InputMaybe<Array<Scalars['String']['input']>>;
  tokensOrder?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  tokensOrder_contains?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  tokensOrder_contains_nocase?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  tokensOrder_not?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  tokensOrder_not_contains?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  tokensOrder_not_contains_nocase?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  tokens_?: InputMaybe<BridgeSepolia_Token_Filter>;
  tokens_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_not?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  type?: InputMaybe<BridgeSepolia_RequestType>;
  type_in?: InputMaybe<Array<BridgeSepolia_RequestType>>;
  type_not?: InputMaybe<BridgeSepolia_RequestType>;
  type_not_in?: InputMaybe<Array<BridgeSepolia_RequestType>>;
};

export enum BridgeSepolia_RequestBridgeToken_OrderBy {
  Amounts = 'amounts',
  Block = 'block',
  From = 'from',
  Id = 'id',
  MessageHash = 'messageHash',
  MessageId = 'messageId',
  Recipient = 'recipient',
  RequiredSignature = 'requiredSignature',
  Timestamp = 'timestamp',
  Tokens = 'tokens',
  TokensOrder = 'tokensOrder',
  TxHash = 'txHash',
  Type = 'type'
}

export type BridgeSepolia_RequestFixFail = {
  __typename?: 'bridgeSepolia_RequestFixFail';
  block: Scalars['bridgeSepolia_BigInt']['output'];
  id: Scalars['ID']['output'];
  messageHash: Scalars['bridgeSepolia_Bytes']['output'];
  messageId: Scalars['bridgeSepolia_Bytes']['output'];
  messageIdToFix: Scalars['bridgeSepolia_Bytes']['output'];
  requiredSignature: Scalars['bridgeSepolia_BigInt']['output'];
  timestamp: Scalars['bridgeSepolia_BigInt']['output'];
  txHash: Scalars['bridgeSepolia_Bytes']['output'];
  type: BridgeSepolia_RequestType;
};

export type BridgeSepolia_RequestFixFail_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeSepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeSepolia_RequestFixFail_Filter>>>;
  block?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  messageHash?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageHash_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageHash_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageId?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageIdToFix?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageIdToFix_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageIdToFix_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageIdToFix_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageIdToFix_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageIdToFix_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageIdToFix_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageIdToFix_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageIdToFix_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageIdToFix_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageId_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  messageId_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeSepolia_RequestFixFail_Filter>>>;
  requiredSignature?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  requiredSignature_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  requiredSignature_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  txHash?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  txHash_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  type?: InputMaybe<BridgeSepolia_RequestType>;
  type_in?: InputMaybe<Array<BridgeSepolia_RequestType>>;
  type_not?: InputMaybe<BridgeSepolia_RequestType>;
  type_not_in?: InputMaybe<Array<BridgeSepolia_RequestType>>;
};

export enum BridgeSepolia_RequestFixFail_OrderBy {
  Block = 'block',
  Id = 'id',
  MessageHash = 'messageHash',
  MessageId = 'messageId',
  MessageIdToFix = 'messageIdToFix',
  RequiredSignature = 'requiredSignature',
  Timestamp = 'timestamp',
  TxHash = 'txHash',
  Type = 'type'
}

export enum BridgeSepolia_RequestType {
  BuyBack = 'BuyBack',
  FixFailedMsg = 'FixFailedMsg',
  PropertyVault = 'PropertyVault',
  Simple = 'Simple'
}

export type BridgeSepolia_RequiredSignature = {
  __typename?: 'bridgeSepolia_RequiredSignature';
  amount: Scalars['bridgeSepolia_BigInt']['output'];
  id: Scalars['ID']['output'];
};

export type BridgeSepolia_RequiredSignature_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeSepolia_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<BridgeSepolia_RequiredSignature_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeSepolia_RequiredSignature_Filter>>>;
};

export enum BridgeSepolia_RequiredSignature_OrderBy {
  Amount = 'amount',
  Id = 'id'
}

export type BridgeSepolia_Token = {
  __typename?: 'bridgeSepolia_Token';
  bridgedVolume: Scalars['bridgeSepolia_BigInt']['output'];
  id: Scalars['ID']['output'];
  localAddress: Scalars['bridgeSepolia_Bytes']['output'];
  remoteAddress: Scalars['bridgeSepolia_Bytes']['output'];
};

export type BridgeSepolia_Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BridgeSepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BridgeSepolia_Token_Filter>>>;
  bridgedVolume?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  bridgedVolume_gt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  bridgedVolume_gte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  bridgedVolume_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  bridgedVolume_lt?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  bridgedVolume_lte?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  bridgedVolume_not?: InputMaybe<Scalars['bridgeSepolia_BigInt']['input']>;
  bridgedVolume_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  localAddress?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  localAddress_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  localAddress_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  localAddress_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  localAddress_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  localAddress_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  localAddress_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  localAddress_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  localAddress_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  localAddress_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BridgeSepolia_Token_Filter>>>;
  remoteAddress?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  remoteAddress_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  remoteAddress_gt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  remoteAddress_gte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  remoteAddress_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
  remoteAddress_lt?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  remoteAddress_lte?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  remoteAddress_not?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  remoteAddress_not_contains?: InputMaybe<Scalars['bridgeSepolia_Bytes']['input']>;
  remoteAddress_not_in?: InputMaybe<Array<Scalars['bridgeSepolia_Bytes']['input']>>;
};

export enum BridgeSepolia_Token_OrderBy {
  BridgedVolume = 'bridgedVolume',
  Id = 'id',
  LocalAddress = 'localAddress',
  RemoteAddress = 'remoteAddress'
}

export type BridgeSepolia__Block_ = {
  __typename?: 'bridgeSepolia__Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['bridgeSepolia_Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type BridgeSepolia__Meta_ = {
  __typename?: 'bridgeSepolia__Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: BridgeSepolia__Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum BridgeSepolia__SubgraphErrorPolicy_ {
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

export type RealTokenGoerli_Account = {
  __typename?: 'realTokenGoerli_Account';
  /**  Account address  */
  address: Scalars['realTokenGoerli_Bytes']['output'];
  /**  Allowances for Account  */
  allowances: Array<RealTokenGoerli_Allowance>;
  /**  Token balances  */
  balances: Array<RealTokenGoerli_AccountBalance>;
  /**  Token balances history  */
  balancesHistory: Array<RealTokenGoerli_AccountBalanceSnapshot>;
  /**  Equals to: <accountAddress> */
  id: Scalars['ID']['output'];
  userIds: Array<RealTokenGoerli_UserId>;
};


export type RealTokenGoerli_AccountAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_Allowance_Filter>;
};


export type RealTokenGoerli_AccountBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_AccountBalance_Filter>;
};


export type RealTokenGoerli_AccountBalancesHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_AccountBalanceSnapshot_Filter>;
};


export type RealTokenGoerli_AccountUserIdsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_UserId_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_UserId_Filter>;
};

export type RealTokenGoerli_AccountBalance = {
  __typename?: 'realTokenGoerli_AccountBalance';
  /**  Account address  */
  account: RealTokenGoerli_Account;
  /**  Allowances for AccountBalance  */
  allowances: Array<RealTokenGoerli_Allowance>;
  /**  Current account balance  */
  amount: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  Block number in which the balance was last modified  */
  block: Scalars['realTokenGoerli_BigInt']['output'];
  history: Array<RealTokenGoerli_AccountBalanceSnapshot>;
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID']['output'];
  /**  Last modified timestamp in seconds  */
  modified: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Token address  */
  token: RealTokenGoerli_Token;
  /**  Hash of the last transaction that modified the balance  */
  transaction: RealTokenGoerli_Transaction;
};


export type RealTokenGoerli_AccountBalanceAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_Allowance_Filter>;
};


export type RealTokenGoerli_AccountBalanceHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_AccountBalanceSnapshot_Filter>;
};

export type RealTokenGoerli_AccountBalanceSnapshot = {
  __typename?: 'realTokenGoerli_AccountBalanceSnapshot';
  /**  Account address  */
  account: RealTokenGoerli_Account;
  /**  Account balance  */
  accountBalance: RealTokenGoerli_AccountBalance;
  /**  Account balance  */
  amount: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenGoerli_BigInt']['output'];
  event: RealTokenGoerli_TransferEvent;
  /**  Equals to: <accountAddress>-<tokenAddress>-<timestamp> */
  id: Scalars['ID']['output'];
  /**  Timestamp in seconds  */
  timestamp: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Token addess  */
  token: RealTokenGoerli_Token;
  /**  Transaction hash  */
  transaction: RealTokenGoerli_Transaction;
};

export type RealTokenGoerli_AccountBalanceSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  accountBalance?: InputMaybe<Scalars['String']['input']>;
  accountBalance_?: InputMaybe<RealTokenGoerli_AccountBalance_Filter>;
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
  account_?: InputMaybe<RealTokenGoerli_Account_Filter>;
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
  amount?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_AccountBalanceSnapshot_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  event?: InputMaybe<Scalars['String']['input']>;
  event_?: InputMaybe<RealTokenGoerli_TransferEvent_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_AccountBalanceSnapshot_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGoerli_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenGoerli_Transaction_Filter>;
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

export enum RealTokenGoerli_AccountBalanceSnapshot_OrderBy {
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
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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

export type RealTokenGoerli_AccountBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<RealTokenGoerli_Account_Filter>;
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
  allowances_?: InputMaybe<RealTokenGoerli_Allowance_Filter>;
  amount?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_AccountBalance_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  history_?: InputMaybe<RealTokenGoerli_AccountBalanceSnapshot_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  modified?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  modified_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  modified_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  modified_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  modified_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  modified_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  modified_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  modified_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_AccountBalance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGoerli_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenGoerli_Transaction_Filter>;
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

export enum RealTokenGoerli_AccountBalance_OrderBy {
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
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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

export type RealTokenGoerli_Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  allowances_?: InputMaybe<RealTokenGoerli_Allowance_Filter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_Account_Filter>>>;
  balancesHistory_?: InputMaybe<RealTokenGoerli_AccountBalanceSnapshot_Filter>;
  balances_?: InputMaybe<RealTokenGoerli_AccountBalance_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_Account_Filter>>>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_?: InputMaybe<RealTokenGoerli_UserId_Filter>;
  userIds_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum RealTokenGoerli_Account_OrderBy {
  Address = 'address',
  Allowances = 'allowances',
  Balances = 'balances',
  BalancesHistory = 'balancesHistory',
  Id = 'id',
  UserIds = 'userIds'
}

export type RealTokenGoerli_Allowance = {
  __typename?: 'realTokenGoerli_Allowance';
  /**  Account address  */
  account: RealTokenGoerli_Account;
  /**  Current allowance  */
  allowance: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  Account balance  */
  balance: RealTokenGoerli_AccountBalance;
  /**  Equals to: <accountAddress>-<tokenAddress>-<spenderAddress> */
  id: Scalars['ID']['output'];
  /**  Spender address  */
  spender: RealTokenGoerli_Account;
  /**  Token address  */
  token: RealTokenGoerli_Token;
};

export type RealTokenGoerli_Allowance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<RealTokenGoerli_Account_Filter>;
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
  allowance?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  allowance_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  allowance_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  allowance_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  allowance_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  allowance_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  allowance_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  allowance_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_Allowance_Filter>>>;
  balance?: InputMaybe<Scalars['String']['input']>;
  balance_?: InputMaybe<RealTokenGoerli_AccountBalance_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_Allowance_Filter>>>;
  spender?: InputMaybe<Scalars['String']['input']>;
  spender_?: InputMaybe<RealTokenGoerli_Account_Filter>;
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
  token_?: InputMaybe<RealTokenGoerli_Token_Filter>;
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

export enum RealTokenGoerli_Allowance_OrderBy {
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
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount'
}

export type RealTokenGoerli_BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type RealTokenGoerli_Block_Height = {
  hash?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type RealTokenGoerli_BurnEvent = RealTokenGoerli_TokenEvent & {
  __typename?: 'realTokenGoerli_BurnEvent';
  /**  Quantity of tokens burned  */
  amount: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Address of burned account  */
  burner: Scalars['realTokenGoerli_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenGoerli_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Token address  */
  token: RealTokenGoerli_Token;
  /**  Transaction hash  */
  transaction: RealTokenGoerli_Transaction;
};

export type RealTokenGoerli_BurnEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_BurnEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  burner?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  burner_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  burner_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  burner_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  burner_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  burner_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  burner_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  burner_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  burner_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  burner_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_BurnEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGoerli_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenGoerli_Transaction_Filter>;
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

export enum RealTokenGoerli_BurnEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Burner = 'burner',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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

export type RealTokenGoerli_MintEvent = RealTokenGoerli_TokenEvent & {
  __typename?: 'realTokenGoerli_MintEvent';
  /**  Quantity of tokens minted  */
  amount: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Address of destination account  */
  destination: Scalars['realTokenGoerli_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenGoerli_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Token address  */
  token: RealTokenGoerli_Token;
  /**  Transaction hash  */
  transaction: RealTokenGoerli_Transaction;
};

export type RealTokenGoerli_MintEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_MintEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  destination?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_MintEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGoerli_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenGoerli_Transaction_Filter>;
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

export enum RealTokenGoerli_MintEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Destination = 'destination',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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
export enum RealTokenGoerli_OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type RealTokenGoerli_Token = {
  __typename?: 'realTokenGoerli_Token';
  /**  Token address  */
  address: Scalars['realTokenGoerli_Bytes']['output'];
  /**  Total number of approval events  */
  approveEventCount: Scalars['realTokenGoerli_BigInt']['output'];
  /**  List of approval  */
  approves: Array<RealTokenGoerli_Allowance>;
  /**  If token is bridgeable  */
  bridgeable: Scalars['Boolean']['output'];
  /**  Total number of burn events  */
  burnEventCount: Scalars['realTokenGoerli_BigInt']['output'];
  /**  List of burn events  */
  burnEvents: Array<RealTokenGoerli_BurnEvent>;
  /**  Number of decimals the token uses  */
  decimals: Scalars['Int']['output'];
  /**  Total number of events (all types) */
  eventCount: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Human-readable fullname of the token  */
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /**  Total number of mint events  */
  mintEventCount: Scalars['realTokenGoerli_BigInt']['output'];
  /**  List of mint events  */
  mintEvents: Array<RealTokenGoerli_MintEvent>;
  /**  Trusted intermediaries order  */
  order: Array<Scalars['String']['output']>;
  /**  Bridge remote address  */
  remoteAddress?: Maybe<Scalars['realTokenGoerli_Bytes']['output']>;
  /**  Symbol of the token  */
  symbol: Scalars['String']['output'];
  /**  registry token id */
  tokenId: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Total token burned  */
  totalBurned: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  Total token minted  */
  totalMinted: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  Total token supply  */
  totalSupply: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  Total token transferred  */
  totalTransferred: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  List of transactions  */
  transactions: Array<RealTokenGoerli_Transaction>;
  /**  Total number of transfer events  */
  transferEventCount: Scalars['realTokenGoerli_BigInt']['output'];
  /**  List of token events  */
  transferEvents: Array<RealTokenGoerli_TransferEvent>;
  /**  Trusted intermediaries list  */
  trustedIntermediaries: Array<RealTokenGoerli_TrustedIntermediary>;
};


export type RealTokenGoerli_TokenApprovesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_Allowance_Filter>;
};


export type RealTokenGoerli_TokenBurnEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_BurnEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_BurnEvent_Filter>;
};


export type RealTokenGoerli_TokenMintEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_MintEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_MintEvent_Filter>;
};


export type RealTokenGoerli_TokenTransactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_Transaction_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_Transaction_Filter>;
};


export type RealTokenGoerli_TokenTransferEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_TransferEvent_Filter>;
};


export type RealTokenGoerli_TokenTrustedIntermediariesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_TrustedIntermediary_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_TrustedIntermediary_Filter>;
};

export type RealTokenGoerli_TokenEvent = {
  /**  Quantity of tokens  */
  amount: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenGoerli_BigInt']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenGoerli_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Token address  */
  token: RealTokenGoerli_Token;
  /**  Transaction hash  */
  transaction: RealTokenGoerli_Transaction;
};

export type RealTokenGoerli_TokenEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_TokenEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_TokenEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGoerli_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenGoerli_Transaction_Filter>;
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

export enum RealTokenGoerli_TokenEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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

export type RealTokenGoerli_Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_Token_Filter>>>;
  approveEventCount?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  approveEventCount_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  approveEventCount_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  approveEventCount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  approveEventCount_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  approveEventCount_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  approveEventCount_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  approveEventCount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  approves_?: InputMaybe<RealTokenGoerli_Allowance_Filter>;
  bridgeable?: InputMaybe<Scalars['Boolean']['input']>;
  bridgeable_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  bridgeable_not?: InputMaybe<Scalars['Boolean']['input']>;
  bridgeable_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  burnEventCount?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  burnEventCount_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  burnEventCount_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  burnEventCount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  burnEventCount_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  burnEventCount_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  burnEventCount_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  burnEventCount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  burnEvents_?: InputMaybe<RealTokenGoerli_BurnEvent_Filter>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  eventCount?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  eventCount_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  eventCount_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  eventCount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  eventCount_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  eventCount_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  eventCount_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  eventCount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
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
  mintEventCount?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  mintEventCount_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  mintEventCount_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  mintEventCount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  mintEventCount_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  mintEventCount_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  mintEventCount_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  mintEventCount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  mintEvents_?: InputMaybe<RealTokenGoerli_MintEvent_Filter>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_Token_Filter>>>;
  order?: InputMaybe<Array<Scalars['String']['input']>>;
  order_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  order_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  remoteAddress?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  remoteAddress_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  remoteAddress_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  remoteAddress_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  remoteAddress_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  remoteAddress_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  remoteAddress_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  remoteAddress_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  remoteAddress_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  remoteAddress_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
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
  tokenId?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  totalBurned?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalBurned_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalBurned_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalBurned_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  totalBurned_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalBurned_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalBurned_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalBurned_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  totalMinted?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalMinted_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalMinted_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalMinted_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  totalMinted_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalMinted_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalMinted_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalMinted_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  totalTransferred?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalTransferred_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalTransferred_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalTransferred_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  totalTransferred_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalTransferred_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalTransferred_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  totalTransferred_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  transactions?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_?: InputMaybe<RealTokenGoerli_Transaction_Filter>;
  transactions_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  transferEventCount?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  transferEventCount_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  transferEventCount_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  transferEventCount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  transferEventCount_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  transferEventCount_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  transferEventCount_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  transferEventCount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  transferEvents_?: InputMaybe<RealTokenGoerli_TransferEvent_Filter>;
  trustedIntermediaries?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_?: InputMaybe<RealTokenGoerli_TrustedIntermediary_Filter>;
  trustedIntermediaries_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum RealTokenGoerli_Token_OrderBy {
  Address = 'address',
  ApproveEventCount = 'approveEventCount',
  Approves = 'approves',
  Bridgeable = 'bridgeable',
  BurnEventCount = 'burnEventCount',
  BurnEvents = 'burnEvents',
  Decimals = 'decimals',
  EventCount = 'eventCount',
  FullName = 'fullName',
  Id = 'id',
  MintEventCount = 'mintEventCount',
  MintEvents = 'mintEvents',
  Order = 'order',
  RemoteAddress = 'remoteAddress',
  Symbol = 'symbol',
  TokenId = 'tokenId',
  TotalBurned = 'totalBurned',
  TotalMinted = 'totalMinted',
  TotalSupply = 'totalSupply',
  TotalTransferred = 'totalTransferred',
  Transactions = 'transactions',
  TransferEventCount = 'transferEventCount',
  TransferEvents = 'transferEvents',
  TrustedIntermediaries = 'trustedIntermediaries'
}

export type RealTokenGoerli_Transaction = {
  __typename?: 'realTokenGoerli_Transaction';
  /**  Block number  */
  block: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Transaction cumulative gas used  */
  cumulativeGasUsed?: Maybe<Scalars['realTokenGoerli_BigInt']['output']>;
  /**  Transaction gas limit  */
  gasLimit: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Transaction gas price  */
  gasPrice: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Transaction gas used  */
  gasUsed?: Maybe<Scalars['realTokenGoerli_BigInt']['output']>;
  /**  Transaction hash  */
  id: Scalars['ID']['output'];
  /**  Input  */
  input: Scalars['realTokenGoerli_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Interacted With (To)   */
  to?: Maybe<Scalars['realTokenGoerli_Bytes']['output']>;
  /**  List of transfer events  */
  transferEvents: Array<RealTokenGoerli_TransferEvent>;
  /**  Value  */
  value: Scalars['realTokenGoerli_BigInt']['output'];
};


export type RealTokenGoerli_TransactionTransferEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenGoerli_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenGoerli_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenGoerli_TransferEvent_Filter>;
};

export type RealTokenGoerli_Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_Transaction_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  cumulativeGasUsed?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  cumulativeGasUsed_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  cumulativeGasUsed_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  cumulativeGasUsed_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  cumulativeGasUsed_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  cumulativeGasUsed_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  cumulativeGasUsed_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  cumulativeGasUsed_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  gasLimit?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasLimit_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasLimit_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasLimit_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  gasLimit_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasLimit_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasLimit_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  gasPrice?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  input?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  input_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  input_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  input_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  input_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  input_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  input_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  input_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  input_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  input_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_Transaction_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  to?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  to_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  transferEvents_?: InputMaybe<RealTokenGoerli_TransferEvent_Filter>;
  value?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  value_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
};

export enum RealTokenGoerli_Transaction_OrderBy {
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

export type RealTokenGoerli_TransferEvent = RealTokenGoerli_TokenEvent & {
  __typename?: 'realTokenGoerli_TransferEvent';
  /**  Quantity of tokens transferred  */
  amount: Scalars['realTokenGoerli_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Address of destination account  */
  destination: Scalars['realTokenGoerli_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenGoerli_Bytes']['output'];
  /**  Address of source account  */
  source: Scalars['realTokenGoerli_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Token address  */
  token: RealTokenGoerli_Token;
  /**  Transaction hash  */
  transaction: RealTokenGoerli_Transaction;
};

export type RealTokenGoerli_TransferEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenGoerli_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_TransferEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  destination?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_TransferEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  source?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  source_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  source_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  source_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  source_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  source_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  source_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  source_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  source_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  source_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenGoerli_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenGoerli_Transaction_Filter>;
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

export enum RealTokenGoerli_TransferEvent_OrderBy {
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
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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

export type RealTokenGoerli_TrustedIntermediary = {
  __typename?: 'realTokenGoerli_TrustedIntermediary';
  /**  trusted intermedidary address  */
  address: Scalars['realTokenGoerli_Bytes']['output'];
  /**  Equals to: <trustedAddress> */
  id: Scalars['ID']['output'];
  /**  weight  */
  weight: Scalars['realTokenGoerli_BigInt']['output'];
};

export type RealTokenGoerli_TrustedIntermediary_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenGoerli_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_TrustedIntermediary_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_TrustedIntermediary_Filter>>>;
  weight?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  weight_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  weight_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  weight_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  weight_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  weight_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  weight_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  weight_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
};

export enum RealTokenGoerli_TrustedIntermediary_OrderBy {
  Address = 'address',
  Id = 'id',
  Weight = 'weight'
}

export type RealTokenGoerli_UserId = {
  __typename?: 'realTokenGoerli_UserId';
  /**  Compliance registry attributeKeys  */
  attributeKeys: Array<Scalars['realTokenGoerli_BigInt']['output']>;
  /**  Compliance registry attributeValues  */
  attributeValues: Array<Scalars['realTokenGoerli_BigInt']['output']>;
  /**  Last block update  */
  block: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Equals to: <trustedAddress-userId> */
  id: Scalars['ID']['output'];
  /**  Last timestamp update  */
  timestamp: Scalars['realTokenGoerli_BigInt']['output'];
  /**  Trusted intermediary  */
  trustedIntermediary: RealTokenGoerli_TrustedIntermediary;
  /**  Compliance registry userId  */
  userId: Scalars['realTokenGoerli_BigInt']['output'];
};

export type RealTokenGoerli_UserId_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenGoerli_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenGoerli_UserId_Filter>>>;
  attributeKeys?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeKeys_contains?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeKeys_contains_nocase?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeKeys_not?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeKeys_not_contains?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeKeys_not_contains_nocase?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeValues?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeValues_contains?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeValues_contains_nocase?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeValues_not?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeValues_not_contains?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  attributeValues_not_contains_nocase?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  block?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenGoerli_UserId_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  trustedIntermediary?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_?: InputMaybe<RealTokenGoerli_TrustedIntermediary_Filter>;
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
  userId?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  userId_gt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  userId_gte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  userId_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
  userId_lt?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  userId_lte?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  userId_not?: InputMaybe<Scalars['realTokenGoerli_BigInt']['input']>;
  userId_not_in?: InputMaybe<Array<Scalars['realTokenGoerli_BigInt']['input']>>;
};

export enum RealTokenGoerli_UserId_OrderBy {
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

export type RealTokenGoerli__Block_ = {
  __typename?: 'realTokenGoerli__Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['realTokenGoerli_Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type RealTokenGoerli__Meta_ = {
  __typename?: 'realTokenGoerli__Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: RealTokenGoerli__Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum RealTokenGoerli__SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type RealTokenSepolia_Account = {
  __typename?: 'realTokenSepolia_Account';
  /**  Account address  */
  address: Scalars['realTokenSepolia_Bytes']['output'];
  /**  Allowances for Account  */
  allowances: Array<RealTokenSepolia_Allowance>;
  /**  Token balances  */
  balances: Array<RealTokenSepolia_AccountBalance>;
  /**  Token balances history  */
  balancesHistory: Array<RealTokenSepolia_AccountBalanceSnapshot>;
  /**  Equals to: <accountAddress> */
  id: Scalars['ID']['output'];
  userIds: Array<RealTokenSepolia_UserId>;
};


export type RealTokenSepolia_AccountAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_Allowance_Filter>;
};


export type RealTokenSepolia_AccountBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_AccountBalance_Filter>;
};


export type RealTokenSepolia_AccountBalancesHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_AccountBalanceSnapshot_Filter>;
};


export type RealTokenSepolia_AccountUserIdsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_UserId_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_UserId_Filter>;
};

export type RealTokenSepolia_AccountBalance = {
  __typename?: 'realTokenSepolia_AccountBalance';
  /**  Account address  */
  account: RealTokenSepolia_Account;
  /**  Allowances for AccountBalance  */
  allowances: Array<RealTokenSepolia_Allowance>;
  /**  Current account balance  */
  amount: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  Block number in which the balance was last modified  */
  block: Scalars['realTokenSepolia_BigInt']['output'];
  history: Array<RealTokenSepolia_AccountBalanceSnapshot>;
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID']['output'];
  /**  Last modified timestamp in seconds  */
  modified: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Token address  */
  token: RealTokenSepolia_Token;
  /**  Hash of the last transaction that modified the balance  */
  transaction: RealTokenSepolia_Transaction;
};


export type RealTokenSepolia_AccountBalanceAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_Allowance_Filter>;
};


export type RealTokenSepolia_AccountBalanceHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_AccountBalanceSnapshot_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_AccountBalanceSnapshot_Filter>;
};

export type RealTokenSepolia_AccountBalanceSnapshot = {
  __typename?: 'realTokenSepolia_AccountBalanceSnapshot';
  /**  Account address  */
  account: RealTokenSepolia_Account;
  /**  Account balance  */
  accountBalance: RealTokenSepolia_AccountBalance;
  /**  Account balance  */
  amount: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenSepolia_BigInt']['output'];
  event: RealTokenSepolia_TransferEvent;
  /**  Equals to: <accountAddress>-<tokenAddress>-<timestamp> */
  id: Scalars['ID']['output'];
  /**  Timestamp in seconds  */
  timestamp: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Token addess  */
  token: RealTokenSepolia_Token;
  /**  Transaction hash  */
  transaction: RealTokenSepolia_Transaction;
};

export type RealTokenSepolia_AccountBalanceSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  accountBalance?: InputMaybe<Scalars['String']['input']>;
  accountBalance_?: InputMaybe<RealTokenSepolia_AccountBalance_Filter>;
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
  account_?: InputMaybe<RealTokenSepolia_Account_Filter>;
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
  amount?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_AccountBalanceSnapshot_Filter>>>;
  block?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  event?: InputMaybe<Scalars['String']['input']>;
  event_?: InputMaybe<RealTokenSepolia_TransferEvent_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_AccountBalanceSnapshot_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenSepolia_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenSepolia_Transaction_Filter>;
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

export enum RealTokenSepolia_AccountBalanceSnapshot_OrderBy {
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
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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

export type RealTokenSepolia_AccountBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<RealTokenSepolia_Account_Filter>;
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
  allowances_?: InputMaybe<RealTokenSepolia_Allowance_Filter>;
  amount?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_AccountBalance_Filter>>>;
  block?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  history_?: InputMaybe<RealTokenSepolia_AccountBalanceSnapshot_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  modified?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  modified_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  modified_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  modified_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  modified_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  modified_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  modified_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  modified_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_AccountBalance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenSepolia_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenSepolia_Transaction_Filter>;
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

export enum RealTokenSepolia_AccountBalance_OrderBy {
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
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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

export type RealTokenSepolia_Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  allowances_?: InputMaybe<RealTokenSepolia_Allowance_Filter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_Account_Filter>>>;
  balancesHistory_?: InputMaybe<RealTokenSepolia_AccountBalanceSnapshot_Filter>;
  balances_?: InputMaybe<RealTokenSepolia_AccountBalance_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_Account_Filter>>>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_?: InputMaybe<RealTokenSepolia_UserId_Filter>;
  userIds_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  userIds_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum RealTokenSepolia_Account_OrderBy {
  Address = 'address',
  Allowances = 'allowances',
  Balances = 'balances',
  BalancesHistory = 'balancesHistory',
  Id = 'id',
  UserIds = 'userIds'
}

export type RealTokenSepolia_Allowance = {
  __typename?: 'realTokenSepolia_Allowance';
  /**  Account address  */
  account: RealTokenSepolia_Account;
  /**  Current allowance  */
  allowance: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  Account balance  */
  balance: RealTokenSepolia_AccountBalance;
  /**  Equals to: <accountAddress>-<tokenAddress>-<spenderAddress> */
  id: Scalars['ID']['output'];
  /**  Spender address  */
  spender: RealTokenSepolia_Account;
  /**  Token address  */
  token: RealTokenSepolia_Token;
};

export type RealTokenSepolia_Allowance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<RealTokenSepolia_Account_Filter>;
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
  allowance?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  allowance_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  allowance_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  allowance_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  allowance_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  allowance_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  allowance_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  allowance_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_Allowance_Filter>>>;
  balance?: InputMaybe<Scalars['String']['input']>;
  balance_?: InputMaybe<RealTokenSepolia_AccountBalance_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_Allowance_Filter>>>;
  spender?: InputMaybe<Scalars['String']['input']>;
  spender_?: InputMaybe<RealTokenSepolia_Account_Filter>;
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
  token_?: InputMaybe<RealTokenSepolia_Token_Filter>;
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

export enum RealTokenSepolia_Allowance_OrderBy {
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
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
  TokenTotalBurned = 'token__totalBurned',
  TokenTotalMinted = 'token__totalMinted',
  TokenTotalSupply = 'token__totalSupply',
  TokenTotalTransferred = 'token__totalTransferred',
  TokenTransferEventCount = 'token__transferEventCount'
}

export type RealTokenSepolia_BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type RealTokenSepolia_Block_Height = {
  hash?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type RealTokenSepolia_BurnEvent = RealTokenSepolia_TokenEvent & {
  __typename?: 'realTokenSepolia_BurnEvent';
  /**  Quantity of tokens burned  */
  amount: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Address of burned account  */
  burner: Scalars['realTokenSepolia_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenSepolia_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Token address  */
  token: RealTokenSepolia_Token;
  /**  Transaction hash  */
  transaction: RealTokenSepolia_Transaction;
};

export type RealTokenSepolia_BurnEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_BurnEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  burner?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  burner_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  burner_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  burner_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  burner_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  burner_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  burner_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  burner_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  burner_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  burner_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_BurnEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenSepolia_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenSepolia_Transaction_Filter>;
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

export enum RealTokenSepolia_BurnEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Burner = 'burner',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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

export type RealTokenSepolia_MintEvent = RealTokenSepolia_TokenEvent & {
  __typename?: 'realTokenSepolia_MintEvent';
  /**  Quantity of tokens minted  */
  amount: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Address of destination account  */
  destination: Scalars['realTokenSepolia_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenSepolia_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Token address  */
  token: RealTokenSepolia_Token;
  /**  Transaction hash  */
  transaction: RealTokenSepolia_Transaction;
};

export type RealTokenSepolia_MintEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_MintEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  destination?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_MintEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenSepolia_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenSepolia_Transaction_Filter>;
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

export enum RealTokenSepolia_MintEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Destination = 'destination',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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
export enum RealTokenSepolia_OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type RealTokenSepolia_Token = {
  __typename?: 'realTokenSepolia_Token';
  /**  Token address  */
  address: Scalars['realTokenSepolia_Bytes']['output'];
  /**  Total number of approval events  */
  approveEventCount: Scalars['realTokenSepolia_BigInt']['output'];
  /**  List of approval  */
  approves: Array<RealTokenSepolia_Allowance>;
  /**  If token is bridgeable  */
  bridgeable: Scalars['Boolean']['output'];
  /**  Total number of burn events  */
  burnEventCount: Scalars['realTokenSepolia_BigInt']['output'];
  /**  List of burn events  */
  burnEvents: Array<RealTokenSepolia_BurnEvent>;
  /**  Number of decimals the token uses  */
  decimals: Scalars['Int']['output'];
  /**  Total number of events (all types) */
  eventCount: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Human-readable fullname of the token  */
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /**  Total number of mint events  */
  mintEventCount: Scalars['realTokenSepolia_BigInt']['output'];
  /**  List of mint events  */
  mintEvents: Array<RealTokenSepolia_MintEvent>;
  /**  Trusted intermediaries order  */
  order: Array<Scalars['String']['output']>;
  /**  Bridge remote address  */
  remoteAddress?: Maybe<Scalars['realTokenSepolia_Bytes']['output']>;
  /**  Symbol of the token  */
  symbol: Scalars['String']['output'];
  /**  registry token id */
  tokenId: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Total token burned  */
  totalBurned: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  Total token minted  */
  totalMinted: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  Total token supply  */
  totalSupply: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  Total token transferred  */
  totalTransferred: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  List of transactions  */
  transactions: Array<RealTokenSepolia_Transaction>;
  /**  Total number of transfer events  */
  transferEventCount: Scalars['realTokenSepolia_BigInt']['output'];
  /**  List of token events  */
  transferEvents: Array<RealTokenSepolia_TransferEvent>;
  /**  Trusted intermediaries list  */
  trustedIntermediaries: Array<RealTokenSepolia_TrustedIntermediary>;
};


export type RealTokenSepolia_TokenApprovesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_Allowance_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_Allowance_Filter>;
};


export type RealTokenSepolia_TokenBurnEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_BurnEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_BurnEvent_Filter>;
};


export type RealTokenSepolia_TokenMintEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_MintEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_MintEvent_Filter>;
};


export type RealTokenSepolia_TokenTransactionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_Transaction_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_Transaction_Filter>;
};


export type RealTokenSepolia_TokenTransferEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_TransferEvent_Filter>;
};


export type RealTokenSepolia_TokenTrustedIntermediariesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_TrustedIntermediary_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_TrustedIntermediary_Filter>;
};

export type RealTokenSepolia_TokenEvent = {
  /**  Quantity of tokens  */
  amount: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenSepolia_BigInt']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenSepolia_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Token address  */
  token: RealTokenSepolia_Token;
  /**  Transaction hash  */
  transaction: RealTokenSepolia_Transaction;
};

export type RealTokenSepolia_TokenEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_TokenEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_TokenEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenSepolia_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenSepolia_Transaction_Filter>;
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

export enum RealTokenSepolia_TokenEvent_OrderBy {
  Amount = 'amount',
  Block = 'block',
  Id = 'id',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenApproveEventCount = 'token__approveEventCount',
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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

export type RealTokenSepolia_Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_Token_Filter>>>;
  approveEventCount?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  approveEventCount_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  approveEventCount_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  approveEventCount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  approveEventCount_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  approveEventCount_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  approveEventCount_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  approveEventCount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  approves_?: InputMaybe<RealTokenSepolia_Allowance_Filter>;
  bridgeable?: InputMaybe<Scalars['Boolean']['input']>;
  bridgeable_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  bridgeable_not?: InputMaybe<Scalars['Boolean']['input']>;
  bridgeable_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  burnEventCount?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  burnEventCount_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  burnEventCount_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  burnEventCount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  burnEventCount_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  burnEventCount_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  burnEventCount_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  burnEventCount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  burnEvents_?: InputMaybe<RealTokenSepolia_BurnEvent_Filter>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  eventCount?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  eventCount_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  eventCount_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  eventCount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  eventCount_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  eventCount_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  eventCount_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  eventCount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
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
  mintEventCount?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  mintEventCount_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  mintEventCount_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  mintEventCount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  mintEventCount_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  mintEventCount_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  mintEventCount_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  mintEventCount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  mintEvents_?: InputMaybe<RealTokenSepolia_MintEvent_Filter>;
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_Token_Filter>>>;
  order?: InputMaybe<Array<Scalars['String']['input']>>;
  order_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  order_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  order_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  remoteAddress?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  remoteAddress_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  remoteAddress_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  remoteAddress_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  remoteAddress_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  remoteAddress_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  remoteAddress_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  remoteAddress_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  remoteAddress_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  remoteAddress_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
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
  tokenId?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  totalBurned?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalBurned_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalBurned_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalBurned_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  totalBurned_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalBurned_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalBurned_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalBurned_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  totalMinted?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalMinted_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalMinted_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalMinted_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  totalMinted_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalMinted_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalMinted_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalMinted_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  totalTransferred?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalTransferred_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalTransferred_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalTransferred_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  totalTransferred_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalTransferred_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalTransferred_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  totalTransferred_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  transactions?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_?: InputMaybe<RealTokenSepolia_Transaction_Filter>;
  transactions_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  transactions_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  transferEventCount?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  transferEventCount_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  transferEventCount_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  transferEventCount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  transferEventCount_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  transferEventCount_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  transferEventCount_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  transferEventCount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  transferEvents_?: InputMaybe<RealTokenSepolia_TransferEvent_Filter>;
  trustedIntermediaries?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_?: InputMaybe<RealTokenSepolia_TrustedIntermediary_Filter>;
  trustedIntermediaries_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  trustedIntermediaries_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum RealTokenSepolia_Token_OrderBy {
  Address = 'address',
  ApproveEventCount = 'approveEventCount',
  Approves = 'approves',
  Bridgeable = 'bridgeable',
  BurnEventCount = 'burnEventCount',
  BurnEvents = 'burnEvents',
  Decimals = 'decimals',
  EventCount = 'eventCount',
  FullName = 'fullName',
  Id = 'id',
  MintEventCount = 'mintEventCount',
  MintEvents = 'mintEvents',
  Order = 'order',
  RemoteAddress = 'remoteAddress',
  Symbol = 'symbol',
  TokenId = 'tokenId',
  TotalBurned = 'totalBurned',
  TotalMinted = 'totalMinted',
  TotalSupply = 'totalSupply',
  TotalTransferred = 'totalTransferred',
  Transactions = 'transactions',
  TransferEventCount = 'transferEventCount',
  TransferEvents = 'transferEvents',
  TrustedIntermediaries = 'trustedIntermediaries'
}

export type RealTokenSepolia_Transaction = {
  __typename?: 'realTokenSepolia_Transaction';
  /**  Block number  */
  block: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Transaction cumulative gas used  */
  cumulativeGasUsed?: Maybe<Scalars['realTokenSepolia_BigInt']['output']>;
  /**  Transaction gas limit  */
  gasLimit: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Transaction gas price  */
  gasPrice: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Transaction gas used  */
  gasUsed?: Maybe<Scalars['realTokenSepolia_BigInt']['output']>;
  /**  Transaction hash  */
  id: Scalars['ID']['output'];
  /**  Input  */
  input: Scalars['realTokenSepolia_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Interacted With (To)   */
  to?: Maybe<Scalars['realTokenSepolia_Bytes']['output']>;
  /**  List of transfer events  */
  transferEvents: Array<RealTokenSepolia_TransferEvent>;
  /**  Value  */
  value: Scalars['realTokenSepolia_BigInt']['output'];
};


export type RealTokenSepolia_TransactionTransferEventsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RealTokenSepolia_TransferEvent_OrderBy>;
  orderDirection?: InputMaybe<RealTokenSepolia_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RealTokenSepolia_TransferEvent_Filter>;
};

export type RealTokenSepolia_Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_Transaction_Filter>>>;
  block?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  cumulativeGasUsed?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  cumulativeGasUsed_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  cumulativeGasUsed_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  cumulativeGasUsed_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  cumulativeGasUsed_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  cumulativeGasUsed_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  cumulativeGasUsed_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  cumulativeGasUsed_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  gasLimit?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasLimit_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasLimit_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasLimit_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  gasLimit_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasLimit_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasLimit_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  gasPrice?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasPrice_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasPrice_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasPrice_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  gasPrice_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasPrice_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasPrice_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  gasUsed?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasUsed_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasUsed_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasUsed_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  gasUsed_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasUsed_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasUsed_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  input?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  input_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  input_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  input_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  input_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  input_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  input_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  input_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  input_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  input_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_Transaction_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  to?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  to_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  to_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  to_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  transferEvents_?: InputMaybe<RealTokenSepolia_TransferEvent_Filter>;
  value?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  value_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
};

export enum RealTokenSepolia_Transaction_OrderBy {
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

export type RealTokenSepolia_TransferEvent = RealTokenSepolia_TokenEvent & {
  __typename?: 'realTokenSepolia_TransferEvent';
  /**  Quantity of tokens transferred  */
  amount: Scalars['realTokenSepolia_BigDecimal']['output'];
  /**  Block number  */
  block: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Address of destination account  */
  destination: Scalars['realTokenSepolia_Bytes']['output'];
  id: Scalars['ID']['output'];
  /**  Transaction sender address  */
  sender: Scalars['realTokenSepolia_Bytes']['output'];
  /**  Address of source account  */
  source: Scalars['realTokenSepolia_Bytes']['output'];
  /**  Event timestamp  */
  timestamp: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Token address  */
  token: RealTokenSepolia_Token;
  /**  Transaction hash  */
  transaction: RealTokenSepolia_Transaction;
};

export type RealTokenSepolia_TransferEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['realTokenSepolia_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_TransferEvent_Filter>>>;
  block?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  destination?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  destination_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  destination_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_TransferEvent_Filter>>>;
  sender?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  source?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  source_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  source_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  source_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  source_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  source_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  source_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  source_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  source_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  source_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  timestamp?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<RealTokenSepolia_Token_Filter>;
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
  transaction_?: InputMaybe<RealTokenSepolia_Transaction_Filter>;
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

export enum RealTokenSepolia_TransferEvent_OrderBy {
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
  TokenBridgeable = 'token__bridgeable',
  TokenBurnEventCount = 'token__burnEventCount',
  TokenDecimals = 'token__decimals',
  TokenEventCount = 'token__eventCount',
  TokenFullName = 'token__fullName',
  TokenId = 'token__id',
  TokenMintEventCount = 'token__mintEventCount',
  TokenRemoteAddress = 'token__remoteAddress',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenId',
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

export type RealTokenSepolia_TrustedIntermediary = {
  __typename?: 'realTokenSepolia_TrustedIntermediary';
  /**  trusted intermedidary address  */
  address: Scalars['realTokenSepolia_Bytes']['output'];
  /**  Equals to: <trustedAddress> */
  id: Scalars['ID']['output'];
  /**  weight  */
  weight: Scalars['realTokenSepolia_BigInt']['output'];
};

export type RealTokenSepolia_TrustedIntermediary_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  address?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['realTokenSepolia_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_TrustedIntermediary_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_TrustedIntermediary_Filter>>>;
  weight?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  weight_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  weight_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  weight_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  weight_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  weight_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  weight_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  weight_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
};

export enum RealTokenSepolia_TrustedIntermediary_OrderBy {
  Address = 'address',
  Id = 'id',
  Weight = 'weight'
}

export type RealTokenSepolia_UserId = {
  __typename?: 'realTokenSepolia_UserId';
  /**  Compliance registry attributeKeys  */
  attributeKeys: Array<Scalars['realTokenSepolia_BigInt']['output']>;
  /**  Compliance registry attributeValues  */
  attributeValues: Array<Scalars['realTokenSepolia_BigInt']['output']>;
  /**  Last block update  */
  block: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Equals to: <trustedAddress-userId> */
  id: Scalars['ID']['output'];
  /**  Last timestamp update  */
  timestamp: Scalars['realTokenSepolia_BigInt']['output'];
  /**  Trusted intermediary  */
  trustedIntermediary: RealTokenSepolia_TrustedIntermediary;
  /**  Compliance registry userId  */
  userId: Scalars['realTokenSepolia_BigInt']['output'];
};

export type RealTokenSepolia_UserId_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<RealTokenSepolia_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RealTokenSepolia_UserId_Filter>>>;
  attributeKeys?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeKeys_contains?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeKeys_contains_nocase?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeKeys_not?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeKeys_not_contains?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeKeys_not_contains_nocase?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeValues?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeValues_contains?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeValues_contains_nocase?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeValues_not?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeValues_not_contains?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  attributeValues_not_contains_nocase?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  block?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  block_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RealTokenSepolia_UserId_Filter>>>;
  timestamp?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  trustedIntermediary?: InputMaybe<Scalars['String']['input']>;
  trustedIntermediary_?: InputMaybe<RealTokenSepolia_TrustedIntermediary_Filter>;
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
  userId?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  userId_gt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  userId_gte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  userId_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
  userId_lt?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  userId_lte?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  userId_not?: InputMaybe<Scalars['realTokenSepolia_BigInt']['input']>;
  userId_not_in?: InputMaybe<Array<Scalars['realTokenSepolia_BigInt']['input']>>;
};

export enum RealTokenSepolia_UserId_OrderBy {
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

export type RealTokenSepolia__Block_ = {
  __typename?: 'realTokenSepolia__Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['realTokenSepolia_Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type RealTokenSepolia__Meta_ = {
  __typename?: 'realTokenSepolia__Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: RealTokenSepolia__Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum RealTokenSepolia__SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

/**  Account entity  */
export type YamEth_Account = {
  __typename?: 'yamEth_Account';
  /**  User address  */
  address: Scalars['yamEth_Bytes']['output'];
  /**  Allowances for Account  */
  allowances: Array<YamEth_Allowance>;
  /**  Token balances that this account holds  */
  balances: Array<YamEth_AccountBalance>;
  /**  User address  */
  id: Scalars['ID']['output'];
  /**  Offer count  */
  offerCount: Scalars['yamEth_BigInt']['output'];
  /**  User offers  */
  offers: Array<YamEth_Offer>;
  /**  Purchase count  */
  purchaseCount: Scalars['yamEth_BigInt']['output'];
  /**  User purchases  */
  purchases: Array<YamEth_Purchase>;
  /**  Sell count  */
  sellCount: Scalars['yamEth_BigInt']['output'];
  /**  User sell  */
  sells: Array<YamEth_Purchase>;
};


/**  Account entity  */
export type YamEth_AccountAllowancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Allowance_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamEth_Allowance_Filter>;
};


/**  Account entity  */
export type YamEth_AccountBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_AccountBalance_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamEth_AccountBalance_Filter>;
};


/**  Account entity  */
export type YamEth_AccountOffersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Offer_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamEth_Offer_Filter>;
};


/**  Account entity  */
export type YamEth_AccountPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Purchase_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamEth_Purchase_Filter>;
};


/**  Account entity  */
export type YamEth_AccountSellsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Purchase_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamEth_Purchase_Filter>;
};

export type YamEth_AccountBalance = {
  __typename?: 'yamEth_AccountBalance';
  /**  Account address  */
  account: YamEth_Account;
  /**  Current account balance  */
  amount: Scalars['yamEth_BigDecimal']['output'];
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID']['output'];
  /**  Token address  */
  token: YamEth_Token;
};

export type YamEth_AccountBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamEth_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<YamEth_Account_Filter>;
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
  amount?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<YamEth_AccountBalance_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<YamEth_AccountBalance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<YamEth_Token_Filter>;
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

export enum YamEth_AccountBalance_OrderBy {
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

export type YamEth_Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamEth_BlockChangedFilter>;
  address?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['yamEth_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['yamEth_Bytes']['input']>>;
  allowances_?: InputMaybe<YamEth_Allowance_Filter>;
  and?: InputMaybe<Array<InputMaybe<YamEth_Account_Filter>>>;
  balances_?: InputMaybe<YamEth_AccountBalance_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offerCount?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  offerCount_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  offers_?: InputMaybe<YamEth_Offer_Filter>;
  or?: InputMaybe<Array<InputMaybe<YamEth_Account_Filter>>>;
  purchaseCount?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  purchaseCount_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  purchases_?: InputMaybe<YamEth_Purchase_Filter>;
  sellCount?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  sellCount_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  sellCount_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  sellCount_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  sellCount_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  sellCount_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  sellCount_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  sellCount_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  sells_?: InputMaybe<YamEth_Purchase_Filter>;
};

export enum YamEth_Account_OrderBy {
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

export type YamEth_Allowance = {
  __typename?: 'yamEth_Allowance';
  /**  Account address  */
  account: YamEth_Account;
  /**  Current allowance  */
  allowance: Scalars['yamEth_BigDecimal']['output'];
  /**  Equals to: <accountAddress>-<tokenAddress> */
  id: Scalars['ID']['output'];
  /**  Token address  */
  token: YamEth_Token;
};

export type YamEth_Allowance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamEth_BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']['input']>;
  account_?: InputMaybe<YamEth_Account_Filter>;
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
  allowance?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  allowance_gt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  allowance_gte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  allowance_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  allowance_lt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  allowance_lte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  allowance_not?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  allowance_not_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<YamEth_Allowance_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<YamEth_Allowance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<YamEth_Token_Filter>;
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

export enum YamEth_Allowance_OrderBy {
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

export type YamEth_BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type YamEth_Block_Height = {
  hash?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/**  Global stats entity  */
export type YamEth_Global = {
  __typename?: 'yamEth_Global';
  /**  Active offers counts */
  activeOffersCount: Scalars['yamEth_BigInt']['output'];
  id: Scalars['ID']['output'];
};

export type YamEth_Global_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamEth_BlockChangedFilter>;
  activeOffersCount?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  activeOffersCount_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  activeOffersCount_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  activeOffersCount_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  activeOffersCount_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  activeOffersCount_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  activeOffersCount_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  activeOffersCount_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<YamEth_Global_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<YamEth_Global_Filter>>>;
};

export enum YamEth_Global_OrderBy {
  ActiveOffersCount = 'activeOffersCount',
  Id = 'id'
}

/**  Offer entity  */
export type YamEth_Offer = {
  __typename?: 'yamEth_Offer';
  /**  Allowance if =/= realtoken  */
  allowance?: Maybe<YamEth_Allowance>;
  /**  Available amount  */
  availableAmount: Scalars['yamEth_BigDecimal']['output'];
  /**  Account balance if =/= realtoken  */
  balance?: Maybe<YamEth_AccountBalance>;
  /**  Buyer if offer is private  */
  buyer?: Maybe<YamEth_Account>;
  /**  Buyer token 0x */
  buyerToken: YamEth_Token;
  /**  Offer creation Block  */
  createdAtBlock: Scalars['yamEth_BigInt']['output'];
  /**  Offer creation timestamp  */
  createdAtTimestamp: Scalars['yamEth_BigInt']['output'];
  /**  Offer ID  */
  id: Scalars['ID']['output'];
  /**  Offer token 0x */
  offerToken: YamEth_Token;
  /**  Current price  */
  price: YamEth_OfferPrice;
  /**  Price array  */
  prices: Array<YamEth_OfferPrice>;
  /**  Price length  */
  pricesLength: Scalars['yamEth_BigInt']['output'];
  /**  Purchase count  */
  purchaseCount: Scalars['yamEth_BigInt']['output'];
  /**  Purchase array  */
  purchases: Array<YamEth_Purchase>;
  /**  Offer removal Block  */
  removedAtBlock?: Maybe<Scalars['yamEth_BigInt']['output']>;
  /**  Offer removal timestamp  */
  removedAtTimestamp?: Maybe<Scalars['yamEth_BigInt']['output']>;
  /**  Seller 0x  */
  seller: YamEth_Account;
};


/**  Offer entity  */
export type YamEth_OfferPricesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_OfferPrice_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamEth_OfferPrice_Filter>;
};


/**  Offer entity  */
export type YamEth_OfferPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Purchase_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamEth_Purchase_Filter>;
};

/**  OfferPrice entity  */
export type YamEth_OfferPrice = {
  __typename?: 'yamEth_OfferPrice';
  /**  Amount  */
  amount: Scalars['yamEth_BigDecimal']['output'];
  /**  Creation Block  */
  createdAtBlock: Scalars['yamEth_BigInt']['output'];
  /**  Creation timestamp  */
  createdAtTimestamp: Scalars['yamEth_BigInt']['output'];
  /**  offer id - position in list  */
  id: Scalars['ID']['output'];
  /**  Offer entity  */
  offer: YamEth_Offer;
  /**  Price  */
  price: Scalars['yamEth_BigDecimal']['output'];
};

export type YamEth_OfferPrice_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamEth_BlockChangedFilter>;
  amount?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_gt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_gte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  amount_lt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_lte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_not?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  and?: InputMaybe<Array<InputMaybe<YamEth_OfferPrice_Filter>>>;
  createdAtBlock?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offer?: InputMaybe<Scalars['String']['input']>;
  offer_?: InputMaybe<YamEth_Offer_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<YamEth_OfferPrice_Filter>>>;
  price?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_gt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_gte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  price_lt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_lte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_not?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
};

export enum YamEth_OfferPrice_OrderBy {
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

export type YamEth_Offer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamEth_BlockChangedFilter>;
  allowance?: InputMaybe<Scalars['String']['input']>;
  allowance_?: InputMaybe<YamEth_Allowance_Filter>;
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
  and?: InputMaybe<Array<InputMaybe<YamEth_Offer_Filter>>>;
  availableAmount?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  availableAmount_gt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  availableAmount_gte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  availableAmount_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  availableAmount_lt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  availableAmount_lte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  availableAmount_not?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  availableAmount_not_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  balance?: InputMaybe<Scalars['String']['input']>;
  balance_?: InputMaybe<YamEth_AccountBalance_Filter>;
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
  buyerToken_?: InputMaybe<YamEth_Token_Filter>;
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
  buyer_?: InputMaybe<YamEth_Account_Filter>;
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
  createdAtBlock?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offerToken?: InputMaybe<Scalars['String']['input']>;
  offerToken_?: InputMaybe<YamEth_Token_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<YamEth_Offer_Filter>>>;
  price?: InputMaybe<Scalars['String']['input']>;
  price_?: InputMaybe<YamEth_OfferPrice_Filter>;
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
  pricesLength?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  pricesLength_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  pricesLength_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  pricesLength_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  pricesLength_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  pricesLength_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  pricesLength_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  pricesLength_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  prices_?: InputMaybe<YamEth_OfferPrice_Filter>;
  purchaseCount?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  purchaseCount_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  purchases_?: InputMaybe<YamEth_Purchase_Filter>;
  removedAtBlock?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtBlock_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtBlock_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtBlock_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  removedAtBlock_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtBlock_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtBlock_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtBlock_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  removedAtTimestamp?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtTimestamp_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtTimestamp_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtTimestamp_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  removedAtTimestamp_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtTimestamp_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtTimestamp_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  removedAtTimestamp_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  seller?: InputMaybe<Scalars['String']['input']>;
  seller_?: InputMaybe<YamEth_Account_Filter>;
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

export enum YamEth_Offer_OrderBy {
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
export enum YamEth_OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type YamEth_Purchase = {
  __typename?: 'yamEth_Purchase';
  /**  Buyer 0x  */
  buyer: YamEth_Account;
  /**  Creation Block  */
  createdAtBlock: Scalars['yamEth_BigInt']['output'];
  /**  Creation timestamp  */
  createdAtTimestamp: Scalars['yamEth_BigInt']['output'];
  /**  tx hash - logindex  */
  id: Scalars['ID']['output'];
  /**  Offer entity  */
  offer: YamEth_Offer;
  /**  Price  */
  price: Scalars['yamEth_BigDecimal']['output'];
  /**  Quantity  */
  quantity: Scalars['yamEth_BigDecimal']['output'];
  /**  seller 0x  */
  seller: YamEth_Account;
};

export type YamEth_Purchase_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamEth_BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<YamEth_Purchase_Filter>>>;
  buyer?: InputMaybe<Scalars['String']['input']>;
  buyer_?: InputMaybe<YamEth_Account_Filter>;
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
  createdAtBlock?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  createdAtTimestamp?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  offer?: InputMaybe<Scalars['String']['input']>;
  offer_?: InputMaybe<YamEth_Offer_Filter>;
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
  or?: InputMaybe<Array<InputMaybe<YamEth_Purchase_Filter>>>;
  price?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_gt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_gte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  price_lt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_lte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_not?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  quantity?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  quantity_gt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  quantity_gte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  quantity_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  quantity_lt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  quantity_lte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  quantity_not?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  quantity_not_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  seller?: InputMaybe<Scalars['String']['input']>;
  seller_?: InputMaybe<YamEth_Account_Filter>;
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

export enum YamEth_Purchase_OrderBy {
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
export type YamEth_Token = {
  __typename?: 'yamEth_Token';
  /**  Token address  */
  address: Scalars['yamEth_Bytes']['output'];
  /**  Token decimal  */
  decimals?: Maybe<Scalars['Int']['output']>;
  /**  Dollars volume  */
  dollarsVolume: Scalars['yamEth_BigDecimal']['output'];
  /**  Token address  */
  id: Scalars['ID']['output'];
  /**  Token name  */
  name?: Maybe<Scalars['String']['output']>;
  /**  Offer count  */
  offerCount: Scalars['yamEth_BigInt']['output'];
  /**  Array of offers  */
  offers: Array<YamEth_Offer>;
  /**  Purchase count  */
  purchaseCount: Scalars['yamEth_BigInt']['output'];
  /**  Array of purchases  */
  purchases: Array<YamEth_Purchase>;
  /**  Token symbol  */
  symbol?: Maybe<Scalars['String']['output']>;
  /**  TokenType: 0:NOWL|1:REALTOKEN|2:ERC20PERMIT|3:ERC20NOPERMIT  */
  tokenType: Scalars['Int']['output'];
};


/**  Token entity  */
export type YamEth_TokenOffersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Offer_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamEth_Offer_Filter>;
};


/**  Token entity  */
export type YamEth_TokenPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<YamEth_Purchase_OrderBy>;
  orderDirection?: InputMaybe<YamEth_OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<YamEth_Purchase_Filter>;
};

export type YamEth_Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<YamEth_BlockChangedFilter>;
  address?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['yamEth_Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_not?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['yamEth_Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['yamEth_Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<YamEth_Token_Filter>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dollarsVolume?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  dollarsVolume_gt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  dollarsVolume_gte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  dollarsVolume_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
  dollarsVolume_lt?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  dollarsVolume_lte?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  dollarsVolume_not?: InputMaybe<Scalars['yamEth_BigDecimal']['input']>;
  dollarsVolume_not_in?: InputMaybe<Array<Scalars['yamEth_BigDecimal']['input']>>;
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
  offerCount?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  offerCount_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  offerCount_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  offers_?: InputMaybe<YamEth_Offer_Filter>;
  or?: InputMaybe<Array<InputMaybe<YamEth_Token_Filter>>>;
  purchaseCount?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_gt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_gte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  purchaseCount_lt?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_lte?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_not?: InputMaybe<Scalars['yamEth_BigInt']['input']>;
  purchaseCount_not_in?: InputMaybe<Array<Scalars['yamEth_BigInt']['input']>>;
  purchases?: InputMaybe<Array<Scalars['String']['input']>>;
  purchases_?: InputMaybe<YamEth_Purchase_Filter>;
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

export enum YamEth_Token_OrderBy {
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

export type YamEth__Block_ = {
  __typename?: 'yamEth__Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['yamEth_Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type YamEth__Meta_ = {
  __typename?: 'yamEth__Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: YamEth__Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum YamEth__SubgraphErrorPolicy_ {
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
