import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent, MenuItemDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { DownloadUrlService } from '../../shared-service/download-url.service';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.page.html',
  styleUrls: ['./exam-detail.page.scss'],
})
export class ExamDetailPage  {
  allStudentInfo: any[] | undefined;
  private gridApi!: GridApi;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'studentName' ,type: 'nonEditableColumn'},
    { field: 'class',type: 'nonEditableColumn'},
    { field: 'month' ,type: 'nonEditableColumn'},
    { field: 'sub',headerName: 'Subject',type: 'nonEditableColumn' },
    { field: 'oral',headerName: 'Viva Total' },
    { field: 'oralAcc',headerName: 'Viva ' },
    { field: 'writtenTotal',headerName: 'Written Total' },
    { field: 'writtenAcc',headerName: 'Written' },
    { field: 'subjectTotal' ,headerName: 'Total',
    valueGetter: (params: { data: { oral: any; writtenTotal: any; }; }) => {
      return Number(params.data.oral?params.data.oral:0)+  Number(params.data.writtenTotal?params.data.writtenTotal:0)
    }
  },
    { field: 'Total' ,headerName: 'Total Accquire',
    valueGetter: (params: { data: { oralAcc: any; writtenAcc: any; }; }) => {
      return Number(params.data.oralAcc?params.data.oralAcc:0)+  Number(params.data.writtenAcc?params.data.writtenAcc:0)
      
    }
  },
    { field: 'year' ,headerName: 'Year',type: 'nonEditableColumn'}
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
  public columnTypes = {
    nonEditableColumn: { editable: false },
};

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;
  public rowData: any

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  gridOptions!: GridOptions;
  constructor(public modalCtrl: ModalController, private storeService: DownloadUrlService, public firebaseService: FirebaseService) { }

  
  createExamStructure(allStudentInfo: any[]) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December','Halfly','Annual'];
    let subject = [
      {
        class:7,
        subjects:[
          {
            topic: 'Math',
            total: 25,
            occ: 0
          },
          {
            topic: 'Science',
            total: 25,
            occ: 0
          },
          {
            topic: 'English',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'MIL(Odia)',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'History',
            total: 25,
            occ: 0
          },
          {
            topic: 'Geography',
            total: 25,
            occ: 0
          },
          {
            topic: 'Sanskrit',
            total: 25,
            occ: 0
          },
          {
            topic: 'Computer',
            total: 25,
            occ: 0
          },
        ]
      },
      {
        class:6,
        subjects:[
          {
            topic: 'Math',
            total: 25,
            occ: 0
          },
          {
            topic: 'Science',
            total: 25,
            occ: 0
          },
          {
            topic: 'English',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'MIL(Odia)',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'History',
            total: 25,
            occ: 0
          },
          {
            topic: 'Geography',
            total: 25,
            occ: 0
          },
          {
            topic: 'Sanskrit',
            total: 25,
            occ: 0
          },
          {
            topic: 'Computer',
            total: 25,
            occ: 0
          },
        ]
      },
      {
        class:5,
        subjects:[
          {
            topic: 'Math',
            total: 25,
            occ: 0
          },
          {
            topic: 'Science',
            total: 25,
            occ: 0
          },
          {
            topic: 'English',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'MIL(Odia)',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'Social Science',
            total: 25,
            occ: 0
          },

          {
            topic: 'Sanskrit',
            total: 25,
            occ: 0
          },
          {
            topic: 'Computer',
            total: 25,
            occ: 0
          },
        ]
      },
      {
        class:4,
        subjects:[
          {
            topic: 'Math',
            total: 25,
            occ: 0
          },
          {
            topic: 'Science',
            total: 25,
            occ: 0
          },
          {
            topic: 'English',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'MIL(Odia)',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'Social Science',
            total: 25,
            occ: 0
          },

          {
            topic: 'Sanskrit',
            total: 25,
            occ: 0
          },
          {
            topic: 'Computer',
            total: 25,
            occ: 0
          },
        ]
      },
      {
        class:3,
        subjects:[
          {
            topic: 'Math',
            total: 25,
            occ: 0
          },
          {
            topic: 'English',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'MIL(Odia)',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'En. Science',
            total: 25,
            occ: 0
          },

      
        ]
      },
      {
        class:2,
        subjects:[
          {
            topic: 'Math',
            total: 25,
            occ: 0
          },
          {
            topic: 'English',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'MIL(Odia)',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'En. Science',
            total: 25,
            occ: 0
          },

      
        ]
      },
      {
        class:1,
        subjects:[
          {
            topic: 'Math',
            total: 25,
            occ: 0
          },
          {
            topic: 'English',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'MIL(Odia)',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'En. Science',
            total: 25,
            occ: 0
          },

      
        ]
      },
      {
        class:'KG',
        subjects:[
          {
            topic: 'Math',
            total: 25,
            occ: 0
          },
          {
            topic: 'English',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'MIL(Odia)',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'Science',
            total: 25,
            occ: 0
          },

      
        ]
      },
      {
        class:'Nursery',
        subjects:[
          {
            topic: 'Math',
            total: 25,
            occ: 0
          },
          {
            topic: 'English',
            total: 25,
            occ: 0
    
          },
          {
            topic: 'MIL(Odia)',
            total: 25,
            occ: 0
    
          }
        ]
      }
     
    ];
    allStudentInfo.forEach(item => {
     let subjects= subject.filter(sub=>{
        return sub.class=='Nursery'
      })[0].subjects;
      if(item.class=='Nursery'){
        months.forEach(month => { 
          subjects.forEach(sub => {
            let examInfo = {
              studentName: item.StudentName,
              mobileNumber: item.MobileNumber,
              class: item.class,
              month: month,
              sub: sub['topic'],
              total: sub['total'],
              acc: sub['occ'],
              year: '2022-2023'

            }
            console.log(examInfo)
           this.firebaseService.pushItems('exam-detail', { ...examInfo })
          })
        })
      }
      

    })
  }
  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.firebaseService.getAllExamDetail().subscribe(items => {
      console.log(items)
      this.rowData = this.sortByMonth(items)
    })

  }
 sortByMonth(arr: any[]) {
    var months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
   return arr.sort(function(a: { month: string; }, b: { month: string; }){
        return months.indexOf(a.month)
             - months.indexOf(b.month);
    });
  }
  getContextMenuItems = (params: any) => {
    var result: (string | MenuItemDef)[] = [
      {
        name: 'Action',
        subMenu: [
          {
            name: 'Update Student',
            action: () => {
              console.log(params)
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
    let obj={
      subjectTotal:Number(params.node.data.oral)+Number(params.node.data.writtenTotal),
      total:Number(params.node.data.oralAcc)+Number(params.node.data.writtenAcc)
    }
    params.node.data={... params.node.data,...obj}
    this.firebaseService.updateStudent('exam-detail', params.node.data.$id, params.node.data)
  }
  public deleteStudent(params: any) {
    this.firebaseService.deleteStudent('exam-detail', params.node.data.$id)
  }
  addStudent() {
    let studentObj = {
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
    this.firebaseService.addNewStudent('studentInfo', studentObj.MobileNumber, studentObj);
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
  onBtExport() {
    this.gridApi.exportDataAsExcel({ fileName: 'student' });
  }
  saveData() {
    let allData = this.getAllRows();

  }
  getAllRows() {
    let rowData: any[] = [];

    this.gridApi.forEachNode((node: { data: any; }) => {
      this.createStudentRecord(node.data)
      rowData.push(node.data)

    });
    return rowData;
  }
  createStudentRecord(data: { [x: string]: any; Image?: string | undefined; description?: string | undefined; heldDate?: string | undefined; natificationDate?: string | undefined; subject?: string | undefined; id?: string | undefined; name?: string | undefined; position?: string | undefined; Designation?: string | undefined; location?: string | undefined; MobileNumber?: string | undefined; studentName?: any; mobileNumber?: any; class?: any; month?: string | undefined; sub?: string | undefined; total?: number | undefined; acc?: number | undefined; year?: string | undefined; markInfo?: ({ name: string; marks: ({ writtenAcc: string; sub: string; oral: string; acc: number; oralAcc: string; year: string; total: number; subjectTotal: number; writtenTotal: string; } | { oralAcc: string; oral: string; year: string; writtenAcc: number; subjectTotal: number; sub: string; total: number; acc: number; writtenTotal: string; } | { sub: string; acc: number; oralAcc: number; oral: number; year: string; writtenAcc: string; subjectTotal: number; total: number; writtenTotal: string; } | { acc: number; writtenTotal: number; sub: string; total: number; year: string; oralAcc: string; subjectTotal: number; oral: string; writtenAcc: number; })[]; visible: boolean; nonAcademic: { creativity: string; gardening: string; physicalEdu: string; senseDev: string; handWork: string; musicalDance: string; remark: string; }; } | { visible: boolean; name: string; marks: ({ acc: number; sub: string; oralAcc: number; oral: number; writtenAcc: number; subjectTotal: number; year: string; total: number; writtenTotal?: undefined; } | { total: number; oralAcc: number; acc: number; year: string; writtenTotal: number; writtenAcc: number; subjectTotal: number; sub: string; oral: number; })[]; nonAcademic?: undefined; })[] | undefined; "Product Code"?: string | undefined; Name?: string | undefined; Description?: string | undefined; Qty?: string | undefined; "Date of Purchase"?: string | undefined; Availability?: string | undefined; Price?: string | undefined; Total?: string | undefined; }) {
    this.firebaseService.pushItems('studentInfo', data)
  }

}


;


