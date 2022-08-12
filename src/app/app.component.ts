import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { DownloadUrlService } from './shared-service/download-url.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      navigation:false
    },
    {
      title: 'Student',
      url: '/student',
      icon: 'man',
      navigation:false
    },
    {
      title: 'Faculty',
      url: '/faculty',
      icon: 'people',
      navigation:false
    },
    {
      title: 'Birthday',
      url: '/birthday',
      icon: 'gift',
      navigation:false
    },
    {
      title: 'Calendar',
      url: '/calendar',
      icon: 'calendar',
      navigation:false
    },
    {
      title: 'Events',
      url: '/events',
      icon: 'bicycle',
      navigation:false
    },
    {
      title: 'Notification',
      url: '/notification',
      icon: 'notifications',
      navigation:false
    },
    {
      title: 'Auto Fee',
      url: '/auto-fee',
      icon: 'car',
      navigation:false
    },
    {
      title: 'Student Fee',
      url: '/student-fee',
      icon: 'cash',
      navigation:false
    },
    {
      title: 'Adv',
      url: '/adv',
      icon: 'radio',
      navigation:false
    },
    {
      title: 'Question',
      url: '/questionset',
      icon: 'cube',
      navigation:false
    },
    {
      title: 'Login',
      url: '/admin/login',
      icon: 'prism',
      navigation:false
    },
    {
      title: 'Tabular View',
      icon: 'bar-chart',
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
          title: 'Notifications',
          url: '/notification-form',
          icon: 'notifications',
          navigation:true
        },
      ]
    },
  ];
  user: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private staoreService:DownloadUrlService,
    public  afAuth:  AngularFireAuth
  ) {
    this.initializeApp();
    // let storeImage= storage.ref('files/').listAll().subscribe((res) => {
      
    //   res.items.forEach((itemRef) => {
        
    //   });
    // },(error=>{
    //     console.log(error)
    // }));
    
  }
  getFiles(numberItems) {
    console.log('called')
    // this.storage.upload('files/', ref =>{
    //   console.log(ref)
    //   ref.limitToLast(numberItems)
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  ngOnInit() {
    this.router.events.subscribe(url=>{
      if(url instanceof NavigationEnd)
      this.appPages.map((page,index)=>{
        if(page.url==this.router.url.toString()){
            this.selectedIndex=index
        }
      })
    })
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
   // this.getFiles(5)
  }
}
