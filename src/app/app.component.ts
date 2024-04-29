import { Component, OnInit } from '@angular/core';

import { AlertController, Platform, ToastController } from '@ionic/angular';

import { NavigationEnd, Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './shared-service/auth-service.service';
import { AppRoutes } from './router-segment.enum';

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
      icon: 'person-outline',
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
      icon: 'document-text-outline',
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
      icon: 'car-outline',
      access: true,
      open: false,
      navigation: false
    },
    {
      title: 'Student Fee',
      url: `/${AppRoutes.StudentFee}`,
      icon: 'cash-outline',
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
      icon: 'gift-outline',
      open: false,
      access: false,
      navigation: false
    },
    {
      title: 'Event Transaction Book',
      url: `/${AppRoutes.EventTransactionBook}`,
      icon: 'book-outline',
      open: false,
      access: false,
      navigation: false
    },
    {
      title: 'Adv',
      url: `/${AppRoutes.Adv}`,
      icon: 'radio-outline',
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
      title: 'Login',
      url: `/${AppRoutes.Admin}/login`,
      icon: 'log-in-outline',
      access: !this.isLoggedIn,
      open: false,
      navigation: false
    },
    {
      title: 'Admin',
      icon: 'grid-outline',
      open: false,
      access: false,
      children: [
        {
          title: 'Student Info',
          url: `/${AppRoutes.StudentTabular}`,
          open: false,
          icon: 'list-outline',
          navigation: true
        },
        {
          title: 'School Fee',
          url: `/${AppRoutes.StudentSchoolFee}`,
          open: false,
          icon: 'cash-outline',
          navigation: true
        },
        {
          title: 'School Auto Fee',
          url: `/${AppRoutes.StudentAutoFee}`,
          open: false,
          icon: 'car-outline',
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
          icon: 'images-outline',
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
      ]
    },
  ];
  
  user: any;
  title = 'push-notification';
  message: string | undefined;
  public name: string = 'SAIEC'
  readonly VAPID_PUBLIC_KEY = "BIO6yW3VtwChWkL61__mF4c5k-8PLU62PkE0Arh4oGSqdBmt0HeuKDqBh1hXTnBqsfL7JGn6EHbtvr3EFFKUY_Q";
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
 
    
    // // Listen for changes to the prefers-color-scheme media query
    // prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
  constructor(
    private platform: Platform,
    private router: Router,
    public  afAuth:  AngularFireAuth,
    private authService: AuthService,
  ) {
    this.initializeApp();
    this.listenForMessages();
   // this.requestPermission()
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
  listenForMessages() {
    // this.messagingService.getMessages().subscribe(async (msg: any) => {
    // //  console.log(msg)
    //     const alert = await this.alertCtrl.create({
    //     header: msg.notification.title,
    //     subHeader: msg.notification.body,
    //     message: msg.data.info,
    //     buttons: ['Yes'],
    //   });
 
    //   await alert.present();
    // },((error: any)=>{
    //   alert(error)
    // }));
  }
 
  requestPermission() {
    // this.messagingService.requestPermission().subscribe(
    //   async (token: any) => {
    //     const toast = await this.toastCtrl.create({
    //       message: token,
    //       duration: 2000
    //     });
    //     toast.present();
    //   },
    //   async (err: any) => {
    //     const alert = await this.alertCtrl.create({
    //       header: 'Error',
    //       message: err,
    //       buttons: ['YEs'],
    //     });
 
    //     await alert.present();
    //   }
    // );
  }
 
  async deleteToken() {
    // this.messagingService.deleteToken();
    // const toast = await this.toastCtrl.create({
    //   message: 'Token removed',
    //   duration: 2000
    // });
    // toast.present();
  }
  // requestPermissions() {
  //   const messaging = getMessaging();
  //   getToken(messaging, 
  //    { vapidKey: environment.firebaseConfig.vapidKey}).then(
  //      (currentToken) => {
  //        if (currentToken) {
  //          console.log("Hurraaa!!! we got the token.....");
  //          console.log(currentToken);
  //        } else {
  //          console.log('No registration token available. Request permission to generate one.');
  //        }
  //    }).catch((err) => {
  //       console.log('An error occurred while retrieving token. ', err);
  //   });
  // }
  // listen() {
  //   const messaging = getMessaging();
  //   onMessage(messaging, (payload) => {
  //     console.log('Message received. ', payload);
  //     this.message=payload;
  //   });
  // }
}
