import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AttachmentComponent, AttachmentVariant } from './attachment.component'

describe('AttachmentComponent', () => {
  let component: AttachmentComponent
  let fixture: ComponentFixture<AttachmentComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AttachmentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(AttachmentComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the correct template based on the variant', () => {
    // Thumbnail variant
    fixture.componentRef.setInput('vm', {
      variant: AttachmentVariant.Thumbnail
    })
    fixture.detectChanges()
    const thumbnailEl = fixture.debugElement.query(
      By.css('div.overflow-hidden')
    )
    expect(thumbnailEl).toBeTruthy()

    // Document variant
    fixture.componentRef.setInput('vm', {
      variant: AttachmentVariant.Document
    })
    fixture.detectChanges()
    const documentEl = fixture.debugElement.query(
      By.css('div.bg-grey-300 grav-svg-icon[key="document"]')
    )
    expect(documentEl).toBeTruthy()

    // MFE variant
    fixture.componentRef.setInput('vm', {
      variant: AttachmentVariant.Mfe
    })
    fixture.detectChanges()
    const mfeEl = fixture.debugElement.query(
      By.css('div.bg-grey-300 grav-svg-icon[key="bar-chart"]')
    )
    expect(mfeEl).toBeTruthy()
  })

  it('should render the prefix icon if provided', async () => {
    fixture.componentRef.setInput('vm', { prefixIconKey: 'document' })
    fixture.detectChanges()
    const prefixIconEl = fixture.debugElement.query(
      By.css('grav-svg-icon + .flex-grow.ellipsis')
    )
    expect(prefixIconEl).toBeTruthy()
  })

  it('should render the content', async () => {
    fixture.detectChanges()
    await fixture.whenStable()
    const contentEl = fixture.debugElement.query(By.css('span.ellipsis'))
    expect(contentEl).toBeTruthy()
  })
})
