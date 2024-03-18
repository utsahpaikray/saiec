
  //http://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=340d81b2d9d34050b98922c205222c29
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private apikey = '&apiKey=340d81b2d9d34050b98922c205222c29';
  private _controller = 'https://newsapi.org/v2/top-headlines?';
  private _Everythingcontroller = 'https://newsapi.org/v2/everything?q=';
  constructor(private _http: HttpClient) { }
  public getEvents(query?:string, pageSize:number=100, page:number=1): Observable<any> {
    return this._http.get<any>(this._controller+'country=in'+this.apikey+'&category=sports&pageSize='+pageSize+'&page='+page);
  }
  public getEverythingNews(query?:any): Observable<any> {
    return this._http.get<any>(this._Everythingcontroller + query+this.apikey);
  }

}