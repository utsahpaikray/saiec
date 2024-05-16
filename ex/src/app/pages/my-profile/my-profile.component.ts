import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { UserProfileComponent } from '@pages/user-profile/user-profile.component'

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    DefaultTemplateModule,
    RouterModule,
    UserProfileComponent
  ],
  templateUrl: './my-profile.component.html'
})
export class MyProfileComponent {}
