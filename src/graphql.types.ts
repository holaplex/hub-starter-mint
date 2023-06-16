import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Implement the DateTime<FixedOffset> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: any;
  /** A scalar that can represent any JSON value. */
  JSON: any;
  /**
   * ISO 8601 combined date and time without timezone.
   *
   * # Examples
   *
   * * `2015-07-01T08:59:60.123`,
   */
  NaiveDateTime: any;
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
   * Strings within GraphQL. UUIDs are used to assign unique identifiers to
   * entities without requiring a central allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: any;
};

/** Input required for accepting an invitation to the organization. */
export type AcceptInviteInput = {
  /** The ID of the invitation. */
  invite: Scalars['UUID'];
};

/** The response returned after accepting an invitation to the organization. */
export type AcceptInvitePayload = {
  __typename?: 'AcceptInvitePayload';
  /** The invitation to the organization that has been accepted. */
  invite: Invite;
};

/** An access token used to authenticate and authorize access to the Hub API. */
export type AccessToken = {
  __typename?: 'AccessToken';
  /** A string representing the access token used to authenticate requests. */
  accessToken: Scalars['String'];
  /** A timestamp indicating when the access token will expire. */
  expiresAt: Scalars['NaiveDateTime'];
  /** A string indicating the type of access token, such as "Bearer". */
  tokenType: Scalars['String'];
};

export enum Action {
  CreateDrop = 'CREATE_DROP',
  CreateWallet = 'CREATE_WALLET',
  MintEdition = 'MINT_EDITION',
  RetryDrop = 'RETRY_DROP',
  RetryMint = 'RETRY_MINT',
  TransferAsset = 'TRANSFER_ASSET'
}

/** Represents the cost of performing a certain action on different blockchains */
export type ActionCost = {
  __typename?: 'ActionCost';
  /** enum that represents the type of action being performed. */
  action: Action;
  /** a vector of BlockchainCost structs that represents the cost of performing the action on each blockchain. */
  blockchains: Array<BlockchainCost>;
};

/** An enum type named Affiliation that defines a user's association to an organization. The enum is derived using a Union attribute. It has two variants, each containing an associated data type: */
export type Affiliation = Member | Owner;

/** Fireblocks-defined blockchain identifiers. */
export enum AssetType {
  /** Ethereum Mainnet */
  Eth = 'ETH',
  /** Note: Holaplex uses `ETH_TEST` for provisioning wallets on its staging environment but still submits transactions to mainnet. */
  EthTest = 'ETH_TEST',
  /** Mainnet Polygon */
  Matic = 'MATIC',
  /**
   * Ploygon Mumbai Testnet
   * Note: Holaplex uses `MATIC_TEST` for provisioning wallets on its staging environment but still submits transactions to mainnet.
   */
  MaticTest = 'MATIC_TEST',
  /** Mainnet Solana */
  Sol = 'SOL',
  /**
   * Devnet Solana
   * Note: Holaplex uses `SOL_TEST` for provisioning wallets on its staging environment but still submits transactions to mainnet.
   */
  SolTest = 'SOL_TEST'
}

export enum Blockchain {
  Ethereum = 'ETHEREUM',
  Polygon = 'POLYGON',
  Solana = 'SOLANA'
}

/** Represents the cost of performing an action on a specific blockchain */
export type BlockchainCost = {
  __typename?: 'BlockchainCost';
  /** enum that represents the blockchain on which the action is being performed. */
  blockchain: Blockchain;
  /** represents the cost in credits for performing the action on the blockchain. */
  credits: Scalars['Int'];
};

export type Collection = {
  __typename?: 'Collection';
  /** The blockchain address of the collection used to view it in blockchain explorers. */
  address?: Maybe<Scalars['String']>;
  /** The blockchain of the collection. */
  blockchain: Blockchain;
  /** The creation status of the collection. When the collection is in a `CREATED` status you can mint NFTs from the collection. */
  creationStatus: CreationStatus;
  /** The list of attributed creators for the collection. */
  creators?: Maybe<Array<CollectionCreator>>;
  /** The list of current holders of NFTs from the collection. */
  holders?: Maybe<Array<Holder>>;
  /** The unique identifier for the collection. */
  id: Scalars['UUID'];
  /**
   * The metadata json associated to the collection.
   * ## References
   * [Metaplex v1.1.0 Standard](https://docs.metaplex.com/programs/token-metadata/token-standard)
   */
  metadataJson?: Maybe<MetadataJson>;
  /** The list of minted NFTs from the collection including the NFTs address and current owner's wallet address. */
  mints?: Maybe<Array<CollectionMint>>;
  /** A list of all NFT purchases from the collection, including both primary and secondary sales. */
  purchases?: Maybe<Array<Purchase>>;
  /** The royalties assigned to mints belonging to the collection expressed in basis points. */
  sellerFeeBasisPoints: Scalars['Int'];
  /** The transaction signature of the collection. */
  signature?: Maybe<Scalars['String']>;
  /** The total supply of the collection. Setting to `null` implies unlimited minting. */
  supply?: Maybe<Scalars['Int']>;
  /** The current number of NFTs minted from the collection. */
  totalMints: Scalars['Int'];
};

export type CollectionCreator = {
  __typename?: 'CollectionCreator';
  address: Scalars['String'];
  collectionId: Scalars['UUID'];
  share: Scalars['Int'];
  verified: Scalars['Boolean'];
};

/** An attributed creator for a colleciton. */
export type CollectionCreatorInput = {
  /** The wallet address of the creator. */
  address: Scalars['String'];
  /** The share of royalties payout the creator should receive. */
  share: Scalars['Int'];
  /**
   * This field indicates whether the collection's creator has been verified. This feature is only supported on the Solana blockchain.
   * ## References
   * [Metaplex Token Metadata - Verify creator instruction](https://docs.metaplex.com/programs/token-metadata/instructions#verify-a-creator)
   */
  verified?: InputMaybe<Scalars['Boolean']>;
};

/** Represents a single NFT minted from a collection. */
export type CollectionMint = {
  __typename?: 'CollectionMint';
  /** The wallet address of the NFT. */
  address: Scalars['String'];
  /** The collection the NFT was minted from. */
  collection?: Maybe<Collection>;
  /** The ID of the collection the NFT was minted from. */
  collectionId: Scalars['UUID'];
  /** The date and time when the NFT was created. */
  createdAt: Scalars['DateTime'];
  /** The unique ID of the creator of the NFT. */
  createdBy: Scalars['UUID'];
  /** The status of the NFT creation. */
  creationStatus: CreationStatus;
  /** credits deduction id */
  creditsDeductionId?: Maybe<Scalars['UUID']>;
  /** The unique edition number of the NFT. */
  edition: Scalars['Int'];
  /** The unique ID of the minted NFT. */
  id: Scalars['UUID'];
  /**
   * The metadata json associated to the collection.
   * [Metaplex v1.1.0 Standard](https://docs.metaplex.com/programs/token-metadata/token-standard)
   */
  metadataJson?: Maybe<MetadataJson>;
  /** The wallet address of the owner of the NFT. */
  owner: Scalars['String'];
  /** The seller fee basis points (ie royalties) for the NFT. */
  sellerFeeBasisPoints: Scalars['Int'];
  /** The transaction signature associated with the NFT. */
  signature?: Maybe<Scalars['String']>;
};

/** This struct represents the input for creating a new API credential, including the ID of the organization that the credential will be associated with and the friendly name assigned to the credential. */
export type CreateCredentialInput = {
  /** The friendly name assigned to the new API credential. */
  name: Scalars['String'];
  /** The ID of the organization that the new API credential will be associated with. */
  organization: Scalars['UUID'];
};

/** The response payload returned after successfully creating an API credential. It includes the newly created Credential object, which represents the API credential, as well as an `AccessToken` object that can be used to authenticate requests to the Hub API. */
export type CreateCredentialPayload = {
  __typename?: 'CreateCredentialPayload';
  /** An `AccessToken` object that can be used to authenticate requests to the Hub API. */
  accessToken: AccessToken;
  /** A `Credential` object representing the newly created API credential. */
  credential: Credential;
};

/** This input object is used for creating a customer and associated treasury for holding custodial wallets on behalf of the user. */
export type CreateCustomerInput = {
  /** The unique identifier of the project to which the customer is associated. */
  project: Scalars['UUID'];
};

/** This response represents the payload returned after successfully creating a new `customer` record. It contains a single field customer which is a `Customer` object representing the newly created customer record. */
export type CreateCustomerPayload = {
  __typename?: 'CreateCustomerPayload';
  /** The customer record created by the create customer mutation. */
  customer: Customer;
};

/** Input for creating a customer wallet. */
export type CreateCustomerWalletInput = {
  /** Blockchain for wallet creation. */
  assetType: AssetType;
  /** The customer ID. */
  customer: Scalars['UUID'];
};

/** Response after wallet creation. */
export type CreateCustomerWalletPayload = {
  __typename?: 'CreateCustomerWalletPayload';
  wallet: Wallet;
};

export type CreateDropInput = {
  blockchain: Blockchain;
  creators: Array<CollectionCreatorInput>;
  endTime?: InputMaybe<Scalars['DateTime']>;
  metadataJson: MetadataJsonInput;
  price?: InputMaybe<Scalars['Int']>;
  project: Scalars['UUID'];
  sellerFeeBasisPoints?: InputMaybe<Scalars['Int']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  supply?: InputMaybe<Scalars['Int']>;
};

export type CreateDropPayload = {
  __typename?: 'CreateDropPayload';
  drop: Drop;
};

export type CreateOrganizationInput = {
  name: Scalars['String'];
  profileImageUrl?: InputMaybe<Scalars['String']>;
};

export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  organization: Organization;
};

/** The input used for creating a project. */
export type CreateProjectInput = {
  /** The friendly name to denote the project from others belonging to the organization. */
  name: Scalars['String'];
  /** The ID of the organization the project belongs to. */
  organization: Scalars['UUID'];
  /** The URL of the project's profile image. */
  profileImageUrl?: InputMaybe<Scalars['String']>;
};

/** * The payload returned by the `createProject` mutation. */
export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  /** * The project that was created. */
  project: Project;
};

export type CreateWebhookInput = {
  description: Scalars['String'];
  filterTypes: Array<FilterType>;
  organization: Scalars['UUID'];
  projects: Array<Scalars['UUID']>;
  url: Scalars['String'];
};

export type CreateWebhookPayload = {
  __typename?: 'CreateWebhookPayload';
  secret: Scalars['String'];
  webhook: Webhook;
};

export enum CreationStatus {
  Blocked = 'BLOCKED',
  Canceled = 'CANCELED',
  Created = 'CREATED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** An `OAuth2` client application used for authentication with the Hub API. */
export type Credential = {
  __typename?: 'Credential';
  /** A unique identifier for the credential. */
  clientId: Scalars['String'];
  /** The datetime in UTC when the credential was created. */
  createdAt: Scalars['NaiveDateTime'];
  /** This field represents the user who created the credential. */
  createdBy?: Maybe<User>;
  /** The ID of the user who created the credential. */
  createdById: Scalars['UUID'];
  /** A user-friendly name assigned to the credential. */
  name: Scalars['String'];
  /** The ID of the organization the credential belongs to. */
  organizationId: Scalars['UUID'];
};

export type CreditDeposit = {
  __typename?: 'CreditDeposit';
  cost: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  credits: Scalars['Int'];
  id: Scalars['UUID'];
  initiatedBy: Scalars['UUID'];
  organization: Scalars['UUID'];
  perCreditCost: Scalars['Float'];
  reason: DepositReason;
};

export type Credits = {
  __typename?: 'Credits';
  balance: Scalars['Int'];
  deposits?: Maybe<Array<CreditDeposit>>;
  id: Scalars['UUID'];
};

/** A customer record represents a user in your service and is used to group custodial wallets within a specific project. This allows for easy management of wallets and associated assets for a particular customer within your service. */
export type Customer = {
  __typename?: 'Customer';
  /**
   * Returns all the wallet addresses associated with the customer. The blockchain of the address is not included and they are in no particular order. In the future, the blockchain may be indicated with a pattern of {blockchain}:{address}.
   * This field returns null when there is no treasury assigned to the customer yet.
   */
  addresses?: Maybe<Array<Scalars['String']>>;
  /** The datetime when the customer record was created. */
  createdAt: Scalars['NaiveDateTime'];
  /** The unique identifier for the customer record. */
  id: Scalars['UUID'];
  /** The NFTs owned by any of the customers' wallets. */
  mints?: Maybe<Array<CollectionMint>>;
  /** The ID of the project to which the customer record belongs. */
  projectId: Scalars['UUID'];
  /** The treasury assigned to the customer, which contains the customer's wallets. */
  treasury?: Maybe<Treasury>;
  /** An optional datetime indicating the last time the customer record was updated. If the customer record has not been updated, this field will be `null`. */
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
  wallet?: Maybe<Array<Wallet>>;
};


/** A customer record represents a user in your service and is used to group custodial wallets within a specific project. This allows for easy management of wallets and associated assets for a particular customer within your service. */
export type CustomerWalletArgs = {
  assetId?: InputMaybe<AssetType>;
};

export type DeactivateMemberInput = {
  id: Scalars['UUID'];
};

export type DeductionTotals = {
  __typename?: 'DeductionTotals';
  action: Action;
  spent: Scalars['Int'];
};

/** The input for deleting a credential. */
export type DeleteCredentialInput = {
  /** The unique identifier assigned to the credential to be deleted. */
  credential: Scalars['String'];
};

/** The response for deleting a credential. */
export type DeleteCredentialPayload = {
  __typename?: 'DeleteCredentialPayload';
  /** The unique identifier assigned to the deleted credential. */
  credential: Scalars['String'];
};

export type DeleteWebhookInput = {
  webhook: Scalars['UUID'];
};

export type DeleteWebhookPayload = {
  __typename?: 'DeleteWebhookPayload';
  webhook: Scalars['UUID'];
};

export enum DepositReason {
  Gifted = 'GIFTED',
  Purchased = 'PURCHASED'
}

export type Drop = {
  __typename?: 'Drop';
  /** The collection for which the drop is managing mints. */
  collection: Collection;
  /** The date and time in UTC when the drop was created. */
  createdAt: Scalars['DateTime'];
  /** The user id of the person who created the drop. */
  createdById: Scalars['UUID'];
  /** The creation status of the drop. */
  creationStatus: CreationStatus;
  /** The end date and time in UTC for the drop. A value of `null` means the drop does not end until it is fully minted. */
  endTime?: Maybe<Scalars['DateTime']>;
  /** The unique identifier for the drop. */
  id: Scalars['UUID'];
  pausedAt?: Maybe<Scalars['DateTime']>;
  /** The cost to mint the drop in US dollars. When purchasing with crypto the user will be charged at the current conversion rate for the blockchain's native coin at the time of minting. */
  price: Scalars['Int'];
  /** The identifier of the project to which the drop is associated. */
  projectId: Scalars['UUID'];
  /** A list of all NFT purchases from this drop. */
  purchases?: Maybe<Array<Purchase>>;
  /**
   * The shutdown_at field represents the date and time in UTC when the drop was shutdown
   * If it is null, the drop is currently not shutdown
   */
  shutdownAt?: Maybe<Scalars['DateTime']>;
  /** The date and time in UTC when the drop is eligible for minting. A value of `null` means the drop can be minted immediately. */
  startTime?: Maybe<Scalars['DateTime']>;
  /** The current status of the drop. */
  status: DropStatus;
};

/** The different phases of a drop. */
export enum DropStatus {
  /** The drop is still being created and is not ready to mint. */
  Creating = 'CREATING',
  /** The drop has expired and its end time has passed. */
  Expired = 'EXPIRED',
  /** The creation process for the drop has failed */
  Failed = 'FAILED',
  /** The minting process for the collection is complete. */
  Minted = 'MINTED',
  /** Actively minting. */
  Minting = 'MINTING',
  /** The drop is temporarily paused and cannot be minted at the moment. */
  Paused = 'PAUSED',
  /** The drop is scheduled for minting. */
  Scheduled = 'SCHEDULED',
  /** The drop is permanently shut down and can no longer be minted. */
  Shutdown = 'SHUTDOWN'
}

/** The input for editing the name of an existing credential by providing the `client_id` of the credential and the new `name` to be assigned. */
export type EditCredentialInput = {
  /** A unique string identifier assigned to the credential during creation. */
  clientId: Scalars['String'];
  /** The new name to be assigned to the credential. */
  name: Scalars['String'];
};

/** The response for editing the name of a credential. */
export type EditCredentialPayload = {
  __typename?: 'EditCredentialPayload';
  /** The updated credential with the edited name. */
  credential: Credential;
};

export type EditOrganizationInput = {
  id: Scalars['UUID'];
  name: Scalars['String'];
  profileImageUrl?: InputMaybe<Scalars['String']>;
};

export type EditOrganizationPayload = {
  __typename?: 'EditOrganizationPayload';
  organization: Organization;
};

export type EditProjectInput = {
  id: Scalars['UUID'];
  name: Scalars['String'];
  profileImageUrl?: InputMaybe<Scalars['String']>;
};

export type EditProjectPayload = {
  __typename?: 'EditProjectPayload';
  project: Project;
};

export type EditWebhookInput = {
  description: Scalars['String'];
  disabled?: InputMaybe<Scalars['Boolean']>;
  filterTypes: Array<FilterType>;
  projects: Array<Scalars['UUID']>;
  url: Scalars['String'];
  webhook: Scalars['UUID'];
};

export type EditWebhookPayload = {
  __typename?: 'EditWebhookPayload';
  webhook: Webhook;
};

/** An event to which an external service can subscribe. */
export type EventType = {
  __typename?: 'EventType';
  /** Whether the event is archived or not. */
  archived?: Maybe<Scalars['Boolean']>;
  /** The date and time when the event was created, in string format. */
  createdAt: Scalars['String'];
  /** A description of the event. */
  description: Scalars['String'];
  /** The name of the event. */
  name: Scalars['String'];
  /** The JSON schema for the event payload. */
  schemas: Scalars['JSON'];
  /** The date and time when the event was last updated, in string format. */
  updatedAt: Scalars['String'];
};

/** An enumeration of event types that can be subscribed to by a webhook. */
export enum FilterType {
  /** Event triggered when a new customer is created */
  CustomerCreated = 'CUSTOMER_CREATED',
  /** Event triggered when a new customer treasury is created */
  CustomerTreasuryCreated = 'CUSTOMER_TREASURY_CREATED',
  /** Event triggered when a new wallet is created for a customer */
  CustomerWalletCreated = 'CUSTOMER_WALLET_CREATED',
  /** Event triggered when a new drop is created */
  DropCreated = 'DROP_CREATED',
  /** Event triggered when a new drop is minted */
  DropMinted = 'DROP_MINTED',
  /** Event triggered when a mint has been successfully transfered */
  MintTransfered = 'MINT_TRANSFERED',
  /** Event triggered when a new project is created */
  ProjectCreated = 'PROJECT_CREATED',
  /** Event triggered when a new wallet is created for a project */
  ProjectWalletCreated = 'PROJECT_WALLET_CREATED'
}

/** The holder of a collection. */
export type Holder = {
  __typename?: 'Holder';
  /** The wallet address of the holder. */
  address: Scalars['String'];
  /** The collection ID that the holder owns. */
  collectionId: Scalars['UUID'];
  /** The specific mints from the collection that the holder owns. */
  mints: Array<Scalars['String']>;
  /** The number of NFTs that the holder owns in the collection. */
  owns: Scalars['Int'];
};

/** An invitation sent to join a Holaplex organization. */
export type Invite = {
  __typename?: 'Invite';
  /** The datetime, in UTC, when the invitation to join the organization was created. */
  createdAt: Scalars['DateTime'];
  /** The ID of the user who created the invitation. */
  createdBy: Scalars['UUID'];
  /** The email address of the user being invited to become a member of the organization. */
  email: Scalars['String'];
  /** The ID of the invitation. */
  id: Scalars['UUID'];
  /** The member record that is generated after the invitation to join the organization is accepted. When the user has not accepted the invitation, this field returns `null`. */
  member?: Maybe<Member>;
  /** The organization to which the invitation to join belongs. */
  organization?: Maybe<Organization>;
  /** The ID of the organization to which the invitation belongs. */
  organizationId: Scalars['UUID'];
  /** The status of the invitation. */
  status: InviteStatus;
  /** The datetime, in UTC, when the invitation status was updated. */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Input required for inviting a member to the organization. */
export type InviteMemberInput = {
  /** The email address of the invited user. */
  email: Scalars['String'];
  /** The ID of the organization. */
  organization: Scalars['UUID'];
};

/** The status of a member invitation. */
export enum InviteStatus {
  /** The member invitation has been accepted by the invited user. */
  Accepted = 'ACCEPTED',
  /** The member invitation has been revoked by an existing member of the organization and is no longer valid. */
  Revoked = 'REVOKED',
  /** The member invitation has been sent to the invited user. */
  Sent = 'SENT'
}

/** A member of a Holaplex organization, representing an individual who has been granted access to the organization. */
export type Member = {
  __typename?: 'Member';
  /** The datetime, in UTC, when the member joined the organization. */
  createdAt: Scalars['DateTime'];
  /** The datetime, in UTC, when the member was deactivated from the organization. */
  deactivatedAt?: Maybe<Scalars['DateTime']>;
  /** The unique identifier of the member. */
  id: Scalars['UUID'];
  /** The invitation to join the Holaplex organization that the member accepted in order to gain access to the organization. */
  invite?: Maybe<Invite>;
  /** The ID of the invitation that the member accepted to join the organization. */
  inviteId: Scalars['UUID'];
  /** The Holaplex organization to which the member belongs, representing an individual who has been granted access to the organization. */
  organization?: Maybe<Organization>;
  /** The ID of the Holaplex organization to which the user has been granted access. */
  organizationId: Scalars['UUID'];
  /** The datetime, in UTC, when the member was revoked from the organization. */
  revokedAt?: Maybe<Scalars['DateTime']>;
  /** The user identity who is a member of the organization. */
  user?: Maybe<User>;
  /** The ID of the user who has been granted access to the Holaplex organization as a member. */
  userId: Scalars['UUID'];
};

/**
 * The collection's associated metadata JSON.
 * ## References
 * [Metaplex v1.1.0 Standard](https://docs.metaplex.com/programs/token-metadata/token-standard)
 */
export type MetadataJson = {
  __typename?: 'MetadataJson';
  /** An optional animated version of the NFT art. */
  animationUrl?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<MetadataJsonAttribute>>;
  /** The description of the NFT. */
  description: Scalars['String'];
  /** An optional URL where viewers can find more information on the NFT, such as the collection's homepage or Twitter page. */
  externalUrl?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  identifier: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  /** The image URI for the NFT. */
  imageOriginal: Scalars['String'];
  /** The assigned name of the NFT. */
  name: Scalars['String'];
  /** The symbol of the NFT. */
  symbol: Scalars['String'];
  /** The URI for the complete metadata JSON. */
  uri: Scalars['String'];
};

/** An attribute of the NFT. */
export type MetadataJsonAttribute = {
  __typename?: 'MetadataJsonAttribute';
  id: Scalars['UUID'];
  metadataJsonId: Scalars['UUID'];
  /** The name of the attribute. */
  traitType: Scalars['String'];
  /** The value of the attribute. */
  value: Scalars['String'];
};

export type MetadataJsonAttributeInput = {
  traitType: Scalars['String'];
  value: Scalars['String'];
};

export type MetadataJsonCollectionInput = {
  family?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MetadataJsonFileInput = {
  fileType?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type MetadataJsonInput = {
  animationUrl?: InputMaybe<Scalars['String']>;
  attributes: Array<MetadataJsonAttributeInput>;
  collection?: InputMaybe<MetadataJsonCollectionInput>;
  description: Scalars['String'];
  externalUrl?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name: Scalars['String'];
  properties?: InputMaybe<MetadataJsonPropertyInput>;
  symbol: Scalars['String'];
};

export type MetadataJsonPropertyInput = {
  category?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<MetadataJsonFileInput>>;
};

/** Represents input data for `mint_edition` mutation with a UUID and recipient as fields */
export type MintDropInput = {
  drop: Scalars['UUID'];
  recipient: Scalars['String'];
};

/** Represents payload data for the `mint_edition` mutation */
export type MintEditionPayload = {
  __typename?: 'MintEditionPayload';
  collectionMint: CollectionMint;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Accept an invite to the organization.
   * # Error
   * This mutation will produce an error if it is unable to connect to the database or if the user's email does not match the invitation.
   */
  acceptInvite: AcceptInvitePayload;
  /** Create an API credential to authenticate and authorize API requests to the Holaplex Hub. */
  createCredential: CreateCredentialPayload;
  /** This mutation creates a customer record and a corresponding treasury that holds custodial wallets on behalf of a user. The treasury serves as a way to group the customer's wallets together. This makes it easier to manage wallets and associated assets for the user within a specific project. The customer and treasury are associated with the specified project ID. The response includes the newly created customer record. If there is an error connecting to the database or unable to emit a customer created event, the mutation will fail and an error will be returned. */
  createCustomer: CreateCustomerPayload;
  /**
   * Create a wallet for a customer and assign it to the customer's treasury account.
   *
   * # Errors
   * The mutation will result in an error if it is unable to interact with the database or communicate with Fireblocks.
   */
  createCustomerWallet: CreateCustomerWalletPayload;
  /**
   * This mutation creates a new NFT drop and its associated collection. The drop returns immediately with a creation status of CREATING. You can [set up a webhook](https://docs.holaplex.dev/hub/For%20Developers/webhooks-overview) to receive a notification when the drop is ready to be minted.
   * Error
   * If the drop cannot be saved to the database or fails to be emitted for submission to the desired blockchain, the mutation will result in an error.
   */
  createDrop: CreateDropPayload;
  /**
   * This mutation creates a new Holaplex organization, with the user triggering the mutation automatically assigned as the owner of the organization.
   * # Errors
   * This mutation produces an error if it is unable to connect to the database, emit the organization creation event, or if the user is not set in the X-USER-ID header.
   */
  createOrganization: CreateOrganizationPayload;
  /**
   * This mutation creates a new project under the specified organization.
   *
   * # Errors
   * This mutation produces an error if it is unable to connect to the database, emit the project creation event, or if the user is not set in the X-USER-ID header.
   */
  createProject: CreateProjectPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  createWebhook: CreateWebhookPayload;
  /**
   * Returns member object on success
   *
   * # Errors
   * This code may result in an error if the update to the database fails or if it fails to produce an event.
   */
  deactivateMember: Member;
  /** Delete the OAuth2 API credential. */
  deleteCredential: DeleteCredentialPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  deleteWebhook: DeleteWebhookPayload;
  /** Edit the name assigned to the API credential. */
  editCredential: EditCredentialPayload;
  /** This mutation edits the name or profile image of the organization. */
  editOrganization: EditOrganizationPayload;
  /** This mutations edits the name and profile image of the project. */
  editProject: EditProjectPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  editWebhook: EditWebhookPayload;
  /**
   * To invite a person to the organization, provide their email address.
   * # Error
   * This mutation will produce an error if it is unable to connect to the database or if there is no associated user set in the X-USER-ID header.
   */
  inviteMember: Invite;
  mint?: Maybe<CollectionMint>;
  /**
   * This mutation mints an NFT edition for a specific drop ID. The mint returns immediately with a creation status of CREATING. You can [set up a webhook](https://docs.holaplex.dev/hub/For%20Developers/webhooks-overview) to receive a notification when the mint is accepted by the blockchain.
   * # Errors
   * If the mint cannot be saved to the database or fails to be emitted for submission to the desired blockchain, the mutation will result in an error.
   */
  mintEdition: MintEditionPayload;
  /**
   * This mutation allows updating a drop and it's associated collection by ID.
   * It returns an error if it fails to reach the database, emit update events or assemble the on-chain transaction.
   * Returns the `PatchDropPayload` object on success.
   */
  patchDrop: PatchDropPayload;
  /** This mutation allows for the temporary blocking of the minting of editions and can be resumed by calling the resumeDrop mutation. */
  pauseDrop: PauseDropPayload;
  /**
   * Returns member object on success
   *
   * # Errors
   * This code may result in an error if the update to the database fails or if it fails to produce an event.
   */
  reactivateMember: Member;
  /** This mutation resumes a paused drop, allowing minting of editions to be restored */
  resumeDrop: ResumeDropPayload;
  /**
   * This mutation retries an existing drop.
   * The drop returns immediately with a creation status of CREATING.
   * You can [set up a webhook](https://docs.holaplex.dev/hub/For%20Developers/webhooks-overview) to receive a notification when the drop is ready to be minted.
   * Errors
   * The mutation will fail if the drop and its related collection cannot be located,
   * if the transaction response cannot be built,
   * or if the transaction event cannot be emitted.
   */
  retryDrop: CreateDropPayload;
  /**
   * This mutation retries a mint which failed or is in pending state. The mint returns immediately with a creation status of CREATING. You can [set up a webhook](https://docs.holaplex.dev/hub/For%20Developers/webhooks-overview) to receive a notification when the mint is accepted by the blockchain.
   * # Errors
   * If the mint cannot be saved to the database or fails to be emitted for submission to the desired blockchain, the mutation will result in an error.
   */
  retryMint: RetryMintPayload;
  /**
   * Shuts down a drop by writing the current UTC timestamp to the shutdown_at field of drop record.
   * Returns the `Drop` object on success.
   *
   * # Errors
   * Fails if the drop or collection is not found, or if updating the drop record fails.
   */
  shutdownDrop: ShutdownDropPayload;
  /**
   * Transfers an asset from one user to another on a supported blockchain network.
   *
   * # Arguments
   *
   * * `self` - A reference to the current instance of the struct.
   * * `ctx` - A context object containing application context data.
   * * `input` - A TransferAssetInput struct containing the input data for the asset transfer.
   *
   * # Returns
   *
   * Returns a Result containing a TransferAssetPayload struct with the updated mint information upon success.
   *
   * # Errors
   * This function returns an error :
   * If the specified blockchain is not currently supported.
   * If the specified mint does not exist.
   * If there is an error while making a transfer request to the Solana blockchain.
   * If there is an error while sending the TransferAsset event to the event producer.
   */
  transferAsset: TransferAssetPayload;
};


export type MutationAcceptInviteArgs = {
  input: AcceptInviteInput;
};


export type MutationCreateCredentialArgs = {
  input: CreateCredentialInput;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateCustomerWalletArgs = {
  input: CreateCustomerWalletInput;
};


export type MutationCreateDropArgs = {
  input: CreateDropInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateWebhookArgs = {
  input: CreateWebhookInput;
};


export type MutationDeactivateMemberArgs = {
  input: DeactivateMemberInput;
};


export type MutationDeleteCredentialArgs = {
  input: DeleteCredentialInput;
};


export type MutationDeleteWebhookArgs = {
  input: DeleteWebhookInput;
};


export type MutationEditCredentialArgs = {
  input: EditCredentialInput;
};


export type MutationEditOrganizationArgs = {
  input: EditOrganizationInput;
};


export type MutationEditProjectArgs = {
  input: EditProjectInput;
};


export type MutationEditWebhookArgs = {
  input: EditWebhookInput;
};


export type MutationInviteMemberArgs = {
  input: InviteMemberInput;
};


export type MutationMintEditionArgs = {
  input: MintDropInput;
};


export type MutationPatchDropArgs = {
  input: PatchDropInput;
};


export type MutationPauseDropArgs = {
  input: PauseDropInput;
};


export type MutationReactivateMemberArgs = {
  input: ReactivateMemberInput;
};


export type MutationResumeDropArgs = {
  input: ResumeDropInput;
};


export type MutationRetryDropArgs = {
  input: RetryDropInput;
};


export type MutationRetryMintArgs = {
  input: RetryMintInput;
};


export type MutationShutdownDropArgs = {
  input: ShutdownDropInput;
};


export type MutationTransferAssetArgs = {
  input: TransferAssetInput;
};

/** A Holaplex organization is the top-level account within the Holaplex ecosystem. Each organization has a single owner who can invite members to join. Organizations use projects to organize NFT campaigns or initiatives. */
export type Organization = {
  __typename?: 'Organization';
  /** The datetime, in UTC, when the Holaplex organization was created by its owner. */
  createdAt: Scalars['DateTime'];
  /**
   * Get a single API credential by client ID.
   *
   * # Arguments
   *
   * * `ctx` - The GraphQL context object containing the database connection pool and other data.
   * * `client_id` - The client ID of the API credential to retrieve.
   *
   * # Returns
   *
   * The API credential with the specified client ID.
   */
  credential: Credential;
  /**
   * Get a list of API credentials associated with this organization.
   *
   * # Arguments
   *
   * * `ctx` - The GraphQL context object containing the database connection pool and other data.
   * * `limit` - Optional limit on the number of credentials to retrieve.
   * * `offset` - Optional offset for the credentials to retrieve.
   *
   * # Returns
   *
   * A list of API credentials associated with this organization.
   */
  credentials: Array<Credential>;
  /**
   * Define an asynchronous function to load the credits for the organization
   * Returns `Credits` object
   * #Errors
   * returns error if credits_loader is not found in the context or if the loader fails to load the credits
   */
  credits?: Maybe<Credits>;
  /** The datetime, in UTC, when the Holaplex organization was deactivated by its owner. */
  deactivatedAt?: Maybe<Scalars['DateTime']>;
  /**
   * Define an asynchronous function to load the total credits deducted for each action
   * Returns `DeductionTotals` object
   * #Errors
   * returns error if total_deductions_loader is not found in the context or if the loader fails to load the total deductions
   */
  deductionTotals?: Maybe<Array<DeductionTotals>>;
  /** The unique identifier assigned to the Holaplex organization, which is used to distinguish it from other organizations within the Holaplex ecosystem. */
  id: Scalars['UUID'];
  /** The invitations to join the Holaplex organization that have been sent to email addresses and are either awaiting or have been accepted by the recipients. */
  invites: Array<Invite>;
  /** The members who have been granted access to the Holaplex organization, represented by individuals who have been invited and accepted the invitation to join the organization. */
  members?: Maybe<Array<Member>>;
  /** The name given to the Holaplex organization, which is used to identify it within the Holaplex ecosystem and to its members and users. */
  name: Scalars['String'];
  /** The owner of the Holaplex organization, who has created the organization and has full control over its settings and members. */
  owner?: Maybe<Owner>;
  profileImageUrl?: Maybe<Scalars['String']>;
  /** The optional profile image associated with the Holaplex organization, which can be used to visually represent the organization. */
  profileImageUrlOriginal?: Maybe<Scalars['String']>;
  /** The projects that have been created and are currently associated with the Holaplex organization, which are used to organize NFT campaigns or initiatives within the organization. */
  projects: Array<Project>;
  /**
   * Retrieves a specific webhook associated with the organization, based on its ID.
   *
   * # Arguments
   *
   * * `ctx` - The context object representing the current request.
   * * `id` - The UUID of the Webhook to retrieve.
   *
   * # Returns
   *
   * The specified Webhook object, or None if it does not exist.
   *
   * # Errors
   *
   * This function will return an error if the data context cannot be retrieved.
   */
  webhook?: Maybe<Webhook>;
  /**
   * Retrieves a list of all webhooks associated with the organization.
   *
   * # Arguments
   *
   * * `ctx` - The context object representing the current request.
   *
   * # Returns
   *
   * A vector of all Webhook objects associated with the Organization, or None if there are none.
   *
   * # Errors
   *
   * This function will return an error if the data context cannot be retrieved.
   */
  webhooks?: Maybe<Array<Webhook>>;
};


/** A Holaplex organization is the top-level account within the Holaplex ecosystem. Each organization has a single owner who can invite members to join. Organizations use projects to organize NFT campaigns or initiatives. */
export type OrganizationCredentialArgs = {
  clientId: Scalars['String'];
};


/** A Holaplex organization is the top-level account within the Holaplex ecosystem. Each organization has a single owner who can invite members to join. Organizations use projects to organize NFT campaigns or initiatives. */
export type OrganizationCredentialsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


/** A Holaplex organization is the top-level account within the Holaplex ecosystem. Each organization has a single owner who can invite members to join. Organizations use projects to organize NFT campaigns or initiatives. */
export type OrganizationInvitesArgs = {
  status?: InputMaybe<InviteStatus>;
};


/** A Holaplex organization is the top-level account within the Holaplex ecosystem. Each organization has a single owner who can invite members to join. Organizations use projects to organize NFT campaigns or initiatives. */
export type OrganizationWebhookArgs = {
  id: Scalars['UUID'];
};

/** The owner of the Holaplex organization, who is the individual that created the organization. */
export type Owner = {
  __typename?: 'Owner';
  /** The datetime, in UTC, when the organization was created. */
  createdAt: Scalars['DateTime'];
  /** The unique identifier assigned to the record of the user who created the Holaplex organization and serves as its owner, which is used to distinguish their record from other records within the Holaplex ecosystem. */
  id: Scalars['UUID'];
  /** The Holaplex organization owned by the user. */
  organization?: Maybe<Organization>;
  /** The ID assigned to the Holaplex organization owned by the user, which is used to distinguish it from other organizations within the Holaplex ecosystem." */
  organizationId: Scalars['UUID'];
  /** The user identity associated with the owner of the organization. */
  user?: Maybe<User>;
  /** The ID of the user who created the Holaplex organization and serves as its owner. */
  userId: Scalars['UUID'];
};

/** Input object for patching a drop and associated collection by ID */
export type PatchDropInput = {
  /** The creators of the drop */
  creators?: InputMaybe<Array<CollectionCreatorInput>>;
  /** The new end time for the drop in UTC */
  endTime?: InputMaybe<Scalars['DateTime']>;
  /** The unique identifier of the drop */
  id: Scalars['UUID'];
  /** The new metadata JSON for the drop */
  metadataJson?: InputMaybe<MetadataJsonInput>;
  /** The new price for the drop in the native token of the blockchain */
  price?: InputMaybe<Scalars['Int']>;
  /** The new seller fee basis points for the drop */
  sellerFeeBasisPoints?: InputMaybe<Scalars['Int']>;
  /** The new start time for the drop in UTC */
  startTime?: InputMaybe<Scalars['DateTime']>;
};

/** Represents the result of a successful patch drop mutation. */
export type PatchDropPayload = {
  __typename?: 'PatchDropPayload';
  /** The drop that has been patched. */
  drop: Drop;
};

/** Represents input fields for pausing a drop. */
export type PauseDropInput = {
  drop: Scalars['UUID'];
};

/** Represents the result of a successful pause drop mutation. */
export type PauseDropPayload = {
  __typename?: 'PauseDropPayload';
  /** The drop that has been paused. */
  drop: Drop;
};

/** A Holaplex project that belongs to an organization. Projects are used to group unique NFT campaigns or initiatives, and are used to assign objects that end customers will interact with, such as drops and wallets. */
export type Project = {
  __typename?: 'Project';
  /** The datetime, in UTC, when the project was created. */
  createdAt: Scalars['DateTime'];
  /** Retrieve a customer record associated with the project, using its ID. */
  customer?: Maybe<Customer>;
  /** Retrieve all customer records associated with a given project. */
  customers?: Maybe<Array<Customer>>;
  /** The date and time in Coordinated Universal Time (UTC) when the Holaplex project was created. Once a project is deactivated, objects that were assigned to the project can no longer be interacted with. */
  deactivatedAt?: Maybe<Scalars['DateTime']>;
  /** Look up a drop associated with the project by its ID. */
  drop?: Maybe<Drop>;
  /** The drops associated with the project. */
  drops?: Maybe<Array<Drop>>;
  /** The unique identifier assigned to the Holaplex project. */
  id: Scalars['UUID'];
  /** The friendly name assigned to the Holaplex project to differentiate it from other projects belonging to the organization. */
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  /** The ID of the Holaplex organization to which the project belongs. */
  organizationId: Scalars['UUID'];
  profileImageUrl?: Maybe<Scalars['String']>;
  /** The optional profile image associated with the project, which can be used to visually represent the project. */
  profileImageUrlOriginal?: Maybe<Scalars['String']>;
  /** The treasury assigned to the project, which contains the project's wallets. */
  treasury?: Maybe<Treasury>;
};


/** A Holaplex project that belongs to an organization. Projects are used to group unique NFT campaigns or initiatives, and are used to assign objects that end customers will interact with, such as drops and wallets. */
export type ProjectCustomerArgs = {
  id: Scalars['UUID'];
};


/** A Holaplex project that belongs to an organization. Projects are used to group unique NFT campaigns or initiatives, and are used to assign objects that end customers will interact with, such as drops and wallets. */
export type ProjectDropArgs = {
  id: Scalars['UUID'];
};

/** Represents the purchase of an NFT. */
export type Purchase = {
  __typename?: 'Purchase';
  /** The date and time when the purchase was created. */
  createdAt: Scalars['DateTime'];
  /** The ID of the drop that facilitated the purchase, if any. */
  dropId?: Maybe<Scalars['UUID']>;
  /** The ID of the purchase. */
  id: Scalars['UUID'];
  /** The ID of the NFT being purchased. */
  mintId: Scalars['UUID'];
  /** The amount spent on the purchase. */
  spent: Scalars['Int'];
  /** The status of the creation of the NFT. */
  status: CreationStatus;
  /** The signature of the transaction, if any. */
  txSignature?: Maybe<Scalars['String']>;
  /** The wallet address of the buyer. */
  wallet: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  collections?: Maybe<Array<Maybe<CollectionMint>>>;
  /**
   * Returns a list of `ActionCost` which represents the cost of each action on different blockchains.
   *
   * # Errors
   * This function fails if it fails to get `CreditsClient` or if blockchain enum conversion fails.
   */
  creditSheet: Array<ActionCost>;
  drop?: Maybe<Drop>;
  /**
   * Returns a list of event types that an external service can subscribe to.
   *
   * # Returns
   *
   * A vector of EventType objects representing the different event types that can be subscribed to.
   *
   * # Errors
   *
   * This function returns an error if there was a problem with retrieving the event types.
   */
  eventTypes: Array<EventType>;
  /** Retrieve a member invitation by its ID. */
  invite?: Maybe<Invite>;
  me?: Maybe<User>;
  /** Query an organization by its ID, this query returns `null` if the organization does not exist. */
  organization?: Maybe<Organization>;
  /** Query a project by it's ID, this query returns `null` if the project does not exist. */
  project?: Maybe<Project>;
  /** Retrieve a user identity by providing their ID. */
  user?: Maybe<User>;
};


export type QueryInviteArgs = {
  id: Scalars['UUID'];
};


export type QueryOrganizationArgs = {
  id: Scalars['UUID'];
};


export type QueryProjectArgs = {
  id: Scalars['UUID'];
};


export type QueryUserArgs = {
  id: Scalars['UUID'];
};

export type ReactivateMemberInput = {
  id: Scalars['UUID'];
};

/** Represents input fields for resuming a paused drop. */
export type ResumeDropInput = {
  drop: Scalars['UUID'];
};

/** Represents the result of a successful resume drop mutation. */
export type ResumeDropPayload = {
  __typename?: 'ResumeDropPayload';
  /** The drop that has been resumed. */
  drop: Drop;
};

export type RetryDropInput = {
  drop: Scalars['UUID'];
};

/** Represents input data for `retry_mint` mutation with an ID as a field of type UUID */
export type RetryMintInput = {
  id: Scalars['UUID'];
};

/** Represents payload data for `retry_mint` mutation */
export type RetryMintPayload = {
  __typename?: 'RetryMintPayload';
  collectionMint: CollectionMint;
};

/** Represents the input fields for shutting down a drop */
export type ShutdownDropInput = {
  drop: Scalars['UUID'];
};

/** Represents the result of a successful shutdown drop mutation */
export type ShutdownDropPayload = {
  __typename?: 'ShutdownDropPayload';
  /** Drop that has been shutdown */
  drop: Drop;
};

export type TransferAssetInput = {
  id: Scalars['UUID'];
  recipient: Scalars['String'];
};

export type TransferAssetPayload = {
  __typename?: 'TransferAssetPayload';
  mint: CollectionMint;
};

/** A collection of wallets assigned to different entities in the Holaplex ecosystem. */
export type Treasury = {
  __typename?: 'Treasury';
  /** The creation DateTimeWithTimeZone of the vault. */
  createdAt: Scalars['DateTime'];
  /** The unique identifier for the treasury. */
  id: Scalars['UUID'];
  /**
   * The associated Fireblocks vault ID.
   * ## Reference
   * [Vault Objects](https://docs.fireblocks.com/api/#vault-objects)
   */
  vaultId: Scalars['String'];
  /** Lookup a wallet based on its `asset_type`. */
  wallet?: Maybe<Wallet>;
  /** The treasury's associated wallets. */
  wallets?: Maybe<Array<Wallet>>;
};


/** A collection of wallets assigned to different entities in the Holaplex ecosystem. */
export type TreasuryWalletArgs = {
  assetType: AssetType;
};

/** A unique user identity across the entire Holaplex ecosystem. A user can be associated with multiple organizations, but they are not required to have separate login credentials. */
export type User = {
  __typename?: 'User';
  affiliations: Array<Affiliation>;
  /** The timestamp in UTC when the user identity was created. */
  createdAt: Scalars['String'];
  /** The email address associated with the user identity. */
  email: Scalars['String'];
  /** The first name of the user identity. */
  firstName: Scalars['String'];
  /** The unique identifier for the user identity. */
  id: Scalars['UUID'];
  image?: Maybe<Scalars['String']>;
  /** The last name of the user identity. */
  lastName: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  /** The profile image associated with the user identity. */
  profileImage?: Maybe<Scalars['String']>;
  /** The timestamp in UTC when the user identity was last updated. */
  updatedAt: Scalars['String'];
  wallet?: Maybe<Wallet>;
};

/** A blockchain wallet is a digital wallet that allows users to securely store, manage, and transfer their cryptocurrencies or other digital assets on a blockchain network. */
export type Wallet = {
  __typename?: 'Wallet';
  /** The wallet address. */
  address?: Maybe<Scalars['String']>;
  /** The wallet's associated blockchain. */
  assetId: AssetType;
  createdAt: Scalars['DateTime'];
  createdBy: Scalars['UUID'];
  deductionId?: Maybe<Scalars['UUID']>;
  id: Scalars['UUID'];
  /** The NFTs that were minted from Holaplex and are owned by the wallet's address. */
  mints?: Maybe<Array<CollectionMint>>;
  removedAt?: Maybe<Scalars['DateTime']>;
  treasuryId: Scalars['UUID'];
};

/** A webhook represents an endpoint registered to receive notifications for specific events within a project. */
export type Webhook = {
  __typename?: 'Webhook';
  /** Retrieves the channels the webhook is subscribed to. */
  channels: Array<Scalars['String']>;
  /** Retrieves the creation datetime of the webhook. */
  createdAt: Scalars['NaiveDateTime'];
  /** The user who created the webhook. */
  createdBy?: Maybe<User>;
  /** Retrieves the ID of the user who created the webhook. */
  createdById: Scalars['UUID'];
  /** Retrieves the webhook's description. */
  description: Scalars['String'];
  /** Retrieves the ID of the webhook's endpoint. */
  endpointId: Scalars['String'];
  /** Retrieves the events the webhook is subscribed to. */
  events: Array<FilterType>;
  /** Retrieves the ID of the webhook. */
  id: Scalars['UUID'];
  /** Retrieves the ID of the organization the webhook belongs to. */
  organizationId: Scalars['UUID'];
  /** This field specifies the list of projects for which an associated object will trigger a webhook event. */
  projects: Array<Project>;
  /** Retrieves the last update datetime of the webhook. */
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** Retrieves the URL of the webhook's endpoint. */
  url: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

/** Mapping of union types */
export type ResolversUnionTypes = {
  Affiliation: ( Member ) | ( Owner );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AcceptInviteInput: AcceptInviteInput;
  AcceptInvitePayload: ResolverTypeWrapper<AcceptInvitePayload>;
  AccessToken: ResolverTypeWrapper<AccessToken>;
  Action: Action;
  ActionCost: ResolverTypeWrapper<ActionCost>;
  Affiliation: ResolverTypeWrapper<ResolversUnionTypes['Affiliation']>;
  AssetType: AssetType;
  Blockchain: Blockchain;
  BlockchainCost: ResolverTypeWrapper<BlockchainCost>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Collection: ResolverTypeWrapper<Collection>;
  CollectionCreator: ResolverTypeWrapper<CollectionCreator>;
  CollectionCreatorInput: CollectionCreatorInput;
  CollectionMint: ResolverTypeWrapper<CollectionMint>;
  CreateCredentialInput: CreateCredentialInput;
  CreateCredentialPayload: ResolverTypeWrapper<CreateCredentialPayload>;
  CreateCustomerInput: CreateCustomerInput;
  CreateCustomerPayload: ResolverTypeWrapper<CreateCustomerPayload>;
  CreateCustomerWalletInput: CreateCustomerWalletInput;
  CreateCustomerWalletPayload: ResolverTypeWrapper<CreateCustomerWalletPayload>;
  CreateDropInput: CreateDropInput;
  CreateDropPayload: ResolverTypeWrapper<CreateDropPayload>;
  CreateOrganizationInput: CreateOrganizationInput;
  CreateOrganizationPayload: ResolverTypeWrapper<CreateOrganizationPayload>;
  CreateProjectInput: CreateProjectInput;
  CreateProjectPayload: ResolverTypeWrapper<CreateProjectPayload>;
  CreateWebhookInput: CreateWebhookInput;
  CreateWebhookPayload: ResolverTypeWrapper<CreateWebhookPayload>;
  CreationStatus: CreationStatus;
  Credential: ResolverTypeWrapper<Credential>;
  CreditDeposit: ResolverTypeWrapper<CreditDeposit>;
  Credits: ResolverTypeWrapper<Credits>;
  Customer: ResolverTypeWrapper<Customer>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeactivateMemberInput: DeactivateMemberInput;
  DeductionTotals: ResolverTypeWrapper<DeductionTotals>;
  DeleteCredentialInput: DeleteCredentialInput;
  DeleteCredentialPayload: ResolverTypeWrapper<DeleteCredentialPayload>;
  DeleteWebhookInput: DeleteWebhookInput;
  DeleteWebhookPayload: ResolverTypeWrapper<DeleteWebhookPayload>;
  DepositReason: DepositReason;
  Drop: ResolverTypeWrapper<Drop>;
  DropStatus: DropStatus;
  EditCredentialInput: EditCredentialInput;
  EditCredentialPayload: ResolverTypeWrapper<EditCredentialPayload>;
  EditOrganizationInput: EditOrganizationInput;
  EditOrganizationPayload: ResolverTypeWrapper<EditOrganizationPayload>;
  EditProjectInput: EditProjectInput;
  EditProjectPayload: ResolverTypeWrapper<EditProjectPayload>;
  EditWebhookInput: EditWebhookInput;
  EditWebhookPayload: ResolverTypeWrapper<EditWebhookPayload>;
  EventType: ResolverTypeWrapper<EventType>;
  FilterType: FilterType;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Holder: ResolverTypeWrapper<Holder>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Invite: ResolverTypeWrapper<Invite>;
  InviteMemberInput: InviteMemberInput;
  InviteStatus: InviteStatus;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Member: ResolverTypeWrapper<Member>;
  MetadataJson: ResolverTypeWrapper<MetadataJson>;
  MetadataJsonAttribute: ResolverTypeWrapper<MetadataJsonAttribute>;
  MetadataJsonAttributeInput: MetadataJsonAttributeInput;
  MetadataJsonCollectionInput: MetadataJsonCollectionInput;
  MetadataJsonFileInput: MetadataJsonFileInput;
  MetadataJsonInput: MetadataJsonInput;
  MetadataJsonPropertyInput: MetadataJsonPropertyInput;
  MintDropInput: MintDropInput;
  MintEditionPayload: ResolverTypeWrapper<MintEditionPayload>;
  Mutation: ResolverTypeWrapper<{}>;
  NaiveDateTime: ResolverTypeWrapper<Scalars['NaiveDateTime']>;
  Organization: ResolverTypeWrapper<Organization>;
  Owner: ResolverTypeWrapper<Owner>;
  PatchDropInput: PatchDropInput;
  PatchDropPayload: ResolverTypeWrapper<PatchDropPayload>;
  PauseDropInput: PauseDropInput;
  PauseDropPayload: ResolverTypeWrapper<PauseDropPayload>;
  Project: ResolverTypeWrapper<Project>;
  Purchase: ResolverTypeWrapper<Purchase>;
  Query: ResolverTypeWrapper<{}>;
  ReactivateMemberInput: ReactivateMemberInput;
  ResumeDropInput: ResumeDropInput;
  ResumeDropPayload: ResolverTypeWrapper<ResumeDropPayload>;
  RetryDropInput: RetryDropInput;
  RetryMintInput: RetryMintInput;
  RetryMintPayload: ResolverTypeWrapper<RetryMintPayload>;
  ShutdownDropInput: ShutdownDropInput;
  ShutdownDropPayload: ResolverTypeWrapper<ShutdownDropPayload>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TransferAssetInput: TransferAssetInput;
  TransferAssetPayload: ResolverTypeWrapper<TransferAssetPayload>;
  Treasury: ResolverTypeWrapper<Treasury>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  User: ResolverTypeWrapper<Omit<User, 'affiliations'> & { affiliations: Array<ResolversTypes['Affiliation']> }>;
  Wallet: ResolverTypeWrapper<Wallet>;
  Webhook: ResolverTypeWrapper<Webhook>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AcceptInviteInput: AcceptInviteInput;
  AcceptInvitePayload: AcceptInvitePayload;
  AccessToken: AccessToken;
  ActionCost: ActionCost;
  Affiliation: ResolversUnionTypes['Affiliation'];
  BlockchainCost: BlockchainCost;
  Boolean: Scalars['Boolean'];
  Collection: Collection;
  CollectionCreator: CollectionCreator;
  CollectionCreatorInput: CollectionCreatorInput;
  CollectionMint: CollectionMint;
  CreateCredentialInput: CreateCredentialInput;
  CreateCredentialPayload: CreateCredentialPayload;
  CreateCustomerInput: CreateCustomerInput;
  CreateCustomerPayload: CreateCustomerPayload;
  CreateCustomerWalletInput: CreateCustomerWalletInput;
  CreateCustomerWalletPayload: CreateCustomerWalletPayload;
  CreateDropInput: CreateDropInput;
  CreateDropPayload: CreateDropPayload;
  CreateOrganizationInput: CreateOrganizationInput;
  CreateOrganizationPayload: CreateOrganizationPayload;
  CreateProjectInput: CreateProjectInput;
  CreateProjectPayload: CreateProjectPayload;
  CreateWebhookInput: CreateWebhookInput;
  CreateWebhookPayload: CreateWebhookPayload;
  Credential: Credential;
  CreditDeposit: CreditDeposit;
  Credits: Credits;
  Customer: Customer;
  DateTime: Scalars['DateTime'];
  DeactivateMemberInput: DeactivateMemberInput;
  DeductionTotals: DeductionTotals;
  DeleteCredentialInput: DeleteCredentialInput;
  DeleteCredentialPayload: DeleteCredentialPayload;
  DeleteWebhookInput: DeleteWebhookInput;
  DeleteWebhookPayload: DeleteWebhookPayload;
  Drop: Drop;
  EditCredentialInput: EditCredentialInput;
  EditCredentialPayload: EditCredentialPayload;
  EditOrganizationInput: EditOrganizationInput;
  EditOrganizationPayload: EditOrganizationPayload;
  EditProjectInput: EditProjectInput;
  EditProjectPayload: EditProjectPayload;
  EditWebhookInput: EditWebhookInput;
  EditWebhookPayload: EditWebhookPayload;
  EventType: EventType;
  Float: Scalars['Float'];
  Holder: Holder;
  Int: Scalars['Int'];
  Invite: Invite;
  InviteMemberInput: InviteMemberInput;
  JSON: Scalars['JSON'];
  Member: Member;
  MetadataJson: MetadataJson;
  MetadataJsonAttribute: MetadataJsonAttribute;
  MetadataJsonAttributeInput: MetadataJsonAttributeInput;
  MetadataJsonCollectionInput: MetadataJsonCollectionInput;
  MetadataJsonFileInput: MetadataJsonFileInput;
  MetadataJsonInput: MetadataJsonInput;
  MetadataJsonPropertyInput: MetadataJsonPropertyInput;
  MintDropInput: MintDropInput;
  MintEditionPayload: MintEditionPayload;
  Mutation: {};
  NaiveDateTime: Scalars['NaiveDateTime'];
  Organization: Organization;
  Owner: Owner;
  PatchDropInput: PatchDropInput;
  PatchDropPayload: PatchDropPayload;
  PauseDropInput: PauseDropInput;
  PauseDropPayload: PauseDropPayload;
  Project: Project;
  Purchase: Purchase;
  Query: {};
  ReactivateMemberInput: ReactivateMemberInput;
  ResumeDropInput: ResumeDropInput;
  ResumeDropPayload: ResumeDropPayload;
  RetryDropInput: RetryDropInput;
  RetryMintInput: RetryMintInput;
  RetryMintPayload: RetryMintPayload;
  ShutdownDropInput: ShutdownDropInput;
  ShutdownDropPayload: ShutdownDropPayload;
  String: Scalars['String'];
  TransferAssetInput: TransferAssetInput;
  TransferAssetPayload: TransferAssetPayload;
  Treasury: Treasury;
  UUID: Scalars['UUID'];
  User: Omit<User, 'affiliations'> & { affiliations: Array<ResolversParentTypes['Affiliation']> };
  Wallet: Wallet;
  Webhook: Webhook;
};

export type DeferDirectiveArgs = {
  if?: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
};

export type DeferDirectiveResolver<Result, Parent, ContextType = any, Args = DeferDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AcceptInvitePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AcceptInvitePayload'] = ResolversParentTypes['AcceptInvitePayload']> = {
  invite?: Resolver<ResolversTypes['Invite'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccessTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessToken'] = ResolversParentTypes['AccessToken']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['NaiveDateTime'], ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionCostResolvers<ContextType = any, ParentType extends ResolversParentTypes['ActionCost'] = ResolversParentTypes['ActionCost']> = {
  action?: Resolver<ResolversTypes['Action'], ParentType, ContextType>;
  blockchains?: Resolver<Array<ResolversTypes['BlockchainCost']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AffiliationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Affiliation'] = ResolversParentTypes['Affiliation']> = {
  __resolveType: TypeResolveFn<'Member' | 'Owner', ParentType, ContextType>;
};

export type BlockchainCostResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlockchainCost'] = ResolversParentTypes['BlockchainCost']> = {
  blockchain?: Resolver<ResolversTypes['Blockchain'], ParentType, ContextType>;
  credits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blockchain?: Resolver<ResolversTypes['Blockchain'], ParentType, ContextType>;
  creationStatus?: Resolver<ResolversTypes['CreationStatus'], ParentType, ContextType>;
  creators?: Resolver<Maybe<Array<ResolversTypes['CollectionCreator']>>, ParentType, ContextType>;
  holders?: Resolver<Maybe<Array<ResolversTypes['Holder']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  metadataJson?: Resolver<Maybe<ResolversTypes['MetadataJson']>, ParentType, ContextType>;
  mints?: Resolver<Maybe<Array<ResolversTypes['CollectionMint']>>, ParentType, ContextType>;
  purchases?: Resolver<Maybe<Array<ResolversTypes['Purchase']>>, ParentType, ContextType>;
  sellerFeeBasisPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  supply?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalMints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionCreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionCreator'] = ResolversParentTypes['CollectionCreator']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collectionId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  share?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionMintResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionMint'] = ResolversParentTypes['CollectionMint']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  collectionId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  creationStatus?: Resolver<ResolversTypes['CreationStatus'], ParentType, ContextType>;
  creditsDeductionId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  edition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  metadataJson?: Resolver<Maybe<ResolversTypes['MetadataJson']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sellerFeeBasisPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCredentialPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCredentialPayload'] = ResolversParentTypes['CreateCredentialPayload']> = {
  accessToken?: Resolver<ResolversTypes['AccessToken'], ParentType, ContextType>;
  credential?: Resolver<ResolversTypes['Credential'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCustomerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCustomerPayload'] = ResolversParentTypes['CreateCustomerPayload']> = {
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCustomerWalletPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCustomerWalletPayload'] = ResolversParentTypes['CreateCustomerWalletPayload']> = {
  wallet?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateDropPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateDropPayload'] = ResolversParentTypes['CreateDropPayload']> = {
  drop?: Resolver<ResolversTypes['Drop'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateOrganizationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOrganizationPayload'] = ResolversParentTypes['CreateOrganizationPayload']> = {
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateProjectPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateProjectPayload'] = ResolversParentTypes['CreateProjectPayload']> = {
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateWebhookPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateWebhookPayload'] = ResolversParentTypes['CreateWebhookPayload']> = {
  secret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webhook?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CredentialResolvers<ContextType = any, ParentType extends ResolversParentTypes['Credential'] = ResolversParentTypes['Credential']> = {
  clientId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['NaiveDateTime'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdById?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreditDepositResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreditDeposit'] = ResolversParentTypes['CreditDeposit']> = {
  cost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  initiatedBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  perCreditCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['DepositReason'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreditsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Credits'] = ResolversParentTypes['Credits']> = {
  balance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deposits?: Resolver<Maybe<Array<ResolversTypes['CreditDeposit']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  addresses?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['NaiveDateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  mints?: Resolver<Maybe<Array<ResolversTypes['CollectionMint']>>, ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  treasury?: Resolver<Maybe<ResolversTypes['Treasury']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['NaiveDateTime']>, ParentType, ContextType>;
  wallet?: Resolver<Maybe<Array<ResolversTypes['Wallet']>>, ParentType, ContextType, Partial<CustomerWalletArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeductionTotalsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeductionTotals'] = ResolversParentTypes['DeductionTotals']> = {
  action?: Resolver<ResolversTypes['Action'], ParentType, ContextType>;
  spent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteCredentialPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteCredentialPayload'] = ResolversParentTypes['DeleteCredentialPayload']> = {
  credential?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteWebhookPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteWebhookPayload'] = ResolversParentTypes['DeleteWebhookPayload']> = {
  webhook?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DropResolvers<ContextType = any, ParentType extends ResolversParentTypes['Drop'] = ResolversParentTypes['Drop']> = {
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdById?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  creationStatus?: Resolver<ResolversTypes['CreationStatus'], ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  pausedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  purchases?: Resolver<Maybe<Array<ResolversTypes['Purchase']>>, ParentType, ContextType>;
  shutdownAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['DropStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditCredentialPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditCredentialPayload'] = ResolversParentTypes['EditCredentialPayload']> = {
  credential?: Resolver<ResolversTypes['Credential'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditOrganizationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditOrganizationPayload'] = ResolversParentTypes['EditOrganizationPayload']> = {
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditProjectPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditProjectPayload'] = ResolversParentTypes['EditProjectPayload']> = {
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditWebhookPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditWebhookPayload'] = ResolversParentTypes['EditWebhookPayload']> = {
  webhook?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventType'] = ResolversParentTypes['EventType']> = {
  archived?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schemas?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HolderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Holder'] = ResolversParentTypes['Holder']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collectionId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  mints?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  owns?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invite'] = ResolversParentTypes['Invite']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  member?: Resolver<Maybe<ResolversTypes['Member']>, ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['InviteStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deactivatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  invite?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType>;
  inviteId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  revokedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetadataJsonResolvers<ContextType = any, ParentType extends ResolversParentTypes['MetadataJson'] = ResolversParentTypes['MetadataJson']> = {
  animationUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attributes?: Resolver<Maybe<Array<ResolversTypes['MetadataJsonAttribute']>>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externalUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageOriginal?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetadataJsonAttributeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MetadataJsonAttribute'] = ResolversParentTypes['MetadataJsonAttribute']> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  metadataJsonId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  traitType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MintEditionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['MintEditionPayload'] = ResolversParentTypes['MintEditionPayload']> = {
  collectionMint?: Resolver<ResolversTypes['CollectionMint'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptInvite?: Resolver<ResolversTypes['AcceptInvitePayload'], ParentType, ContextType, RequireFields<MutationAcceptInviteArgs, 'input'>>;
  createCredential?: Resolver<ResolversTypes['CreateCredentialPayload'], ParentType, ContextType, RequireFields<MutationCreateCredentialArgs, 'input'>>;
  createCustomer?: Resolver<ResolversTypes['CreateCustomerPayload'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'input'>>;
  createCustomerWallet?: Resolver<ResolversTypes['CreateCustomerWalletPayload'], ParentType, ContextType, RequireFields<MutationCreateCustomerWalletArgs, 'input'>>;
  createDrop?: Resolver<ResolversTypes['CreateDropPayload'], ParentType, ContextType, RequireFields<MutationCreateDropArgs, 'input'>>;
  createOrganization?: Resolver<ResolversTypes['CreateOrganizationPayload'], ParentType, ContextType, RequireFields<MutationCreateOrganizationArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['CreateProjectPayload'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  createWebhook?: Resolver<ResolversTypes['CreateWebhookPayload'], ParentType, ContextType, RequireFields<MutationCreateWebhookArgs, 'input'>>;
  deactivateMember?: Resolver<ResolversTypes['Member'], ParentType, ContextType, RequireFields<MutationDeactivateMemberArgs, 'input'>>;
  deleteCredential?: Resolver<ResolversTypes['DeleteCredentialPayload'], ParentType, ContextType, RequireFields<MutationDeleteCredentialArgs, 'input'>>;
  deleteWebhook?: Resolver<ResolversTypes['DeleteWebhookPayload'], ParentType, ContextType, RequireFields<MutationDeleteWebhookArgs, 'input'>>;
  editCredential?: Resolver<ResolversTypes['EditCredentialPayload'], ParentType, ContextType, RequireFields<MutationEditCredentialArgs, 'input'>>;
  editOrganization?: Resolver<ResolversTypes['EditOrganizationPayload'], ParentType, ContextType, RequireFields<MutationEditOrganizationArgs, 'input'>>;
  editProject?: Resolver<ResolversTypes['EditProjectPayload'], ParentType, ContextType, RequireFields<MutationEditProjectArgs, 'input'>>;
  editWebhook?: Resolver<ResolversTypes['EditWebhookPayload'], ParentType, ContextType, RequireFields<MutationEditWebhookArgs, 'input'>>;
  inviteMember?: Resolver<ResolversTypes['Invite'], ParentType, ContextType, RequireFields<MutationInviteMemberArgs, 'input'>>;
  mint?: Resolver<Maybe<ResolversTypes['CollectionMint']>, ParentType, ContextType>;
  mintEdition?: Resolver<ResolversTypes['MintEditionPayload'], ParentType, ContextType, RequireFields<MutationMintEditionArgs, 'input'>>;
  patchDrop?: Resolver<ResolversTypes['PatchDropPayload'], ParentType, ContextType, RequireFields<MutationPatchDropArgs, 'input'>>;
  pauseDrop?: Resolver<ResolversTypes['PauseDropPayload'], ParentType, ContextType, RequireFields<MutationPauseDropArgs, 'input'>>;
  reactivateMember?: Resolver<ResolversTypes['Member'], ParentType, ContextType, RequireFields<MutationReactivateMemberArgs, 'input'>>;
  resumeDrop?: Resolver<ResolversTypes['ResumeDropPayload'], ParentType, ContextType, RequireFields<MutationResumeDropArgs, 'input'>>;
  retryDrop?: Resolver<ResolversTypes['CreateDropPayload'], ParentType, ContextType, RequireFields<MutationRetryDropArgs, 'input'>>;
  retryMint?: Resolver<ResolversTypes['RetryMintPayload'], ParentType, ContextType, RequireFields<MutationRetryMintArgs, 'input'>>;
  shutdownDrop?: Resolver<ResolversTypes['ShutdownDropPayload'], ParentType, ContextType, RequireFields<MutationShutdownDropArgs, 'input'>>;
  transferAsset?: Resolver<ResolversTypes['TransferAssetPayload'], ParentType, ContextType, RequireFields<MutationTransferAssetArgs, 'input'>>;
};

export interface NaiveDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NaiveDateTime'], any> {
  name: 'NaiveDateTime';
}

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  credential?: Resolver<ResolversTypes['Credential'], ParentType, ContextType, RequireFields<OrganizationCredentialArgs, 'clientId'>>;
  credentials?: Resolver<Array<ResolversTypes['Credential']>, ParentType, ContextType, Partial<OrganizationCredentialsArgs>>;
  credits?: Resolver<Maybe<ResolversTypes['Credits']>, ParentType, ContextType>;
  deactivatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deductionTotals?: Resolver<Maybe<Array<ResolversTypes['DeductionTotals']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  invites?: Resolver<Array<ResolversTypes['Invite']>, ParentType, ContextType, Partial<OrganizationInvitesArgs>>;
  members?: Resolver<Maybe<Array<ResolversTypes['Member']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType>;
  profileImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profileImageUrlOriginal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  webhook?: Resolver<Maybe<ResolversTypes['Webhook']>, ParentType, ContextType, RequireFields<OrganizationWebhookArgs, 'id'>>;
  webhooks?: Resolver<Maybe<Array<ResolversTypes['Webhook']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PatchDropPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PatchDropPayload'] = ResolversParentTypes['PatchDropPayload']> = {
  drop?: Resolver<ResolversTypes['Drop'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PauseDropPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PauseDropPayload'] = ResolversParentTypes['PauseDropPayload']> = {
  drop?: Resolver<ResolversTypes['Drop'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<ProjectCustomerArgs, 'id'>>;
  customers?: Resolver<Maybe<Array<ResolversTypes['Customer']>>, ParentType, ContextType>;
  deactivatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  drop?: Resolver<Maybe<ResolversTypes['Drop']>, ParentType, ContextType, RequireFields<ProjectDropArgs, 'id'>>;
  drops?: Resolver<Maybe<Array<ResolversTypes['Drop']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profileImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profileImageUrlOriginal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  treasury?: Resolver<Maybe<ResolversTypes['Treasury']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PurchaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Purchase'] = ResolversParentTypes['Purchase']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dropId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  mintId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  spent?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['CreationStatus'], ParentType, ContextType>;
  txSignature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wallet?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  collections?: Resolver<Maybe<Array<Maybe<ResolversTypes['CollectionMint']>>>, ParentType, ContextType>;
  creditSheet?: Resolver<Array<ResolversTypes['ActionCost']>, ParentType, ContextType>;
  drop?: Resolver<Maybe<ResolversTypes['Drop']>, ParentType, ContextType>;
  eventTypes?: Resolver<Array<ResolversTypes['EventType']>, ParentType, ContextType>;
  invite?: Resolver<Maybe<ResolversTypes['Invite']>, ParentType, ContextType, RequireFields<QueryInviteArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<QueryOrganizationArgs, 'id'>>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type ResumeDropPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResumeDropPayload'] = ResolversParentTypes['ResumeDropPayload']> = {
  drop?: Resolver<ResolversTypes['Drop'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RetryMintPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RetryMintPayload'] = ResolversParentTypes['RetryMintPayload']> = {
  collectionMint?: Resolver<ResolversTypes['CollectionMint'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShutdownDropPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShutdownDropPayload'] = ResolversParentTypes['ShutdownDropPayload']> = {
  drop?: Resolver<ResolversTypes['Drop'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransferAssetPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransferAssetPayload'] = ResolversParentTypes['TransferAssetPayload']> = {
  mint?: Resolver<ResolversTypes['CollectionMint'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TreasuryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Treasury'] = ResolversParentTypes['Treasury']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  vaultId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType, RequireFields<TreasuryWalletArgs, 'assetType'>>;
  wallets?: Resolver<Maybe<Array<ResolversTypes['Wallet']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  affiliations?: Resolver<Array<ResolversTypes['Affiliation']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WalletResolvers<ContextType = any, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  assetId?: Resolver<ResolversTypes['AssetType'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  deductionId?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  mints?: Resolver<Maybe<Array<ResolversTypes['CollectionMint']>>, ParentType, ContextType>;
  removedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  treasuryId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Webhook'] = ResolversParentTypes['Webhook']> = {
  channels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['NaiveDateTime'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdById?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endpointId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['FilterType']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  organizationId?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['NaiveDateTime']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AcceptInvitePayload?: AcceptInvitePayloadResolvers<ContextType>;
  AccessToken?: AccessTokenResolvers<ContextType>;
  ActionCost?: ActionCostResolvers<ContextType>;
  Affiliation?: AffiliationResolvers<ContextType>;
  BlockchainCost?: BlockchainCostResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CollectionCreator?: CollectionCreatorResolvers<ContextType>;
  CollectionMint?: CollectionMintResolvers<ContextType>;
  CreateCredentialPayload?: CreateCredentialPayloadResolvers<ContextType>;
  CreateCustomerPayload?: CreateCustomerPayloadResolvers<ContextType>;
  CreateCustomerWalletPayload?: CreateCustomerWalletPayloadResolvers<ContextType>;
  CreateDropPayload?: CreateDropPayloadResolvers<ContextType>;
  CreateOrganizationPayload?: CreateOrganizationPayloadResolvers<ContextType>;
  CreateProjectPayload?: CreateProjectPayloadResolvers<ContextType>;
  CreateWebhookPayload?: CreateWebhookPayloadResolvers<ContextType>;
  Credential?: CredentialResolvers<ContextType>;
  CreditDeposit?: CreditDepositResolvers<ContextType>;
  Credits?: CreditsResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeductionTotals?: DeductionTotalsResolvers<ContextType>;
  DeleteCredentialPayload?: DeleteCredentialPayloadResolvers<ContextType>;
  DeleteWebhookPayload?: DeleteWebhookPayloadResolvers<ContextType>;
  Drop?: DropResolvers<ContextType>;
  EditCredentialPayload?: EditCredentialPayloadResolvers<ContextType>;
  EditOrganizationPayload?: EditOrganizationPayloadResolvers<ContextType>;
  EditProjectPayload?: EditProjectPayloadResolvers<ContextType>;
  EditWebhookPayload?: EditWebhookPayloadResolvers<ContextType>;
  EventType?: EventTypeResolvers<ContextType>;
  Holder?: HolderResolvers<ContextType>;
  Invite?: InviteResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Member?: MemberResolvers<ContextType>;
  MetadataJson?: MetadataJsonResolvers<ContextType>;
  MetadataJsonAttribute?: MetadataJsonAttributeResolvers<ContextType>;
  MintEditionPayload?: MintEditionPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NaiveDateTime?: GraphQLScalarType;
  Organization?: OrganizationResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  PatchDropPayload?: PatchDropPayloadResolvers<ContextType>;
  PauseDropPayload?: PauseDropPayloadResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Purchase?: PurchaseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResumeDropPayload?: ResumeDropPayloadResolvers<ContextType>;
  RetryMintPayload?: RetryMintPayloadResolvers<ContextType>;
  ShutdownDropPayload?: ShutdownDropPayloadResolvers<ContextType>;
  TransferAssetPayload?: TransferAssetPayloadResolvers<ContextType>;
  Treasury?: TreasuryResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
  Webhook?: WebhookResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  defer?: DeferDirectiveResolver<any, any, ContextType>;
};
