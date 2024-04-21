import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared-service/services/auth.guard';
import { AppRoutes } from './paths.enum';
const routes: Routes = [
  {
    path: AppRoutes.Home,
    redirectTo: AppRoutes.Home,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.Student,
    loadChildren: () => import('./modules/student/student.module').then(m => m.StudentPageModule)
  },
  {
    path: AppRoutes.Faculty,
    loadChildren: () => import('./modules/faculty/faculty.module').then(m => m.FacultyPageModule)
  },
  {
    path: AppRoutes.Notification,
    loadChildren: () => import('./modules/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: AppRoutes.Events,
    loadChildren: () => import('./modules/events/events.module').then(m => m.EventsPageModule)
  },
  {
    path: AppRoutes.Adv,
    loadChildren: () => import('./modules/adv/adv.module').then(m => m.AdvPageModule)
  },
  {
    path: AppRoutes.Questionset,
    loadChildren: () => import('./modules/questionset/questionset.module').then(m => m.QuestionsetPageModule)
  },
  {
    path: AppRoutes.Idioms,
    loadChildren: () => import('./modules/idioms/idioms.module').then(m => m.IdiomsPageModule)
  },
  {
    path: AppRoutes.Story,
    loadChildren: () => import('./modules/story/story.module').then(m => m.StoryPageModule)
  },
  {
    path: AppRoutes.Modal,
    loadChildren: () => import('./modules/shared/modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: AppRoutes.AutoFee,
    loadChildren: () => import('./modules/autofee/autofee.module').then(m => m.AutofeePageModule)
  },
  {
    path: AppRoutes.StudentFee,
    loadChildren: () => import('./modules/student-fee/student-fee.module').then(m => m.StudentFeePageModule)
  },
  {
    path: AppRoutes.StudentDetail,
    loadChildren: () => import('./modules/shared/student-detail/student-detail.module').then(m => m.StudentDetailPageModule)
  },
  {
    path: AppRoutes.StudentTabular,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/student-tabular/student-tabular.module').then(m => m.StudentTabularPageModule)
  },
  {
    path: AppRoutes.StudentSchoolFee,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/student-school-fee/student-school-fee.module').then(m => m.StudentSchoolFeePageModule)
  },
  {
    path: AppRoutes.StudentAutoFee,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/student-auto-fee/student-auto-fee.module').then(m => m.StudentAutoFeePageModule)
  },
  {
    path: AppRoutes.NotificationForm,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/notification-form/notification-form.module').then(m => m.NotificationFormPageModule)
  },
  {
    path: AppRoutes.FacultyForm,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/faculty-form/faculty-form.module').then(m => m.FacultyFormPageModule)
  },
  {
    path: AppRoutes.Admin,
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: AppRoutes.ExamForm,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/exam-detail/exam-detail.module').then(m => m.ExamDetailPageModule)
  },
  {
    path: AppRoutes.Birthday,
    loadChildren: () => import('./modules/birthday/birthday.module').then(m => m.BirthdayPageModule)
  },
  {
    path: AppRoutes.Calendar,
    loadChildren: () => import('./modules/holiday-calender/holiday-calender.module').then(m => m.HolidayCalenderPageModule)
  },
  {
    path: AppRoutes.StaffPayment,
    loadChildren: () => import('./modules/staff-payment/staff-payment.module').then(m => m.StaffPaymentPageModule)
  },
  {
    path: AppRoutes.StaffTabularView,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/staff-tabular-view/staff-tabular-view.module').then(m => m.StaffTabularViewPageModule)
  },
  {
    path: AppRoutes.Gallery,
    loadChildren: () => import('./modules/gallery/gallery.module').then(m => m.GalleryPageModule)
  },
  {
    path: AppRoutes.StoreTransaction,
    loadChildren: () => import('./modules/store-transaction-form/store-transaction-form.module').then(m => m.StoreTransactionPageModule)
  },
  {
    path: AppRoutes.Store,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/store/store.module').then(m => m.StorePageModule)
  },
  {
    path: `${AppRoutes.Gallery}/:id`,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/gallery/gallery.module').then(m => m.GalleryPageModule)
  },
  {
    path: AppRoutes.ExamDetail,
    loadChildren: () => import('./modules/exam-form/exam-form.module').then(m => m.ExamFormPageModule)
  },
  {
    path: AppRoutes.Offering,
    loadChildren: () => import('./modules/offering/offering.module').then(m => m.OfferingPageModule)
  },
  {
    path: AppRoutes.EventTransactionBook,
    loadChildren: () => import('./modules/event-transaction-book/event-transaction-book.module').then(m => m.EventTransactionBookPageModule)
  },
  {
    path: `${AppRoutes.Report}/:name`,
    loadChildren: () => import('./modules/report/report.module').then(m => m.ReportPageModule)
  },
  {
    path: AppRoutes.TransactionReport,
    loadChildren: () => import('./modules/transaction-report/transaction-report.module').then(m => m.TransactionReportPageModule)
  },
  {
    path: AppRoutes.News,
    loadChildren: () => import('./modules/news/news.module').then(m => m.NewsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
