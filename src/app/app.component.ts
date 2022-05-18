import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router } from '@angular/router';
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
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }

  ngOnInit() {
    console.log(this.router.events.subscribe(url=>{
      if(url instanceof NavigationEnd)
      this.appPages.map((page,index)=>{
        if(page.url.includes(this.router.url.toString())){
            this.selectedIndex=index
        }
      })
    }))
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
