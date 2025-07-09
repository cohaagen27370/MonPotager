import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extraMinute',
})
export class ExtraMinutePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    const nvalue = Number(Number(value.replace(',', '.')).toFixed(2));
    const intPart = Math.trunc(nvalue);
    const decPart = (nvalue - intPart).toFixed(2);

    let result = `${intPart}m${Number(decPart) * 100}`;

    if (nvalue > 0) {
      return '+' + result;
    }

    return result;
  }
}
