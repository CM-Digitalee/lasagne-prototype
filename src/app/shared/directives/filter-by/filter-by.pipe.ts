import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  transform(data: any[], key: string, value: any): any[] {
    return data.filter(item => item[key] === value);
  }
}
