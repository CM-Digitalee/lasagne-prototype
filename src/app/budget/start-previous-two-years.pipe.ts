import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startPreviousTwoYears'
})
export class StartPreviousTwoYearsPipe implements PipeTransform {
  transform(date: number): number {
    const dateFormat = new Date(date);
    return dateFormat.setFullYear(dateFormat.getFullYear() - 2);
  }
}
