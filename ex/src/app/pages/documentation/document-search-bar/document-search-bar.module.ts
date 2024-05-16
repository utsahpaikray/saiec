import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { DocumentSearchBarComponent } from './document-search-bar.component'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

import { SearchInputModule } from '@components/search-input/search-input.module'

@NgModule({
  declarations: [DocumentSearchBarComponent],
  exports: [DocumentSearchBarComponent],
  imports: [CommonModule, TranslocoRootModule, SearchInputModule]
})
export class DocumentSearchBarModule {}
