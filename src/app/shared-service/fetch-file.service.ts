import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FetchFileService {
  private url = "https://firebasestorage.googleapis.com/v0/b/saiecmatrutritha.appspot.com/o/uploads%2F2022-23studentinfo.xlsx?alt=media&token=e1c83715-4ce7-4a27-a5cd-95715441c7f0?fields=cors";
   
  constructor(private httpClient: HttpClient) { }
  getFileContent():Observable<any>{
    return this.httpClient.get(this.url);
  }
  
}
