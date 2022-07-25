import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { DownloadUrlService } from './shared-service/download-url.service';

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
      icon: 'home'
    },
    {
      title: 'Student',
      url: '/student',
      icon: 'man'
    },
    {
      title: 'Faculty',
      url: '/faculty',
      icon: 'people'
    },
    {
      title: 'Events',
      url: '/events',
      icon: 'bicycle'
    },
    {
      title: 'Notification',
      url: '/notification',
      icon: 'notifications'
    },
    {
      title: 'Auto Fee',
      url: '/auto-fee',
      icon: 'car'
    },
    {
      title: 'Student Fee',
      url: '/student-fee',
      icon: 'bar-chart'
    },
    {
      title: 'Adv',
      url: '/adv',
      icon: 'radio'
    },
    {
      title: 'Question',
      url: '/questionset',
      icon: 'radio'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private staoreService:DownloadUrlService
  ) {
    this.initializeApp();
    let storeImage= storage.ref('files/').listAll().subscribe((res) => {
      
      res.items.forEach((itemRef) => {
        
      });
    },(error=>{
        console.log(error)
    }));
    
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
