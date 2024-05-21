import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared-service/auth-service.service';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { EventsService } from './services/events.service';
import { Observable, map } from 'rxjs';
import { filter } from 'lodash';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  public events: any = [];
  public isAuthorized: boolean = false;
  public title = 'Event Gallery';
  public editLabel = 'Edit';

  public eventsService = inject(EventsService);
  public firebaseService = inject(FirebaseService);
  private router = inject(Router);
  private authService = inject(AuthService);
  public galleryList!: string[];

  public gallerList$ = this.firebaseService
    .getFileListup('school')
    .pipe(map((fileList) => fileList.filter((item) => !/\.mp4/.test(item))));
  public eventList$: Observable<any> = this.firebaseService.getAll('gallery');

  ngOnInit() {
    this.isAuthorized = this.authService.isAuthorizedUser;
  }
  edit(id: any) {
    this.router.navigate([`/gallery/${id}`]);
  }
}
