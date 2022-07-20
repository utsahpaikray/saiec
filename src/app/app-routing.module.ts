import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
