import { Directive, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Distribution } from 'src/app/shared';

@Directive({
  selector: '[distributionForm]',
  exportAs: 'distributionForm',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DistributionFormDirective), multi: true }]
})
export class DistributionFormDirective implements ControlValueAccessor {
  @Input() validatedMonth = 0;
  @Input() post;

  private _value: Distribution;
  set value(value: Distribution) {
    this._value = value;
    this.onChange(this._value);
  }
  get value() { return this._value; }

  private defaultDistribution = () => {
    const latestBudget = this.post.oldBudgets?.sort((a, b) => b.date - a.date)[0].amount;
    const latestDistribution = this.post.oldDistributions?.sort((a, b) => b.date - a.date)[0].distribution;

    if (latestBudget && latestDistribution) {
      const validatedDistribution = Array(this.validatedMonth).fill(null).map((_, i) => ({
        month: i + 1,
        value: latestDistribution.find(({ month }) => month === i + 1).value * latestBudget / this.post.budget
      }));

      const realisedPercent = this.post.realised
        ?.map(item => ({ ...item, value: item.value * 100 / this.post.budget }))
        .reduce((total, { value }) => total + value, 0);

      const remainingDistribution = Array(12 - this.validatedMonth).fill(null).map((_, i) => ({
        month: i + 1 + this.validatedMonth,
        value: (100 - realisedPercent) / (12 - this.validatedMonth)
      }));

      return [...validatedDistribution, ...remainingDistribution];

    } else {
      return Array(12).fill(null).map((_, i) => ({
        month: i + 1,
        value: i + 1 <= this.validatedMonth ? 0 : 100 / (12 - this.validatedMonth)
      }));
    }
  }

  private onChange = (value: Distribution) => { };

  registerOnChange(fn: (value: Distribution) => {}) { this.onChange = fn; }

  writeValue(value: Distribution): void {
    this.value = (value || this.defaultDistribution()).map(item => ({ ...item }));
  }

  registerOnTouched() { }
}
