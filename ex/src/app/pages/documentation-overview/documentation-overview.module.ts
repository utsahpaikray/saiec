import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'

// Components
import { DocumentationOverviewRoutingModule } from './documentation-overview-routing.module'
import { DocumentationOverviewComponent } from './documentation-overview.component'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { DocumentationCategoryModule } from '@pages/documentation-category/documentation-category.module'
import { DocumentSearchModule } from '@pages/documentation/document-search/document-search.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { DocumentSearchBarModule } from '../documentation/document-search-bar/document-search-bar.module'
import { LinkModule } from '@components/link/link.module'

@NgModule({
  declarations: [DocumentationOverviewComponent],
  imports: [
    CommonModule,
    LinkModule,
    DocumentationOverviewRoutingModule,
    ProgressSpinnerModule,
    AngularSvgIconModule,
    TranslocoRootModule,
    DocumentationCategoryModule,
    DocumentSearchModule,
    DocumentSearchBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentationOverviewModule {}
