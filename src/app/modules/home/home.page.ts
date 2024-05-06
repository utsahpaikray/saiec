import { Component, OnInit } from '@angular/core';
import { qoutes } from './qoutes';
import moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  todaysQoute:any;
  dateFormat = 'MM-DD-YYYY'
  constructor() { }
  // slideOpts=slideOptsFlip;
  qoutes=qoutes;
  ngOnInit() {
  this.todaysQoute=this.qoutes.filter(item=>{
    return moment(new Date(),this.dateFormat).format(this.dateFormat)==moment(item.date,this.dateFormat).format(this.dateFormat)
  })[0]
  }
  public dateModification(date: string){
    let newdate= date.split('-');
    newdate[2]='2022';
    newdate.join('-');
    return new Date(moment(newdate,this.dateFormat).format(this.dateFormat))
  }

}
