import { Component, OnInit } from '@angular/core';
import { slideOptsCoverFlow, slideOptsCubes, slideOptsFade, slideOptsFlip } from './slide-animation';
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
  slideOpts=slideOptsFlip;
  qoutes=qoutes;
  ngOnInit() {
  //  console.log(new Date(this.qoutes[0].date))
    console.log(moment(new Date(),'MM-DD-YYYY').format('MM-DD-YYYY'));
    
  //  console.log(new Date(this.qoutes[0].date)==new Date());
  this.todaysQoute=this.qoutes.filter(item=>{
    return moment(new Date(),'MM-DD-YYYY').format('MM-DD-YYYY')==moment(item.date,'DD-MM-YYYY').format('MM-DD-YYYY')
  })[0]
  console.log(this.todaysQoute)
  }
  public dateModification(date){
    let newdate= date.split('-');
    newdate[2]='2022';
    newdate.join('-');
    return new Date(moment(newdate,'DD-MM-YYYY').format('MM-DD-YYYY'))
  }

}
