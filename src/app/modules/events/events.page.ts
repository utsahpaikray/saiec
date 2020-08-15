import { Component, OnInit } from '@angular/core';
import { EventsService } from './services/events.service';
import { events } from './events'

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: any;

  constructor(public eventsService:EventsService) { }

  ngOnInit() {
    this.getEvents();
  }
  getEvents(){
    this.events = events;
    // this.eventsService.getEvents().subscribe(res=>{
    //   this.events = res.articles;
    //   console.log(res)
    // })
  }

}
