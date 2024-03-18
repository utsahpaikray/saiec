import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  galleryForm!:FormGroup
  param: any;
  edit: boolean = false;
  constructor(private fb:FormBuilder,public firebaseService:FirebaseService,private route : ActivatedRoute) { }

  ngOnInit() {
    this.param = this.route.snapshot.params['id'];
    this.edit=this.param?true:false
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
  get t() { return this.f['imageCollection'] as FormArray }
  addImage() {
    this.t.push(this.createImage());
  }
  getSpecificGallaeryImages(id: string | undefined){
    this.firebaseService.getGallery(id).subscribe((events: any)=>{
      events['imageCollection'].map((item: any,index: number)=>{
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
    delete(index: number){
      this.t.removeAt(index)
    }
}
