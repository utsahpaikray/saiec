import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AngularFireStorage } from '@angular/fire/compat/storage'
@Injectable({
  providedIn: 'root'
})
export class DownloadUrlService {

  constructor(private storage: AngularFireStorage) { }
  getFbStorageURl(name: string):Observable<any>{
    return this.storage.ref(`/${name}`).getDownloadURL()
   
  }
}
