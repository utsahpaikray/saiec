import { TestBed } from '@angular/core/testing'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { CmsTrainingService } from './cms-training.service'
import {
  mockAssortedTraining1,
  mockAssortedTrainingIds,
  mockCardImage,
  mockCertificationPath,
  mockCertificationPathId,
  mockRecommendedAssortedTraining,
  mockRecommendedAssortedTrainings,
  mockSegment,
  mockTrainingId,
  mockTrainingRequestCertificationPath
} from './cms-training.service.mock'
import { AssortedTrainingIdsDocument } from './graphql/cms-assorted-training-ids.graphql-gen'
import { AssortedTrainingsByCertificationPathDocument } from './graphql/cms-assorted-trainings-by-certification-path.graphql-gen'
import { CertificationPathsDocument } from './graphql/cms-certification-paths.graphql-gen'
import { RecommendedAssortedTrainingDocument } from './graphql/cms-recommended-assorted-trainings.graphql-gen'
import { CertificationPathByTrainingIdsDocument } from './graphql/cms-certification-path-by-training-ids.graphql-gen'

describe('CmsTrainingService', () => {
  let controller: ApolloTestingController
  let service: CmsTrainingService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule.withClients(['cms'])]
    }).compileComponents()

    TestBed.configureTestingModule({
      providers: [CmsTrainingService]
    })
    controller = TestBed.inject(ApolloTestingController)
    service = TestBed.inject(CmsTrainingService)
  })

  it('should get recommended assorted trainings by segment', () => {
    service
      .getRecommendedAssortedTrainings(mockSegment)
      .subscribe(({ data }) => {
        if (!data?.assortmentCollection?.items[0]?.trainingsCollection?.items)
          return
        expect(
          data?.assortmentCollection?.items[0]?.trainingsCollection?.items
        ).toEqual(mockRecommendedAssortedTrainings)
      })

    const op = controller.expectOne(RecommendedAssortedTrainingDocument)
    expect(op.operation.operationName).toEqual('recommendedAssortedTraining')

    op.flushData({
      assortmentCollection: {
        items: [
          {
            trainingsCollection: {
              items: [
                {
                  ...mockRecommendedAssortedTraining,
                  cardImageCollection: {
                    items: [{ ...mockCardImage, __typename: 'Asset' }],
                    __typename: 'AssetCollection'
                  },
                  linkedFrom: {
                    certificationPathCollection: {
                      items: [
                        {
                          ...mockCertificationPath,
                          __typename: 'CertificationPath'
                        }
                      ]
                    }
                  },
                  __typename: 'Training'
                }
              ],
              __typename: 'AssortmentTrainingsCollection'
            },
            __typename: 'Assortment'
          }
        ],
        __typename: 'AssortmentCollection'
      }
    })

    controller.verify()
  })

  it('should get assorted training ids by segment', () => {
    service.getAssortedTrainingIds(mockSegment).subscribe((ids) => {
      expect(ids[0]).toEqual(mockTrainingId)
    })

    const op = controller.expectOne(AssortedTrainingIdsDocument)
    expect(op.operation.operationName).toEqual('assortedTrainingIds')

    op.flushData({
      assortmentCollection: {
        items: [
          {
            trainingsCollection: {
              items: [
                {
                  sys: {
                    id: '2n9BBYojgx2iB2Tetmv0Af'
                  }
                }
              ],
              __typename: 'AssortmentTrainingsCollection'
            },
            __typename: 'Assortment'
          }
        ],
        __typename: 'AssortmentCollection'
      }
    })
  })

  it('should get certification paths', () => {
    service.getCertificationPaths().subscribe((certificationPathCollection) => {
      expect(certificationPathCollection.items[0]).toEqual(
        mockTrainingRequestCertificationPath
      )
    })

    const op = controller.expectOne(CertificationPathsDocument)
    expect(op.operation.operationName).toEqual('certificationPaths')

    op.flushData({
      certificationPathCollection: {
        items: [
          {
            ...mockTrainingRequestCertificationPath,
            __typename: 'CertificationPath'
          }
        ],
        __typename: 'CertificationPathCollection'
      }
    })
  })

  it('should get certification path and assorted trainings by certification path id', () => {
    service
      .getCertificationPathAndAssortedTrainings(
        mockCertificationPathId,
        mockAssortedTrainingIds
      )
      .subscribe((data) => {
        expect(data.certificationPath).toEqual({
          ...mockCertificationPath,
          trainingsCollection: { items: [mockAssortedTraining1] }
        })
      })

    const op = controller.expectOne(
      AssortedTrainingsByCertificationPathDocument
    )
    expect(op.operation.operationName).toEqual(
      'assortedTrainingsByCertificationPath'
    )

    op.flushData({
      certificationPath: {
        ...mockCertificationPath,
        trainingsCollection: {
          items: [{ ...mockAssortedTraining1, __typename: 'Training' }],
          __typename: 'CertificationPathTrainingsCollection'
        },
        __typename: 'CertificationPath'
      }
    })
  })

  it('should get certification path by training ids', () => {
    service
      .getCertificationPathByTrainingIds(mockAssortedTrainingIds)
      .subscribe((data) => {
        expect(data).toEqual({
          trainingCollection: {
            items: [
              {
                linkedFrom: {
                  certificationPathCollection: {
                    items: [{ ...mockCertificationPath }]
                  }
                }
              }
            ]
          }
        })
      })

    const op = controller.expectOne(CertificationPathByTrainingIdsDocument)
    expect(op.operation.operationName).toEqual('certificationPathByTrainingIds')

    op.flushData({
      trainingCollection: {
        items: [
          {
            linkedFrom: {
              certificationPathCollection: {
                items: [
                  {
                    ...mockCertificationPath,
                    __typename: 'CertificationPath'
                  }
                ]
              }
            }
          }
        ],
        __typename: 'CertificationPathCollection'
      }
    })
  })
})
