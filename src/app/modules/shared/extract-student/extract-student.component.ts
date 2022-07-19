import { Component, OnInit } from '@angular/core';
import { FetchFileService } from 'src/app/shared-service/fetch-file.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-extract-student',
  templateUrl: './extract-student.component.html',
  styleUrls: ['./extract-student.component.scss'],
})
export class ExtractStudentComponent implements OnInit {

  constructor(public fetchFileService:FetchFileService) { }

  ngOnInit() { 
    // (async() => {
      const url = "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/uploads%2F2022-23studentinfo.xlsx?alt=media&token=e1c83715-4ce7-4a27-a5cd-95715441c7f0";
    //   const data = await (await fetch(url)).arrayBuffer();
    //   /* data is an ArrayBuffer */
    //   const workbook = XLSX.read(data);
    
    //   /* DO SOMETHING WITH workbook HERE */
    // })();
  
    this.fetchFileService.getFileContent().subscribe(file=>{
         const data = file.arrayBuffer();
      /* data is an ArrayBuffer */
      const workbook = XLSX.read(data);
      console.log(workbook)
    })
  }
  public selectedFile(event) {
    let selectedFile = event.target.files[0];
    if (selectedFile) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event) => {
        let data = event.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        workbook.SheetNames.forEach(sheet => {
          let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          console.log(rowObject);
          this.studentDataModeling(rowObject)
          //  document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
        });
      }
    }
  }
  public studentDataModeling(studentsInfo: any[]) {
    studentsInfo.map((student: object) => {
      let createConatctData = this.createContact(student)
      student['info'] = createConatctData;
      delete student["Medium Of Instruction"];
      delete student["Unique Student ID"];
      delete student["Aadhar Number"];
      delete student["Student Name"];
      delete student["Date of Birth"];
      delete student["Father's Name"];
      delete student["Mother's Name"];
      delete student["Student's/ Parent's Address"];
      delete student["District"];
      delete student['Block'];
      delete student["Name Of Habitation Or Locality"];
      delete student["Gender"];
      delete student["Mother Tongue"];
      delete student["Religion"];
      delete student["Social Category"];
      delete student["Type Of Disability"];
      delete student["Is The Student BPL"];
      delete student["Student Opted"];
      delete student["Mobile Number"];
      delete student["Email Address"];
      delete student["Class Studied In The Previous Year"];
      delete student["Eye Screening"];
      delete student["Session"];
      delete student["Status"];
      delete student["Sub-Status"];
      delete student["Date Of Admission"];
     delete student["Class"];
     delete student["Admission Number"];
    })
    console.log(studentsInfo)
  }
  createContact(student: object) {
    let collectData = {
      "StudentID": student['Unique Student ID'],
      "AadharNumber": student['Aadhar Number'],
      "StudentName": student["Student Name"],
      "DateofBirth": student['Date of Birth'],
      "FatherName": student["Father's Name"],
      "MotherName": student["Mother's Name"],
      "Address": student["Student's/ Parent's Address"],
      "District": student["District"],
      "Block": student['Block'],
      "Habitation": student["Name Of Habitation Or Locality"],
      "Gender": student["Gender"],
      "MotherTongue": student["Mother Tongue"],
      "Religion": student["Religion"],
      "SocialCategory": student["Social Category"],
      "TypeOfDisability": student["Type Of Disability"],
      "BPL": student["Is The Student BPL"],
      "StudentOpted": student["Student Opted"],
      "MobileNumber": student["Mobile Number"],
      "Email Address": student["Email Address"],
      "PreviousYear": student["Class Studied In The Previous Year"],
      "Medium": student["Medium Of Instruction"],
      "EyeScreening": student["Eye Screening"],
      "Session": student["Session"],
      "Status": student["Status"],
      "Sub-Status": student["Sub-Status"],
      "DateOfAdmission":student["Date Of Admission"],
      "class":student["Class"],
      "Admission Numbe":student["Admission Number"]
    }
    return collectData;
  }
}

