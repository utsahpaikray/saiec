import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared-service/dashboard.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  providers: [DashboardService]
})
export class NewsPage implements OnInit {
  NewsEverything: any;
  searchQuery = '';
  noArticle: boolean = false;
 
  constructor(private newsService: DashboardService, private refs: ChangeDetectorRef) { }

  ngOnInit() {
    this.refs.markForCheck();
    this.newsService.getEverythingNews('india').subscribe((res: any) => {
      this.NewsEverything = res.articles;
    });
  }
public onInput(){
  this.newsService.getEverythingNews(this.searchQuery).subscribe((res:any) => {
    this.NewsEverything = res.articles;
    this.noArticle = res.articles.length==0
  });
  console.log(this.searchQuery);

}
}
