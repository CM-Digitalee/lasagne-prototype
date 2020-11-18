import { Component, ChangeDetectionStrategy, Inject, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlider } from '@angular/material/slider';
import { animationFrameScheduler, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Distribution, IsNumberValuePipe, MonthDistributionItem, Periodicity } from 'src/app/shared';
import { PercentConverter, ValueType } from './percent-converter';
import {TranslationService} from '../../../service/translation.service';

type Quarter = MonthDistributionItem[];

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: PercentConverter, useExisting: forwardRef(() => DistributionComponent) }]
})
export class DistributionComponent implements PercentConverter {
  distribution$ = new BehaviorSubject<Distribution>(
    this.data.distributionForm.value.map(item => ({ ...item }))
  );

  quarters$ = this.distribution$.pipe(
    map(distribution => [
      distribution.slice(0, 3),
      distribution.slice(3, 6),
      distribution.slice(6, 9),
      distribution.slice(9, 12)
    ]),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  Periodicity = Periodicity;
  periodicity = Periodicity.Month;

  ValueType = ValueType;
  valueType = ValueType.Percent;

  valueRef = this.data.post.budget;

  realised = this.data.post.realised || [];
  realisedPercent = this.realised?.map(item => ({ ...item, value: item.value * 100 / this.valueRef }));

  quartersRealised = [
    this.realised.slice(0, 3),
    this.realised.slice(3, 6),
    this.realised.slice(6, 9),
    this.realised.slice(9, 12)
  ].filter(quarter => quarter.length === 3)
    .map(quarter => quarter.reduce((total, { value }) => total + value, 0));

  quartersRealisedPercent = this.quartersRealised.map(amount => amount * 100 / this.valueRef);

  constructor(
    public dialogRef: MatDialogRef<DistributionComponent>,
    public tl: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: {
      post: { description: string, budget: number, realised: MonthDistributionItem[], oldBudgets: { amount: number, date: number }[], oldDistributions },
      validatedMonth: number,
      distributionForm: FormControl
    }
  ) { }

  get total() {
    return [
      ...this.realisedPercent,
      ...this.distribution$.value.filter(item => item.month > this.data.validatedMonth)
    ].map(({ value }) => value).reduce((a, b) => a + b, 0);
  }

  validate() {
    this.data.distributionForm.setValue(this.distribution$.value);
    this.dialogRef.close();
  }

  adjust(currentItem: MonthDistributionItem, value: number) {
    const before = this.distribution$.value.filter(item => item.month < currentItem.month);
    const after = this.distribution$.value.filter(item => item.month > currentItem.month);
    const proportionBefore = [
      ...this.realisedPercent,
      ...this.distribution$.value.filter(item => item.month > this.data.validatedMonth && item.month < currentItem.month)
    ].map(({ value }) => value).reduce((a, b) => a + b, 0);

    const afterNonNull = after.filter(item => item.value > 0);

    const total = () => [
      ...this.realisedPercent,
      ...this.distribution$.value.filter(item => item.month > this.data.validatedMonth)
    ].map(({ value }) => value).reduce((a, b) => a + b, 0);

    switch (this.valueType) {
      case ValueType.Currency:
        currentItem.value = value / this.valueRef * 100;
        break;
      case ValueType.Percent:
      default:
        currentItem.value = value;
        break;
    }

    animationFrameScheduler.schedule(() => {
      this.distribution$.next([
        ...before,
        proportionBefore + currentItem.value > 100
          ? { ...currentItem, value: 100 - (proportionBefore) }
          : { ...currentItem }
        ,
        ...after.map(item => ({
          ...item,
          value: total() > 100
            ? Math.max(item.value + (100 - total()) / afterNonNull.length, 0)
            : item.value + (100 - total()) / after.length
        }))
      ]);
    });
  }

  adjustQuarter(quarters: Quarter[], currentQuarter: Quarter, inputValue: number, slider: MatSlider) {
    const currentQuarterIndex = quarters.indexOf(currentQuarter);
    const before = quarters.slice(0, currentQuarterIndex).reduce((acc, val) => [...acc, ...val], []);
    const after = quarters.slice(currentQuarterIndex + 1).reduce((acc, val) => [...acc, ...val], []);
    const afterNonNull = after.filter(item => item.value > 0);

    const beforeWithRealised = Array(currentQuarterIndex).fill(null)
      .map((_, i) => this.quartersRealisedPercent[i] || quarters[i].reduce((acc, { value }) => acc + value, 0));

    const proportionBefore = beforeWithRealised.reduce((acc, quarter) => acc + quarter, 0);
    const total = () => proportionBefore + after.reduce((acc, { value }) => acc + value, 0) + inputValue;

    const currentQuarterWithValidated = currentQuarter
      .map(item => this.realisedPercent.find(realised => realised.month === item.month) || item);

    switch (this.valueType) {
      case ValueType.Currency:
        inputValue = inputValue / this.valueRef * 100;
        break;
      case ValueType.Percent:
      default:
        inputValue = inputValue;
        break;
    }

    const minValue = currentQuarter
      .filter(({ month }) => month <= this.data.validatedMonth)
      .map(({ month }) => this.realisedPercent.find(item => item.month === month))
      .reduce((total, { value }) => total + value, 0);

    if (proportionBefore + inputValue > 100) { inputValue = 100 - proportionBefore; }

    if (inputValue < minValue) { inputValue = minValue; }

    const sortedNotValidated = [...currentQuarter]
      .sort((a, b) => a.value - b.value)
      .filter(({ month }) => month > this.data.validatedMonth);

    let rest = inputValue - currentQuarterWithValidated.reduce((tot, { value }) => tot + value, 0);

    for (let i = 0; i < sortedNotValidated.length; i++) {
      if (sortedNotValidated[i].month > this.data.validatedMonth) {
        const currentValue = sortedNotValidated[i].value;
        sortedNotValidated[i].value = Math.max(currentValue + rest / (sortedNotValidated.length - i), 0);
        rest -= sortedNotValidated[i].value - currentValue;
      }
    }

    animationFrameScheduler.schedule(() => {
      this.distribution$.next([
        ...before,
        ...currentQuarter,
        ...after.map(item => ({
          ...item,
          value: total() > 100
            ? Math.max(item.value + (100 - total()) / afterNonNull.length, 0)
            : item.value + (100 - total()) / after.length
        }))
      ]);

      const currentQuarterPercent = currentQuarterWithValidated.reduce((tot, { value }) => tot + value, 0);

      switch (this.valueType) {
        case ValueType.Currency:
          slider.value = this.valueRef * currentQuarterPercent / 100;
          break;
        case ValueType.Percent:
        default:
          slider.value = currentQuarterPercent;
          break;
      }
    });
  }

  trackByFn(index: number) { return index; }

  isNumberValue(value: any) {
    return (new IsNumberValuePipe()).transform(value);
  }
}
