
  import { HttpClient } from '@angular/common/http';
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { AngularFirestore } from '@angular/fire/firestore';
  import { AgGridAngular } from 'ag-grid-angular';
  import { GridApi, ColDef, GridOptions, GridReadyEvent, CellClickedEvent, GetContextMenuItemsParams, MenuItemDef } from 'ag-grid-community';
  
  import { Observable } from 'rxjs';
  import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
  import { groupBy, values,sortBy } from 'lodash';

@Component({
  selector: 'app-student-auto-fee',
  templateUrl: './student-auto-fee.page.html',
  styleUrls: ['./student-auto-fee.page.scss'],
})
export class StudentAutoFeePage implements OnInit {  
    private gridApi!: GridApi;
   public columnDefs: ColDef[] = [
     { field: 'StudentName'},
     { field: 'FatherName' },
     { field: 'MobileNumber' },
     { field: 'Habitation' },
     { field: 'class' },
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
      minWidth: 180,
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
    this.firebaseService.getAllstudentFee('student-auto-fee').subscribe(items=>{
       this.rowData = sortBy(items,['class','name']);
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
   this.firebaseService.updateStudent('student-auto-fee',params.node.data.$id,params.node.data)
  }
  public deleteStudent(params: any) {
    this.firebaseService.deleteStudent('student-auto-fee',params.node.data.$id)
  }
  addStudent(){
    let studentObj={
      "StudentName": "xyz",
      "MobileNumber": "76744778",
      "Habitation": "",
      "DateOfAdmission": "",
      "class": "",
      "FatherName": "",
  }
  console.log('called')
    this.firebaseService.addNewStudent('student-auto-fee',studentObj.MobileNumber,studentObj);
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
   //let allData= this.getAllRows();
  
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
  this.firebaseService.pushItems('student-auto-fee',data)
  }
  }
  
