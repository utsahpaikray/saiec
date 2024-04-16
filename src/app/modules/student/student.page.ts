import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { groupBy, sortBy, values } from 'lodash';
import { DownloadUrlService } from 'src/app/shared-service/download-url.service';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { ModalPage } from '../shared/modal/modal.page';
@Component({
    selector: 'app-student',
    templateUrl: './student.page.html',
    styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
    public allStudentInfo: any;
    public gridValue: boolean = false;
    searchQuery: any;
    allStudent: any[] = [];
    itemsCount: number = 1;
    allStudentClassWise: any[]= [];
    inSchoolStudentData: any[]=[];
    totalStudent: number = 0;
    hexString = "0123456789abcdef";
    loaded=false;
    sortByProperty = 'class'
    constructor(public modalCtrl: ModalController, private storeService: DownloadUrlService, public firebaseService: FirebaseService, private router: Router) {
    }

    ngOnInit() {
        this.firebaseService.getAllstudent().subscribe(items => {
           let inStudent = items.filter((item: any)=>(item['Status'] == "Active"|| item['Status']==='Y'))
            this.totalStudent = inStudent.length;
            console.log(items)
            this.allStudentInfo = sortBy(inStudent, ['class', 'StudentName']);
            var grouped = groupBy(this.allStudentInfo, function (it: any) {
                return it.DateofBirth.split('-')[1];
            });
            this.allStudentClassWise = this.sortStudent(this.sortByProperty)
            this.inSchoolStudentData = this.extractInschoolData();
            this.generateAutoFeeStructure(this.inSchoolStudentData)
            this.loaded=true;
        },err=>{
            this.loaded=false;
        })


    }
    sortStudent(property: any){
        this.sortByProperty = property
        return values(groupBy(this.allStudentInfo, property))
    }
    sortBy(property: any){
        this.sortByProperty = property
        this.allStudentClassWise = this.sortStudent(property)
    }
    extractInschoolData() {
        // this.totalStudent = 0;
        let filterData = this.allStudentClassWise.map(item => {
            return item.filter((innerItem: any) => {
                innerItem['exmaDetail'] =
                    [
                        {
                            "month": "Jan",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "Feb",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "Mar",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "April",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "May",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "jun",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "july",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "Aug",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "September",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "Oct",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "November",
                            "Subject": [
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
                            ],
                        },
                        {
                            "month": "December",
                            "Subject": [
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
                            ],
                        },]
                if (innerItem['Sub-Status'] == 'In School') {
                    //   this.totalStudent = this.totalStudent + 1;
                    return true;
                };
                return false
            })

        })
        return filterData;
    }
    public onInput() {
        const elements = document?.querySelector('.student-info')?.children;
        const items = Array.from(elements ?? []);
        this.itemsCount = 0;
        requestAnimationFrame(() => {
            items.forEach((item) => {
                Array.from(item.children).forEach((item: any) => {
                    const shouldShow = item.textContent.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
                    this.itemsCount = shouldShow ? this.itemsCount + 1 : this.itemsCount;
                    item['style'].display = shouldShow ? 'block' : 'none';
                })
            });

        });
    }
    public fetchUrl(url: any) {
        let imageUrl = this.storeService.getFbStorageURl(url).subscribe(item => {
            return item;
        });
        return imageUrl;
    }
    public async showModal(info: any) {
        const modal = await this.modalCtrl.create({
            component: ModalPage,
            cssClass: 'my-custom-class',
            componentProps: { info: info },
            canDismiss: true,
            presentingElement: await this.modalCtrl.getTop()
        });
        return await modal.present();
    }
    public showReport(std: any){
        this.router.navigate([`/report/${std.StudentName}`]);
    }
    generateAutoFeeStructure(data: any[]) {
        let flatData = data.flat(2);
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let AutoFeeMonthwise = []
        months.forEach(month => {
            let studentInfoArray: any[] = []
            flatData.forEach(element => {
                let studentInfo = {
                    name: element.StudentName,
                    mobile: element.MobileNumber,
                    class: element.class,
                    FatherName: element.FatherName,
                    value: 0
                }
                studentInfoArray.push(studentInfo)
            });
            AutoFeeMonthwise.push({ month: month, studentInf: studentInfoArray })
        })

    }
    random_hex_color_code = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    };
     randomColor = () => {
        let hexCode = "#";
        for( let i=0; i<6; i++){
            hexCode += this.hexString[Math.floor(Math.random() * this.hexString.length)];
        }
        return hexCode;
    }
    
     generateGrad = () => {
        let colorOne = this.random_hex_color_code();
        let colorTwo = this.random_hex_color_code();
        let angle = Math.floor(Math.random() * 360);
       // this.cdr.detectChanges();
        return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
    }

}
