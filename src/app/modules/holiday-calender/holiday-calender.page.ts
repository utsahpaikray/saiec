import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  CalendarEvent, CalendarEventAction,
  CalendarEventTimesChangedEvent, CalendarMonthViewDay, CalendarView
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import moment from 'moment';
import { Subject } from 'rxjs';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-holiday-calender',
  templateUrl: './holiday-calender.page.html',
  styleUrls: ['./holiday-calender.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HolidayCalenderPage implements OnInit {
 
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    // {
    //   start: new Date(moment('12-08-2022','DD-MM-YYYY').format('MM-DD-YYYY')),
    //   title: 'Utsah Birthday',
    //   color: { ...colors.yellow },
    //   actions: this.actions,
    // },

    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: { ...colors.yellow },
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: { ...colors.blue },
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: { ...colors.yellow },
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];
 

  activeDayIsOpen: boolean = true;
  constructor(public firebaseService:FirebaseService) {
  }

  ngOnInit() {
   // this.createHolidayList();
    this.firebaseService.getAllstudent().subscribe(items=>{
        items.forEach((element:any) => {
          this.events.push({
            start: this.dateModification(element['DateofBirth']),
            title: `${element['StudentName'].toUpperCase()} Birthday` ,
            color: { ...colors['yellow'] },
            actions: this.actions,
          })
        });
        this.refreshView();
      });
      this.getHolidayList()
  }
  getHolidayList(){
    this.firebaseService.getAll('holidayList').subscribe(items=>{
      items.forEach((element:any) => {
        this.events.push({
          start: this.dateModification(element['start']),
          end: element['end']? this.dateModification(element['end']):undefined,
          title: element['title'] ,
          color: { ...colors['blue'] },
          actions: this.actions,
        })
      });
      this.refreshView();
    });
  }
  createHolidayList(){
    // this.holidayList.forEach(item=>{
    //   this.firebaseService.pushItems('holidayList',item)
    // })
    
  }
  public dateModification(date: string){
    let newdate= date.split('-');
    newdate[2]='2022';
    newdate.join('-');
    return new Date(moment(newdate,'DD-MM-YYYY').format('MM-DD-YYYY'))
  }
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {

  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  refreshView(): void {
    this.refresh.next();
  }
}
