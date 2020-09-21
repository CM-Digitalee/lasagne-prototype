import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(data: any[], key: string): any[] {
    return data.sort((a, b) => a[key] - b[key]);
  }
}
