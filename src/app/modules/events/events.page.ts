import { Component, OnInit } from '@angular/core';
import { EventsService } from './services/events.service';
import { events } from './events'
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared-service/auth-service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: any;
  isAuthorized: boolean;

  constructor(public eventsService:EventsService,private http: HttpClient, private firestore: AngularFirestore,public firebaseService:FirebaseService,private router: Router,private authService: AuthService) { }

  ngOnInit() {
    this.getEvents();
    this.isAuthorized = this.authService.isAuthorizedUser
  }
  getEvents(){
    this.firebaseService.getAll('gallery').subscribe(res=>{
      res.forEach(item=>{
        item['imageCollection'] = item['imageCollection'].map(({ image }) => image)
      })
      this.events=res
    })
  }
edit(id){
this.router.navigate([`/gallery/${id}`]);
}
}
