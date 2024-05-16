import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Scalars } from '@core/generated/cms-types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { SafeHtmlPipe } from '@core/pipes/safe-html.pipe'

import { RichTextComponent } from './rich-text.component'

const mockEntryHyperlinkTargetId = '29CgJYjLvOX9UnoNcsZtpe'
const mockExternalUrl = 'https://www.google.com'

const mockJsonContent: Scalars['JSON'] = {
  content: [
    {
      content: [
        {
          data: {},
          marks: [],
          nodeType: 'text',
          value: 'paragraph test'
        }
      ],
      data: {},
      nodeType: 'paragraph'
    },
    {
      content: [
        {
          data: {},
          marks: [],
          nodeType: 'text',
          value: 'heading 3 test'
        }
      ],
      data: {},
      nodeType: 'heading-3'
    },
    {
      content: [
        {
          content: [
            {
              content: [
                {
                  content: [
                    {
                      data: {},
                      marks: [],
                      nodeType: 'text',
                      value: 'Fundamental Operations'
                    }
                  ],
                  data: {
                    target: {
                      sys: {
                        id: mockEntryHyperlinkTargetId,
                        linkType: 'Entry',
                        type: 'Link'
                      }
                    }
                  },
                  nodeType: 'entry-hyperlink'
                }
              ],
              data: {},
              nodeType: 'paragraph'
            },
            {
              content: [
                {
                  data: {},
                  marks: [],
                  nodeType: 'text',
                  value: 'External link'
                }
              ],
              data: {
                uri: mockExternalUrl
              },
              nodeType: 'hyperlink'
            }
          ],
          data: {},
          nodeType: 'list-item'
        }
      ],
      data: {},
      nodeType: 'unordered-list'
    },
    {
      content: [
        {
          content: [
            {
              content: [
                {
                  content: [
                    {
                      data: {},
                      marks: [],
                      nodeType: 'text',
                      value: 'Fundamental Operations'
                    }
                  ],
                  data: {
                    target: {
                      sys: {
                        id: mockEntryHyperlinkTargetId,
                        linkType: 'Entry',
                        type: 'Link'
                      }
                    }
                  },
                  nodeType: 'entry-hyperlink'
                }
              ],
              data: {},
              nodeType: 'paragraph'
            },
            {
              content: [
                {
                  data: {},
                  marks: [],
                  nodeType: 'text',
                  value: 'External link'
                }
              ],
              data: {
                uri: 'https://www.google.com'
              },
              nodeType: 'hyperlink'
            }
          ],
          data: {},
          nodeType: 'list-item'
        }
      ],
      data: {},
      nodeType: 'ordered-list'
    }
  ],
  data: {},
  nodeType: 'document'
}

describe('RichTextComponent', () => {
  let component: RichTextComponent
  let fixture: ComponentFixture<RichTextComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
      declarations: [RichTextComponent, SafeHtmlPipe]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show error text when rich text does not exist', async () => {
    component.richText = null

    fixture.detectChanges()
    await fixture.whenStable()

    const richTextError = fixture.debugElement.query(
      By.css('[data-testid="rich-text-error"]')
    )
    expect(richTextError).toBeTruthy()
  })

  it('should show error text when rich text node type is not document', async () => {
    component.richText = { ...mockJsonContent, nodeType: 'paragraph' }

    fixture.detectChanges()
    await fixture.whenStable()

    const richTextError = fixture.debugElement.query(
      By.css('[data-testid="rich-text-error"]')
    )
    expect(richTextError).toBeTruthy()
  })

  it('should render paragraph with correct styling', async () => {
    component.richText = mockJsonContent
    fixture.detectChanges()
    await fixture.whenStable()

    const paragraph = fixture.debugElement.query(
      By.css('[data-testid="rich-text-paragraph"]')
    )
    expect(paragraph).toBeTruthy()
    expect(paragraph.nativeElement.className).toBe('text-black md:text-lg')
  })

  it('should render h3 with correct styling', async () => {
    component.richText = mockJsonContent
    fixture.detectChanges()
    await fixture.whenStable()

    const h3 = fixture.debugElement.query(
      By.css('[data-testid="rich-text-h3"]')
    )
    expect(h3).toBeTruthy()
    expect(h3.nativeElement.className).toBe('font-medium text-lg md:text-xl')
  })

  it('should render ul list with correct styling', async () => {
    component.richText = mockJsonContent
    fixture.detectChanges()
    await fixture.whenStable()

    const ulList = fixture.debugElement.query(
      By.css('[data-testid="rich-text-ul-list"]')
    )
    expect(ulList).toBeTruthy()
    expect(ulList.nativeElement.className).toBe('list-disc ml-5')
  })

  it('should render li list with correct styling', async () => {
    component.richText = mockJsonContent
    fixture.detectChanges()
    await fixture.whenStable()

    const liList = fixture.debugElement.query(
      By.css('[data-testid="rich-text-li-list"]')
    )
    expect(liList).toBeTruthy()
    expect(liList.nativeElement.className).toBe('text-black md:text-lg')
  })

  it('should render ol list with correct styling', async () => {
    component.richText = mockJsonContent
    fixture.detectChanges()
    await fixture.whenStable()

    const olList = fixture.debugElement.query(
      By.css('[data-testid="rich-text-ol-list"]')
    )
    expect(olList).toBeTruthy()
    expect(olList.nativeElement.className).toBe('list-decimal ml-5')
  })

  it('should render anchor link with correct styling', async () => {
    component.richText = mockJsonContent
    fixture.detectChanges()
    await fixture.whenStable()

    const entryHyperlink = fixture.debugElement.query(
      By.css('[data-testid="rich-text-entry-hyperlink"]')
    )
    expect(entryHyperlink).toBeTruthy()
    expect(entryHyperlink.nativeElement.className).toBe(
      'underline text-blue-700 hover:text-blue-800'
    )

    const externalLink = fixture.debugElement.query(
      By.css('[data-testid="rich-text-external-link"]')
    )
    expect(externalLink).toBeTruthy()
    expect(externalLink.nativeElement.className).toBe(
      'underline text-blue-700 hover:text-blue-800'
    )
  })

  it('process link works when clicking on entry hyperlink', () => {
    spyOn(component.processLink, 'emit')
    component.richText = mockJsonContent

    const mockEvent: any = {
      target: {
        nodeName: 'A',
        attributes: [{ href: { value: mockEntryHyperlinkTargetId } }],
        getAttribute: () => {
          return mockEntryHyperlinkTargetId
        }
      },
      preventDefault: () => {}
    }

    component.processLinks(mockEvent)

    fixture.detectChanges()
    expect(component.processLink.emit).toHaveBeenCalledOnceWith(
      mockEntryHyperlinkTargetId
    )
  })

  it('process link works when clicking on external hyperlink', () => {
    spyOn(window, 'open')
    component.richText = mockJsonContent

    const mockEvent: any = {
      target: {
        nodeName: 'A',
        attributes: [{ href: { value: mockExternalUrl } }],
        getAttribute: () => {
          return mockExternalUrl
        }
      },
      preventDefault: () => {}
    }

    component.processLinks(mockEvent)

    fixture.detectChanges()
    expect(window.open).toHaveBeenCalledOnceWith(mockExternalUrl, '_blank')
  })
})
