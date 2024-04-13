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
    path: 'idioms',
    loadChildren: () => import('./modules/idioms/idioms.module').then( m => m.IdiomsPageModule)
  },
  {
    path: 'story',
    loadChildren: () => import('./modules/story/story.module').then( m => m.StoryPageModule)
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
  },
  {
    path: 'exam-form',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/exam-detail/exam-detail.module').then( m => m.ExamDetailPageModule)
  },
  {
    path: 'birthday',
    loadChildren: () => import('./modules/birthday/birthday.module').then( m => m.BirthdayPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./modules/holiday-calender/holiday-calender.module').then( m => m.HolidayCalenderPageModule)
  },
  {
    path: 'staff-payment',
    loadChildren: () => import('./modules/staff-payment/staff-payment.module').then( m => m.StaffPaymentPageModule)
  },
  {
    path: 'staff-tabular-view',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/staff-tabular-view/staff-tabular-view.module').then( m => m.StaffTabularViewPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./modules/gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'gallery/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'exam-detail',
    loadChildren: () => import('./modules/exam-form/exam-form.module').then( m => m.ExamFormPageModule)
  },
  {
    path: 'offering',
    loadChildren: () => import('./modules/offering/offering.module').then( m => m.OfferingPageModule)
  },
  {
    path: 'event-transaction-book',
    loadChildren: () => import('./modules/event-transaction-book/event-transaction-book.module').then( m => m.EventTransactionBookPageModule)
  },
  {
    path: 'report/:name',
    loadChildren: () => import('./modules/report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'store',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'transaction-report',
    loadChildren: () => import('./modules/transaction-report/transaction-report.module').then( m => m.TransactionReportPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./modules/news/news.module').then( m => m.NewsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
