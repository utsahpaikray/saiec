import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take, takeUntil } from 'rxjs';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit,OnDestroy {
  galleryForm!:FormGroup
  param: any;
  edit: boolean = false;
  constructor(private fb:FormBuilder,public firebaseService:FirebaseService,private route : ActivatedRoute) { }
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.param = this.route.snapshot.params['id'];
    this.edit=this.param?true:false
    this.createGalleryForm();
    if(this.edit){
      this.getSpecificGalleryImages(this.param)
    }
  }
  createGalleryForm() {
    this.galleryForm = this.fb.group({
      title: ['', Validators.required],
      source: [''],
      description: [''],
      imageCollection: this.fb.array([this.createImage()])
    });
    console.log(this.galleryForm);
  }

  createImage(): FormGroup {
    return this.fb.group({
      image: [null, Validators.required]
    });
  }
  get f() {
    return this.galleryForm.controls;
  }

  get t() {
    return this.f['imageCollection'] as FormArray;
  }
  addImage() {
    this.t.push(this.createImage());
  }
  getSpecificGalleryImages(id: string | undefined){
    this.firebaseService.getGallery(id).pipe(takeUntilDestroyed(this.destroyRef),take(1)).
    subscribe((events: any)=>{      
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
  createGallery(data:any) {
    console.log(this.edit)
    if(this.edit){
      this.firebaseService.saveGallery({id:this.param,record:data})
    }else{
      this.firebaseService.pushItems('gallery',data)
      
    }
    }
    deleteImage(index: number){
      this.t.removeAt(index)
    }
    ngOnDestroy(): void {
      this.galleryForm.reset()
    }
}
