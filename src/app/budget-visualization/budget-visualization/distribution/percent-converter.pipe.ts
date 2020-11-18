import { Pipe, PipeTransform } from '@angular/core';

import { PercentConverter, ValueType } from './percent-converter';

@Pipe({
  name: 'percentConverter',
  pure: false
})
export class PercentConverterPipe implements PipeTransform {
  constructor(private config: PercentConverter) { }

  transform(percent: number): number {
    switch (this.config.valueType) {
      case ValueType.Currency:
        return this.config.valueRef * percent / 100;
      case ValueType.Percent:
      default:
        return percent;
    }
  }
}
