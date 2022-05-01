import { std7 } from './../../../assets/student-info/standard7';
import { std6 } from './../../../assets/student-info/standard6';
import { std5 } from './../../../assets/student-info/standard5';
import { std4 } from './../../../assets/student-info/standard4';
import { std3 } from './../../../assets/student-info/standard3';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  public student7Info;
  public student6Info;
  public student5Info;
  public student4Info;
  public student3Info;
  constructor() { 
     this.student7Info=std7;
     this.student6Info=std6;
     this.student5Info=std5;
     this.student4Info=std4;
     this.student3Info=std3;
  }

  ngOnInit() {
    console.log(std7)
  }
  // public selectedFile(event){
  //  let  selectedFile = event.target.files[0];
  //   // XLSX.utils.json_to_sheet(data, 'out.xlsx');
  //   if(selectedFile){
  //       let fileReader = new FileReader();
  //       fileReader.readAsBinaryString(selectedFile);
  //       fileReader.onload = (event)=>{
  //        let data = event.target.result;
  //        let workbook = XLSX.read(data,{type:"binary"});
  //        console.log(workbook);
  //        workbook.SheetNames.forEach(sheet => {
  //             let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
  //             console.log(rowObject);
  //           //  document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
  //        });
  //       }
  //   }
  // }

}
