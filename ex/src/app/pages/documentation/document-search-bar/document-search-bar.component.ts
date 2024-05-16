import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-document-search-bar',
  templateUrl: './document-search-bar.component.html'
})
export class DocumentSearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>()

  @Input() public searchText: string = ''

  /**
   * Set search text from search input
   * @param {string} searchValue
   * @returns {DocumentSearchResult}
   */
  public onSearchInput(searchValue: string): void {
    this.searchText = searchValue
  }

  /**
   * Submit search text
   */
  public onSubmit(event: any): void {
    event.preventDefault()
    event.stopPropagation()

    if (this.searchText?.length !== 1) {
      this.searchEvent.emit(this.searchText)
    }
  }
}
