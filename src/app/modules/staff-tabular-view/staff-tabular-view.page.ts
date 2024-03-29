import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef, GridOptions, GridReadyEvent, CellClickedEvent, GetContextMenuItemsParams, MenuItemDef } from 'ag-grid-community';

import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';

@Component({
  selector: 'app-staff-tabular-view',
  templateUrl: './staff-tabular-view.page.html',
  styleUrls: ['./staff-tabular-view.page.scss'],
})
export class StaffTabularViewPage implements OnInit {


@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.page.html',
  styleUrls: ['./faculty-form.page.scss'],
})

  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'name'},
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
  this.firebaseService.getAll('staff-payment').subscribe(items=>{
     this.rowData = items;
  })
  
 }
 updateAll(){
  
 }
 getContextMenuItems = (params) => {
  console.log(params)
  var result: (string | MenuItemDef)[] = [
    {
      name: 'Action',
      subMenu: [
        {
          name: 'Update',
          action: () => {
            console.log(this)
           this.update(params);
          },
        },
        {
          name: 'Delete',
          action: () => {
           this.delete(params)
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
public update(params: any) {
  this.firebaseService.updateStudent('staff-payment',params.node.data.$id,params.node.data)
}
public delete(params: any) {
  this.firebaseService.deleteStudent('staff-payment',params.node.data.$id)
}
addStudent(){
  let facultyObj={
    'id':'',
    'name':'',
    'position':'',
   'Designation':'' ,
   'Image':'',
   'location':'' ,
   'MobileNumber':''
}
  this.firebaseService.pushItems('staff-payment',facultyObj);
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
this.firebaseService.pushItems('staff-payment',data)
}
}


