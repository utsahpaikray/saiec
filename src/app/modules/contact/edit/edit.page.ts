import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Student } from '@modules/student/student.interface';
import { Store, select } from '@ngrx/store';
import { FirebaseService } from '@shared-service/firebaseService/firebase-service.service';
import { ToasterService } from '@shared-service/toaster.service';
import { Observable, filter } from 'rxjs';

import { AppState } from 'src/app/states/state.interface';
import { loadStudents } from 'src/app/states/student/student.actions';
import { selectStudentById } from 'src/app/states/student/student.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit{
  studentForm!: FormGroup;
  private formBuilder=  inject(FormBuilder)
  private route = inject(ActivatedRoute)
  public firebaseService= inject(FirebaseService)
  private store = inject(Store<AppState>)
  private router = inject(Router)
  private toastController= inject(ToastController)
  private toasterService = inject(ToasterService)
  param: any;
  public genderList = [{gender: 'Male', value: 'Male'}, {gender: 'Female', value: 'Female'}];
public classList = [{std: 'K.G', value: 'K.G'}, {std: 'Nursery', value: 'Nursery'}, {std: '1', value: '1'}, {std: '2', value: '2'}, {std: '3', value: '3'}, {std: '4', value: '4'},{std: '5', value: '5'},{std: '6', value: '6'}, {std: '7', value: '7'}, {std: '8', value: '8'}, {std: '9', value: '9'}, {std: '10', value: '1o'}];
public flagList = [{name: 'Yes', value: 'Yes'}, {name: 'No', value: 'No'}];
public flagListBoolean = [{name: true, value: true}, {gender: false, value: false}];
public bloodGroupList = [
  { name: 'A+', value: 'A+' },
  { name: 'A-', value: 'A-' },
  { name: 'B+', value: 'B+' },
  { name: 'B-', value: 'B-' },
  { name: 'AB+', value: 'AB+' },
  { name: 'AB-', value: 'AB-' },
  { name: 'O+', value: 'O+' },
  { name: 'O-', value: 'O-' }
];
public socialCategoryList = [
  { name: 'General', value: 'General' },
  { name: 'OBC', value: 'OBC' },
  { name: 'SC', value: 'SC' },
  { name: 'ST', value: 'ST' },
  { name: 'EWS', value: 'EWS' }
];
public religionList = [
  { name: 'Hindu', value: 'Hindu' },
  { name: 'Islam', value: 'Islam' },
  { name: 'Christianity', value: 'Christianity' },
  { name: 'Buddhism', value: 'Buddhism' },
  { name: 'Sikhism', value: 'Sikhism' },
  { name: 'Jainism', value: 'Jainism' },
  { name: 'Other', value: 'Other' }
];

  ngOnInit(): void {
    this.store.dispatch(loadStudents());
    this.buildForm();
    this.param = this.route.snapshot.params['edit']
    this.store.select(selectStudentById(this.param)).pipe(
      filter((student): student is Student => !!student)
    ).subscribe(student => {
      this.studentForm.patchValue(student);
    });
  }

  buildForm() {
    this.studentForm = this.formBuilder.group({
      StudentName: ['', Validators.required],
      AadharNumber: ['', Validators.required],
      StudentID: ['', Validators.required],
      class: ['', Validators.required],
      Gender: ['', Validators.required],
      DateofBirth: ['', Validators.required],
      bloodGroup: [''],
      Image: [''],
      DateOfAdmission: ['', Validators.required],
      FatherName: ['', Validators.required],
      MotherName: ['', Validators.required],
      Medium: ['', Validators.required],
      PreviousYear: [''],
      District: ['', Validators.required],
      'Sub-Status': ['', Validators.required],
      TypeOfDisability: [''],
      'Email Address': ['', [Validators.required, Validators.email]],
      StudentOpted: ['', Validators.required],
      MobileNumber: ['', Validators.required],
      EyeScreening: [''],
      Session: ['', Validators.required],
      report: [''],
      '2022-2023': [false],
      '2023-2024': [false],
      '2024-2025': [false],
      Status: ['', Validators.required],
      Address: ['', Validators.required],
      SocialCategory: ['', Validators.required],
      BPL: [''],
      Block: ['', Validators.required],
      MotherTongue: ['', Validators.required],
      Habitation: ['', Validators.required],
      'Admission Numbe': ['', Validators.required],
      Religion: ['', Validators.required],
      
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.firebaseService.updateStudent('studentInfo',this.param,this.studentForm.value).then(res=>{
        this.toasterService.presentToast(`Successfully update`,2000)
        this.router.navigate(['contacts']);
      })
    }
  }

}
