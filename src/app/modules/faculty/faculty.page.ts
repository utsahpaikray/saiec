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
      Image: "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/nirupama.jpeg?alt=media&token=610958f3-5cc8-4de7-ae05-1593201b59f8",
      location: 'Kimbhiripada'
    },
    {
      name: "Sunita",
      id: 3,
      position: "Sanskrit Teacher",
      Designation:'Teacher',
      Image: "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/sunita.jpeg?alt=media&token=c9c8242b-4aac-402b-a6e3-8b64e55a9ac8",
      location: 'Paikakushadiha'
    },
    {
      name: "Pujalini Baral",
      id: 4,
      position: "Language Teacher",
      Designation:'Teacher',
      Image: "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/pujalini.jpeg?alt=media&token=292fb8e8-4864-4ffc-83b7-8aebd6715561",
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
      Image: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
      location: 'Paikakushadiha'
    },

  ]
  ngOnInit() {}

}