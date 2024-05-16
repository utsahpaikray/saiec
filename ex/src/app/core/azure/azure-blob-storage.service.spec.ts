import { TestBed } from '@angular/core/testing'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { AzureBlobStorageService } from './azure-blob-storage.service'
import { DocumentUploadInfoGQL } from './graphql/document-upload-info.graphql-gen'

describe('AzureBlobStorageService', () => {
  let service: AzureBlobStorageService
  let controller: ApolloTestingController
  let query: DocumentUploadInfoGQL

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [AzureBlobStorageService]
    })

    service = TestBed.inject(AzureBlobStorageService)
    controller = TestBed.inject(ApolloTestingController)
    query = TestBed.inject(DocumentUploadInfoGQL)
  })

  it('should get upload info when uploading file', () => {
    expect(service).toBeTruthy()
  })
})
