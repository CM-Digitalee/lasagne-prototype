import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startNextYear'
})
export class StartNextYearPipe implements PipeTransform {
  transform(date: number): number {
    const dateFormat = new Date(date);
    return dateFormat.setFullYear(dateFormat.getFullYear() + 1);
  }
}
