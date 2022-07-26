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
      Image: "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/Pradosh.jpeg?alt=media&token=81f1ba02-a826-4605-8599-8a3bece93980",
      location: 'Paikakushadiha'
    },
    {
      name: "Palishree",
      id: 1,
      position: "Math  Teacher",
      Designation:'Teacher',
      Image: "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/palishree.jpeg?alt=media&token=702f579a-2876-4403-ad2b-1900d6b13ae5",
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
      Image: "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/deepak.jpeg?alt=media&token=67128c6a-e592-42d9-8e1e-29c41abaef83",
      location: 'Kotari'
    },
    {
      name: "BudhaPriya",
      id: 5,
      position: "Language Teacher",
      Designation:'Teacher',
      Image: "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/budhi.jpeg?alt=media&token=6659b5cc-41ac-4373-90ae-8e4ff09ba815",
      location: 'Kimbhiripadha'
    },
    {
      name: "Rita",
      id: 5,
      position: "Language Teacher",
      Designation:'Teacher',
      Image: "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/Rita.jpeg?alt=media&token=e6031986-0314-4f0b-a762-b8c05be723a0",
      location: 'Paikakushadiha'
    },
    {
      name: "Ronee",
      id: 5,
      position: "Language Teacher",
      Designation:'Teacher',
      Image: "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/lima.jpeg?alt=media&token=464a1de2-6d98-4770-ac6b-b7674a91a9df",
      location: 'Paikakushadiha'
    },
    {
      name: "Subhasmita Swain",
      id: 5,
      position: "Language Teacher",
      Designation:'Teacher',
      Image: "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/Sanu.jpeg?alt=media&token=3a52c8b4-90d7-4181-980a-5c17b42e3c6b",
      location: 'Paikakushadiha'
    },

  ]
  ngOnInit() {}

}