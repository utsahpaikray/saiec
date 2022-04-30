import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.page.html',
  styleUrls: ['./faculty.page.scss'],
})
export class FacultyPage implements OnInit {

  constructor() {}
  public facultyList = [{
      name: "Pradosh kumar Maharana",
      id: 2,
      position: "Science",
      Designation:'Principal',
      Image: "https://eshendetesia.com/images/user-profile.png",
      location: 'Paikakushadiha'
    },
    {
      name: "Palishree ",
      id: 1,
      position: "Math  Teacher",
      Designation:'Teacher',
      Image: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
      location: 'Bramhanakausadi'
    },
    {
      name: "Nirupama",
      id: 2,
      position: "Odia Teacher",
      Designation:'Teacher',
      Image: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
      location: 'Kimbhiripada'
    },
    {
      name: "Sunita",
      id: 3,
      position: "Sanskrit Teacher",
      Designation:'Teacher',
      Image: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
      location: 'Paikakushadiha'
    },
    {
      name: "Pujalini Baral",
      id: 4,
      position: "Language Teacher",
      Designation:'Teacher',
      Image: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
      location: 'Paikakushadiha'
    },
    {
      name: "Deepak",
      id: 5,
      position: "Computer Teacher",
      Designation:'Teacher',
      Image: "https://eshendetesia.com/images/user-profile.png",
      location: 'Kotari'
    },
    {
      name: "BudhaPriya",
      id: 5,
      position: "Language Teacher",
      Designation:'Teacher',
      Image: "https://eshendetesia.com/images/user-profile.png",
      location: 'Kimbhiripadha'
    },
    {
      name: "Rita",
      id: 5,
      position: "Language Teacher",
      Designation:'Teacher',
      Image: "https://eshendetesia.com/images/user-profile.png",
      location: 'Paikakushadiha'
    },

  ]
  ngOnInit() {}

}