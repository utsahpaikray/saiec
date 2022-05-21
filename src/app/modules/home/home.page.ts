import { Component, OnInit } from '@angular/core';
import { slideOptsCoverFlow, slideOptsCubes, slideOptsFade, slideOptsFlip } from './slide-animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() { }
  slideOpts=slideOptsFlip;
  
  ngOnInit() {
  }

}
