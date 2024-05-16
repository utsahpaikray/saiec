import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { PreviousUrlService } from './previous-url.service'

describe('PreviousUrlService', () => {
  let service: PreviousUrlService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [PreviousUrlService]
    })

    service = TestBed.inject(PreviousUrlService)
  })

  it('should create', () => {
    expect(service).toBeTruthy()
  })
})
