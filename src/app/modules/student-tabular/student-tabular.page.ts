import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef, GridOptions, GridReadyEvent, CellClickedEvent, GetContextMenuItemsParams, MenuItemDef } from 'ag-grid-community';

import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { allStudentInfo } from '../../../assets/student-info/allStudentInfo'
@Component({
  selector: 'app-student-tabular',
  templateUrl: './student-tabular.page.html',
  styleUrls: ['./student-tabular.page.scss'],
})
export class StudentTabularPage implements OnInit {

  private gridApi!: GridApi;

 // Each Column Definition results in one Column.
 public columnDefs: ColDef[] = [
   { field: 'StudentName'},
   { field: 'DateofBirth'},
   { field: 'FatherName' },
   { field: 'MotherName' },
   { field: 'Address' },
   { field: 'Gender' },
   { field: 'MobileNumber' },
   { field: 'bloodGroup' },
   { field: 'Image' },
   { field: 'class' },
   {field:'Sub-Status'},
   {field:'SocialCategory'}
 ];

 // DefaultColDef sets props common to all Columns
 public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
    editable: true,
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true
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
  this.firebaseService.getAllstudent().subscribe(items=>{
    let studentInfo=[]
    // items.forEach(item=>{
    //   studentInfo.push(item)
    // })
    console.log(items)
     this.rowData = items;
  })
  
 }
 getContextMenuItems = (params) => {
  console.log(params)
  var result: (string | MenuItemDef)[] = [
    {
      name: 'Action',
      subMenu: [
        {
          name: 'Update Student',
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
  this.firebaseService.updateStudent('studentInfo',params.node.data.$id,params.node.data)
}
public deleteStudent(params: any) {
  this.firebaseService.deleteStudent('studentInfo',params.node.data.$id)
}
addStudent(){
  let studentObj={
    "Admission Numbe": "2019-20/0108",
    "PreviousYear": "3",
    "AadharNumber": "",
    "Address": "Vill-Paikakusadi, P. O. -Ankulachat, P. S. -Balugaon",
    "Sub-Status": "In School",
    "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/Aditya%20Maharana.jpeg?alt=media&token=74270099-519c-48d5-b3db-0007b8c69682",
    "Block": "Chilika",
    "bloodGroup": "O+",
    "StudentName": "Utsah",
    "DateofBirth": "06-03-2013",
    "Medium": "Odia",
    "StudentID": "2117070130200188",
    "MobileNumber": "7377647878",
    "StudentOpted": "Day Boarder",
    "Status": "Active",
    "MotherName": "Sunita Paikray",
    "Email Address": "pradosh84@yahoo.co.in",
    "Habitation": "PAIKAKUSHADIHA",
    "DateOfAdmission": "02-04-2019",
    "EyeScreening": "No",
    "Session": "2022-23",
    "Gender": "1 - Male",
    "MotherTongue": "Odia",
    "SocialCategory": "4-OBC/SEBC",
    "BPL": "Yes",
    "class": "4",
    "District": "Khordha",
    "FatherName": "Uttam Kumar Paikray",
    "Religion": "0 - Hindu",
}
  this.firebaseService.addNewStudent('studentInfo',studentObj.MobileNumber,studentObj);
}

 // Example of consuming Grid Event
 onCellClicked( e: CellClickedEvent): void {
   console.log('cellClicked', e);
 }

 // Example using Grid's API
 clearSelection(): void {
   this.agGrid.api.deselectAll();
 }
 onBtExport() {
 this.gridApi.exportDataAsExcel({columnGroups: true, fileName: 'student' });
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
this.firebaseService.pushItems('studentInfo',data)
}
}