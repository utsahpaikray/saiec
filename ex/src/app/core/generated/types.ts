export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: any;
  Byte: any;
  DateTime: any;
  Long: any;
  URL: any;
  UUID: any;
};

export type AccountManagerContact = {
  __typename?: 'AccountManagerContact';
  alternativeContactTitle?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  show: Scalars['Boolean'];
  userId?: Maybe<Scalars['UUID']>;
};

export type AccountManagerContactDtoInput = {
  alternativeContactTitle: Scalars['String'];
  show: Scalars['Boolean'];
};

export type AccountManagerContactFilterInput = {
  alternativeContactTitle?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<AccountManagerContactFilterInput>>;
  emailAddress?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AccountManagerContactFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  show?: InputMaybe<BooleanOperationFilterInput>;
  site?: InputMaybe<SiteFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type AccountManagerContactSortInput = {
  alternativeContactTitle?: InputMaybe<SortEnumType>;
  emailAddress?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  show?: InputMaybe<SortEnumType>;
  site?: InputMaybe<SiteSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type Agreement = {
  __typename?: 'Agreement';
  agreementId: Scalars['String'];
  contractLines: Array<ContractLine>;
  customerSourceId?: Maybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  id: Scalars['UUID'];
  portalId?: Maybe<Scalars['UUID']>;
  renewalDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  status: AgreementStatus;
};


export type AgreementContractLinesArgs = {
  order?: InputMaybe<Array<ContractLineSortInput>>;
  where?: InputMaybe<ContractLineFilterInput>;
};

export type AgreementFilterInput = {
  agreementId?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<AgreementFilterInput>>;
  contractLines?: InputMaybe<ListFilterInputTypeOfContractLineFilterInput>;
  customerSourceId?: InputMaybe<StringOperationFilterInput>;
  endDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<AgreementFilterInput>>;
  portalId?: InputMaybe<UuidOperationFilterInput>;
  renewalDate?: InputMaybe<DateTimeOperationFilterInput>;
  startDate?: InputMaybe<DateTimeOperationFilterInput>;
  status?: InputMaybe<AgreementStatusOperationFilterInput>;
};

export type AgreementSortInput = {
  agreementId?: InputMaybe<SortEnumType>;
  customerSourceId?: InputMaybe<SortEnumType>;
  endDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  portalId?: InputMaybe<SortEnumType>;
  renewalDate?: InputMaybe<SortEnumType>;
  startDate?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
};

export enum AgreementStatus {
  Active = 'ACTIVE',
  Approved = 'APPROVED',
  Revised = 'REVISED'
}

export type AgreementStatusOperationFilterInput = {
  eq?: InputMaybe<AgreementStatus>;
  in?: InputMaybe<Array<AgreementStatus>>;
  neq?: InputMaybe<AgreementStatus>;
  nin?: InputMaybe<Array<AgreementStatus>>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type Asset = {
  __typename?: 'Asset';
  classificationLevel1?: Maybe<Scalars['String']>;
  classificationLevel2?: Maybe<Scalars['String']>;
  classificationLevel3?: Maybe<Scalars['String']>;
  classificationLevel4?: Maybe<Scalars['String']>;
  classificationLevel5?: Maybe<Scalars['String']>;
  customerNumber?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  itemNumber?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  markCode?: Maybe<Scalars['String']>;
  markNumber?: Maybe<Scalars['String']>;
  revision: Scalars['String'];
  siteId: Scalars['String'];
  sparePart?: Maybe<Scalars['Boolean']>;
  sparePartCategory?: Maybe<Scalars['String']>;
  systemComponentId: Scalars['String'];
};

/** A segment of a collection. */
export type AssetSearchCollectionSegment = {
  __typename?: 'AssetSearchCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Asset>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type Attachment = {
  __typename?: 'Attachment';
  ThumbnailUrlWithToken?: Maybe<Scalars['String']>;
  UrlWithToken: Scalars['String'];
  author: Author;
  contentType: Scalars['String'];
  dateTimeCreated: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  storagePath: Scalars['String'];
  thumbnailStoragePath?: Maybe<Scalars['String']>;
};

export type AttachmentFilterInput = {
  and?: InputMaybe<Array<AttachmentFilterInput>>;
  author?: InputMaybe<AuthorFilterInput>;
  dateTimeCreated?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  domainEvents?: InputMaybe<ListFilterInputTypeOfINotificationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AttachmentFilterInput>>;
  storagePath?: InputMaybe<StringOperationFilterInput>;
  thumbnailStoragePath?: InputMaybe<StringOperationFilterInput>;
  thumbnailUrl?: InputMaybe<StringOperationFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type AttachmentSortInput = {
  author?: InputMaybe<AuthorSortInput>;
  dateTimeCreated?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  storagePath?: InputMaybe<SortEnumType>;
  thumbnailStoragePath?: InputMaybe<SortEnumType>;
  thumbnailUrl?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
};

export type Author = {
  __typename?: 'Author';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  userId: Scalars['UUID'];
};

export type AuthorFilterInput = {
  and?: InputMaybe<Array<AuthorFilterInput>>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  middleName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AuthorFilterInput>>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type AuthorSortInput = {
  firstName?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  middleName?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

export type BlobItem = {
  __typename?: 'BlobItem';
  categoryCodeName: Scalars['String'];
  contentLength?: Maybe<Scalars['Long']>;
  culture: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  siteId: Scalars['String'];
};

export type BlobUploadInfo = {
  __typename?: 'BlobUploadInfo';
  blobName: Scalars['String'];
  containerName: Scalars['String'];
  fullBlobUri: Scalars['String'];
  sasToken: Scalars['String'];
  serviceUrl: Scalars['String'];
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

export type Case = {
  __typename?: 'Case';
  assetSystemComponentId?: Maybe<Scalars['String']>;
  attachments: Array<Attachment>;
  author?: Maybe<Author>;
  contactPerson?: Maybe<ContactPerson>;
  data?: Maybe<Scalars['Any']>;
  dateTimeCreated: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  messages: Array<Message>;
  referenceId?: Maybe<Scalars['String']>;
  references: Array<Reference>;
  siteId: Scalars['UUID'];
  siteSourceId: Scalars['String'];
  source: Source;
  status: CaseStatus;
  statusUpdates: Array<StatusUpdate>;
  ticketId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
  workOrders: Array<WorkOrder>;
};


export type CaseAttachmentsArgs = {
  order?: InputMaybe<Array<AttachmentSortInput>>;
  where?: InputMaybe<AttachmentFilterInput>;
};

export type CaseFilterInput = {
  and?: InputMaybe<Array<CaseFilterInput>>;
  assetSystemComponentId?: InputMaybe<StringOperationFilterInput>;
  attachments?: InputMaybe<ListFilterInputTypeOfAttachmentFilterInput>;
  author?: InputMaybe<AuthorFilterInput>;
  contactPerson?: InputMaybe<ContactPersonFilterInput>;
  customerSourceId?: InputMaybe<StringOperationFilterInput>;
  dateTimeCreated?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  domainEvents?: InputMaybe<ListFilterInputTypeOfINotificationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  messages?: InputMaybe<ListFilterInputTypeOfMessageFilterInput>;
  or?: InputMaybe<Array<CaseFilterInput>>;
  referenceId?: InputMaybe<StringOperationFilterInput>;
  references?: InputMaybe<ListFilterInputTypeOfReferenceFilterInput>;
  siteId?: InputMaybe<UuidOperationFilterInput>;
  siteSourceId?: InputMaybe<StringOperationFilterInput>;
  source?: InputMaybe<SourceOperationFilterInput>;
  status?: InputMaybe<CaseStatusOperationFilterInput>;
  statusUpdates?: InputMaybe<ListFilterInputTypeOfStatusUpdateFilterInput>;
  ticketId?: InputMaybe<StringOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  type?: InputMaybe<StringOperationFilterInput>;
  workOrders?: InputMaybe<ListFilterInputTypeOfWorkOrderFilterInput>;
};

export type CaseSortInput = {
  assetSystemComponentId?: InputMaybe<SortEnumType>;
  author?: InputMaybe<AuthorSortInput>;
  contactPerson?: InputMaybe<ContactPersonSortInput>;
  customerSourceId?: InputMaybe<SortEnumType>;
  data?: InputMaybe<SortEnumType>;
  dateTimeCreated?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  referenceId?: InputMaybe<SortEnumType>;
  siteId?: InputMaybe<SortEnumType>;
  siteSourceId?: InputMaybe<SortEnumType>;
  source?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  ticketId?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
};

export enum CaseStatus {
  Closed = 'CLOSED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN',
  Rejected = 'REJECTED'
}

export type CaseStatusOperationFilterInput = {
  eq?: InputMaybe<CaseStatus>;
  in?: InputMaybe<Array<CaseStatus>>;
  neq?: InputMaybe<CaseStatus>;
  nin?: InputMaybe<Array<CaseStatus>>;
};

export type CasesConfig = {
  __typename?: 'CasesConfig';
  divertHealthWorkOrderPromotionRule: WorkOrderPromotionRule;
  enabled: Scalars['Boolean'];
  monitronWorkOrderPromotionRule: WorkOrderPromotionRule;
  shuttleHealthWorkOrderPromotionRule: WorkOrderPromotionRule;
  vidiWorkOrderPromotionRule: WorkOrderPromotionRule;
};

export type CasesConfigFilterInput = {
  and?: InputMaybe<Array<CasesConfigFilterInput>>;
  divertHealthWorkOrderPromotionRule?: InputMaybe<WorkOrderPromotionRuleOperationFilterInput>;
  enabled?: InputMaybe<BooleanOperationFilterInput>;
  monitronWorkOrderPromotionRule?: InputMaybe<WorkOrderPromotionRuleOperationFilterInput>;
  or?: InputMaybe<Array<CasesConfigFilterInput>>;
  shuttleHealthWorkOrderPromotionRule?: InputMaybe<WorkOrderPromotionRuleOperationFilterInput>;
  vidiWorkOrderPromotionRule?: InputMaybe<WorkOrderPromotionRuleOperationFilterInput>;
};

export type CasesConfigSortInput = {
  divertHealthWorkOrderPromotionRule?: InputMaybe<SortEnumType>;
  enabled?: InputMaybe<SortEnumType>;
  monitronWorkOrderPromotionRule?: InputMaybe<SortEnumType>;
  shuttleHealthWorkOrderPromotionRule?: InputMaybe<SortEnumType>;
  vidiWorkOrderPromotionRule?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type CasesConnection = {
  __typename?: 'CasesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CasesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Case>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CasesEdge = {
  __typename?: 'CasesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Case;
};

export type Category = {
  __typename?: 'Category';
  categoryAccesses: Array<CategoryAccess>;
  categoryCultures: Array<CategoryCulture>;
  codeName: Scalars['String'];
  id: Scalars['UUID'];
};


export type CategoryCategoryAccessesArgs = {
  order?: InputMaybe<Array<CategoryAccessSortInput>>;
  where?: InputMaybe<CategoryAccessFilterInput>;
};


export type CategoryCategoryCulturesArgs = {
  order?: InputMaybe<Array<CategoryCultureSortInput>>;
  where?: InputMaybe<CategoryCultureFilterInput>;
};

export type CategoryAccess = {
  __typename?: 'CategoryAccess';
  id: Scalars['UUID'];
  roleReference: Scalars['String'];
};

export type CategoryAccessFilterInput = {
  and?: InputMaybe<Array<CategoryAccessFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<CategoryAccessFilterInput>>;
  roleReference?: InputMaybe<StringOperationFilterInput>;
};

export type CategoryAccessSortInput = {
  id?: InputMaybe<SortEnumType>;
  roleReference?: InputMaybe<SortEnumType>;
};

export type CategoryCulture = {
  __typename?: 'CategoryCulture';
  culture: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type CategoryCultureFilterInput = {
  and?: InputMaybe<Array<CategoryCultureFilterInput>>;
  culture?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CategoryCultureFilterInput>>;
};

export type CategoryCultureSortInput = {
  culture?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type CategoryFilterInput = {
  and?: InputMaybe<Array<CategoryFilterInput>>;
  categoryAccesses?: InputMaybe<ListFilterInputTypeOfCategoryAccessFilterInput>;
  categoryCultures?: InputMaybe<ListFilterInputTypeOfCategoryCultureFilterInput>;
  codeName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<CategoryFilterInput>>;
};

export type CategorySortInput = {
  codeName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  maximoCommentID: Scalars['String'];
  timeStamp: Scalars['DateTime'];
};

export type CommentFilterInput = {
  and?: InputMaybe<Array<CommentFilterInput>>;
  author?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  maximoCommentID?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CommentFilterInput>>;
  timeStamp?: InputMaybe<DateTimeOperationFilterInput>;
};

export type CommentSortInput = {
  author?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  maximoCommentID?: InputMaybe<SortEnumType>;
  timeStamp?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type CommentsConnection = {
  __typename?: 'CommentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CommentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Comment>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CommentsEdge = {
  __typename?: 'CommentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Comment;
};

export type ContactPerson = {
  __typename?: 'ContactPerson';
  emailAddress: Scalars['String'];
  name: Scalars['String'];
  samAccountName: Scalars['String'];
};

export type ContactPersonFilterInput = {
  and?: InputMaybe<Array<ContactPersonFilterInput>>;
  emailAddress?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ContactPersonFilterInput>>;
  samAccountName?: InputMaybe<StringOperationFilterInput>;
};

export type ContactPersonSortInput = {
  emailAddress?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  samAccountName?: InputMaybe<SortEnumType>;
};

export type ContractLine = {
  __typename?: 'ContractLine';
  byphone?: Maybe<Scalars['Float']>;
  calendarDescription?: Maybe<Scalars['String']>;
  days: Scalars['Int'];
  endDate: Scalars['DateTime'];
  hours: Scalars['Int'];
  id: Scalars['UUID'];
  laborIncluded?: Maybe<Scalars['Boolean']>;
  onsite?: Maybe<Scalars['Float']>;
  packageCode?: Maybe<Scalars['String']>;
  partsIncluded?: Maybe<Scalars['Boolean']>;
  siteId: Scalars['UUID'];
  siteSourceId: Scalars['String'];
  startDate: Scalars['DateTime'];
  subcdays?: Maybe<Scalars['Float']>;
  systemComponent?: Maybe<SystemComponent>;
  vidays?: Maybe<Scalars['Float']>;
  yearvisits?: Maybe<Scalars['Float']>;
};


export type ContractLineSystemComponentArgs = {
  order?: InputMaybe<Array<SystemComponentSortInput>>;
  where?: InputMaybe<SystemComponentFilterInput>;
};

export type ContractLineFilterInput = {
  agreement?: InputMaybe<AgreementFilterInput>;
  and?: InputMaybe<Array<ContractLineFilterInput>>;
  byphone?: InputMaybe<FloatOperationFilterInput>;
  calendarDescription?: InputMaybe<StringOperationFilterInput>;
  days?: InputMaybe<IntOperationFilterInput>;
  endDate?: InputMaybe<DateTimeOperationFilterInput>;
  hours?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  laborIncluded?: InputMaybe<BooleanOperationFilterInput>;
  onsite?: InputMaybe<FloatOperationFilterInput>;
  or?: InputMaybe<Array<ContractLineFilterInput>>;
  packageCode?: InputMaybe<StringOperationFilterInput>;
  partsIncluded?: InputMaybe<BooleanOperationFilterInput>;
  siteId?: InputMaybe<UuidOperationFilterInput>;
  siteSourceId?: InputMaybe<StringOperationFilterInput>;
  startDate?: InputMaybe<DateTimeOperationFilterInput>;
  subcdays?: InputMaybe<FloatOperationFilterInput>;
  systemComponent?: InputMaybe<SystemComponentFilterInput>;
  vidays?: InputMaybe<FloatOperationFilterInput>;
  yearvisits?: InputMaybe<FloatOperationFilterInput>;
};

export type ContractLineSortInput = {
  agreement?: InputMaybe<AgreementSortInput>;
  byphone?: InputMaybe<SortEnumType>;
  calendarDescription?: InputMaybe<SortEnumType>;
  days?: InputMaybe<SortEnumType>;
  endDate?: InputMaybe<SortEnumType>;
  hours?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  laborIncluded?: InputMaybe<SortEnumType>;
  onsite?: InputMaybe<SortEnumType>;
  packageCode?: InputMaybe<SortEnumType>;
  partsIncluded?: InputMaybe<SortEnumType>;
  siteId?: InputMaybe<SortEnumType>;
  siteSourceId?: InputMaybe<SortEnumType>;
  startDate?: InputMaybe<SortEnumType>;
  subcdays?: InputMaybe<SortEnumType>;
  systemComponent?: InputMaybe<SystemComponentSortInput>;
  vidays?: InputMaybe<SortEnumType>;
  yearvisits?: InputMaybe<SortEnumType>;
};

export type ContractManagerContact = {
  __typename?: 'ContractManagerContact';
  alternativeContactTitle?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['UUID']>;
};

export type ContractManagerContactDtoInput = {
  alternativeContactTitle: Scalars['String'];
};

export type ContractManagerContactFilterInput = {
  alternativeContactTitle?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<ContractManagerContactFilterInput>>;
  emailAddress?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ContractManagerContactFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  site?: InputMaybe<SiteFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type ContractManagerContactSortInput = {
  alternativeContactTitle?: InputMaybe<SortEnumType>;
  emailAddress?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  site?: InputMaybe<SiteSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type CreateCaseAttachmentInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  payloadBase64: Scalars['String'];
};

export type CreateCaseContactPersonInput = {
  emailAddress: Scalars['String'];
  name: Scalars['String'];
  samAccountName: Scalars['String'];
};

export type CultureInfo = {
  __typename?: 'CultureInfo';
  englishName: Scalars['String'];
  name: Scalars['String'];
  nativeName: Scalars['String'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type DivertHealthConfig = {
  __typename?: 'DivertHealthConfig';
  enabled: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
};

export type DivertHealthConfigFilterInput = {
  and?: InputMaybe<Array<DivertHealthConfigFilterInput>>;
  enabled?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<DivertHealthConfigFilterInput>>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type DivertHealthConfigSortInput = {
  enabled?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
};

export type DocumentFilterInput = {
  and?: InputMaybe<Array<DocumentFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  documentTypeCode?: InputMaybe<StringOperationFilterInput>;
  fileName?: InputMaybe<StringOperationFilterInput>;
  key?: InputMaybe<DocumentKeyFilterInput>;
  or?: InputMaybe<Array<DocumentFilterInput>>;
  releaseDate?: InputMaybe<DateTimeOperationFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type DocumentInput = {
  description: Scalars['String'];
  documentData: Scalars['String'];
  documentName: Scalars['String'];
};

export type DocumentKey = {
  __typename?: 'DocumentKey';
  number: Scalars['String'];
  revision: Scalars['String'];
};

export type DocumentKeyFilterInput = {
  and?: InputMaybe<Array<DocumentKeyFilterInput>>;
  number?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DocumentKeyFilterInput>>;
  revision?: InputMaybe<StringOperationFilterInput>;
};

export type DocumentKeySortInput = {
  number?: InputMaybe<SortEnumType>;
  revision?: InputMaybe<SortEnumType>;
};

export type DocumentSearchFilter = {
  __typename?: 'DocumentSearchFilter';
  filterField: Scalars['String'];
  filterString: Scalars['String'];
};

export type DocumentSearchFilterInput = {
  filterField: Scalars['String'];
  filterString: Scalars['String'];
};

export type DocumentSearchResult = {
  __typename?: 'DocumentSearchResult';
  count: Scalars['Long'];
  result: Array<DocumentSearchResultItem>;
};

export type DocumentSearchResultItem = {
  __typename?: 'DocumentSearchResultItem';
  category: Scalars['String'];
  contentHighlights: Array<Scalars['String']>;
  culture: Scalars['String'];
  location: Scalars['String'];
  metadata_language: Scalars['String'];
  metadata_storage_name: Scalars['String'];
  metadata_storage_path: Scalars['String'];
  metadata_storage_size: Scalars['Int'];
  site: Scalars['String'];
  storage_path: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  description: Scalars['String'];
  key?: Maybe<DocumentKey>;
  name?: Maybe<Scalars['String']>;
  releaseDate: Scalars['DateTime'];
  url: Scalars['String'];
};

export type FileSortInput = {
  description?: InputMaybe<SortEnumType>;
  key?: InputMaybe<DocumentKeySortInput>;
  name?: InputMaybe<SortEnumType>;
  releaseDate?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type FilesConnection = {
  __typename?: 'FilesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<FilesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<File>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type FilesEdge = {
  __typename?: 'FilesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: File;
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
  ngt?: InputMaybe<Scalars['Float']>;
  ngte?: InputMaybe<Scalars['Float']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  nlt?: InputMaybe<Scalars['Float']>;
  nlte?: InputMaybe<Scalars['Float']>;
};

export type GraphUser = {
  __typename?: 'GraphUser';
  accountEnabled: Scalars['Boolean'];
  customerEmail: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
};

export type INotificationFilterInput = {
  and?: InputMaybe<Array<INotificationFilterInput>>;
  or?: InputMaybe<Array<INotificationFilterInput>>;
};

export type IdentityUser = {
  __typename?: 'IdentityUser';
  assignableRoles: Array<Role>;
  customerEmail?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
  language?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  relatedPortalData?: Maybe<RelatedPortalData>;
  roles: Array<Role>;
  userType: UserType;
  username: Scalars['String'];
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export enum IssueType {
  Changerequest = 'CHANGEREQUEST',
  Incident = 'INCIDENT',
  Problemreport = 'PROBLEMREPORT',
  Servicerequest = 'SERVICEREQUEST'
}

export type IssueTypeOperationFilterInput = {
  eq?: InputMaybe<IssueType>;
  in?: InputMaybe<Array<IssueType>>;
  neq?: InputMaybe<IssueType>;
  nin?: InputMaybe<Array<IssueType>>;
};

export type ItManagerContact = {
  __typename?: 'ItManagerContact';
  alternativeContactTitle?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  show: Scalars['Boolean'];
  userId?: Maybe<Scalars['UUID']>;
};

export type ItManagerContactFilterInput = {
  alternativeContactTitle?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<ItManagerContactFilterInput>>;
  emailAddress?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ItManagerContactFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  show?: InputMaybe<BooleanOperationFilterInput>;
  site?: InputMaybe<SiteFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type ItManagerContactMutationDtoInput = {
  alternativeContactTitle: Scalars['String'];
  show: Scalars['Boolean'];
};

export type ItManagerContactSortInput = {
  alternativeContactTitle?: InputMaybe<SortEnumType>;
  emailAddress?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  show?: InputMaybe<SortEnumType>;
  site?: InputMaybe<SiteSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type ItemSearchCollectionSegment = {
  __typename?: 'ItemSearchCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Asset>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ListFilterInputTypeOfAttachmentFilterInput = {
  all?: InputMaybe<AttachmentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AttachmentFilterInput>;
  some?: InputMaybe<AttachmentFilterInput>;
};

export type ListFilterInputTypeOfCategoryAccessFilterInput = {
  all?: InputMaybe<CategoryAccessFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CategoryAccessFilterInput>;
  some?: InputMaybe<CategoryAccessFilterInput>;
};

export type ListFilterInputTypeOfCategoryCultureFilterInput = {
  all?: InputMaybe<CategoryCultureFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CategoryCultureFilterInput>;
  some?: InputMaybe<CategoryCultureFilterInput>;
};

export type ListFilterInputTypeOfCommentFilterInput = {
  all?: InputMaybe<CommentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CommentFilterInput>;
  some?: InputMaybe<CommentFilterInput>;
};

export type ListFilterInputTypeOfContractLineFilterInput = {
  all?: InputMaybe<ContractLineFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ContractLineFilterInput>;
  some?: InputMaybe<ContractLineFilterInput>;
};

export type ListFilterInputTypeOfDocumentFilterInput = {
  all?: InputMaybe<DocumentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<DocumentFilterInput>;
  some?: InputMaybe<DocumentFilterInput>;
};

export type ListFilterInputTypeOfINotificationFilterInput = {
  all?: InputMaybe<INotificationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<INotificationFilterInput>;
  some?: InputMaybe<INotificationFilterInput>;
};

export type ListFilterInputTypeOfMessageFilterInput = {
  all?: InputMaybe<MessageFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<MessageFilterInput>;
  some?: InputMaybe<MessageFilterInput>;
};

export type ListFilterInputTypeOfPortalFilterInput = {
  all?: InputMaybe<PortalFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<PortalFilterInput>;
  some?: InputMaybe<PortalFilterInput>;
};

export type ListFilterInputTypeOfProjectFilterInput = {
  all?: InputMaybe<ProjectFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ProjectFilterInput>;
  some?: InputMaybe<ProjectFilterInput>;
};

export type ListFilterInputTypeOfReferenceFilterInput = {
  all?: InputMaybe<ReferenceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ReferenceFilterInput>;
  some?: InputMaybe<ReferenceFilterInput>;
};

export type ListFilterInputTypeOfSiteFilterInput = {
  all?: InputMaybe<SiteFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<SiteFilterInput>;
  some?: InputMaybe<SiteFilterInput>;
};

export type ListFilterInputTypeOfStatusUpdateFilterInput = {
  all?: InputMaybe<StatusUpdateFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StatusUpdateFilterInput>;
  some?: InputMaybe<StatusUpdateFilterInput>;
};

export type ListFilterInputTypeOfUserFilterInput = {
  all?: InputMaybe<UserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<UserFilterInput>;
  some?: InputMaybe<UserFilterInput>;
};

export type ListFilterInputTypeOfWorkOrderFilterInput = {
  all?: InputMaybe<WorkOrderFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<WorkOrderFilterInput>;
  some?: InputMaybe<WorkOrderFilterInput>;
};

export type MaximoSiteContact = {
  __typename?: 'MaximoSiteContact';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type MaximoUserAccess = {
  __typename?: 'MaximoUserAccess';
  canReadTickets: Scalars['Boolean'];
  canWriteTickets: Scalars['Boolean'];
};

export type Message = {
  __typename?: 'Message';
  author: Author;
  content: Scalars['String'];
  dateTimeCreated: Scalars['DateTime'];
  id: Scalars['UUID'];
};

export type MessageFilterInput = {
  and?: InputMaybe<Array<MessageFilterInput>>;
  author?: InputMaybe<AuthorFilterInput>;
  content?: InputMaybe<StringOperationFilterInput>;
  dateTimeCreated?: InputMaybe<DateTimeOperationFilterInput>;
  domainEvents?: InputMaybe<ListFilterInputTypeOfINotificationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<MessageFilterInput>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAttachmentToCase: Scalars['Boolean'];
  addCommentToTicket: Scalars['Boolean'];
  addDocumentToTicket: Scalars['Boolean'];
  addMessageToCase: Scalars['Boolean'];
  addReferenceToCase: Scalars['Boolean'];
  addRoleToUser: Scalars['Boolean'];
  addUser: Scalars['Boolean'];
  allocateUserToPortal: Scalars['Boolean'];
  allocateUserToSite: Scalars['Boolean'];
  assignDefaultRolesToEmployees: Scalars['Boolean'];
  changeUserLanguage: Scalars['Boolean'];
  closeCase: Scalars['Boolean'];
  contactGroupAssignmentInitialLoad: Scalars['Boolean'];
  createCase: Case;
  createTicket: Scalars['Boolean'];
  deallocateUserFromPortal: Scalars['Boolean'];
  deallocateUserFromSite: Scalars['Boolean'];
  deleteDocument: Scalars['Boolean'];
  editCasesConfig: Scalars['Boolean'];
  editContractVisible: Scalars['Boolean'];
  editDivertHealthConfig: Scalars['Boolean'];
  editProcessInsightsConfig: Scalars['Boolean'];
  editShuttleHealthConfig: Scalars['Boolean'];
  editSiteContacts: Scalars['Boolean'];
  editSparePartsShopConfig: Scalars['Boolean'];
  editVidiConfig: Scalars['Boolean'];
  inProgressCase: Scalars['Boolean'];
  openCase: Scalars['Boolean'];
  promoteToWorkOrder: Scalars['Boolean'];
  rejectCase: Scalars['Boolean'];
  removeRoleFromUser: Scalars['Boolean'];
  requestTraining: Scalars['Boolean'];
};


export type MutationAddAttachmentToCaseArgs = {
  attachmentDescription: Scalars['String'];
  attachmentName: Scalars['String'];
  attachmentPayloadBase64: Scalars['String'];
  caseId: Scalars['UUID'];
};


export type MutationAddCommentToTicketArgs = {
  description: Scalars['String'];
  longDescription?: InputMaybe<Scalars['String']>;
  ticketId: Scalars['String'];
};


export type MutationAddDocumentToTicketArgs = {
  document: DocumentInput;
  ticketId: Scalars['String'];
};


export type MutationAddMessageToCaseArgs = {
  caseId: Scalars['UUID'];
  content: Scalars['String'];
};


export type MutationAddReferenceToCaseArgs = {
  caseId: Scalars['UUID'];
  url: Scalars['String'];
};


export type MutationAddRoleToUserArgs = {
  roleId: Scalars['UUID'];
  userId: Scalars['UUID'];
};


export type MutationAddUserArgs = {
  upn: Scalars['String'];
};


export type MutationAllocateUserToPortalArgs = {
  portalId: Scalars['UUID'];
  userId: Scalars['UUID'];
};


export type MutationAllocateUserToSiteArgs = {
  siteId: Scalars['UUID'];
  userId: Scalars['UUID'];
};


export type MutationChangeUserLanguageArgs = {
  language: Scalars['String'];
  userId: Scalars['UUID'];
};


export type MutationCloseCaseArgs = {
  caseId: Scalars['UUID'];
};


export type MutationCreateCaseArgs = {
  assetSystemComponentId?: InputMaybe<Scalars['String']>;
  attachments: Array<CreateCaseAttachmentInput>;
  createCaseContactPerson: CreateCaseContactPersonInput;
  description: Scalars['String'];
  referenceId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['UUID'];
  source: Source;
  title: Scalars['String'];
};


export type MutationCreateTicketArgs = {
  siteId: Scalars['UUID'];
  ticket: TicketCreateInput;
};


export type MutationDeallocateUserFromPortalArgs = {
  portalId: Scalars['UUID'];
  userId: Scalars['UUID'];
};


export type MutationDeallocateUserFromSiteArgs = {
  siteId: Scalars['UUID'];
  userId: Scalars['UUID'];
};


export type MutationDeleteDocumentArgs = {
  documentName: Scalars['String'];
  siteId: Scalars['UUID'];
};


export type MutationEditCasesConfigArgs = {
  divertHealthWorkOrderPromotionRule: WorkOrderPromotionRule;
  enabled: Scalars['Boolean'];
  monitronWorkOrderPromotionRule: WorkOrderPromotionRule;
  shuttleHealthWorkOrderPromotionRule: WorkOrderPromotionRule;
  siteId: Scalars['UUID'];
  vidiWorkOrderPromotionRule: WorkOrderPromotionRule;
};


export type MutationEditContractVisibleArgs = {
  siteId: Scalars['UUID'];
  visible: Scalars['Boolean'];
};


export type MutationEditDivertHealthConfigArgs = {
  enabled: Scalars['Boolean'];
  siteId: Scalars['UUID'];
  url?: InputMaybe<Scalars['String']>;
};


export type MutationEditProcessInsightsConfigArgs = {
  enabled: Scalars['Boolean'];
  siteId: Scalars['UUID'];
};


export type MutationEditShuttleHealthConfigArgs = {
  enabled: Scalars['Boolean'];
  siteId: Scalars['UUID'];
  url?: InputMaybe<Scalars['String']>;
};


export type MutationEditSiteContactsArgs = {
  siteContacts: SiteContactsMutationDtoInput;
  siteId: Scalars['UUID'];
};


export type MutationEditSparePartsShopConfigArgs = {
  enabled: Scalars['Boolean'];
  siteId: Scalars['UUID'];
};


export type MutationEditVidiConfigArgs = {
  enabled?: InputMaybe<Scalars['Boolean']>;
  siteId: Scalars['UUID'];
  vidiAppName: Scalars['String'];
};


export type MutationInProgressCaseArgs = {
  caseId: Scalars['UUID'];
};


export type MutationOpenCaseArgs = {
  caseId: Scalars['UUID'];
};


export type MutationPromoteToWorkOrderArgs = {
  caseId: Scalars['UUID'];
};


export type MutationRejectCaseArgs = {
  caseId: Scalars['UUID'];
};


export type MutationRemoveRoleFromUserArgs = {
  roleId: Scalars['UUID'];
  userId: Scalars['UUID'];
};


export type MutationRequestTrainingArgs = {
  siteId: Scalars['UUID'];
  trainingRequest: TrainingRequestInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Portal = {
  __typename?: 'Portal';
  customerSourceId: Scalars['String'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** @deprecated Please use AccessibleSites or AllocatedSites */
  sites: Array<Site>;
  users: Array<RelatedPortalData>;
};


export type PortalSitesArgs = {
  order?: InputMaybe<Array<SiteSortInput>>;
  where?: InputMaybe<SiteFilterInput>;
};


export type PortalUsersArgs = {
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};

export type PortalFilterInput = {
  and?: InputMaybe<Array<PortalFilterInput>>;
  customerSourceId?: InputMaybe<StringOperationFilterInput>;
  domainEvents?: InputMaybe<ListFilterInputTypeOfINotificationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PortalFilterInput>>;
  sites?: InputMaybe<ListFilterInputTypeOfSiteFilterInput>;
  users?: InputMaybe<ListFilterInputTypeOfUserFilterInput>;
};

export type PortalSortInput = {
  customerSourceId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type Portal_UsersConnection = {
  __typename?: 'Portal_usersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Portal_UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<RelatedPortalData>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type Portal_UsersEdge = {
  __typename?: 'Portal_usersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: RelatedPortalData;
};

export type ProcessInsightsConfig = {
  __typename?: 'ProcessInsightsConfig';
  enabled: Scalars['Boolean'];
};

export type ProcessInsightsConfigFilterInput = {
  and?: InputMaybe<Array<ProcessInsightsConfigFilterInput>>;
  enabled?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ProcessInsightsConfigFilterInput>>;
};

export type ProcessInsightsConfigSortInput = {
  enabled?: InputMaybe<SortEnumType>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['UUID'];
  name: Scalars['String'];
  projectNumber: Scalars['Int'];
  segment: Segment;
};

export type ProjectFilterInput = {
  accountManagerEmployeeNumber?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<ProjectFilterInput>>;
  contractManagerEmployeeNumber?: InputMaybe<IntOperationFilterInput>;
  domainEvents?: InputMaybe<ListFilterInputTypeOfINotificationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ProjectFilterInput>>;
  projectNumber?: InputMaybe<IntOperationFilterInput>;
  segment?: InputMaybe<SegmentOperationFilterInput>;
  site?: InputMaybe<SiteFilterInput>;
  siteId?: InputMaybe<UuidOperationFilterInput>;
};

export type ProjectSortInput = {
  accountManagerEmployeeNumber?: InputMaybe<SortEnumType>;
  contractManagerEmployeeNumber?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  projectNumber?: InputMaybe<SortEnumType>;
  segment?: InputMaybe<SortEnumType>;
  site?: InputMaybe<SiteSortInput>;
  siteId?: InputMaybe<SortEnumType>;
};

export type Query = {
  __typename?: 'Query';
  agreements: Array<Agreement>;
  allowedDocumentationCultures: Array<CultureInfo>;
  assetBySystemComponentId?: Maybe<Asset>;
  assetSearch?: Maybe<AssetSearchCollectionSegment>;
  case?: Maybe<Case>;
  cases?: Maybe<CasesConnection>;
  categories: Array<Category>;
  categoriesBySite: Array<Scalars['String']>;
  culturesByCategory: Array<Scalars['String']>;
  currentUser: IdentityUser;
  documentSearch: DocumentSearchResult;
  documentSearchSuggestions: Array<Scalars['String']>;
  documentUploadInfo: BlobUploadInfo;
  documentUrl: Scalars['URL'];
  documentsBySite: Array<BlobItem>;
  externalUserAccount: GraphUser;
  itemSearch?: Maybe<ItemSearchCollectionSegment>;
  maximoAccess: MaximoUserAccess;
  maximoUserApiKey: Scalars['String'];
  me: IdentityUser;
  portal_user?: Maybe<RelatedPortalData>;
  portal_users?: Maybe<Portal_UsersConnection>;
  /** @deprecated Please use the User endpoint. */
  portals: Array<Portal>;
  /** @deprecated Please use the User endpoint. */
  sites: Array<Site>;
  supportedFileTypes: Array<SupportedFileTypes>;
  ticket?: Maybe<Ticket>;
  ticketingSiteInfo: TicketingSiteInfo;
  tickets?: Maybe<TicketsConnection>;
  trainingServiceHealth: Scalars['Boolean'];
  user?: Maybe<IdentityUser>;
  userByUsername: IdentityUser;
  users: Array<IdentityUser>;
};


export type QueryAgreementsArgs = {
  order?: InputMaybe<Array<AgreementSortInput>>;
  siteId: Scalars['UUID'];
  where?: InputMaybe<AgreementFilterInput>;
};


export type QueryAssetBySystemComponentIdArgs = {
  siteId: Scalars['UUID'];
  systemComponentId: Scalars['String'];
};


export type QueryAssetSearchArgs = {
  searchText: Scalars['String'];
  siteId: Scalars['UUID'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryCaseArgs = {
  caseId: Scalars['UUID'];
};


export type QueryCasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<CaseSortInput>>;
  siteId: Scalars['UUID'];
  where?: InputMaybe<CaseFilterInput>;
};


export type QueryCategoriesArgs = {
  order?: InputMaybe<Array<CategorySortInput>>;
  where?: InputMaybe<CategoryFilterInput>;
};


export type QueryCategoriesBySiteArgs = {
  siteId: Scalars['UUID'];
};


export type QueryCulturesByCategoryArgs = {
  categoryCodeName: Scalars['String'];
  siteId: Scalars['UUID'];
};


export type QueryDocumentSearchArgs = {
  filters: Array<DocumentSearchFilterInput>;
  searchString: Scalars['String'];
  siteId: Scalars['UUID'];
  userCulture: Scalars['String'];
};


export type QueryDocumentSearchSuggestionsArgs = {
  filters: Array<DocumentSearchFilterInput>;
  searchString: Scalars['String'];
  siteId: Scalars['UUID'];
};


export type QueryDocumentUploadInfoArgs = {
  categoryCodeName: Scalars['String'];
  culture: Scalars['String'];
  documentName: Scalars['String'];
  siteId: Scalars['UUID'];
};


export type QueryDocumentUrlArgs = {
  name: Scalars['String'];
  siteId: Scalars['UUID'];
};


export type QueryDocumentsBySiteArgs = {
  categoryCodeName: Scalars['String'];
  siteId: Scalars['UUID'];
};


export type QueryExternalUserAccountArgs = {
  upn: Scalars['String'];
};


export type QueryItemSearchArgs = {
  searchText: Scalars['String'];
  siteId: Scalars['UUID'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryMaximoAccessArgs = {
  siteId: Scalars['UUID'];
};


export type QueryPortal_UserArgs = {
  userId: Scalars['UUID'];
};


export type QueryPortal_UsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};


export type QueryPortalsArgs = {
  order?: InputMaybe<Array<PortalSortInput>>;
  where?: InputMaybe<PortalFilterInput>;
};


export type QuerySitesArgs = {
  order?: InputMaybe<Array<SiteSortInput>>;
  where?: InputMaybe<SiteFilterInput>;
};


export type QueryTicketArgs = {
  id: Scalars['String'];
};


export type QueryTicketingSiteInfoArgs = {
  siteId: Scalars['UUID'];
};


export type QueryTicketsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<TicketSortInput>>;
  siteId: Scalars['UUID'];
  where?: InputMaybe<TicketFilterInput>;
};


export type QueryUserArgs = {
  userId: Scalars['UUID'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryUsersArgs = {
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Reference = {
  __typename?: 'Reference';
  dateTimeCreated: Scalars['DateTime'];
  id: Scalars['UUID'];
  url: Scalars['String'];
};

export type ReferenceFilterInput = {
  and?: InputMaybe<Array<ReferenceFilterInput>>;
  author?: InputMaybe<AuthorFilterInput>;
  dateTimeCreated?: InputMaybe<DateTimeOperationFilterInput>;
  domainEvents?: InputMaybe<ListFilterInputTypeOfINotificationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<ReferenceFilterInput>>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type RelatedPortalData = {
  __typename?: 'RelatedPortalData';
  AccessiblePortals: Array<Portal>;
  AccessibleSites: Array<Site>;
  AllocatedPortals: Array<Portal>;
  AllocatedSites: Array<Site>;
  id: Scalars['UUID'];
  /** @deprecated Please use AccessiblePortals or AllocatedPortals */
  portals: Array<Portal>;
  relatedIdentityData?: Maybe<IdentityUser>;
  /** @deprecated Please use AccessibleSites or AllocatedSites */
  sites: Array<Site>;
};


export type RelatedPortalDataAccessiblePortalsArgs = {
  order?: InputMaybe<Array<PortalSortInput>>;
  where?: InputMaybe<PortalFilterInput>;
};


export type RelatedPortalDataAccessibleSitesArgs = {
  order?: InputMaybe<Array<SiteSortInput>>;
  where?: InputMaybe<SiteFilterInput>;
};


export type RelatedPortalDataAllocatedPortalsArgs = {
  order?: InputMaybe<Array<PortalSortInput>>;
  where?: InputMaybe<PortalFilterInput>;
};


export type RelatedPortalDataAllocatedSitesArgs = {
  order?: InputMaybe<Array<SiteSortInput>>;
  where?: InputMaybe<SiteFilterInput>;
};


export type RelatedPortalDataPortalsArgs = {
  order?: InputMaybe<Array<PortalSortInput>>;
  where?: InputMaybe<PortalFilterInput>;
};


export type RelatedPortalDataSitesArgs = {
  order?: InputMaybe<Array<SiteSortInput>>;
  where?: InputMaybe<SiteFilterInput>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['UUID'];
  isAssignedThroughMembership: Scalars['Boolean'];
  name: Scalars['String'];
};

export enum Segment {
  Airports = 'AIRPORTS',
  Amazon = 'AMAZON',
  NotApplicable = 'NOT_APPLICABLE',
  Parcel = 'PARCEL',
  Warehousing = 'WAREHOUSING'
}

export type SegmentOperationFilterInput = {
  eq?: InputMaybe<Segment>;
  in?: InputMaybe<Array<Segment>>;
  neq?: InputMaybe<Segment>;
  nin?: InputMaybe<Array<Segment>>;
};

export type ServiceDeskContact = {
  __typename?: 'ServiceDeskContact';
  alternativeContactTitle?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberOutsideWorkingHours?: Maybe<Scalars['String']>;
  show: Scalars['Boolean'];
};

export type ServiceDeskContactFilterInput = {
  alternativeContactTitle?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<ServiceDeskContactFilterInput>>;
  emailAddress?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ServiceDeskContactFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  phoneNumberOutsideWorkingHours?: InputMaybe<StringOperationFilterInput>;
  show?: InputMaybe<BooleanOperationFilterInput>;
};

export type ServiceDeskContactMutationDtoInput = {
  alternativeContactTitle: Scalars['String'];
  show: Scalars['Boolean'];
};

export type ServiceDeskContactSortInput = {
  alternativeContactTitle?: InputMaybe<SortEnumType>;
  emailAddress?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  phoneNumberOutsideWorkingHours?: InputMaybe<SortEnumType>;
  show?: InputMaybe<SortEnumType>;
};

export type ShuttleHealthConfig = {
  __typename?: 'ShuttleHealthConfig';
  enabled: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
};

export type ShuttleHealthConfigFilterInput = {
  and?: InputMaybe<Array<ShuttleHealthConfigFilterInput>>;
  enabled?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ShuttleHealthConfigFilterInput>>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type ShuttleHealthConfigSortInput = {
  enabled?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
};

export type Site = {
  __typename?: 'Site';
  accountManagerContact: AccountManagerContact;
  casesConfig: CasesConfig;
  contractManagerContact: ContractManagerContact;
  contractVisible: Scalars['Boolean'];
  divertHealthConfig: DivertHealthConfig;
  id: Scalars['UUID'];
  itManagerContact: ItManagerContact;
  name: Scalars['String'];
  portal: Portal;
  processInsightsConfig: ProcessInsightsConfig;
  projects: Array<Project>;
  published: Scalars['Boolean'];
  serviceDeskContact: ServiceDeskContact;
  shuttleHealthConfig: ShuttleHealthConfig;
  sourceId: Scalars['String'];
  sparePartsContact: SparePartsContact;
  sparePartsShopConfig: SparePartsShopConfig;
  users: Array<RelatedPortalData>;
  vidiConfig: VidiConfig;
  visitingOfficeContact: VisitingOfficeContact;
};


export type SiteProjectsArgs = {
  order?: InputMaybe<Array<ProjectSortInput>>;
  where?: InputMaybe<ProjectFilterInput>;
};


export type SiteUsersArgs = {
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};

export type SiteContactsMutationDtoInput = {
  accountManagerContact: AccountManagerContactDtoInput;
  contractManagerContact: ContractManagerContactDtoInput;
  itManagerContact: ItManagerContactMutationDtoInput;
  serviceDeskContact: ServiceDeskContactMutationDtoInput;
  sparePartsContact: SparePartsContactInput;
  visitingOfficeContact: VisitingOfficeContactInput;
};

export type SiteFilterInput = {
  accountManagerContact?: InputMaybe<AccountManagerContactFilterInput>;
  and?: InputMaybe<Array<SiteFilterInput>>;
  casesConfig?: InputMaybe<CasesConfigFilterInput>;
  contractManagerContact?: InputMaybe<ContractManagerContactFilterInput>;
  contractVisible?: InputMaybe<BooleanOperationFilterInput>;
  divertHealthConfig?: InputMaybe<DivertHealthConfigFilterInput>;
  domainEvents?: InputMaybe<ListFilterInputTypeOfINotificationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  itManagerContact?: InputMaybe<ItManagerContactFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SiteFilterInput>>;
  portal?: InputMaybe<PortalFilterInput>;
  portalId?: InputMaybe<UuidOperationFilterInput>;
  processInsightsConfig?: InputMaybe<ProcessInsightsConfigFilterInput>;
  projects?: InputMaybe<ListFilterInputTypeOfProjectFilterInput>;
  published?: InputMaybe<BooleanOperationFilterInput>;
  serviceDeskContact?: InputMaybe<ServiceDeskContactFilterInput>;
  shuttleHealthConfig?: InputMaybe<ShuttleHealthConfigFilterInput>;
  sourceId?: InputMaybe<StringOperationFilterInput>;
  sparePartsContact?: InputMaybe<SparePartsContactFilterInput>;
  sparePartsShopConfig?: InputMaybe<SparePartsShopConfigFilterInput>;
  users?: InputMaybe<ListFilterInputTypeOfUserFilterInput>;
  vidiConfig?: InputMaybe<VidiConfigFilterInput>;
  visitingOfficeContact?: InputMaybe<VisitingOfficeContactFilterInput>;
};

export type SitePriority = {
  __typename?: 'SitePriority';
  description: Scalars['String'];
  value: Scalars['String'];
};

export type SiteSortInput = {
  accountManagerContact?: InputMaybe<AccountManagerContactSortInput>;
  casesConfig?: InputMaybe<CasesConfigSortInput>;
  contractManagerContact?: InputMaybe<ContractManagerContactSortInput>;
  contractVisible?: InputMaybe<SortEnumType>;
  divertHealthConfig?: InputMaybe<DivertHealthConfigSortInput>;
  id?: InputMaybe<SortEnumType>;
  itManagerContact?: InputMaybe<ItManagerContactSortInput>;
  name?: InputMaybe<SortEnumType>;
  portal?: InputMaybe<PortalSortInput>;
  portalId?: InputMaybe<SortEnumType>;
  processInsightsConfig?: InputMaybe<ProcessInsightsConfigSortInput>;
  published?: InputMaybe<SortEnumType>;
  serviceDeskContact?: InputMaybe<ServiceDeskContactSortInput>;
  shuttleHealthConfig?: InputMaybe<ShuttleHealthConfigSortInput>;
  sourceId?: InputMaybe<SortEnumType>;
  sparePartsContact?: InputMaybe<SparePartsContactSortInput>;
  sparePartsShopConfig?: InputMaybe<SparePartsShopConfigSortInput>;
  vidiConfig?: InputMaybe<VidiConfigSortInput>;
  visitingOfficeContact?: InputMaybe<VisitingOfficeContactSortInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum Source {
  CarHealth = 'CAR_HEALTH',
  Insights = 'INSIGHTS',
  Monitron = 'MONITRON',
  ShtHealth = 'SHT_HEALTH'
}

export type SourceOperationFilterInput = {
  eq?: InputMaybe<Source>;
  in?: InputMaybe<Array<Source>>;
  neq?: InputMaybe<Source>;
  nin?: InputMaybe<Array<Source>>;
};

export type SparePartsContact = {
  __typename?: 'SparePartsContact';
  alternativeContactTitle?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  show: Scalars['Boolean'];
};

export type SparePartsContactFilterInput = {
  alternativeContactTitle?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<SparePartsContactFilterInput>>;
  emailAddress?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SparePartsContactFilterInput>>;
  show?: InputMaybe<BooleanOperationFilterInput>;
};

export type SparePartsContactInput = {
  alternativeContactTitle?: InputMaybe<Scalars['String']>;
  emailAddress?: InputMaybe<Scalars['String']>;
  show: Scalars['Boolean'];
};

export type SparePartsContactSortInput = {
  alternativeContactTitle?: InputMaybe<SortEnumType>;
  emailAddress?: InputMaybe<SortEnumType>;
  show?: InputMaybe<SortEnumType>;
};

export type SparePartsShopConfig = {
  __typename?: 'SparePartsShopConfig';
  enabled: Scalars['Boolean'];
};

export type SparePartsShopConfigFilterInput = {
  and?: InputMaybe<Array<SparePartsShopConfigFilterInput>>;
  enabled?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<SparePartsShopConfigFilterInput>>;
};

export type SparePartsShopConfigSortInput = {
  enabled?: InputMaybe<SortEnumType>;
};

export type StatusUpdate = {
  __typename?: 'StatusUpdate';
  author?: Maybe<Author>;
  dateTimeCreated: Scalars['DateTime'];
  id: Scalars['UUID'];
  status: CaseStatus;
};

export type StatusUpdateFilterInput = {
  and?: InputMaybe<Array<StatusUpdateFilterInput>>;
  author?: InputMaybe<AuthorFilterInput>;
  dateTimeCreated?: InputMaybe<DateTimeOperationFilterInput>;
  domainEvents?: InputMaybe<ListFilterInputTypeOfINotificationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<StatusUpdateFilterInput>>;
  status?: InputMaybe<CaseStatusOperationFilterInput>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type SupportedFileTypes = {
  __typename?: 'SupportedFileTypes';
  extension: Scalars['String'];
  signatures: Array<Array<Scalars['Byte']>>;
};

export type SystemComponent = {
  __typename?: 'SystemComponent';
  assetMarkNumber?: Maybe<Scalars['String']>;
  assetNumber?: Maybe<Scalars['String']>;
  assetType?: Maybe<Scalars['String']>;
  assetTypeDescription?: Maybe<Scalars['String']>;
  markCode?: Maybe<Scalars['String']>;
  markCodeDescription?: Maybe<Scalars['String']>;
  system?: Maybe<Scalars['String']>;
};

export type SystemComponentFilterInput = {
  and?: InputMaybe<Array<SystemComponentFilterInput>>;
  assetMarkNumber?: InputMaybe<StringOperationFilterInput>;
  assetNumber?: InputMaybe<StringOperationFilterInput>;
  assetType?: InputMaybe<StringOperationFilterInput>;
  assetTypeDescription?: InputMaybe<StringOperationFilterInput>;
  markCode?: InputMaybe<StringOperationFilterInput>;
  markCodeDescription?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SystemComponentFilterInput>>;
  system?: InputMaybe<StringOperationFilterInput>;
};

export type SystemComponentSortInput = {
  assetMarkNumber?: InputMaybe<SortEnumType>;
  assetNumber?: InputMaybe<SortEnumType>;
  assetType?: InputMaybe<SortEnumType>;
  assetTypeDescription?: InputMaybe<SortEnumType>;
  markCode?: InputMaybe<SortEnumType>;
  markCodeDescription?: InputMaybe<SortEnumType>;
  system?: InputMaybe<SortEnumType>;
};

export type Ticket = {
  __typename?: 'Ticket';
  analysis?: Maybe<Scalars['String']>;
  comments?: Maybe<CommentsConnection>;
  customerPriority?: Maybe<Scalars['String']>;
  customerReference?: Maybe<Scalars['String']>;
  customerSiteContactEmail?: Maybe<Scalars['String']>;
  customerSiteContactName?: Maybe<Scalars['String']>;
  customerSiteContactPhone?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  files?: Maybe<FilesConnection>;
  id: Scalars['String'];
  issueType: IssueType;
  originator?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['String']>;
  reportDate: Scalars['DateTime'];
  reporterEmail?: Maybe<Scalars['String']>;
  reporterName?: Maybe<Scalars['String']>;
  reporterPhone?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['String']>;
  siteId: Scalars['UUID'];
  siteSourceId: Scalars['String'];
  solution?: Maybe<Scalars['String']>;
  sourceState?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  symptom?: Maybe<Scalars['String']>;
  systemComponentId?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  webLinks?: Maybe<WebLinksConnection>;
};


export type TicketCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<CommentSortInput>>;
};


export type TicketFilesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<FileSortInput>>;
};


export type TicketWebLinksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<WebLinkSortInput>>;
};

export type TicketCreateInput = {
  customerPriority?: InputMaybe<Scalars['String']>;
  customerReference?: InputMaybe<Scalars['String']>;
  customerSiteContactId: Scalars['String'];
  description: Scalars['String'];
  document?: InputMaybe<DocumentInput>;
  issueType: IssueType;
  systemComponentId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type TicketFilterInput = {
  analysis?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<TicketFilterInput>>;
  comments?: InputMaybe<ListFilterInputTypeOfCommentFilterInput>;
  customerPriority?: InputMaybe<StringOperationFilterInput>;
  customerReference?: InputMaybe<StringOperationFilterInput>;
  customerSiteContactEmail?: InputMaybe<StringOperationFilterInput>;
  customerSiteContactName?: InputMaybe<StringOperationFilterInput>;
  customerSiteContactPhone?: InputMaybe<StringOperationFilterInput>;
  customerSourceId?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  documents?: InputMaybe<ListFilterInputTypeOfDocumentFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  issueType?: InputMaybe<IssueTypeOperationFilterInput>;
  or?: InputMaybe<Array<TicketFilterInput>>;
  originator?: InputMaybe<StringOperationFilterInput>;
  priority?: InputMaybe<StringOperationFilterInput>;
  reportDate?: InputMaybe<DateTimeOperationFilterInput>;
  reporterEmail?: InputMaybe<StringOperationFilterInput>;
  reporterName?: InputMaybe<StringOperationFilterInput>;
  reporterPhone?: InputMaybe<StringOperationFilterInput>;
  revision?: InputMaybe<StringOperationFilterInput>;
  siteId?: InputMaybe<UuidOperationFilterInput>;
  siteSourceId?: InputMaybe<StringOperationFilterInput>;
  solution?: InputMaybe<StringOperationFilterInput>;
  sourceState?: InputMaybe<StringOperationFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
  symptom?: InputMaybe<StringOperationFilterInput>;
  systemComponentId?: InputMaybe<StringOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type TicketSortInput = {
  analysis?: InputMaybe<SortEnumType>;
  customerPriority?: InputMaybe<SortEnumType>;
  customerReference?: InputMaybe<SortEnumType>;
  customerSiteContactEmail?: InputMaybe<SortEnumType>;
  customerSiteContactName?: InputMaybe<SortEnumType>;
  customerSiteContactPhone?: InputMaybe<SortEnumType>;
  customerSourceId?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  issueType?: InputMaybe<SortEnumType>;
  originator?: InputMaybe<SortEnumType>;
  priority?: InputMaybe<SortEnumType>;
  reportDate?: InputMaybe<SortEnumType>;
  reporterEmail?: InputMaybe<SortEnumType>;
  reporterName?: InputMaybe<SortEnumType>;
  reporterPhone?: InputMaybe<SortEnumType>;
  revision?: InputMaybe<SortEnumType>;
  siteId?: InputMaybe<SortEnumType>;
  siteSourceId?: InputMaybe<SortEnumType>;
  solution?: InputMaybe<SortEnumType>;
  sourceState?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  symptom?: InputMaybe<SortEnumType>;
  systemComponentId?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
};

export type TicketingSiteInfo = {
  __typename?: 'TicketingSiteInfo';
  contacts: Array<MaximoSiteContact>;
  languageCode: Scalars['String'];
  priorities: Array<SitePriority>;
};

/** A connection to a list of items. */
export type TicketsConnection = {
  __typename?: 'TicketsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<TicketsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Ticket>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type TicketsEdge = {
  __typename?: 'TicketsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Ticket;
};

export type TrainingRequestInput = {
  contact?: InputMaybe<Scalars['String']>;
  participantLocation?: InputMaybe<Scalars['String']>;
  participants?: InputMaybe<Array<TrainingRequestParticipantInput>>;
  preferredDates?: InputMaybe<Scalars['String']>;
  preferredLocation?: InputMaybe<Scalars['String']>;
  preferredTrainingLocation?: InputMaybe<Scalars['String']>;
  previousTraining?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Scalars['String']>;
  requestTypes: Array<Scalars['String']>;
  requesterEmail: Scalars['String'];
  requesterName: Scalars['String'];
  requesterTitle?: InputMaybe<Scalars['String']>;
  topics: Scalars['String'];
  trainings: Array<Scalars['String']>;
};

export type TrainingRequestParticipantInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  domainEvents?: InputMaybe<ListFilterInputTypeOfINotificationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  portals?: InputMaybe<ListFilterInputTypeOfPortalFilterInput>;
  sites?: InputMaybe<ListFilterInputTypeOfSiteFilterInput>;
};

export type UserSortInput = {
  id?: InputMaybe<SortEnumType>;
};

export enum UserType {
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE'
}

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']>;
  gt?: InputMaybe<Scalars['UUID']>;
  gte?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  lt?: InputMaybe<Scalars['UUID']>;
  lte?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
  ngt?: InputMaybe<Scalars['UUID']>;
  ngte?: InputMaybe<Scalars['UUID']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']>>>;
  nlt?: InputMaybe<Scalars['UUID']>;
  nlte?: InputMaybe<Scalars['UUID']>;
};

export type VidiConfig = {
  __typename?: 'VidiConfig';
  /** @deprecated To be replaced with Vidi App Name */
  enabled: Scalars['Boolean'];
  vidiAppName: Scalars['String'];
};

export type VidiConfigFilterInput = {
  and?: InputMaybe<Array<VidiConfigFilterInput>>;
  enabled?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<VidiConfigFilterInput>>;
  vidiAppName?: InputMaybe<StringOperationFilterInput>;
};

export type VidiConfigSortInput = {
  enabled?: InputMaybe<SortEnumType>;
  vidiAppName?: InputMaybe<SortEnumType>;
};

export type VisitingOfficeContact = {
  __typename?: 'VisitingOfficeContact';
  address?: Maybe<Scalars['String']>;
  alternativeContactTitle?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  show: Scalars['Boolean'];
};

export type VisitingOfficeContactFilterInput = {
  address?: InputMaybe<StringOperationFilterInput>;
  alternativeContactTitle?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<VisitingOfficeContactFilterInput>>;
  email?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<VisitingOfficeContactFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  show?: InputMaybe<BooleanOperationFilterInput>;
};

export type VisitingOfficeContactInput = {
  address?: InputMaybe<Scalars['String']>;
  alternativeContactTitle?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  show: Scalars['Boolean'];
};

export type VisitingOfficeContactSortInput = {
  address?: InputMaybe<SortEnumType>;
  alternativeContactTitle?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  show?: InputMaybe<SortEnumType>;
};

export type WebLink = {
  __typename?: 'WebLink';
  description: Scalars['String'];
  key?: Maybe<DocumentKey>;
  name?: Maybe<Scalars['String']>;
  releaseDate: Scalars['DateTime'];
  url: Scalars['String'];
};

export type WebLinkSortInput = {
  description?: InputMaybe<SortEnumType>;
  key?: InputMaybe<DocumentKeySortInput>;
  name?: InputMaybe<SortEnumType>;
  releaseDate?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type WebLinksConnection = {
  __typename?: 'WebLinksConnection';
  /** A list of edges. */
  edges?: Maybe<Array<WebLinksEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<WebLink>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type WebLinksEdge = {
  __typename?: 'WebLinksEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: WebLink;
};

export type WorkOrder = {
  __typename?: 'WorkOrder';
  orderNumber: Scalars['String'];
};

export type WorkOrderFilterInput = {
  and?: InputMaybe<Array<WorkOrderFilterInput>>;
  domainEvents?: InputMaybe<ListFilterInputTypeOfINotificationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<WorkOrderFilterInput>>;
  orderNumber?: InputMaybe<StringOperationFilterInput>;
};

export enum WorkOrderPromotionRule {
  Automatic = 'AUTOMATIC',
  Disabled = 'DISABLED',
  Manual = 'MANUAL'
}

export type WorkOrderPromotionRuleOperationFilterInput = {
  eq?: InputMaybe<WorkOrderPromotionRule>;
  in?: InputMaybe<Array<WorkOrderPromotionRule>>;
  neq?: InputMaybe<WorkOrderPromotionRule>;
  nin?: InputMaybe<Array<WorkOrderPromotionRule>>;
};
