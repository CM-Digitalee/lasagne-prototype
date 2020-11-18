import { Pipe, PipeTransform } from '@angular/core';

import { Distribution } from 'src/app/shared';

@Pipe({
  name: 'lastDistribution'
})
export class LastDistributionPipe implements PipeTransform {
  transform(oldDistributions: { distribution: Distribution, date: number }[], limitDate?: number): number[] {
    return oldDistributions
      .filter(({ date }) => !limitDate || date <= limitDate)
      .sort((a, b) => b.date - a.date)
    [0]?.distribution.map(({ value }) => value)
      || Array(12).fill(0);
  }
}
