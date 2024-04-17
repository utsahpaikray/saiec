import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared-service/auth-service.service';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
public events: any=[];
public isAuthorized: boolean =  false;
public title= 'Event Gallery'
public editLabel = "Edit"
  constructor(public eventsService:EventsService,public firebaseService:FirebaseService,private router: Router,private authService: AuthService) { }

  ngOnInit() {
    this.getEvents();
    this.isAuthorized = this.authService.isAuthorizedUser
  }
  getEvents(){
    this.firebaseService.getAll('gallery').subscribe(res=>{
      // res.forEach((item: any)=>{
      //   item['imageCollection'] = item['imageCollection'].map(({ image }) => image)
      // })
 
      this.events=res
      console.log(res)
    })
  }
edit(id: any){
this.router.navigate([`/gallery/${id}`]);
}
}
