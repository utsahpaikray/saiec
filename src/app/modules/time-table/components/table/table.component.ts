import { Component, OnInit } from '@angular/core';
import {timetablesch} from './time-table'
export interface Period {
  time: string;
  classes: {
    [className: string]: {
      subject: string;
      teacher: string;
      hasDuplicateTeachers?: boolean;
    };
  };
}

export interface Timetable {
  [day: string]: Period[];
}
interface ClassInfo {
  subject: string;
  teacher: string;
  hasDuplicateTeachers?: boolean;
}

interface TimeSlot {
  time: string;
  classes: {
    [className: string]: ClassInfo;
  };
}

interface WeekSchedule {
  [day: string]: TimeSlot[];
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent  implements OnInit {
  // timetable = [
  //   {
  //     period: '1',
  //     time: '9:30-10:15',
  //     classes: {
  //       class2: 'Math: Rita',
  //       class3: 'Odia: Tiki',
  //       class4: 'Eng: Niru',
  //       class5: 'Odia: Arati',
  //       class6: 'Eng: Gita',
  //       class7: 'Odia: Sanu',
  //       class8: 'Eng: Rachana',
  //       class9: 'Math: Priya'
  //     }
  //   },
  //   {
  //     period: '2',
  //     time: '10:15-10:55',
  //     classes: {
  //       class2: 'Eng: Lima',
  //       class3: 'Eng: Arati',
  //       class4: 'Math: Sanu',
  //       class5: 'Math: Gita',
  //       class6: 'Math: Priya',
  //       class7: 'Eng: Rachana',
  //       class8: 'Odia: Tiki',
  //       class9: 'SC: Gita'
  //     }
  //   },
  //   {
  //     period: '3',
  //     time: '10:55-11:35',
  //     classes: {
  //       class2: 'Odia: Rita',
  //       class3: 'Math: Tiki',
  //       class4: 'Odia: Niru',
  //       class5: 'Eng: Rachana',
  //       class6: 'Odia: Arati',
  //       class7: 'Math: Priya',
  //       class8: 'SC: Gita',
  //       class9: 'Geo: Sanu'
  //     }
  //   },
  //   {
  //     period: '4',
  //     time: '11:35-12:15',
  //     classes: {
  //       class2: 'SSC: Rachana',
  //       class3: 'SSC: Rita',
  //       class4: 'SC: Sanu',
  //       class5: 'SSC: Niru',
  //       class6: 'San: Tiki',
  //       class7: 'SC: Gita',
  //       class8: 'Math: Priya',
  //       class9: 'Hist: Niru'
  //     }
  //   },
  //   {
  //     period: 'Recess',
  //     time: '12:15-12:45',
  //     classes: {}
  //   },
  //   {
  //     period: '5',
  //     time: '12:45-1:15',
  //     classes: {
  //       class2: 'Drawing: Rachana',
  //       class3: 'GK: Arati',
  //       class4: 'San: Tiki',
  //       class5: 'GK: Gita',
  //       class6: 'SC: Priya',
  //       class7: 'Hist: Niru',
  //       class8: 'IT: Utsah',
  //       class9: 'Odia: Tiki'
  //     }
  //   },
  //   {
  //     period: '6',
  //     time: '1:15-1:45',
  //     classes: {
  //       class2: 'GK: Arati',
  //       class3: 'Drawing: Sanu',
  //       class4: 'Drawing: Sanu',
  //       class5: 'SC: Gita',
  //       class6: 'GK: Gita',
  //       class7: 'Hist: Rachana',
  //       class8: 'Geo: Sanu',
  //       class9: 'Eng: Gita'
  //     }
  //   },
  //   {
  //     period: '7',
  //     time: '1:45-2:15',
  //     classes: {
  //       class2: 'Gardening: Sanu & Priya',
  //       class3: 'Sports',
  //       class4: 'Sports',
  //       class5: 'Creativity: Gita',
  //       class6: 'Sports',
  //       class7: 'Creativity: Priya',
  //       class8: 'Gardening: Sanu',
  //       class9: 'IT: Utsah'
  //     }
  //   }
  // ];
  timetable: Timetable = {};
  days: string[] = [];
  classes: string[] = [];
  processedTimetable: WeekSchedule = {};

  constructor() { }

  ngOnInit() {
    this.timetable = timetablesch;
    this.days = Object.keys(this.timetable);
    if (this.days.length > 0 && this.timetable[this.days[0]].length > 0) {
      this.classes = Object.keys(this.timetable[this.days[0]][0].classes);
    }
    this.processedTimetable = this.processWeek(timetablesch);

  }


public  processTimeSlot(timeSlot: TimeSlot): TimeSlot {
  const teacherCounts: { [teacher: string]: number } = {};

  // Count occurrences of each teacher
  for (const classInfo of Object.values(timeSlot.classes)) {
    if (classInfo.teacher!==''){
      teacherCounts[classInfo.teacher] = (teacherCounts[classInfo.teacher] || 0) + 1;
    }
    
  }

  // Mark classes with duplicate teachers
  for (const [className, classInfo] of Object.entries(timeSlot.classes)) {
    if (teacherCounts[classInfo.teacher] > 1) {
      timeSlot.classes[className].hasDuplicateTeachers = true;
    }
  }

  return timeSlot;
}

public processDay(daySchedule: TimeSlot[]): TimeSlot[] {
  return daySchedule.map(this.processTimeSlot);
}

public processWeek(weekSchedule: WeekSchedule): WeekSchedule {
  const processedWeek: WeekSchedule = {};

  for (const [day, schedule] of Object.entries(weekSchedule)) {
    processedWeek[day] = this.processDay(schedule);
  }

  return processedWeek;
}



}
