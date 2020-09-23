import { Component, ChangeDetectionStrategy, forwardRef, Input, HostListener, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { asyncScheduler } from 'rxjs';

@Component({
  selector: 'app-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputAmountComponent), multi: true }],
})
export class InputAmountComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @HostBinding('style.cursor') cursor = !this.disabled ? 'text' : 'default';

  focus = false;

  private _value: string;
  set value(value: string) {
    this._value = value;
    this.onChange(+this._value);
  }
  get value() { return this._value; }

  private onChange = (value: number) => { };

  registerOnChange(fn: (value: number) => {}) { this.onChange = fn; }
  writeValue(value: number) { this.value = value?.toString(); }
  registerOnTouched() { }

  @HostListener('click') onClick() {
    if (!this.disabled) {
      this.focus = true;
      asyncScheduler.schedule(() => this.input.nativeElement.focus());
    }
  }

  onInput(value: string) {
    if (!value || value === '-') {
      return;
    }
    else if (/^-\D+/.test(value)) {
      if (this.input) { this.input.nativeElement.value = '-'; }
    }
    else if (/^-?\d+\.?\d{0,2}$/.test(value)) {
      this.value = value;
    }
    else {
      this.input.nativeElement.value = this.value.toString();
    }
  }
}
