import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { map, Observable, take, tap } from 'rxjs'

import {
  AllowedDocumentationCulturesGQL,
  DocumentCultureFragment,
  AllowedDocumentationCulturesQuery
} from '@core/documentation/graphql/allowed-documentation-cultures.graphql-gen'
import { DropdownItem } from '@components/dropdown/dropdown-item.model'

@Component({
  selector: 'app-documentation-category-language-selector',
  templateUrl: './documentation-category-language-selector.component.html'
})
export class DocumentationCategoryLanguageSelectorComponent
  implements OnChanges
{
  @Input() availableCultures: string[]
  @Input() selectedCulture?: string
  @Input() isDisabled: boolean = false

  @Output() cultureChange = new EventEmitter<string>()

  public cultureDropDownItems: DropdownItem[]
  public selectedDropDownItem: DropdownItem

  private allowedCultures: DocumentCultureFragment[]

  constructor(
    private allowedDocumentationCulturesGQL: AllowedDocumentationCulturesGQL
  ) {}

  /**
   * On changes get available languages
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.availableCultures || !this.availableCultures) {
      return
    }

    if (this.allowedCultures) {
      this.setCultureDropdown(this.availableCultures, this.allowedCultures)
      return
    }

    this.fetchAllowedCultures()
      .pipe(
        take(1),
        tap(
          (cultures: DocumentCultureFragment[]) =>
            (this.allowedCultures = cultures)
        )
      )
      .subscribe({
        next: () => {
          if (this.allowedCultures && this.allowedCultures.length > 0) {
            this.setCultureDropdown(
              this.availableCultures,
              this.allowedCultures
            )
            return
          }

          this.cultureDropDownItems = []
        }
      })
  }

  /**
   * Set culture dropdown
   * @param {CategoryCulture[]} categoryCultures
   */
  private setCultureDropdown(
    cultures: string[],
    locales: DocumentCultureFragment[]
  ): void {
    this.cultureDropDownItems = locales
      .filter((locale) => cultures.indexOf(locale.name) > -1)
      .map((locale) => new DropdownItem(locale.name, locale.englishName))
  }

  /**
   * Fetch all allowed cultures for upload from API
   */
  private fetchAllowedCultures(): Observable<DocumentCultureFragment[]> {
    return this.allowedDocumentationCulturesGQL
      .fetch()
      .pipe(
        map(
          (result: ApolloQueryResult<AllowedDocumentationCulturesQuery>) =>
            result.data.allowedDocumentationCultures
        )
      )
  }
}
