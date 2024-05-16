import * as Types from '../../generated/types';

export type SitePortalFragment = { __typename?: 'Site', portal: { __typename?: 'Portal', name: string, id: any } };

export type SiteProjectsSegmentFragment = { __typename?: 'Site', projects: Array<{ __typename?: 'Project', segment: Types.Segment }> };
