import { Component, OnInit } from '@angular/core';

import { AlertController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { DownloadUrlService } from './shared-service/download-url.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MessagingService } from './shared-service/messaging.service';
import { OneSignal } from 'onesignal-ngx';
import { environment } from '../environments/environment';
import { AuthService } from './shared-service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  isAuthenticated: boolean=false;
  public appPages=[
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      access:true,
      navigation:false
    },
    {
      title: 'Student',
      url: '/student',
      icon: 'man',
      access:true,
      navigation:false
    },
    {
      title: 'Faculty',
      url: '/faculty',
      icon: 'people',
      access:true,
      navigation:false
    },
    {
      title: 'Birthday',
      url: '/birthday',
      icon: 'gift',
      access:true,
      navigation:false
    },
    {
      title: 'Calendar',
      url: '/calendar',
      icon: 'calendar',
      access:true,
      navigation:false
    },
    {
      title: 'Exam Detail',
      url: '/exam-detail',
      icon: 'receipt',
      access:true,
      navigation:false
    },
    {
      title: 'Events',
      url: '/events',
      icon: 'bicycle',
      access:true,
      navigation:false
    },
    {
      title: 'Notification',
      url: '/notification',
      icon: 'notifications',
      access:true,
      navigation:false
    },
    {
      title: 'Auto Fee',
      url: '/auto-fee',
      icon: 'car',
      access:true,
      navigation:false
    },
    {
      title: 'Student Fee',
      url: '/student-fee',
      icon: 'cash',
      access:true,
      navigation:false
    },
    {
      title:'Staff Payment',
      url:"/staff-payment",
      icon:"cash",
      access:true,
      navigation:false
    },
    {
      title:'Offering',
      url:"/offering",
      icon:"gift",
      access:false,
      navigation:false
    },
    {
      title:'Event Transaction Book',
      url:"/event-transaction-book",
      icon:"document-text",
      access:false,
      navigation:false
    },
    
    {
      title: 'Adv',
      url: '/adv',
      icon: 'radio',
      access:true,
      navigation:false
    },
    {
      title: 'Question',
      url: '/questionset',
      icon: 'aperture',
      access:true,
      navigation:false
    },
    {
      title: 'Login',
      url: '/admin/login',
      icon: 'finger-print',
      access:true,
      navigation:false
    },
    {
      title: 'Tabular View',
      icon: 'bar-chart',
      access:false,
      children: [
        {
          title: 'Student Info',
          url: '/student-tabular',
          icon: 'list',
          navigation:true
        },
        {
          title: 'School Fee',
          url: '/student-school-fee',
          icon: 'cash',
          navigation:true
        },
        {
          title: 'School Auto Fee',
          url: '/student-auto-fee',
          icon: 'car',
          navigation:true
        },
        {
          title: 'Faculty',
          url: '/faculty-form',
          icon: 'people',
          navigation:true
        },
        {
          title:'Faculty Fee',
          url:'/staff-tabular-view',
          icon:'people',
          navigation:true
        },
        {
          title: 'Store',
          url: '/store',
          icon: 'cube',
          access: false,
          navigation: true
        },
        {
          title: 'Transaction Report',
          url: '/transaction-report',
          icon: 'cube',
          access: false,
          navigation: true
        },
        // {
        //   title:'Exam Form',
        //   url:'/exam-form',
        //   icon:'book',
        //   navigation:true
        // },
        {
          title:'Gallery form',
          url:'/gallery',
          icon:'images',
          navigation:true
        },
        {
          title: 'Notifications',
          url: '/notification-form',
          icon: 'notifications',
          navigation:true
        },
      ]
    },
  ];;
  user: any;
  title = 'push-notification';
  message;
  readonly VAPID_PUBLIC_KEY = "BIO6yW3VtwChWkL61__mF4c5k-8PLU62PkE0Arh4oGSqdBmt0HeuKDqBh1hXTnBqsfL7JGn6EHbtvr3EFFKUY_Q";
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
 
    
    // // Listen for changes to the prefers-color-scheme media query
    // prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private staoreService:DownloadUrlService,
    public  afAuth:  AngularFireAuth,
    private messagingService: MessagingService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private oneSignal: OneSignal,
    private authService: AuthService,
  ) {
    this.initializeApp();
    this.listenForMessages();
   // this.requestPermission()
    this.toggleDarkTheme(this.prefersDark.matches);
   
  }
  toggleDarkTheme(shouldAdd: any) {
    document.body.classList.toggle('dark', shouldAdd);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
    this.afAuth.authState.subscribe(user => {
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
          this.appPages=this.appPages
        }
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  ngOnInit() {
    if(environment.production){
      this.oneSignal.init({ appId: "5d43f72e-8102-4a2e-8b69-3b97facadd03",
   
      notifyButton: {
        enable: true,
      }, }).then(() => {
        this.oneSignal.on('subscriptionChange', function(isSubscribed) {
        });
      });
    }else{
      this.oneSignal.init({ appId: "69fdf635-4526-49b7-850d-540fcf98830e",
      safari_web_id: "web.onesignal.auto.5d451968-8243-4fe2-88cd-3c94a5f2a4fc",
      notifyButton: {
        enable: true,
      }, }).then(() => {
        this.oneSignal.on('subscriptionChange', function(isSubscribed) {
        });
        // do other stuff
      });
    }
 
    this.router.events.subscribe(url=>{
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
    this.messagingService.getMessages().subscribe(async (msg: any) => {
    //  console.log(msg)
        const alert = await this.alertCtrl.create({
        header: msg.notification.title,
        subHeader: msg.notification.body,
        message: msg.data.info,
        buttons: ['Yes'],
      });
 
      await alert.present();
    },(error=>{
      alert(error)
    }));
  }
 
  requestPermission() {
    this.messagingService.requestPermission().subscribe(
      async token => {
        const toast = await this.toastCtrl.create({
          message: token,
          duration: 2000
        });
        toast.present();
      },
      async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: err,
          buttons: ['YEs'],
        });
 
        await alert.present();
      }
    );
  }
 
  async deleteToken() {
    this.messagingService.deleteToken();
    const toast = await this.toastCtrl.create({
      message: 'Token removed',
      duration: 2000
    });
    toast.present();
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
