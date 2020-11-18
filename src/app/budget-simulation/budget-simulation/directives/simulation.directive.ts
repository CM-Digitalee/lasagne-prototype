import { AfterViewInit, Directive, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { asyncScheduler, BehaviorSubject, combineLatest, iif, noop, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, observeOn, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { Distribution } from 'src/app/shared';

@Directive({
  selector: '[simulation]',
  exportAs: 'simulation'
})
export class SimulationDirective implements AfterViewInit, OnDestroy {
  @Input('simulation') config?: { budget, post, distribution: FormControl };
  @Input() isRevenue?: boolean;
  @Input() simulationParent?: SimulationDirective;

  private children$ = new BehaviorSubject<SimulationDirective[]>([]);

  private distributionChange$: Observable<Distribution> = of(noop).pipe(
    observeOn(asyncScheduler),
    switchMap(() => this.config.distribution?.valueChanges.pipe(
      startWith(this.config.distribution.value),
      distinctUntilChanged()
    ) || of(noop)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  projectionRevenueByMonth$ = this.byMonth('projectionRevenueByMonth$', post => post.accountIsRevenue, post => post.ytd, true);
  projectionChargeByMonth$ = this.byMonth('projectionChargeByMonth$', post => !post.accountIsRevenue, post => post.ytd, true);

  budgetRevenueByMonth$ = this.byMonth('budgetRevenueByMonth$', post => post.accountIsRevenue, post => post.budget, false);
  budgetChargeByMonth$ = this.byMonth('budgetChargeByMonth$', post => !post.accountIsRevenue, post => post.budget, false);

  projection$ = this.projectionCalculation('projection$');
  projectionCharge$ = this.projectionCalculation('projectionCharge$', false);
  projectionRevenue$ = this.projectionCalculation('projectionRevenue$', true);

  restTendance$ = this.restTendanceCalculation('restTendance$');
  restTendanceCharge$ = this.restTendanceCalculation('restTendanceCharge$', false);
  restTendanceRevenue$ = this.restTendanceCalculation('restTendanceRevenue$', true);

  restBudget$ = this.restBudgetCalculation('restBudget$');
  restBudgetCharge$ = this.restBudgetCalculation('restBudgetCharge$', false);
  restBudgetRevenue$ = this.restBudgetCalculation('restBudgetRevenue$', true);

  ngAfterViewInit() {
    if (this.simulationParent) { this.simulationParent.register(this); }
  }

  ngOnDestroy() {
    if (this.simulationParent) { this.simulationParent.unregister(this); }
  }

  private byMonth(
    key: string,
    predicate: (post: any) => boolean,
    postValue: (post: any) => number,
    considerConsummed: boolean
  ): Observable<{ month: number, amount: number }[]> {
    return this.children$.pipe(
      switchMap(children => iif(() => !!children.length,
        combineLatest(children.map(child => child[key])).pipe(
          map((projections: any) => projections.reduce(
            (acc, proj) => proj.map((item, i) => ({
              month: item.month,
              amount: item.amount + (acc[i]?.amount || 0)
            })), []
          ))
        ),
        this.distributionChange$.pipe(
          map(distribution => distribution.map(({ month, value }) => ({
            month, amount: predicate(this.config.post)
              ? postValue(this.config.post) * (value / 100) / (considerConsummed ? this.consumedProportion(distribution) : 1)
              : 0
          })))
        )
      )),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  private projectionCalculation(key: string, isRevenue?: boolean) {
    return this.calculation(
      key,
      (distribution: Distribution) =>
        this.config.budget?.validatedMonth
          ? this.config.post.ytd / this.consumedProportion(distribution)
          : 0,
      isRevenue
    );
  }

  private restTendanceCalculation(key: string, isRevenue?: boolean) {
    return this.calculation(
      key,
      () => this.config.post?.budget - this.config.post?.ytd,
      isRevenue
    );
  }

  private restBudgetCalculation(key: string, isRevenue?: boolean) {
    return this.calculation(
      key,
      (distribution: Distribution) => this.config.post.budget * (1 - this.consumedProportion(distribution)),
      isRevenue
    );
  }

  private calculation(key: string, fn: (distribution?: Distribution) => number, isRevenue?: boolean) {
    return this.children$.pipe(
      switchMap(children => iif(() => !!children.length,
        this.totalChildren(children, key),
        (isRevenue === undefined || !!this.config?.post?.accountIsRevenue === isRevenue)
          ? this.distributionChange$.pipe(map(fn))
          : of(0)
      )),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  private totalChildren(children: SimulationDirective[], key: string) {
    return combineLatest(children.map(child => child[key])).pipe(
      map((rests: number[]) => rests.reduce((total, rest) => total + rest, 0))
    );
  }

  private consumedProportion(distribution: Distribution) {
    return distribution
      .filter(({ month }) => month <= this.config.budget.validatedMonth)
      .reduce((total, b) => total + b.value, 0) / 100;
  }

  private register(simulation: SimulationDirective) {
    this.children$.next([...this.children$.value, simulation]);
  }

  private unregister(simulation: SimulationDirective) {
    this.children$.next(this.children$.value.filter(child => child !== simulation));
  }
}
