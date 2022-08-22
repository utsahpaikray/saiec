import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { groupBy, values,sortBy } from 'lodash';
import { StudentDetailPage } from '../shared/student-detail/student-detail.page';
@Component({
  selector: 'app-staff-payment',
  templateUrl: './staff-payment.page.html',
  styleUrls: ['./staff-payment.page.scss'],
})
export class StaffPaymentPage implements OnInit {
  feeMonthwise: any[];
  constructor(private http: HttpClient, private firestore: AngularFirestore,public firebaseService:FirebaseService,public modalCtrl: ModalController) {}

  ngOnInit() {
//     let faculty=[
//       {
//           "MobileNumber": "6372996281",
//           "name": "Budhapriya Pradhan",
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/budhi.jpeg?alt=media&token=6659b5cc-41ac-4373-90ae-8e4ff09ba815",
//           "Designation": "Teacher",
//           payment:2300
//       },
//       {
//           "Designation": "Principal",
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/Pradosh.jpeg?alt=media&token=81f1ba02-a826-4605-8599-8a3bece93980",
//           "name": "Pradosh kumar Maharana",
//           "id": 1,
//           "location": "Paikakushadiha",
//           "position": "Science",
//           "$id": "EJpDScFOJi5FCFjw24YY",
//           payment:3300
//       },
//       {
//           "$id": "LwJoRnuchlnyDzBdk6s0",
//           "Designation": "Teacher",
//           "location": "Paikakushadiha",
//           "id": "7",
//           "position": "Language Teacher",
//           "name": "Rita",
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/Rita.jpeg?alt=media&token=e6031986-0314-4f0b-a762-b8c05be723a0",
//           payment:2300
//       },
//       {
//           "position": "Computer Teacher",
//           "Designation": "Teacher",
//           "name": "Deepak",
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/deepak.jpeg?alt=media&token=67128c6a-e592-42d9-8e1e-29c41abaef83",
//           "$id": "RqmYnli7xphXU4RYu3Pd",
//           "id": "8",
//           "location": "Kotari",
//           payment:1500
//       },
//       {
//           "id": "9",
//           "position": "Language Teacher",
//           "name": "Subhasmita Swain",
//           "$id": "UVZwIAXCUumUUMjVDGj8",
//           "Designation": "Teacher",
//           "location": "Paikakushadiha",
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/Sanu.jpeg?alt=media&token=3a52c8b4-90d7-4181-980a-5c17b42e3c6b",
//           payment:2000
//       },
//       {
//           "$id": "crwM3Oy07fXcfNTjLIg9",
//           "Designation": "Teacher",
//           "name": "Ronee",
//           "id": "6",
//           "position": "Language Teacher",
//           "location": "Paikakushadiha",
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/lima.jpeg?alt=media&token=464a1de2-6d98-4770-ac6b-b7674a91a9df",
//           payment:3000
//       },
//       {
//           "id": "5",
//           "$id": "fuvqNqL8DH3MIFsKvXPw",
//           "name": "Pujalini Baral",
//           "Designation": "Teacher",
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/pujalini.jpeg?alt=media&token=292fb8e8-4864-4ffc-83b7-8aebd6715561",
//           "position": "Language Teacher",
//           "location": "Paikakushadiha",
//           payment:2000
//       },
//       {
//           "$id": "h1DklUEvtFSdBbuaz28u",
//           "name": "Rachana Maharana",
//           "location": "Paikakushadiha",
//           "Designation": "Teacher",
//           "id": "10",
//           "position": "Language Teacher",
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/Sanu.jpeg?alt=media&token=3a52c8b4-90d7-4181-980a-5c17b42e3c6b",
//           payment:2000
//       },
//       {
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/sunita.jpeg?alt=media&token=c9c8242b-4aac-402b-a6e3-8b64e55a9ac8",
//           "location": "Paikakushadiha",
//           "Designation": "Teacher",
//           "position": "Sanskrit Teacher",
//           "id": 3,
//           "name": "Sunita",
//           "$id": "rv5sW6lHCnsh8hL4eCPd",
//           payment:2300
//       },
//       {
//           "id": 2,
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/nirupama.jpeg?alt=media&token=610958f3-5cc8-4de7-ae05-1593201b59f8",
//           "Designation": "Teacher",
//           "name": "Nirupama",
//           "location": "Kimbhiripada",
//           "position": "Odia Teacher",
//           "$id": "wsulyDPfeeylGxmQx15y",
//           payment:2300
//       },
//       {
//           "$id": "z7Q57WcNB8T15YT8cBHh",
//           "position": "Math  Teacher",
//           "Designation": "Teacher",
//           "id": "4",
//           "name": "Palishree",
//           "location": "Bramhanakausadi",
//           "Image": "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/palishree.jpeg?alt=media&token=702f579a-2876-4403-ad2b-1900d6b13ae5",
//           payment:3100
//       }
//   ]
// faculty.forEach(item=>{
//   let obj={
//     "name": item.name,
//     "image": item.Image,
//     payment:item.payment,
//     "January": 0,
//     "November": 0,
//     "March": 0,
//     "April": 0,
//     "October": 0,
//     "September": 0,
//     "February": 0,
//     "December": 0,
//     "June": 0,
//     "August": 0,
//     "May": 0,
//     "July": 0
//   }
//  // this.createStaffpayment(obj)
// })
this.fetchStaffPayment();
  }
  fetchStaffPayment() {
    this.firebaseService.getAll('staff-payment').subscribe(items=>{
      console.log(items)
      this.generateAutoFeeStructure(items)
       
    })
  }
  generateAutoFeeStructure(data) {
    let flatData = data;
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.feeMonthwise = []
    months.forEach(month => {
      let staffInfoArray = []
      flatData.forEach(element => {
        let staffInfo = {
          name: element.name,
          image:element.image,
          value: element[month]
        }
        staffInfoArray.push(staffInfo)
      });
      staffInfoArray=sortBy(staffInfoArray,['class','name'])
      this.feeMonthwise.push({month:month,studentInf:staffInfoArray})
    })
    console.log(this.feeMonthwise)
  }
  public async showModal(info) {
    let monthlyCollection=[]
    this.feeMonthwise.forEach(item=>{
      monthlyCollection.push({info:item.studentInf.find(o => o.name === info),month:item.month});
    })
    const modal = await this.modalCtrl.create({
      component: StudentDetailPage,
      cssClass: 'my-custom-class',
      componentProps: { info: monthlyCollection },
      canDismiss: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }
  createStaffpayment(data) {
    this.firebaseService.pushItems('staff-payment',data)
   }
}
