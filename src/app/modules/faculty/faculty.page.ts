import {
  Component,
  OnInit
} from '@angular/core';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.page.html',
  styleUrls: ['./faculty.page.scss'],
})
export class FacultyPage implements OnInit {

  constructor(public firebaseService:FirebaseService) {}
  public facultyList:any[];
  ngOnInit() {
this.firebaseService.getAllFaculty().subscribe(faculty=>{
  this.facultyList=faculty;
})
  }

}