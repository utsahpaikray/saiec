import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private apikey = '&apikey=41ca68ff32a6e183cb95b21f3fbdf2b6';
  private _controller = 'https://newsapi.org/v2/top-headlines?';
  private _Everythingcontroller = 'https://gnews.io/api/v4/search?q=';
 // https://gnews.io/api/v4/search?q=example&apikey=41ca68ff32a6e183cb95b21f3fbdf2b6
 // https://gnews.io/api/v4/search?q=india&apiKey=41ca68ff32a6e183cb95b21f3fbdf2b6
 // url = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=' + apikey;

  constructor(private _http: HttpClient) { }
  public getNews(query?:string, pageSize:number=10, page:number=1): Observable<any> {
    return this._http.get<any>(this._controller+'country=us'+this.apikey+'&pageSize='+pageSize+'&page='+page);
  }
  public getEverythingNews(query='example', pageSize:number=100, page:number=3): Observable<any> {
    return  this._http.get<any>(`${this._Everythingcontroller}${query}${this.apikey}&max=${pageSize}&page=${page}&lang=en`);
  }
}