import { Component, OnInit } from '@angular/core';
import { notification} from '../../../assets/notification/notification'
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
public notification=notification;
  constructor() { }

  ngOnInit() {
    console.log(notification)
  }

}
