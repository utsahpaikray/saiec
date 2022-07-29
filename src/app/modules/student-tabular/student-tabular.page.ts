import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { allStudentInfo } from '../../../assets/student-info/allStudentInfo'
@Component({
  selector: 'app-student-tabular',
  templateUrl: './student-tabular.page.html',
  styleUrls: ['./student-tabular.page.scss'],
})
export class StudentTabularPage implements OnInit {


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
   {field:'Sub-Status'}
 ];

 // DefaultColDef sets props common to all Columns
 public defaultColDef: ColDef = {
   sortable: true,
   filter: true,
 };
 
 // Data that gets displayed in the grid
 public rowData$!: Observable<any[]>;
 public rowData:any

 // For accessing the Grid's API
 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

 constructor(private http: HttpClient) {}
  ngOnInit(): void {
   
  }

 // Example load data from sever
 onGridReady(params: GridReadyEvent) {
  console.log(allStudentInfo)
  let studentInfo=[]
  allStudentInfo.forEach(item=>{
    studentInfo.push(item.info)
  })
   this.rowData = studentInfo;
 }

 // Example of consuming Grid Event
 onCellClicked( e: CellClickedEvent): void {
   console.log('cellClicked', e);
 }

 // Example using Grid's API
 clearSelection(): void {
   this.agGrid.api.deselectAll();
 }
}