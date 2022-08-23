import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  galleryForm:FormGroup
  constructor(private fb:FormBuilder,private http: HttpClient, private firestore: AngularFirestore,public firebaseService:FirebaseService) { }

  ngOnInit() {
    this.createGalleryForm();
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
  // get galleryFormControl():FormArray{
  //   return <FormArray> this.galleryForm.get('imageCollection');
  // }
  addImage() {
    this.t.push(this.createImage());
  }
  save(){
    console.log(this.galleryForm.value)
      this.createGallery(this.galleryForm.value)
  }
  createGallery(data) {
    this.firebaseService.pushItems('gallery',data)
    }
}
