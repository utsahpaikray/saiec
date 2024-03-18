import { Component, OnInit } from '@angular/core';
import { qoutes } from './qoutes';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  todaysQoute:any;
  constructor() { }
  // slideOpts=slideOptsFlip;
  qoutes=qoutes;
  ngOnInit() {
  this.todaysQoute=this.qoutes.filter(item=>{
    return moment(new Date(),'MM-DD-YYYY').format('MM-DD-YYYY')==moment(item.date,'DD-MM-YYYY').format('MM-DD-YYYY')
  })[0]
  }
  public dateModification(date: string){
    let newdate= date.split('-');
    newdate[2]='2022';
    newdate.join('-');
    return new Date(moment(newdate,'DD-MM-YYYY').format('MM-DD-YYYY'))
  }

}
