import { ChangeDetectorRef, Directive, HostBinding, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { asyncScheduler, combineLatest, noop, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, observeOn, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

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
export class WarningDirective implements OnDestroy {
  @HostBinding('class') warningclass: string;

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
        value < (1 + tolerance.min) * comparison
          ? (this.config.isRevenue ? SimulationState.Danger : SimulationState.Success)
          : value > (1 + tolerance.max) * comparison
            ? (this.config.isRevenue ? SimulationState.Success : SimulationState.Danger)
            : SimulationState.Warning
      ),
      shareReplay({ refCount: true, bufferSize: 1 })
    ))
  );

  subscription = this.state$.subscribe(state => {
    this.warningclass = classes.get(state);
    this.cdr.detectChanges();
  });

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
