import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent, MenuItemDef } from 'ag-grid-community';

import { Observable } from 'rxjs';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.page.html',
  styleUrls: ['./notification-form.page.scss'],
})
export class NotificationFormPage  {



  private gridApi!: GridApi;
 public columnDefs: ColDef[] = [
   { field: 'subject'},
   { field: 'description' },
   { field: 'heldDate' },
   { field: 'natificationDate' },
   { field: 'Image' },

 ];

 // DefaultColDef sets props common to all Columns
 public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 180,
    flex: 1,
    editable: true
 };
 
 // Data that gets displayed in the grid
 public rowData$!: Observable<any[]>;
 public rowData:any

 // For accessing the Grid's API
 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  gridOptions!: GridOptions;

 constructor(public firebaseService:FirebaseService) {}
  

 // Example load data from sever
 onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
  this.firebaseService.getNotication().subscribe(items=>{
    console.log(items)
     this.rowData = items;
  })
  
 }
 getContextMenuItems = (params: any) => {
  var result: (string | MenuItemDef)[] = [
    {
      name: 'Action',
      subMenu: [
        {
          name: 'Update Notification',
          action: () => {
            console.log(this)
           this.updateNotification(params);
          },
        },
        {
          name: 'Delete Notification',
          action: () => {
           this.deleteNotification(params)
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
public updateNotification(params: any) {
 this.firebaseService.updateStudent('notification',params.node.data.$id,params.node.data)
}
public deleteNotification(params: any) {
  this.firebaseService.deleteStudent('notification',params.node.data.$id)
}
addNotification(){
  let notification={
    Image: "",
    description: "",
    heldDate: "",
    natificationDate: "",
    subject: "",
}
  this.firebaseService.pushItems('notification',notification);
}

 // Example of consuming Grid Event
 onCellClicked( e: CellClickedEvent): void {
  
 }

 // Example using Grid's API
 clearSelection(): void {
   this.agGrid.api.deselectAll();
 }
 onBtExport() {
 this.gridApi.exportDataAsExcel({ fileName: 'notification' });
}
}


