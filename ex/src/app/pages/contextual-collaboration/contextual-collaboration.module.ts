import { NgModule } from '@angular/core'

// Components
import { CasesStoreModule } from '@stores/cases/cases.module'
import { MaximoAssetsStoreModule } from '@stores/maximo-assets/maximo-assets.module'
import { ContextualCollaborationRoutingModule } from './contextual-collaboration-routing.module'
import { ContextualCollaborationComponent } from './contextual-collaboration.component'

@NgModule({
  declarations: [ContextualCollaborationComponent],
  imports: [
    ContextualCollaborationRoutingModule,
    CasesStoreModule,
    MaximoAssetsStoreModule
  ]
})
export class ContextualCollaborationModule {}
