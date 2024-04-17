import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { notification} from '../../../assets/notification/notification'
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
public notification: any[] | undefined;
  constructor(public firebaseService:FirebaseService) { }

  ngOnInit() {
    this.getNotication()
  }
  getNotication() {
    this.firebaseService.getNotication().subscribe(item=>{
        this.notification=item;
    })
  }
  createNotification(item: any){
    this.firebaseService.pushItems('notification',item)
  }

}
