import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {
  transform(value: number, maxDigits: number): number {
    return Math.round(value * 10 ** maxDigits) / 10 ** maxDigits;
  }
}
