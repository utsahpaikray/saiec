import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared-service/services/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'faculty',
    loadChildren: () => import('./modules/faculty/faculty.module').then( m => m.FacultyPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./modules/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./modules/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'adv',
    loadChildren: () => import('./modules/adv/adv.module').then( m => m.AdvPageModule)
  },
  {
    path: 'questionset',
    loadChildren: () => import('./modules/questionset/questionset.module').then( m => m.QuestionsetPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modules/shared/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'auto-fee',
    loadChildren: () => import('./modules/autofee/autofee.module').then( m => m.AutofeePageModule)
  },
  {
    path: 'student-fee',
    loadChildren: () => import('./modules/student-fee/student-fee.module').then( m => m.StudentFeePageModule)
  },
  {
    path: 'student-detail',
    loadChildren: () => import('./modules/shared/student-detail/student-detail.module').then( m => m.StudentDetailPageModule)
  },
  {
    path: 'student-tabular',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/student-tabular/student-tabular.module').then( m => m.StudentTabularPageModule)
  },
  {
    path: 'student-school-fee',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/student-school-fee/student-school-fee.module').then( m => m.StudentSchoolFeePageModule)
  },
  {
    path: 'student-auto-fee',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/student-auto-fee/student-auto-fee.module').then( m => m.StudentAutoFeePageModule)
  },
  {
    path: 'notification-form',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/notification-form/notification-form.module').then( m => m.NotificationFormPageModule)
  },
  {
    path: 'faculty-form',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/faculty-form/faculty-form.module').then( m => m.FacultyFormPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then( m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
