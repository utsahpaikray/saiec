import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExpansionPanelComponent } from './expansion-panel.component'

@NgModule({
  declarations: [ExpansionPanelComponent],
  exports: [ExpansionPanelComponent],
  imports: [CommonModule]
})
export class ExpansionPanelModule {}
