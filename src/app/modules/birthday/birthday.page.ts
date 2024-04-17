import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { groupBy, sortBy, values } from 'lodash';
import { DownloadUrlService } from '../../shared-service/download-url.service';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.page.html',
  styleUrls: ['./birthday.page.scss'],
})
export class BirthdayPage implements OnInit {
  birthdayList: any;
  public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(public modalCtrl: ModalController, private storeService: DownloadUrlService,public firebaseService:FirebaseService) {
  }

  ngOnInit() {
    this.firebaseService.getAllstudent().subscribe(items=>{
         let list= values(groupBy(items, function(it: any) {
            return it.DateofBirth.split('-')[1] ;
        }));
        console.log(list)
        this.birthdayList=[]
        list.forEach(element => {
          this.birthdayList.push({month:element[0].DateofBirth.split('-')[1]-1,items:element})
         // console.log([element[0].DateofBirth.split('-')[1]-1])

        });
        this.birthdayList= sortBy(this.birthdayList,'month');
      })
   

  }

}
