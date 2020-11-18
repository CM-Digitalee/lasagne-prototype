import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { asyncScheduler, combineLatest, noop, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, observeOn, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { SimulationState, SimulationTolerance } from 'src/app/shared';

const classes = new Map([
  [SimulationState.Success, 'success'],
  [SimulationState.Warning, 'warning'],
  [SimulationState.Danger, 'danger']
]);

@Directive({
  selector: '[warning]',
  exportAs: 'warning'
})
export class WarningDirective {

  @Input('warning') config: {
    value: Observable<number>,
    comparison: Observable<number>,
    tolerance: FormControl,
    isRevenue: boolean
  };

  state$ = of(noop).pipe(
    observeOn(asyncScheduler),
    switchMap(() => combineLatest([
      this.config.value,
      this.config.comparison,
      this.config.tolerance.valueChanges.pipe(
        startWith(this.config.tolerance.value),
        distinctUntilChanged()
      ) as Observable<SimulationTolerance>
    ]).pipe(
      map(([value, comparison, tolerance]) =>
        value < (1 + tolerance.min / 100) * comparison
          ? (this.config.isRevenue ? SimulationState.Danger : SimulationState.Success)
          : value > (1 + tolerance.max / 100) * comparison
            ? (this.config.isRevenue ? SimulationState.Success : SimulationState.Danger)
            : SimulationState.Warning
      ),
      map(state => classes.get(state)),
      shareReplay({ refCount: true, bufferSize: 1 })
    ))
  );
}
