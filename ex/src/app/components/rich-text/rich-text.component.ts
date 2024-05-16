import { Component, EventEmitter, Input, Output } from '@angular/core'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { Scalars } from '@core/generated/cms-types'
import { TranslocoService } from '@ngneat/transloco'

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html'
})
export class RichTextComponent {
  /**
   * rich text in JSON format
   */
  @Input() richText: Scalars['JSON']

  /**
   * Emitter of link
   */
  @Output()
  processLink = new EventEmitter<string>()

  /**
   * optional parameter to pass custom renderers for both marks and nodes
   * in the documentToHtmlString() function from rich text html renderer
   * Note on <li> open issue from the package: https://github.com/contentful/rich-text/issues/126
   */
  public options = {
    renderMark: {
      [MARKS.BOLD]: (text: any) => `<span class="font-bold">${text}<span>`
    },
    renderNode: {
      [BLOCKS.HEADING_3]: (node: any, next: any) =>
        `<h3 class="font-medium text-lg md:text-xl" data-testid="rich-text-h3">${next(
          node.content
        ).replace(/\n/g, `</br>`)}</h3>`,
      [BLOCKS.PARAGRAPH]: (node: any, next: any) =>
        `<p class="text-black md:text-lg" data-testid="rich-text-paragraph">${next(
          node.content
        ).replace(/\n/g, `</br>`)}</p>`,
      [BLOCKS.UL_LIST]: (node: any, next: any) =>
        `<ul class="list-disc ml-5" data-testid="rich-text-ul-list">${next(
          node.content
        )}</ul>`,
      [BLOCKS.OL_LIST]: (node: any, next: any) =>
        `<ol class="list-decimal ml-5" data-testid="rich-text-ol-list">${next(
          node.content
        )}</ol>`,
      [BLOCKS.LIST_ITEM]: (node: any, next: any) =>
        `<li class="text-black md:text-lg" data-testid="rich-text-li-list">${next(
          node.content
        )}</li>`,
      [INLINES.ENTRY_HYPERLINK]: (node: any, next: any) => {
        const targetId = node.data.target.sys.id
        return `<a href="${targetId}" class="underline text-blue-700 hover:text-blue-800" data-testid="rich-text-entry-hyperlink">${next(
          node.content
        )}<a>`
      },
      [INLINES.HYPERLINK]: (node: any, next: any) => {
        const uri = node.data.uri
        return `<a href="${uri}" class="underline text-blue-700 hover:text-blue-800" data-testid="rich-text-external-link">${next(
          node.content
        )}<a>`
      }
    }
  }

  constructor(private translocoService: TranslocoService) {}

  /**
   * process and open entry hyperlink and hyperlink that are inserted in rich text on mouse click
   */
  public processLinks(event: MouseEvent): void {
    const element = event.target as HTMLElement
    if (element.nodeName === 'A') {
      event.preventDefault()
      const link = element.getAttribute('href')
      if (!link) return
      if (!this.isExternal(link)) {
        this.processLink.emit(link)
      } else {
        window.open(link, '_blank')
      }
    }
  }

  /**
   * check if link is external link
   */
  public isExternal(url: string) {
    return url?.startsWith('https://') || url?.startsWith('http://')
  }

  /**
   * convert rich text to html by using
   */
  public convertToHTMLFromRichText(richText: Scalars['JSON']) {
    if (
      richText === undefined ||
      richText === null ||
      richText.nodeType !== 'document'
    ) {
      const translatedErrorText =
        this.translocoService.translate('General.ApiError')
      return `<p class="text-black md:text-lg" data-testid="rich-text-error">${translatedErrorText}</p>`
    }
    return documentToHtmlString(richText, this.options)
  }
}
