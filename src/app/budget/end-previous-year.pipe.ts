import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endPreviousYear'
})
export class EndPreviousYearPipe implements PipeTransform {
  transform(date: number): number {
    const dateFormat = new Date(date);
    return dateFormat.setMonth(dateFormat.getMonth() - 1);
  }
}
