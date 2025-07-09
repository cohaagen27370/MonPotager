import { inject, Pipe, PipeTransform } from '@angular/core';

import { DatePipe } from '@angular/common';
import { differenceInHours } from 'date-fns';

@Pipe({
  name: 'dateCustom',
})
export class DateCustomPipe implements PipeTransform {
  datePipe = inject(DatePipe);

  transform(
    value: string | Date | null | undefined,
    format: string,
  ): string | null {
    const date = this.datePipe.transform(value, format);

    const diff = differenceInHours(new Date(), value as Date);

    // today
    if (diff >= 0 && diff < 24) {
      return "Aujourd'hui";
    }
    // yesterday
    if (diff >= 24 && diff < 48) {
      return 'Hier';
    }
    // tomorrow
    if (diff <= -24 && diff > -48) {
      return 'Demain';
    }

    return date;
  }
}
