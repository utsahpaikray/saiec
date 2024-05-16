import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SiteNewsComponent, SiteNewsVM } from './site-news.component'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoLocaleModule } from '@ngneat/transloco-locale'
import { GravityCard } from '@vanderlande-gravity/components'

const MOCK_TAG = 'mock-tag'
const MOCK_TITLE = 'mock-title'
const MOCK_CONTENT = 'mock-content'
const MOCK_SRC = 'https://mock-src/'
const MOCK_ALT = 'mock-alt'
const MOCK_LABEL = 'mock-label'
const MOCK_LINK = 'https://mock-link'

const mockVM: SiteNewsVM = {
  cards: [
    {
      labels: {
        tag: MOCK_TAG,
        title: MOCK_TITLE,
        content: MOCK_CONTENT
      },
      image: {
        src: MOCK_SRC,
        alt: MOCK_ALT
      },
      action: {
        label: MOCK_LABEL,
        link: MOCK_LINK
      }
    },
    {
      labels: {
        title: MOCK_TITLE,
        content: MOCK_CONTENT
      }
    }
  ]
}

describe('SiteNewsComponent', () => {
  let component: SiteNewsComponent
  let fixture: ComponentFixture<SiteNewsComponent>
  let card1: GravityCard
  let card2: GravityCard

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SiteNewsComponent,
        getTranslocoModule(),
        TranslocoLocaleModule.forRoot()
      ]
    })
    fixture = TestBed.createComponent(SiteNewsComponent)
    component = fixture.componentInstance
    component.vm = structuredClone(mockVM)
    fixture.detectChanges()
    card1 = fixture.nativeElement.querySelectorAll('grav-card')?.[0]
    card2 = fixture.nativeElement.querySelectorAll('grav-card')?.[1]
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should display two cards', () => {
    expect(card1).toBeTruthy()
    expect(card2).toBeTruthy()
  })
  it("should display a tag in the card's header", () => {
    const tag = card1.querySelector('[role=news-tag]')
    expect(tag).toBeTruthy()
    expect(tag?.textContent?.trim()).toEqual(MOCK_TAG)
  })
  it("should display a title in the card's header", () => {
    const title = card1.querySelector('[role=news-title]')
    expect(title).toBeTruthy()
    expect(title?.textContent?.trim()).toEqual(MOCK_TITLE)
  })
  it("should display the content in the card's content", () => {
    const content = card1.querySelector('[role=news-content]')
    expect(content).toBeTruthy()
    expect(content?.textContent?.trim()).toEqual(MOCK_CONTENT)
  })
  it("should display the image in the card's content", () => {
    const image = card1.querySelector<HTMLImageElement>('[role=news-image]')
    expect(image).toBeTruthy()
    expect(image?.src).toEqual(MOCK_SRC)
    expect(image?.alt).toEqual(MOCK_ALT)
  })
  it('should display a button in the footer', () => {
    const button = card1.querySelector('[role=news-action]')
    expect(button).toBeTruthy()
    expect(button?.textContent?.trim()).toEqual(MOCK_LABEL)
  })
  it('should open an external link when the button clicked', () => {
    const spy = spyOn(window, 'open')
    const button = card1.querySelector<HTMLButtonElement>('[role=news-action]')
    expect(button).toBeTruthy()
    button?.click()
    expect(spy).toHaveBeenCalledWith(MOCK_LINK, '_blank')
  })
  it("should NOT display a tag in the card's header", () => {
    const tag = card2.querySelector('[role=news-tag]')
    expect(tag).toBeFalsy()
  })

  it("should NOT display the image in the card's content", () => {
    const image = card2.querySelector('[role=news-image]')
    expect(image).toBeFalsy()
  })

  it('should NOT display a button in the footer', () => {
    const button = card2.querySelector('[role=news-action]')
    expect(button).toBeFalsy()
  })
})
