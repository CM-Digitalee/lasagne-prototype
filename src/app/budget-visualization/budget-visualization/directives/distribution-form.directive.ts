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

  private _value: Distribution;
  set value(value: Distribution) {
    this._value = value;
    this.onChange(this._value);
  }
  get value() { return this._value; }

  private defaultDistribution = () => Array(12).fill(null).map((_, i) => ({
    month: i + 1,
    value: i + 1 <= this.validatedMonth ? 0 : 100 / (12 - this.validatedMonth)
  }))

  private onChange = (value: Distribution) => { };

  registerOnChange(fn: (value: Distribution) => {}) { this.onChange = fn; }

  writeValue(value: Distribution): void {
    this.value = (value || this.defaultDistribution()).map(item => ({ ...item }));
  }

  registerOnTouched() { }

  constructor() { console.log(this.validatedMonth) }
}
