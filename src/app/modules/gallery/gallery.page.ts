import { map } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  galleryForm:FormGroup
  param: any;
  edit: boolean;
  constructor(private fb:FormBuilder,private http: HttpClient, private firestore: AngularFirestore,public firebaseService:FirebaseService,private route : ActivatedRoute) { }

  ngOnInit() {
    this.param = this.route.snapshot.params.id;
    console.log(this.param)
    this.edit=this.param?true:false
    console.log(this.edit)
    this.createGalleryForm();
    if(this.edit){
      this.getSpecificGallaeryImages(this.param)
    }
  }
  createGalleryForm() {
    this.galleryForm = this.fb.group({
      title: '',
      source: '',
      description: '',
      imageCollection:this.fb.array([this.createImage()])
    });
    console.log(this.galleryForm)
  }
  createImage():FormGroup{
    return this.fb.group({
      image:[null,Validators.required]
    })
  }
  get f() { return this.galleryForm.controls; }
  get t() { return this.f.imageCollection as FormArray; }
  addImage() {
    this.t.push(this.createImage());
  }
  getSpecificGallaeryImages(id){
    this.firebaseService.getGallery(id).subscribe(events=>{
      events['imageCollection'].map((item,index)=>{
        if (index !== events['imageCollection'].length - 1){ 
          this.addImage();
        }
       
      })
      this.galleryForm.patchValue(events)
    })
  }
  save(){
      this.createGallery(this.galleryForm.value)
  }
  createGallery(data:any,id?:string,edit?:false) {
    if(edit){
      this.firebaseService.saveGallery(data,id)
    }else{
      this.firebaseService.pushItems('gallery',data)
      
    }
    }
    delete(index){
      this.t.removeAt(index)
    }
}
