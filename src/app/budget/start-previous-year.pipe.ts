import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startPreviousYear'
})
export class StartPreviousYearPipe implements PipeTransform {
  transform(date: number): number {
    const dateFormat = new Date(date);
    return dateFormat.setFullYear(dateFormat.getFullYear() - 1);
  }
}
