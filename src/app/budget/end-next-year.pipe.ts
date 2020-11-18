import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endNextYear'
})
export class EndNextYearPipe implements PipeTransform {
  transform(date: number): number {
    const dateFormat = new Date(date);
    dateFormat.setFullYear(dateFormat.getFullYear() + 1);
    return dateFormat.setMonth(dateFormat.getMonth() - 1);
  }
}
