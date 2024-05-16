import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

// Components
import { SiteSwitcherComponent } from './site-switcher.component'
import { DropdownModule } from '@components/dropdown/dropdown.module'

@NgModule({
  declarations: [SiteSwitcherComponent],
  exports: [SiteSwitcherComponent],
  imports: [CommonModule, FormsModule, DropdownModule, RouterModule]
})
export class SiteSwitcherModule {}
