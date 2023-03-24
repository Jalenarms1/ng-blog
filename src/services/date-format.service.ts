import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {
  datePipe = new DatePipe('en-US');

  constructor() { }

  dateAndTime(date: string) {
    const formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy \'at\' hh:mm a');
    return formattedDate
  }
}
