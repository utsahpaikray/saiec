import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
export type SitePortalFragment = { __typename?: 'Site', portal: { __typename?: 'Portal', name: string, id: any } };

export type SiteProjectsSegmentFragment = { __typename?: 'Site', projects: Array<{ __typename?: 'Project', segment: Types.Segment }> };

export const SitePortalFragmentDoc = gql`
    fragment SitePortal on Site {
  portal {
    name
    id
  }
}
    `;
export const SiteProjectsSegmentFragmentDoc = gql`
    fragment SiteProjectsSegment on Site {
  projects(where: {segment: {neq: NOT_APPLICABLE}}) {
    segment
  }
}
    `;
export const namedOperations = {
  Fragment: {
    SitePortal: 'SitePortal',
    SiteProjectsSegment: 'SiteProjectsSegment'
  }
}