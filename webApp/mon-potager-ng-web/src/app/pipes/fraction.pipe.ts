import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fraction',
})
export class FractionPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0.25:
        return '1/4';
      case 0.5:
        return '1/2';
      case 0.75:
        return '3/4';
      case 1:
        return 'entier';
      default:
        return 'vide';
    }
  }
}
