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
  DateTime: any;
  Dimension: any;
  HexColor: any;
  JSON: any;
  Quality: any;
  _Any: any;
  _FieldSet: any;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']>;
  transform?: InputMaybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']>;
  contentType_contains?: InputMaybe<Scalars['String']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentType_not?: InputMaybe<Scalars['String']>;
  contentType_not_contains?: InputMaybe<Scalars['String']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName?: InputMaybe<Scalars['String']>;
  fileName_contains?: InputMaybe<Scalars['String']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName_not?: InputMaybe<Scalars['String']>;
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  height?: InputMaybe<Scalars['Int']>;
  height_exists?: InputMaybe<Scalars['Boolean']>;
  height_gt?: InputMaybe<Scalars['Int']>;
  height_gte?: InputMaybe<Scalars['Int']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  height_lt?: InputMaybe<Scalars['Int']>;
  height_lte?: InputMaybe<Scalars['Int']>;
  height_not?: InputMaybe<Scalars['Int']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size?: InputMaybe<Scalars['Int']>;
  size_exists?: InputMaybe<Scalars['Boolean']>;
  size_gt?: InputMaybe<Scalars['Int']>;
  size_gte?: InputMaybe<Scalars['Int']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size_lt?: InputMaybe<Scalars['Int']>;
  size_lte?: InputMaybe<Scalars['Int']>;
  size_not?: InputMaybe<Scalars['Int']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url?: InputMaybe<Scalars['String']>;
  url_contains?: InputMaybe<Scalars['String']>;
  url_exists?: InputMaybe<Scalars['Boolean']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url_not?: InputMaybe<Scalars['String']>;
  url_not_contains?: InputMaybe<Scalars['String']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['Int']>;
  width_exists?: InputMaybe<Scalars['Boolean']>;
  width_gt?: InputMaybe<Scalars['Int']>;
  width_gte?: InputMaybe<Scalars['Int']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  width_lt?: InputMaybe<Scalars['Int']>;
  width_lte?: InputMaybe<Scalars['Int']>;
  width_not?: InputMaybe<Scalars['Int']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  certificationPathCollection?: Maybe<CertificationPathCollection>;
  entryCollection?: Maybe<EntryCollection>;
  trainingCollection?: Maybe<TrainingCollection>;
};


export type AssetLinkingCollectionsCertificationPathCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsTrainingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/assortment) */
export type Assortment = Entry & {
  __typename?: 'Assortment';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<AssortmentLinkingCollections>;
  segment?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  trainingsCollection?: Maybe<AssortmentTrainingsCollection>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/assortment) */
export type AssortmentLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/assortment) */
export type AssortmentSegmentArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/assortment) */
export type AssortmentTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/assortment) */
export type AssortmentTrainingsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<AssortmentTrainingsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TrainingFilter>;
};

export type AssortmentCollection = {
  __typename?: 'AssortmentCollection';
  items: Array<Maybe<Assortment>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssortmentFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssortmentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssortmentFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  segment_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  segment_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  segment_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  segment_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  trainings?: InputMaybe<CfTrainingNestedFilter>;
  trainingsCollection_exists?: InputMaybe<Scalars['Boolean']>;
};

export type AssortmentLinkingCollections = {
  __typename?: 'AssortmentLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type AssortmentLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum AssortmentOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type AssortmentTrainingsCollection = {
  __typename?: 'AssortmentTrainingsCollection';
  items: Array<Maybe<Training>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export enum AssortmentTrainingsCollectionOrder {
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  EntryRequirementsAsc = 'entryRequirements_ASC',
  EntryRequirementsDesc = 'entryRequirements_DESC',
  MaxAmountOfTraineesTypeAsc = 'maxAmountOfTraineesType_ASC',
  MaxAmountOfTraineesTypeDesc = 'maxAmountOfTraineesType_DESC',
  MaxAmountOfTraineesAsc = 'maxAmountOfTrainees_ASC',
  MaxAmountOfTraineesDesc = 'maxAmountOfTrainees_DESC',
  RecommendedAsc = 'recommended_ASC',
  RecommendedDesc = 'recommended_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  SystemAvailabilityAsc = 'systemAvailability_ASC',
  SystemAvailabilityDesc = 'systemAvailability_DESC',
  TargetGroupAsc = 'targetGroup_ASC',
  TargetGroupDesc = 'targetGroup_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/certificationPath) */
export type CertificationPath = Entry & {
  __typename?: 'CertificationPath';
  certificationImageCollection?: Maybe<AssetCollection>;
  certificationInfo?: Maybe<CertificationPathCertificationInfo>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<CertificationPathLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  trainingsCollection?: Maybe<CertificationPathTrainingsCollection>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/certificationPath) */
export type CertificationPathCertificationImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/certificationPath) */
export type CertificationPathCertificationInfoArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/certificationPath) */
export type CertificationPathDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/certificationPath) */
export type CertificationPathLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/certificationPath) */
export type CertificationPathTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/certificationPath) */
export type CertificationPathTrainingsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CertificationPathTrainingsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TrainingFilter>;
};

export type CertificationPathCertificationInfo = {
  __typename?: 'CertificationPathCertificationInfo';
  json: Scalars['JSON'];
  links: CertificationPathCertificationInfoLinks;
};

export type CertificationPathCertificationInfoAssets = {
  __typename?: 'CertificationPathCertificationInfoAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type CertificationPathCertificationInfoEntries = {
  __typename?: 'CertificationPathCertificationInfoEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type CertificationPathCertificationInfoLinks = {
  __typename?: 'CertificationPathCertificationInfoLinks';
  assets: CertificationPathCertificationInfoAssets;
  entries: CertificationPathCertificationInfoEntries;
  resources: CertificationPathCertificationInfoResources;
};

export type CertificationPathCertificationInfoResources = {
  __typename?: 'CertificationPathCertificationInfoResources';
  block: Array<CertificationPathCertificationInfoResourcesBlock>;
  hyperlink: Array<CertificationPathCertificationInfoResourcesHyperlink>;
  inline: Array<CertificationPathCertificationInfoResourcesInline>;
};

export type CertificationPathCertificationInfoResourcesBlock = ResourceLink & {
  __typename?: 'CertificationPathCertificationInfoResourcesBlock';
  sys: ResourceSys;
};

export type CertificationPathCertificationInfoResourcesHyperlink = ResourceLink & {
  __typename?: 'CertificationPathCertificationInfoResourcesHyperlink';
  sys: ResourceSys;
};

export type CertificationPathCertificationInfoResourcesInline = ResourceLink & {
  __typename?: 'CertificationPathCertificationInfoResourcesInline';
  sys: ResourceSys;
};

export type CertificationPathCollection = {
  __typename?: 'CertificationPathCollection';
  items: Array<Maybe<CertificationPath>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type CertificationPathFilter = {
  AND?: InputMaybe<Array<InputMaybe<CertificationPathFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CertificationPathFilter>>>;
  certificationImageCollection_exists?: InputMaybe<Scalars['Boolean']>;
  certificationInfo_contains?: InputMaybe<Scalars['String']>;
  certificationInfo_exists?: InputMaybe<Scalars['Boolean']>;
  certificationInfo_not_contains?: InputMaybe<Scalars['String']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  trainings?: InputMaybe<CfTrainingNestedFilter>;
  trainingsCollection_exists?: InputMaybe<Scalars['Boolean']>;
};

export type CertificationPathLinkingCollections = {
  __typename?: 'CertificationPathLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type CertificationPathLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum CertificationPathOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type CertificationPathTrainingsCollection = {
  __typename?: 'CertificationPathTrainingsCollection';
  items: Array<Maybe<Training>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export enum CertificationPathTrainingsCollectionOrder {
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  EntryRequirementsAsc = 'entryRequirements_ASC',
  EntryRequirementsDesc = 'entryRequirements_DESC',
  MaxAmountOfTraineesTypeAsc = 'maxAmountOfTraineesType_ASC',
  MaxAmountOfTraineesTypeDesc = 'maxAmountOfTraineesType_DESC',
  MaxAmountOfTraineesAsc = 'maxAmountOfTrainees_ASC',
  MaxAmountOfTraineesDesc = 'maxAmountOfTrainees_DESC',
  RecommendedAsc = 'recommended_ASC',
  RecommendedDesc = 'recommended_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  SystemAvailabilityAsc = 'systemAvailability_ASC',
  SystemAvailabilityDesc = 'systemAvailability_DESC',
  TargetGroupAsc = 'targetGroup_ASC',
  TargetGroupDesc = 'targetGroup_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Generic pages [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/generic) */
export type Generic = Entry & {
  __typename?: 'Generic';
  cardDescription?: Maybe<Scalars['String']>;
  contentSection?: Maybe<GenericContentSection>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<GenericLinkingCollections>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** Generic pages [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/generic) */
export type GenericCardDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Generic pages [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/generic) */
export type GenericContentSectionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Generic pages [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/generic) */
export type GenericDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Generic pages [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/generic) */
export type GenericLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Generic pages [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/generic) */
export type GenericSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Generic pages [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/generic) */
export type GenericTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type GenericCollection = {
  __typename?: 'GenericCollection';
  items: Array<Maybe<Generic>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type GenericContentSection = {
  __typename?: 'GenericContentSection';
  json: Scalars['JSON'];
  links: GenericContentSectionLinks;
};

export type GenericContentSectionAssets = {
  __typename?: 'GenericContentSectionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type GenericContentSectionEntries = {
  __typename?: 'GenericContentSectionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type GenericContentSectionLinks = {
  __typename?: 'GenericContentSectionLinks';
  assets: GenericContentSectionAssets;
  entries: GenericContentSectionEntries;
  resources: GenericContentSectionResources;
};

export type GenericContentSectionResources = {
  __typename?: 'GenericContentSectionResources';
  block: Array<GenericContentSectionResourcesBlock>;
  hyperlink: Array<GenericContentSectionResourcesHyperlink>;
  inline: Array<GenericContentSectionResourcesInline>;
};

export type GenericContentSectionResourcesBlock = ResourceLink & {
  __typename?: 'GenericContentSectionResourcesBlock';
  sys: ResourceSys;
};

export type GenericContentSectionResourcesHyperlink = ResourceLink & {
  __typename?: 'GenericContentSectionResourcesHyperlink';
  sys: ResourceSys;
};

export type GenericContentSectionResourcesInline = ResourceLink & {
  __typename?: 'GenericContentSectionResourcesInline';
  sys: ResourceSys;
};

export type GenericFilter = {
  AND?: InputMaybe<Array<InputMaybe<GenericFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<GenericFilter>>>;
  cardDescription?: InputMaybe<Scalars['String']>;
  cardDescription_contains?: InputMaybe<Scalars['String']>;
  cardDescription_exists?: InputMaybe<Scalars['Boolean']>;
  cardDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  cardDescription_not?: InputMaybe<Scalars['String']>;
  cardDescription_not_contains?: InputMaybe<Scalars['String']>;
  cardDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentSection_contains?: InputMaybe<Scalars['String']>;
  contentSection_exists?: InputMaybe<Scalars['Boolean']>;
  contentSection_not_contains?: InputMaybe<Scalars['String']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type GenericLinkingCollections = {
  __typename?: 'GenericLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type GenericLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum GenericOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']>;
};

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _node?: Maybe<_Node>;
  _service: _Service;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  assortment?: Maybe<Assortment>;
  assortmentCollection?: Maybe<AssortmentCollection>;
  certificationPath?: Maybe<CertificationPath>;
  certificationPathCollection?: Maybe<CertificationPathCollection>;
  entryCollection?: Maybe<EntryCollection>;
  generic?: Maybe<Generic>;
  genericCollection?: Maybe<GenericCollection>;
  serviceBuildingBlock?: Maybe<ServiceBuildingBlock>;
  serviceBuildingBlockCollection?: Maybe<ServiceBuildingBlockCollection>;
  servicePackage?: Maybe<ServicePackage>;
  servicePackageCollection?: Maybe<ServicePackageCollection>;
  serviceSolution?: Maybe<ServiceSolution>;
  serviceSolutionCollection?: Maybe<ServiceSolutionCollection>;
  serviceType?: Maybe<ServiceType>;
  serviceTypeCollection?: Maybe<ServiceTypeCollection>;
  training?: Maybe<Training>;
  trainingCollection?: Maybe<TrainingCollection>;
  trainingModule?: Maybe<TrainingModule>;
  trainingModuleCollection?: Maybe<TrainingModuleCollection>;
  versionTracking?: Maybe<VersionTracking>;
  versionTrackingCollection?: Maybe<VersionTrackingCollection>;
};


export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};


export type Query_NodeArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryAssortmentArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAssortmentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<AssortmentOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssortmentFilter>;
};


export type QueryCertificationPathArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCertificationPathCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CertificationPathOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CertificationPathFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryGenericArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGenericCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<GenericOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GenericFilter>;
};


export type QueryServiceBuildingBlockArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryServiceBuildingBlockCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ServiceBuildingBlockOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ServiceBuildingBlockFilter>;
};


export type QueryServicePackageArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryServicePackageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ServicePackageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ServicePackageFilter>;
};


export type QueryServiceSolutionArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryServiceSolutionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ServiceSolutionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ServiceSolutionFilter>;
};


export type QueryServiceTypeArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryServiceTypeCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ServiceTypeOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ServiceTypeFilter>;
};


export type QueryTrainingArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryTrainingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TrainingOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TrainingFilter>;
};


export type QueryTrainingModuleArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryTrainingModuleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TrainingModuleOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TrainingModuleFilter>;
};


export type QueryVersionTrackingArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryVersionTrackingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<VersionTrackingOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VersionTrackingFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String'];
  urn: Scalars['String'];
};

/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceBuildingBlock) */
export type ServiceBuildingBlock = Entry & {
  __typename?: 'ServiceBuildingBlock';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ServiceBuildingBlockLinkingCollections>;
  serviceSolution?: Maybe<ServiceSolution>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceBuildingBlock) */
export type ServiceBuildingBlockLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceBuildingBlock) */
export type ServiceBuildingBlockServiceSolutionArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ServiceSolutionFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceBuildingBlock) */
export type ServiceBuildingBlockTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ServiceBuildingBlockCollection = {
  __typename?: 'ServiceBuildingBlockCollection';
  items: Array<Maybe<ServiceBuildingBlock>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ServiceBuildingBlockFilter = {
  AND?: InputMaybe<Array<InputMaybe<ServiceBuildingBlockFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ServiceBuildingBlockFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  serviceSolution?: InputMaybe<CfServiceSolutionNestedFilter>;
  serviceSolution_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ServiceBuildingBlockLinkingCollections = {
  __typename?: 'ServiceBuildingBlockLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  servicePackageCollection?: Maybe<ServicePackageCollection>;
};


export type ServiceBuildingBlockLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ServiceBuildingBlockLinkingCollectionsServicePackageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ServiceBuildingBlockLinkingCollectionsServicePackageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ServiceBuildingBlockLinkingCollectionsServicePackageCollectionOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ServiceBuildingBlockOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/servicePackage) */
export type ServicePackage = Entry & {
  __typename?: 'ServicePackage';
  buildingBlock?: Maybe<ServiceBuildingBlock>;
  codes?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ServicePackageLinkingCollections>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/servicePackage) */
export type ServicePackageBuildingBlockArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ServiceBuildingBlockFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/servicePackage) */
export type ServicePackageCodesArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/servicePackage) */
export type ServicePackageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/servicePackage) */
export type ServicePackageSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/servicePackage) */
export type ServicePackageTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ServicePackageCollection = {
  __typename?: 'ServicePackageCollection';
  items: Array<Maybe<ServicePackage>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ServicePackageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ServicePackageFilter>>>;
  BuildingBlock?: InputMaybe<CfServiceBuildingBlockNestedFilter>;
  BuildingBlock_exists?: InputMaybe<Scalars['Boolean']>;
  OR?: InputMaybe<Array<InputMaybe<ServicePackageFilter>>>;
  codes_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  codes_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  codes_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  codes_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ServicePackageLinkingCollections = {
  __typename?: 'ServicePackageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ServicePackageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ServicePackageOrder {
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceSolution) */
export type ServiceSolution = Entry & {
  __typename?: 'ServiceSolution';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ServiceSolutionLinkingCollections>;
  serviceType?: Maybe<ServiceType>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceSolution) */
export type ServiceSolutionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceSolution) */
export type ServiceSolutionServiceTypeArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ServiceTypeFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceSolution) */
export type ServiceSolutionTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ServiceSolutionCollection = {
  __typename?: 'ServiceSolutionCollection';
  items: Array<Maybe<ServiceSolution>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ServiceSolutionFilter = {
  AND?: InputMaybe<Array<InputMaybe<ServiceSolutionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ServiceSolutionFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  serviceType?: InputMaybe<CfServiceTypeNestedFilter>;
  serviceType_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ServiceSolutionLinkingCollections = {
  __typename?: 'ServiceSolutionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  serviceBuildingBlockCollection?: Maybe<ServiceBuildingBlockCollection>;
};


export type ServiceSolutionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ServiceSolutionLinkingCollectionsServiceBuildingBlockCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ServiceSolutionLinkingCollectionsServiceBuildingBlockCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ServiceSolutionLinkingCollectionsServiceBuildingBlockCollectionOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ServiceSolutionOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceType) */
export type ServiceType = Entry & {
  __typename?: 'ServiceType';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ServiceTypeLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceType) */
export type ServiceTypeLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/serviceType) */
export type ServiceTypeTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ServiceTypeCollection = {
  __typename?: 'ServiceTypeCollection';
  items: Array<Maybe<ServiceType>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ServiceTypeFilter = {
  AND?: InputMaybe<Array<InputMaybe<ServiceTypeFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ServiceTypeFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ServiceTypeLinkingCollections = {
  __typename?: 'ServiceTypeLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  serviceSolutionCollection?: Maybe<ServiceSolutionCollection>;
};


export type ServiceTypeLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type ServiceTypeLinkingCollectionsServiceSolutionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ServiceTypeLinkingCollectionsServiceSolutionCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ServiceTypeLinkingCollectionsServiceSolutionCollectionOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ServiceTypeOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  /** The locale that was requested - mainly used for Apollo Federation. */
  locale?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type Training = Entry & {
  __typename?: 'Training';
  cardImageCollection?: Maybe<AssetCollection>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['String']>;
  entryRequirements?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  learningObjectives?: Maybe<TrainingLearningObjectives>;
  linkedFrom?: Maybe<TrainingLinkingCollections>;
  maxAmountOfTrainees?: Maybe<Scalars['Int']>;
  maxAmountOfTraineesType?: Maybe<Scalars['Boolean']>;
  pageImageCollection?: Maybe<AssetCollection>;
  recommended?: Maybe<Scalars['Boolean']>;
  sys: Sys;
  systemAvailability?: Maybe<Scalars['String']>;
  targetGroup?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  trainingModulesCollection?: Maybe<TrainingTrainingModulesCollection>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingCardImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingDurationArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingEntryRequirementsArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingIntroductionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingLearningObjectivesArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingMaxAmountOfTraineesArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingMaxAmountOfTraineesTypeArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingPageImageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingRecommendedArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingSystemAvailabilityArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingTargetGroupArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/training) */
export type TrainingTrainingModulesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TrainingTrainingModulesCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TrainingModuleFilter>;
};

export type TrainingCollection = {
  __typename?: 'TrainingCollection';
  items: Array<Maybe<Training>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TrainingFilter = {
  AND?: InputMaybe<Array<InputMaybe<TrainingFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TrainingFilter>>>;
  cardImageCollection_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  duration?: InputMaybe<Scalars['String']>;
  duration_contains?: InputMaybe<Scalars['String']>;
  duration_exists?: InputMaybe<Scalars['Boolean']>;
  duration_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  duration_not?: InputMaybe<Scalars['String']>;
  duration_not_contains?: InputMaybe<Scalars['String']>;
  duration_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  entryRequirements?: InputMaybe<Scalars['String']>;
  entryRequirements_contains?: InputMaybe<Scalars['String']>;
  entryRequirements_exists?: InputMaybe<Scalars['Boolean']>;
  entryRequirements_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  entryRequirements_not?: InputMaybe<Scalars['String']>;
  entryRequirements_not_contains?: InputMaybe<Scalars['String']>;
  entryRequirements_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  introduction?: InputMaybe<Scalars['String']>;
  introduction_contains?: InputMaybe<Scalars['String']>;
  introduction_exists?: InputMaybe<Scalars['Boolean']>;
  introduction_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  introduction_not?: InputMaybe<Scalars['String']>;
  introduction_not_contains?: InputMaybe<Scalars['String']>;
  introduction_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  learningObjectives_contains?: InputMaybe<Scalars['String']>;
  learningObjectives_exists?: InputMaybe<Scalars['Boolean']>;
  learningObjectives_not_contains?: InputMaybe<Scalars['String']>;
  maxAmountOfTrainees?: InputMaybe<Scalars['Int']>;
  maxAmountOfTraineesType?: InputMaybe<Scalars['Boolean']>;
  maxAmountOfTraineesType_exists?: InputMaybe<Scalars['Boolean']>;
  maxAmountOfTraineesType_not?: InputMaybe<Scalars['Boolean']>;
  maxAmountOfTrainees_exists?: InputMaybe<Scalars['Boolean']>;
  maxAmountOfTrainees_gt?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_gte?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  maxAmountOfTrainees_lt?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_lte?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_not?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  pageImageCollection_exists?: InputMaybe<Scalars['Boolean']>;
  recommended?: InputMaybe<Scalars['Boolean']>;
  recommended_exists?: InputMaybe<Scalars['Boolean']>;
  recommended_not?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  systemAvailability?: InputMaybe<Scalars['String']>;
  systemAvailability_contains?: InputMaybe<Scalars['String']>;
  systemAvailability_exists?: InputMaybe<Scalars['Boolean']>;
  systemAvailability_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  systemAvailability_not?: InputMaybe<Scalars['String']>;
  systemAvailability_not_contains?: InputMaybe<Scalars['String']>;
  systemAvailability_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  targetGroup?: InputMaybe<Scalars['String']>;
  targetGroup_contains?: InputMaybe<Scalars['String']>;
  targetGroup_exists?: InputMaybe<Scalars['Boolean']>;
  targetGroup_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  targetGroup_not?: InputMaybe<Scalars['String']>;
  targetGroup_not_contains?: InputMaybe<Scalars['String']>;
  targetGroup_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  trainingModules?: InputMaybe<CfTrainingModuleNestedFilter>;
  trainingModulesCollection_exists?: InputMaybe<Scalars['Boolean']>;
};

export type TrainingLearningObjectives = {
  __typename?: 'TrainingLearningObjectives';
  json: Scalars['JSON'];
  links: TrainingLearningObjectivesLinks;
};

export type TrainingLearningObjectivesAssets = {
  __typename?: 'TrainingLearningObjectivesAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type TrainingLearningObjectivesEntries = {
  __typename?: 'TrainingLearningObjectivesEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type TrainingLearningObjectivesLinks = {
  __typename?: 'TrainingLearningObjectivesLinks';
  assets: TrainingLearningObjectivesAssets;
  entries: TrainingLearningObjectivesEntries;
  resources: TrainingLearningObjectivesResources;
};

export type TrainingLearningObjectivesResources = {
  __typename?: 'TrainingLearningObjectivesResources';
  block: Array<TrainingLearningObjectivesResourcesBlock>;
  hyperlink: Array<TrainingLearningObjectivesResourcesHyperlink>;
  inline: Array<TrainingLearningObjectivesResourcesInline>;
};

export type TrainingLearningObjectivesResourcesBlock = ResourceLink & {
  __typename?: 'TrainingLearningObjectivesResourcesBlock';
  sys: ResourceSys;
};

export type TrainingLearningObjectivesResourcesHyperlink = ResourceLink & {
  __typename?: 'TrainingLearningObjectivesResourcesHyperlink';
  sys: ResourceSys;
};

export type TrainingLearningObjectivesResourcesInline = ResourceLink & {
  __typename?: 'TrainingLearningObjectivesResourcesInline';
  sys: ResourceSys;
};

export type TrainingLinkingCollections = {
  __typename?: 'TrainingLinkingCollections';
  assortmentCollection?: Maybe<AssortmentCollection>;
  certificationPathCollection?: Maybe<CertificationPathCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type TrainingLinkingCollectionsAssortmentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TrainingLinkingCollectionsAssortmentCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type TrainingLinkingCollectionsCertificationPathCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TrainingLinkingCollectionsCertificationPathCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type TrainingLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum TrainingLinkingCollectionsAssortmentCollectionOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum TrainingLinkingCollectionsCertificationPathCollectionOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/trainingModule) */
export type TrainingModule = Entry & {
  __typename?: 'TrainingModule';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<TrainingModuleLinkingCollections>;
  maxAmountOfTrainees?: Maybe<Scalars['Int']>;
  optionalModule?: Maybe<Scalars['Boolean']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/trainingModule) */
export type TrainingModuleDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/trainingModule) */
export type TrainingModuleLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/trainingModule) */
export type TrainingModuleMaxAmountOfTraineesArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/trainingModule) */
export type TrainingModuleOptionalModuleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/trainingModule) */
export type TrainingModuleTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type TrainingModuleCollection = {
  __typename?: 'TrainingModuleCollection';
  items: Array<Maybe<TrainingModule>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TrainingModuleFilter = {
  AND?: InputMaybe<Array<InputMaybe<TrainingModuleFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TrainingModuleFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  maxAmountOfTrainees?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_exists?: InputMaybe<Scalars['Boolean']>;
  maxAmountOfTrainees_gt?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_gte?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  maxAmountOfTrainees_lt?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_lte?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_not?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  optionalModule?: InputMaybe<Scalars['Boolean']>;
  optionalModule_exists?: InputMaybe<Scalars['Boolean']>;
  optionalModule_not?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TrainingModuleLinkingCollections = {
  __typename?: 'TrainingModuleLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  trainingCollection?: Maybe<TrainingCollection>;
};


export type TrainingModuleLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type TrainingModuleLinkingCollectionsTrainingCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<TrainingModuleLinkingCollectionsTrainingCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum TrainingModuleLinkingCollectionsTrainingCollectionOrder {
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  EntryRequirementsAsc = 'entryRequirements_ASC',
  EntryRequirementsDesc = 'entryRequirements_DESC',
  MaxAmountOfTraineesTypeAsc = 'maxAmountOfTraineesType_ASC',
  MaxAmountOfTraineesTypeDesc = 'maxAmountOfTraineesType_DESC',
  MaxAmountOfTraineesAsc = 'maxAmountOfTrainees_ASC',
  MaxAmountOfTraineesDesc = 'maxAmountOfTrainees_DESC',
  RecommendedAsc = 'recommended_ASC',
  RecommendedDesc = 'recommended_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  SystemAvailabilityAsc = 'systemAvailability_ASC',
  SystemAvailabilityDesc = 'systemAvailability_DESC',
  TargetGroupAsc = 'targetGroup_ASC',
  TargetGroupDesc = 'targetGroup_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum TrainingModuleOrder {
  MaxAmountOfTraineesAsc = 'maxAmountOfTrainees_ASC',
  MaxAmountOfTraineesDesc = 'maxAmountOfTrainees_DESC',
  OptionalModuleAsc = 'optionalModule_ASC',
  OptionalModuleDesc = 'optionalModule_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum TrainingOrder {
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  EntryRequirementsAsc = 'entryRequirements_ASC',
  EntryRequirementsDesc = 'entryRequirements_DESC',
  MaxAmountOfTraineesTypeAsc = 'maxAmountOfTraineesType_ASC',
  MaxAmountOfTraineesTypeDesc = 'maxAmountOfTraineesType_DESC',
  MaxAmountOfTraineesAsc = 'maxAmountOfTrainees_ASC',
  MaxAmountOfTraineesDesc = 'maxAmountOfTrainees_DESC',
  RecommendedAsc = 'recommended_ASC',
  RecommendedDesc = 'recommended_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  SystemAvailabilityAsc = 'systemAvailability_ASC',
  SystemAvailabilityDesc = 'systemAvailability_DESC',
  TargetGroupAsc = 'targetGroup_ASC',
  TargetGroupDesc = 'targetGroup_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type TrainingTrainingModulesCollection = {
  __typename?: 'TrainingTrainingModulesCollection';
  items: Array<Maybe<TrainingModule>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export enum TrainingTrainingModulesCollectionOrder {
  MaxAmountOfTraineesAsc = 'maxAmountOfTrainees_ASC',
  MaxAmountOfTraineesDesc = 'maxAmountOfTrainees_DESC',
  OptionalModuleAsc = 'optionalModule_ASC',
  OptionalModuleDesc = 'optionalModule_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Internal use only! [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/versionTracking) */
export type VersionTracking = Entry & {
  __typename?: 'VersionTracking';
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<VersionTrackingLinkingCollections>;
  sys: Sys;
  version?: Maybe<Scalars['String']>;
};


/** Internal use only! [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/versionTracking) */
export type VersionTrackingLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Internal use only! [See type definition](https://app.contentful.com/spaces/edffyomf8p2r/content_types/versionTracking) */
export type VersionTrackingVersionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type VersionTrackingCollection = {
  __typename?: 'VersionTrackingCollection';
  items: Array<Maybe<VersionTracking>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type VersionTrackingFilter = {
  AND?: InputMaybe<Array<InputMaybe<VersionTrackingFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<VersionTrackingFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
  version?: InputMaybe<Scalars['String']>;
  version_contains?: InputMaybe<Scalars['String']>;
  version_exists?: InputMaybe<Scalars['Boolean']>;
  version_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  version_not?: InputMaybe<Scalars['String']>;
  version_not_contains?: InputMaybe<Scalars['String']>;
  version_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type VersionTrackingLinkingCollections = {
  __typename?: 'VersionTrackingLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type VersionTrackingLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum VersionTrackingOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  VersionAsc = 'version_ASC',
  VersionDesc = 'version_DESC'
}

export type _Entity = Assortment | CertificationPath | Generic | ServiceBuildingBlock | ServicePackage | ServiceSolution | ServiceType | Training | TrainingModule | VersionTracking;

export type _Node = {
  _id: Scalars['ID'];
};

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export type CfServiceBuildingBlockNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfServiceBuildingBlockNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfServiceBuildingBlockNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  serviceSolution_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CfServiceSolutionNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfServiceSolutionNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfServiceSolutionNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  serviceType_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CfServiceTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfServiceTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfServiceTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CfTrainingModuleNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfTrainingModuleNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfTrainingModuleNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  maxAmountOfTrainees?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_exists?: InputMaybe<Scalars['Boolean']>;
  maxAmountOfTrainees_gt?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_gte?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  maxAmountOfTrainees_lt?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_lte?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_not?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  optionalModule?: InputMaybe<Scalars['Boolean']>;
  optionalModule_exists?: InputMaybe<Scalars['Boolean']>;
  optionalModule_not?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CfTrainingNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfTrainingNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfTrainingNestedFilter>>>;
  cardImageCollection_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  duration?: InputMaybe<Scalars['String']>;
  duration_contains?: InputMaybe<Scalars['String']>;
  duration_exists?: InputMaybe<Scalars['Boolean']>;
  duration_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  duration_not?: InputMaybe<Scalars['String']>;
  duration_not_contains?: InputMaybe<Scalars['String']>;
  duration_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  entryRequirements?: InputMaybe<Scalars['String']>;
  entryRequirements_contains?: InputMaybe<Scalars['String']>;
  entryRequirements_exists?: InputMaybe<Scalars['Boolean']>;
  entryRequirements_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  entryRequirements_not?: InputMaybe<Scalars['String']>;
  entryRequirements_not_contains?: InputMaybe<Scalars['String']>;
  entryRequirements_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  introduction?: InputMaybe<Scalars['String']>;
  introduction_contains?: InputMaybe<Scalars['String']>;
  introduction_exists?: InputMaybe<Scalars['Boolean']>;
  introduction_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  introduction_not?: InputMaybe<Scalars['String']>;
  introduction_not_contains?: InputMaybe<Scalars['String']>;
  introduction_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  learningObjectives_contains?: InputMaybe<Scalars['String']>;
  learningObjectives_exists?: InputMaybe<Scalars['Boolean']>;
  learningObjectives_not_contains?: InputMaybe<Scalars['String']>;
  maxAmountOfTrainees?: InputMaybe<Scalars['Int']>;
  maxAmountOfTraineesType?: InputMaybe<Scalars['Boolean']>;
  maxAmountOfTraineesType_exists?: InputMaybe<Scalars['Boolean']>;
  maxAmountOfTraineesType_not?: InputMaybe<Scalars['Boolean']>;
  maxAmountOfTrainees_exists?: InputMaybe<Scalars['Boolean']>;
  maxAmountOfTrainees_gt?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_gte?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  maxAmountOfTrainees_lt?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_lte?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_not?: InputMaybe<Scalars['Int']>;
  maxAmountOfTrainees_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  pageImageCollection_exists?: InputMaybe<Scalars['Boolean']>;
  recommended?: InputMaybe<Scalars['Boolean']>;
  recommended_exists?: InputMaybe<Scalars['Boolean']>;
  recommended_not?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  systemAvailability?: InputMaybe<Scalars['String']>;
  systemAvailability_contains?: InputMaybe<Scalars['String']>;
  systemAvailability_exists?: InputMaybe<Scalars['Boolean']>;
  systemAvailability_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  systemAvailability_not?: InputMaybe<Scalars['String']>;
  systemAvailability_not_contains?: InputMaybe<Scalars['String']>;
  systemAvailability_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  targetGroup?: InputMaybe<Scalars['String']>;
  targetGroup_contains?: InputMaybe<Scalars['String']>;
  targetGroup_exists?: InputMaybe<Scalars['Boolean']>;
  targetGroup_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  targetGroup_not?: InputMaybe<Scalars['String']>;
  targetGroup_not_contains?: InputMaybe<Scalars['String']>;
  targetGroup_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  trainingModulesCollection_exists?: InputMaybe<Scalars['Boolean']>;
};
