import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PictureComponent } from './picture.component'
import { By } from '@angular/platform-browser'

import {
  breakpointSmMin,
  breakpointMdMin,
  breakpointLgMin,
  breakpointXlMin,
  breakpoint2xlMin
} from 'src/tokens/build/js/es6'

describe('PictureComponent', () => {
  let component: PictureComponent
  let fixture: ComponentFixture<PictureComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PictureComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set default image', () => {
    let image = fixture.debugElement.query(
      By.css('[data-testid="picture-image"]')
    )

    expect(image).toBeNull()

    component.imageXs = 'image-url'
    fixture.detectChanges()

    image = fixture.debugElement.query(By.css('[data-testid="picture-image"]'))

    expect(image.nativeElement.src).toEqual(
      `${window.location.origin}/image-url`
    )
  })

  it('should set source small', () => {
    let source = fixture.debugElement.query(
      By.css('[data-testid="source-small"]')
    )

    expect(source).toBeNull()

    component.imageSm = 'image-url'
    fixture.detectChanges()

    source = fixture.debugElement.query(By.css('[data-testid="source-small"]'))

    expect(source.nativeElement.srcset).toEqual('image-url')
    expect(source.nativeElement.media).toEqual(
      `(min-width: ${breakpointSmMin})`
    )
  })

  it('should set source medium', () => {
    let source = fixture.debugElement.query(
      By.css('[data-testid="source-medium"]')
    )

    expect(source).toBeNull()

    component.imageMd = 'image-url'
    fixture.detectChanges()

    source = fixture.debugElement.query(By.css('[data-testid="source-medium"]'))

    expect(source.nativeElement.srcset).toEqual('image-url')
    expect(source.nativeElement.media).toEqual(
      `(min-width: ${breakpointMdMin})`
    )
  })

  it('should set source large', () => {
    let source = fixture.debugElement.query(
      By.css('[data-testid="source-large"]')
    )

    expect(source).toBeNull()

    component.imageLg = 'image-url'
    fixture.detectChanges()

    source = fixture.debugElement.query(By.css('[data-testid="source-large"]'))

    expect(source.nativeElement.srcset).toEqual('image-url')
    expect(source.nativeElement.media).toEqual(
      `(min-width: ${breakpointLgMin})`
    )
  })

  it('should set source extra large', () => {
    let source = fixture.debugElement.query(
      By.css('[data-testid="source-extra-large"]')
    )

    expect(source).toBeNull()

    component.imageXl = 'image-url'
    fixture.detectChanges()

    source = fixture.debugElement.query(
      By.css('[data-testid="source-extra-large"]')
    )

    expect(source.nativeElement.srcset).toEqual('image-url')
    expect(source.nativeElement.media).toEqual(
      `(min-width: ${breakpointXlMin})`
    )
  })

  it('should set source extra extra large', () => {
    let source = fixture.debugElement.query(
      By.css('[data-testid="source-extra-extra-large"]')
    )

    expect(source).toBeNull()

    component.image2xl = 'image-url'
    fixture.detectChanges()

    source = fixture.debugElement.query(
      By.css('[data-testid="source-extra-extra-large"]')
    )

    expect(source.nativeElement.srcset).toEqual('image-url')
    expect(source.nativeElement.media).toEqual(
      `(min-width: ${breakpoint2xlMin})`
    )
  })
})
