import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { FormsModule } from '@angular/forms'

// Components
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { DocumentTableModule } from '@pages/documentation/document-table/document-table.module'
import { DocumentSearchModule } from '../documentation/document-search/document-search.module'
import { DocumentationCategoryRoutingModule } from './documentation-category-routing.module'
import { DocumentationCategoryComponent } from './documentation-category.component'
import { DocumentationCategoryLanguageSelectorComponent } from './documentation-category-language-selector/documentation-category-language-selector.component'
import { DropdownModule } from '@components/dropdown/dropdown.module'

import { LinkModule } from '@components/link/link.module'
import { DocumentSearchBarModule } from '../documentation/document-search-bar/document-search-bar.module'

@NgModule({
  declarations: [
    DocumentationCategoryComponent,
    DocumentationCategoryLanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    DocumentationCategoryRoutingModule,
    AngularSvgIconModule,
    FormsModule,
    TranslocoRootModule,

    DropdownModule,
    LinkModule,
    DocumentTableModule,
    DocumentSearchModule,
    DocumentSearchBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentationCategoryModule {}
