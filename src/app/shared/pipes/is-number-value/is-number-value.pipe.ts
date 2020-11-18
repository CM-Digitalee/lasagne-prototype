import { Pipe, PipeTransform } from '@angular/core';
import { _isNumberValue } from '@angular/cdk/coercion';

@Pipe({
  name: 'isNumberValue'
})
export class IsNumberValuePipe implements PipeTransform {
  transform(value: any): boolean {
    return _isNumberValue(value);
  }
}
