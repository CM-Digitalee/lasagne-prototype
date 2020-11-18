import { Directive, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SimulationTolerance } from 'src/app/shared';

@Directive({
  selector: '[toleranceForm]',
  exportAs: 'toleranceForm',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ToleranceFormDirective), multi: true }]
})
export class ToleranceFormDirective implements ControlValueAccessor {
  private defaultTolerance: SimulationTolerance = { min: -10, max: 10 };

  private _value: SimulationTolerance;
  set value(value: SimulationTolerance) {
    this._value = value;
    this.onChange(this._value);
  }
  get value() { return this._value; }

  private onChange = (value: SimulationTolerance) => { };

  registerOnChange(fn: (value: SimulationTolerance) => {}) { this.onChange = fn; }

  writeValue(value: SimulationTolerance): void {
    this.value = { ...(value || this.defaultTolerance) };
  }

  registerOnTouched() { }
}
