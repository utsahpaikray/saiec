import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { CmsGenericContentService } from './cms-generic.service'
import { TestBed } from '@angular/core/testing'
import { mockCertificationsGenericPage } from './graphql/cms-generic.service.mock'
import { GENERIC_CERTIFICATIONS_SLUG } from '@pages/training-overview/training-overview.component'
import { GenericContentBySlugDocument } from './graphql/cms-generic-by-slug.graphql-gen'

describe('CmsTrainingService', () => {
  let controller: ApolloTestingController
  let service: CmsGenericContentService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule.withClients(['cms'])]
    }).compileComponents()

    TestBed.configureTestingModule({
      providers: [CmsGenericContentService]
    })
    controller = TestBed.inject(ApolloTestingController)
    service = TestBed.inject(CmsGenericContentService)
  })

  it('should get generic page contents by generic id from cms', () => {
    service
      .getGenericContentBySlug(GENERIC_CERTIFICATIONS_SLUG)
      .subscribe((data) => {
        expect(data).toEqual(mockCertificationsGenericPage)
      })

    const op = controller.expectOne(GenericContentBySlugDocument)
    expect(op.operation.operationName).toEqual('genericContentBySlug')

    op.flushData({
      genericCollection: {
        items: [{ ...mockCertificationsGenericPage, __typename: 'Generic' }],
        __typename: 'GenericCollection'
      }
    })
  })
})
