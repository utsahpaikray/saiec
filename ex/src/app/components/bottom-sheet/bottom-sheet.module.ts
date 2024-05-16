import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { ExpansionPanelModule } from '@components/expansion-panel/expansion-panel.module'
import { BottomSheetComponent } from './bottom-sheet.component'

@NgModule({
  declarations: [BottomSheetComponent],
  exports: [BottomSheetComponent],
  imports: [CommonModule, ExpansionPanelModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BottomSheetModule {}
