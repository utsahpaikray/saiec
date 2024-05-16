import { TestBed } from '@angular/core/testing'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { MaximoUserAccess } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import {
  SiteMaximoAccessDocument,
  SiteMaximoAccessGQL
} from './graphql/site-maximo-access.graphql-gen'
import enData from '@assets/i18n/en-US.json'
import { MaximoAccessService } from './maximo-access.service'
import { throwError } from 'rxjs'
import { MaximoAccessErrorTrigger } from './maximo-access.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { Toast } from '@components/toaster/toast/toast.model'

describe('MaximoAccessService', () => {
  let controller: ApolloTestingController
  let maximoAccessService: MaximoAccessService
  let query: SiteMaximoAccessGQL
  let toastService: ToasterService
  const siteId = 'testSiteId'

  const mockMaximoAccessCanReadWrite = {
    canReadTickets: true,
    canWriteTickets: true
  } as MaximoUserAccess

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, getTranslocoModule()]
    }).compileComponents()

    TestBed.configureTestingModule({ providers: [MaximoAccessService] })
    maximoAccessService = TestBed.inject(MaximoAccessService)
    toastService = TestBed.inject(ToasterService)
    controller = TestBed.inject(ApolloTestingController)
    query = TestBed.inject(SiteMaximoAccessGQL)
  })

  it('should query maximo user access by site id from maximo access service', () => {
    spyOn(query, 'fetch').and.callThrough()

    maximoAccessService
      .getMaximoUserAccessBySiteId(siteId)
      .subscribe((maximoUserAccess) => {
        expect(maximoUserAccess).toEqual(mockMaximoAccessCanReadWrite)
      })

    const op = controller.expectOne(SiteMaximoAccessDocument)
    expect(op.operation.operationName).toEqual('siteMaximoAccess')

    op.flushData({
      maximoAccess: mockMaximoAccessCanReadWrite
    })

    controller.verify()

    expect(query.fetch).toHaveBeenCalledWith({
      siteId: siteId
    })
  })

  it('should get maximo user access by site id from maximo access service', () => {
    spyOn(query, 'fetch').and.callThrough()

    maximoAccessService.setMaximoUserAccessBySiteId(siteId)

    controller.expectOne(SiteMaximoAccessDocument).flushData({
      maximoAccess: mockMaximoAccessCanReadWrite
    })
    controller.verify()

    expect(query.fetch).toHaveBeenCalledWith({
      siteId: siteId
    })
    maximoAccessService.maximoUserAccess$.subscribe((maximoUserAccess) => {
      expect(maximoUserAccess).toEqual(mockMaximoAccessCanReadWrite)
    })
  })

  it('should set maximo user access rights to false and trigger toast if call fails', () => {
    const mockMaximoAccessCannotReadWrite = {
      canReadTickets: false,
      canWriteTickets: false
    } as MaximoUserAccess

    spyOn(toastService, 'addToast').and.callThrough()
    spyOn(maximoAccessService, 'getMaximoUserAccessBySiteId').and.callFake(() =>
      throwError(() => null)
    )

    maximoAccessService.maximoUserAccess$.subscribe((maximoUserAccess) => {
      expect(maximoUserAccess).toEqual(mockMaximoAccessCannotReadWrite)
    })

    maximoAccessService.setMaximoUserAccessBySiteId(
      siteId,
      MaximoAccessErrorTrigger.Toast
    )

    expect(toastService.addToast).toHaveBeenCalledWith(
      new Toast('warning', enData.General.MaximoAccessError)
    )
  })
})
