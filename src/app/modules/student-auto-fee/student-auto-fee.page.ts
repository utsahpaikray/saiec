import {
  Component,
  ViewChild
} from '@angular/core';
import {
  AgGridAngular
} from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  MenuItemDef
} from 'ag-grid-community';
import {
  sortBy
} from 'lodash';
import {
  Observable
} from 'rxjs';
import {
  FirebaseService
} from '../../shared-service/firebaseService/firebase-service.service';
import { CompanyRendererComponent } from './component/status';

@Component({
  selector: 'app-student-auto-fee',
  templateUrl: './student-auto-fee.page.html',
  styleUrls: ['./student-auto-fee.page.scss'],
})
export class StudentAutoFeePage {
  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [{
      field: 'StudentName'
    },
    {
      field: 'FatherName'
    },
    {
      field: 'MobileNumber'
    },
    {
      field: 'Habitation'
    },
    {
      field: 'class'
    },
    {
      field: 'January'
    },
    {
      field: 'February'
    },
    {
      field: 'March'
    },
    {
      field: 'April'
    },
    {
      field: 'May'
    },
    {
      field: 'June'
    },
    {
      field: 'July'
    },
    {
      field: 'August'
    },
    {
      field: 'September'
    },
    {
      field: 'October'
    },
    {
      field: 'November'
    },
    {
      field: 'December'
    },
    { field: 'AutoService', cellRenderer: CompanyRendererComponent },
    {
      field: 'autoSession'
    }

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
  public rowData$!: Observable < any[] > ;
  public rowData: any
  filterData: any[] = [];
  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  gridOptions!: GridOptions;
  session = '24-25';

  constructor(public firebaseService: FirebaseService) {}


  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.firebaseService.getAllstudentFee('student-auto-fee').subscribe(items => {
      this.rowData = sortBy(items, ['class', 'name']);
      if(this.session){
        this.selectSession(this.session)
      }else{
        this.filterData = [...this.rowData];
      }
 
    })
    // this.deleteRecord()

  }
  updateWholeData(){
    this.firebaseService.getAllstudent().subscribe(items => {
      let filtervalue = items.filter((item: any) => {
        return item['2024-2025'] == true && item['Auto-Service']
      })
      console.log(filtervalue)
      filtervalue.map((item: any) => {
        let studentobj = {
          autoSession: '24-25',
          July: 0,
          January: 0,
          February: 0,
          August: 0,
          December: 0,
          October: 0,
          March: 0,
          May: 0,
          April: 0,
          June: 0,
          November: 0,
          September: 0,
          Status: true,
          Habitation: item.Habitation,
          FatherName: item.FatherName,
          MobileNumber: item.MobileNumber,
          Address: item.Habitation,
          MotherName: item.MotherName,
          class: item.class,
          Image: item.Image,
          AutoService: "true",
          StudentName: item.StudentName
        };
        let findIndex =  this.filterData?.findIndex((item: { StudentName: string }) => item.StudentName === studentobj.StudentName)
        console.log(findIndex)
        if(findIndex===-1){
          this.firebaseService.addNewStudent('student-auto-fee', undefined, studentobj);
        }
        // this.firebaseService.addNewStudent('student-auto-fee', undefined, studentobj);
      });
      //  // console.log(filtervalue)
      //   // Map the filtered students to the required format
    })
  }
  getContextMenuItems = (params: any) => {
    var result: (string | MenuItemDef)[] = [{
        name: 'Action',
        subMenu: [{
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
    this.firebaseService.updateStudent('student-auto-fee', params.node.data.$id, params.node.data)
  }
  public deleteStudent(params: any) {
    this.firebaseService.deleteStudent('student-auto-fee', params.node.data.$id)
  }
  addStudent() {
    let studentObj = {
      "StudentName": "xyz",
      "MobileNumber": "76744778",
      "Habitation": "",
      "DateOfAdmission": "",
      "class": "",
      "FatherName": "",
    }
    console.log('called')
    this.firebaseService.addNewStudent('student-auto-fee', studentObj.MobileNumber, studentObj);
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {

  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
  onBtExport() {
    this.gridApi.exportDataAsExcel({
      fileName: 'scholl-fee'
    });
  }
  saveData() {
    //let allData= this.getAllRows();

  }
  getAllRows() {
    let rowData: any[] = [];
    this.gridApi.forEachNode((node: any) => {
      this.createStudentRecord(node.data)
      rowData.push(node.data)

    });
    return rowData;
  }
  createStudentRecord(data: any) {
    this.firebaseService.pushItems('student-auto-fee', data)
  }
  selectSession(value: string){
    this.session =  value
    this.filterData = this.rowData.filter((item: { autoSession: string; }) => {
      return item.autoSession == value;
    });
   // console.log(this.filterData)
 
  }
  deleteRecord(){
    this.firebaseService.deleteRecord('student-auto-fee');
  }
}
