import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef, GridOptions, GridReadyEvent, CellClickedEvent, GetContextMenuItemsParams, MenuItemDef } from 'ag-grid-community';

import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { groupBy, values,sortBy } from 'lodash';

@Component({
  selector: 'app-student-school-fee',
  templateUrl: './student-school-fee.page.html',
  styleUrls: ['./student-school-fee.page.scss'],
})
export class StudentSchoolFeePage implements OnInit {


  private gridApi!: GridApi;

 // Each Column Definition results in one Column.
 public columnDefs: ColDef[] = [
   { field: 'StudentName'},
   { field: 'FatherName' },
   { field: 'MobileNumber' },
   { field: 'class' },
   { field: 'Admission fee' },
   { field: 'Re-Admission fee' },
   { field: 'January' },
   { field: 'February' },
   { field: 'March' },
   { field: 'April' },
   { field: 'May' },
   { field: 'June' },
   { field: 'July' },
   { field: 'August' },
   { field: 'September' },
   { field: 'October' },
   { field: 'November' },
   { field: 'December' },

 ];

 // DefaultColDef sets props common to all Columns
 public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
    editable: true
 };
 
 // Data that gets displayed in the grid
 public rowData$!: Observable<any[]>;
 public rowData:any

 // For accessing the Grid's API
 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  gridOptions: GridOptions;

 constructor(private http: HttpClient, private firestore: AngularFirestore,public firebaseService:FirebaseService) {}
  ngOnInit(): void {
   
  }

 // Example load data from sever
 onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
  this.firebaseService.getAllstudentFee('student-fee').subscribe(items=>{

     this.rowData = sortBy(items,['class','name']);;
  })
  
 }
 getContextMenuItems = (params) => {
  var result: (string | MenuItemDef)[] = [
    {
      name: 'Action',
      subMenu: [
        {
          name: 'Update Student fee',
          action: () => {
            console.log(this)
           this.updateStudent(params);
          },
        },
        {
          name: 'Delete Student',
          action: () => {
           this.deleteStudent(params)
          },
        }
      ],
    },
    'separator',
    'export',
    'autoSizeAll',
    'expandAll',
    'copyWithHeaders',
    'copy'
  ];
  return result;
}
public updateStudent(params: any) {
  console.log(params.node.data.$id)
 this.firebaseService.updateStudent('student-fee',params.node.data.$id,params.node.data)
}
public deleteStudent(params: any) {
  this.firebaseService.deleteStudent('student-fee',params.node.data.$id)
}
addStudent(){
  let studentObj={
    "Admission Numbe": "2019-20/0108",
    "PreviousYear": "3",
    "AadharNumber": "",
    "Address": "Vill-Paikakusadi, P. O. -Ankulachat, P. S. -Balugaon",
    "Sub-Status": "In School",
    "Image": "",
    "Block": "Chilika",
    "bloodGroup": "O+",
    "StudentName": "XYZ",
    "DateofBirth": "",
    "Medium": "Odia",
    "StudentID": "",
    "MobileNumber": "83u284u893",
    "StudentOpted": "Day Boarder",
    "Status": "Active",
    "MotherName": "",
    "Email Address": "pradosh84@yahoo.co.in",
    "Habitation": "",
    "DateOfAdmission": "02-04-2019",
    "EyeScreening": "No",
    "Session": "2022-23",
    "Gender": "",
    "MotherTongue": "Odia",
    "SocialCategory": "4-OBC/SEBC",
    "BPL": "Yes",
    "class": "",
    "District": "Khordha",
    "FatherName": "",
    "Religion": "0 - Hindu",
}
  this.firebaseService.addNewStudent('student-fee',studentObj.MobileNumber,studentObj);
}

 // Example of consuming Grid Event
 onCellClicked( e: CellClickedEvent): void {
  
 }

 // Example using Grid's API
 clearSelection(): void {
   this.agGrid.api.deselectAll();
 }
 onBtExport() {
 this.gridApi.exportDataAsExcel({columnGroups: true, fileName: 'scholl-fee' });
}
saveData(){
 let allData= this.getAllRows();

}
getAllRows() {
  let rowData = [];
  
  this.gridApi.forEachNode(node => {
    this.createStudentRecord(node.data)
    rowData.push(node.data)

  });
  return rowData;
}
createStudentRecord(data) {
this.firebaseService.pushItems('student-fee',data)
}
}

