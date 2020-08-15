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
      MakeId: 440,
      name: "Papu Maharana",
      VehicleTypeId: 2,
      position: "Principal",
      carImage: "https://eshendetesia.com/images/user-profile.png",
      location: 'Paikakushadiha'
    },
    {
      MakeId: 441,
      name: "ABC",
      VehicleTypeId: 2,
      position: "Science Teacher",
      carImage: "https://eshendetesia.com/images/user-profile.png",
      location: 'Paikakushadiha'
    },
    {
      MakeId: 442,
      name: "XYZ",
      VehicleTypeId: 2,
      position: "History Teacher",
      carImage: "https://eshendetesia.com/images/user-profile.png",
      location: 'Paikakushadiha'
    }
  ]
  ngOnInit() {}

}