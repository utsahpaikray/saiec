import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { DomSanitizer } from '@angular/platform-browser'
import { SafeHtmlPipe } from './safe-html.pipe'

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe
  let domSanitizer: DomSanitizer

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: () =>
              '10166-072-99999-EN-A DHL CdG O&M manual.pdf'
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    domSanitizer = TestBed.inject(DomSanitizer)
    pipe = new SafeHtmlPipe(domSanitizer)
  })

  it(`transform calls 'bypassSecurityTrustHtml' method`, () => {
    spyOn(domSanitizer, 'bypassSecurityTrustHtml')

    pipe.transform(
      '010166-<mark class="highlight-text">100</mark>-EN-A01 Controls item drawing regarding 010166-<mark class="highlight-text">100</mark>-00001.pdf'
    )
    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledOnceWith(
      '010166-<mark class="highlight-text">100</mark>-EN-A01 Controls item drawing regarding 010166-<mark class="highlight-text">100</mark>-00001.pdf'
    )
  })
})
