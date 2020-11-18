import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oldDistributionQuarters'
})
export class OldDistributionQuartersPipe implements PipeTransform {
  transform(distribution: number[]): number[] {
    return [
      distribution.slice(0, 3),
      distribution.slice(3, 6),
      distribution.slice(6, 9),
      distribution.slice(9, 12)
    ].map(quarter => quarter.reduce((total, amount) => total + amount, 0));
  }
}
