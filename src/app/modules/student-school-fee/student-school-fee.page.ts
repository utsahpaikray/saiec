import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent, MenuItemDef } from 'ag-grid-community';

import { sortBy } from 'lodash';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';

@Component({
  selector: 'app-student-school-fee',
  templateUrl: './student-school-fee.page.html',
  styleUrls: ['./student-school-fee.page.scss'],
})
export class StudentSchoolFeePage  {


  private gridApi!: GridApi;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'StudentName' },
    { field: 'FatherName' },
    { field: 'MobileNumber' },
    { field: 'class' },
    {
      field: 'Admission fee',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'Re-Admission fee',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'January',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'February',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'March',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'April',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'May',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'June',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'July',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'August',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'September',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'October',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'November',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },
    {
      field: 'December',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
    },

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
  public rowData: any

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  gridOptions: GridOptions | undefined;

  constructor(public firebaseService: FirebaseService) { }
  

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.firebaseService.getAllstudentFee('student-fee').subscribe(items => {

      this.rowData = sortBy(items, ['class', 'name']);;
    })

  }
  getContextMenuItems = (params:any) => {
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
    this.firebaseService.updateStudent('student-fee', params.node.data.$id, params.node.data)
  }
  public deleteStudent(params: any) {
    this.firebaseService.deleteStudent('student-fee', params.node.data.$id)
  }
  addStudent() {
    let studentObj = {
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
    this.firebaseService.addNewStudent('student-fee', studentObj.MobileNumber, studentObj);
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {

  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
  onBtExport() {
    this.gridApi.exportDataAsExcel({ fileName: 'scholl-fee' });
  }
  saveData() {
    let allData = this.getAllRows();

  }
  getAllRows() {
    let rowData:any[] = [];

    this.gridApi.forEachNode((node:any) => {
      this.createStudentRecord(node.data)
      rowData.push(node.data)

    });
    return rowData;
  }
  createStudentRecord(data: any) {
    this.firebaseService.pushItems('student-fee', data)
  }
}

