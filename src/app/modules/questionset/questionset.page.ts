import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionset',
  templateUrl: './questionset.page.html',
  styleUrls: ['./questionset.page.scss'],
})
export class QuestionsetPage implements OnInit {
public questionSet=[]
  constructor() { }

  ngOnInit() {
    this.questionSet=[
      {
        question:'Which of the following is not a Union Territory',
        options:[
         'Ladakh',
         'Chandigarh',
         'Jammu and Kashmir',
        ' Sikkim'
        ],
        answer:'Jammu and Kashmir',
      }
    ]
  }

}
