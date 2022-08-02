import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { groupBy } from 'rxjs/operators';
import { DownloadUrlService } from 'src/app/shared-service/download-url.service';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef, GridOptions, GridReadyEvent, CellClickedEvent, GetContextMenuItemsParams, MenuItemDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.page.html',
  styleUrls: ['./exam-detail.page.scss'],
})
export class ExamDetailPage implements OnInit {
  allStudentInfo:any[];
  private gridApi!: GridApi;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'studentName', rowGroup: true, hide: true},
    { field: 'class' },
    { field: 'month' },
    { field: 'sub' ,rowGroup: true, hide: true},
    { field: 'acc' },
    { field: 'total' },
    {field:'year'}
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
  constructor(public modalCtrl: ModalController, private storeService: DownloadUrlService,public firebaseService:FirebaseService) { }

  ngOnInit() {
    // this.firebaseService.getAllstudent().subscribe(items=>{
    //   console.log(items)
    //    this.allStudentInfo = items;
    //   //  this.allStudentClassWise = values(groupBy(this.allStudentInfo, 'class'))
    //   //  this.inSchoolStudentData = this.extractInschoolData();
    //   //  this.generateAutoFeeStructure(this.inSchoolStudentData)
    //   this.createExamStructure(this.allStudentInfo)
    // })
  }
   createExamStructure(allStudentInfo: any[]) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let subject= [
      {
          topic: 'Math',
          total: 25,
          occ: 20
      },
      {
          topic: 'Science',
          total: 25,
          occ: 19
      },
      {
          topic: 'English',
          total: 25,
          occ: 15

      },
      {
          topic: 'MIL(Odia)',
          total: 25,
          occ: 10

      },
      {
          topic: 'History',
          total: 25,
          occ: 12
      },
    ];
    allStudentInfo.forEach(item=>{
      if(item.class==7){
        months.forEach(month=>{
          subject.forEach(sub=>{
            let examInfo={
              studentName:item.StudentName,
              mobileNumber:item.MobileNumber,
              class:item.class,
              month:month,
              sub:sub.topic,
              total:sub.total,
              acc:sub.occ,
              year:'2022-2023'
    
            }
            this.firebaseService.pushItems('exam-detail',{...examInfo})
          })
        })
      }

    })
  }
  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
   this.gridApi = params.api;
   this.firebaseService.getAllExamDetail().subscribe(items=>{

this.rowData = items
console.log(this.rowData)
})
   
  }
  getContextMenuItems = (params) => {
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
   this.firebaseService.updateStudent('exam-detail',params.node.data.$id,params.node.data)
 }
 public deleteStudent(params: any) {
   this.firebaseService.deleteStudent('exam-detail',params.node.data.$id)
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


;


