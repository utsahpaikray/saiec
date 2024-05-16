import { NgModule } from '@angular/core'
import { ClipboardStoreModule } from '@stores/clipboard/clipboard.module'
import { CopyToClipboardDirective } from './copy-to-clipboard.directive'

@NgModule({
  imports: [CopyToClipboardDirective, ClipboardStoreModule],
  exports: [CopyToClipboardDirective]
})
export class CopyToClipBoardModule {}
