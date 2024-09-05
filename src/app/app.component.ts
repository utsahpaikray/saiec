import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertController, IonMenu, Platform, ToastController } from '@ionic/angular';

import { NavigationEnd, Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './shared-service/auth-service.service';
import { AppRoutes } from './router-segment.enum';
import { switchMap, tap, of, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  isAuthenticated = true;
  isLoggedIn= false;
  public appPages = [
    {
      title: 'Home',
      url: `/${AppRoutes.Home}`,
      icon: 'home-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Student',
      url: `/${AppRoutes.Student}`,
      icon: 'school-outline', // Changed from 'person-outline' to better represent student
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Faculty',
      url: `/${AppRoutes.Faculty}`,
      icon: 'people-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Birthday',
      url: `/${AppRoutes.Birthday}`,
      icon: 'gift-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Exam Detail',
      url: `/${AppRoutes.ExamDetail}`,
      icon: 'clipboard-outline', // Changed from 'document-text-outline' to better represent exams
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Events',
      url: `/${AppRoutes.Events}`,
      icon: 'calendar-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Notification',
      url: `/${AppRoutes.Notification}`,
      icon: 'notifications-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Auto Fee',
      url: `/${AppRoutes.AutoFee}`,
      icon: 'car-sport-outline', // Changed from 'car-outline' to a more distinctive icon
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Student Fee',
      url: `/${AppRoutes.StudentFee}`,
      icon: 'wallet-outline', // Changed from 'cash-outline' to differentiate from staff payment
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Staff Payment',
      url: `/${AppRoutes.StaffPayment}`,
      icon: 'cash-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Offering',
      url: `/${AppRoutes.Offering}`,
      icon: 'heart-outline', // Changed from 'gift-outline' to avoid duplication with Birthday
      open: false,
      access: false,
      navigation: false
    },
    {
      title: 'Event Transaction Book',
      url: `/${AppRoutes.EventTransactionBook}`,
      icon: 'journal-outline', // Changed from 'book-outline' to better represent a transaction book
      open: false,
      access: false,
      navigation: false
    },
    {
      title: 'Adv',
      url: `/${AppRoutes.Adv}`,
      icon: 'megaphone-outline', // Changed from 'radio-outline' to better represent advertising
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'News',
      url: `/${AppRoutes.News}`,
      icon: 'newspaper-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Question',
      url: `/${AppRoutes.Questionset}`,
      icon: 'help-circle-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Story',
      url: `/${AppRoutes.Story}`,
      icon: 'book-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Idioms',
      url: `/${AppRoutes.Idioms}`,
      icon: 'language-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Contacts',
      url: `/${AppRoutes.Contacts}`,
      icon: 'people-circle-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Time Table',
      url: `/${AppRoutes.TimeTable}`,
      icon: 'time-outline', // Changed from 'people-circle-outline' to better represent a time table
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Login',
      url: `/${AppRoutes.Admin}/login`,
      icon: 'log-in-outline',
      access: !this.isLoggedIn,
      open: false,
      navigation: false
    },
    {
      title: 'Admin',
      icon: 'shield-outline', // Changed from 'grid-outline' to better represent admin area
      open: false,
      access: false,
      children: [
        {
          title: 'Daily Transaction',
          url: `/${AppRoutes.TransactionReport}`,
          open: false,
          icon: 'receipt-outline', // Changed from 'list-outline' to better represent info
          navigation: true
        },
        {
          title: 'Student Info',
          url: `/${AppRoutes.StudentTabular}`,
          open: false,
          icon: 'information-circle-outline', // Changed from 'list-outline' to better represent info
          navigation: true
        },
        {
          title: 'School Fee',
          url: `/${AppRoutes.StudentSchoolFee}`,
          open: false,
          icon: 'school-outline', // Changed from 'cash-outline' to differentiate from other fee icons
          navigation: true
        },
        {
          title: 'School Auto Fee',
          url: `/${AppRoutes.StudentAutoFee}`,
          open: false,
          icon: 'car-sport-outline',
          navigation: true
        },
        {
          title: 'Faculty',
          url: `/${AppRoutes.FacultyForm}`,
          open: false,
          icon: 'people-outline',
          navigation: true
        },
        {
          title: 'Faculty Fee',
          url: `/${AppRoutes.StaffTabularView}`,
          open: false,
          icon: 'cash-outline',
          navigation: true
        },
        {
          title: 'Store',
          url: `/${AppRoutes.Store}`,
          icon: 'basket-outline',
          access: false,
          navigation: true
        },
        {
          title: 'Store Transaction Report',
          url: `/${AppRoutes.StoreReport}`,
          icon: 'document-text-outline',
          access: false,
          navigation: true
        },
        {
          title: 'Store form',
          url: `/${AppRoutes.StoreTransaction}`,
          open: false,
          icon: 'cart-outline', // Changed from 'images-outline' to better represent store transactions
          navigation: true
        },
        {
          title: 'Gallery form',
          url: `/${AppRoutes.Gallery}`,
          open: false,
          icon: 'images-outline',
          navigation: true
        },
        {
          title: 'Notifications',
          url: `/${AppRoutes.NotificationForm}`,
          open: false,
          icon: 'notifications-outline',
          navigation: true
        },
        {
          title: 'Auth',
          url: `/${AppRoutes.Auth}`,
          open: false,
          icon: 'lock-closed-outline', // Changed from 'key' to better represent authorization
          navigation: true
        },
      ]
    },
  ];
  
  user: any;
  title = 'push-notification';
  message: string | undefined;
  public name: string = 'SAIEC'
  readonly VAPID_PUBLIC_KEY = "BIO6yW3VtwChWkL61__mF4c5k-8PLU62PkE0Arh4oGSqdBmt0HeuKDqBh1hXTnBqsfL7JGn6EHbtvr3EFFKUY_Q";
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  @ViewChild('menu') menu!: IonMenu;
  isCompactView = false;
    
    // // Listen for changes to the prefers-color-scheme media query
    // prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
  constructor(
    private platform: Platform,
    private router: Router,
    public  afAuth:  AngularFireAuth,
    private authService: AuthService,
  ) {
    this.initializeApp();
    this.toggleDarkTheme(this.prefersDark.matches);
   
  }
  
  toggleDarkTheme(shouldAdd?: any) {
    document.body.classList.toggle('dark', shouldAdd);
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
    this.afAuth.authState.subscribe((user: any) => {
      if (user !== null){
            this.user = user;
            const localStorageKey = 'user';
            localStorage.setItem(localStorageKey, JSON.stringify(this.user));
        let isAuthorized= this.authService.isAuthorizedUser
        console.log(isAuthorized)
        if(isAuthorized){
          this.isAuthenticated = true;
          this.appPages.forEach(item=>{
            item.access=true;
          })
          this.isLoggedIn =  isAuthorized
          //this.appPages=this.appPages
        }
      } else {
        localStorage.setItem('user', '');
        }
    })
  }

  ngOnInit() { 
    this.router.events.subscribe((url: any)=>{
      if(url instanceof NavigationEnd)
      if(this.appPages){
        this.appPages.map((page,index)=>{
          if(page.url==this.router.url.toString()){
              this.selectedIndex=index
          }
        })
      }
      
    })
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
   // this.getFiles(5)
  }
  toggleMenuView() {
    this.isCompactView = !this.isCompactView;
  }

}
