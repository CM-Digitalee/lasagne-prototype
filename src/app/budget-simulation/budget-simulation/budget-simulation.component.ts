import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { asyncScheduler, combineLatest } from 'rxjs';
import { filter, map, pluck, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { Data } from 'c3';

import { nodeToggle, SimulationConfiguration } from '../../shared';
import { BudgetService } from '../../core';
import { BudgetSimulationLayoutComponent } from '../budget-simulation-layout/budget-simulation-layout.component';
import { DistributionComponent } from './distribution/distribution.component';
import { ToleranceComponent } from './tolerance/tolerance.component';
import { DistributionFormDirective } from './directives/distribution-form.directive';
import { ToleranceFormDirective } from './directives/tolerance-form.directive';
import { SimulationDirective } from './directives/simulation.directive';
import {TranslationService} from '../../service/translation.service';

@Component({
  selector: 'app-budget-simulation',
  templateUrl: './budget-simulation.component.html',
  styleUrls: ['./budget-simulation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [nodeToggle]
})
export class BudgetSimulationComponent {
  @ViewChild('simulationNameTmpl') simulationNameTmpl: TemplateRef<any>;

  budget$ = this.fakeDataService.budget$.pipe(
    tap(() => asyncScheduler.schedule(() => this.cdr.detectChanges()))
  );

  simulations$ = this.fakeDataService.simulations$;

  currentSimulation$ = this.route.queryParams.pipe(
    pluck('simulation'),
    switchMap(currentId => this.simulations$.pipe(
      map(simulations => simulations.find(({ id }) => id === +currentId))
    )),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(
    public budgetService: BudgetService,
    public dialog: MatDialog,
    public router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private fakeDataService: BudgetSimulationLayoutComponent,
    public tl: TranslationService
  ) { }

  openDistributionDialog(post, validatedMonth: number, distributionForm: DistributionFormDirective) {
    this.dialog.open(DistributionComponent, { width: '1300px', data: { post, validatedMonth, distributionForm } });
  }

  openToleranceDialog(post, toleranceForm: ToleranceFormDirective) {
    this.dialog.open(ToleranceComponent, { data: { post, toleranceForm } });
  }

  trackByFn(index: number) { return index; }

  saveSimulation(budgetId: number, configuration: SimulationConfiguration) {
    this.currentSimulation$.pipe(
      take(1),
      switchMap(simulation => !!simulation
        ? this.fakeDataService.updateSimulation({ ...simulation, configuration })
        : this.dialog.open(this.simulationNameTmpl).afterClosed().pipe(
          filter(name => !!name),
          switchMap(name => this.fakeDataService.createSimulation({ name, budgetId, configuration })),
          tap(simulation => this.goToSimulation(simulation.id))
        )
      )
    ).subscribe();
  }

  goToSimulation(id: number) {
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: { simulation: id } });
  }

  chartData(simulation: SimulationDirective, budget: any) {
    const conf = new Map([
      ['projectionRevenue', { name: 'Projeté année n sur base YTD (revenus)', color: '#5142da', style: 'dashed' }],
      ['projectionCharge', { name: 'Projeté année n sur base YTD (charges)', color: '#1767df', style: 'dashed' }],
      ['budgetRevenue', { name: 'Budget année n YTD (revenus)', color: '#9fa73a' }],
      ['budgetCharge', { name: 'Budget année n YTD (charges)', color: '#c8df01' }]
    ]);

    const accumulate = (acc, { amount }, i) => [...acc, amount + (acc[i - 1] || 0)];

    return combineLatest([
      simulation.projectionRevenueByMonth$,
      simulation.projectionChargeByMonth$,
      simulation.budgetRevenueByMonth$,
      simulation.budgetChargeByMonth$
    ]).pipe(
      map(([projectionRevenue, projectionCharge, budgetRevenue, budgetCharge]) => Object.entries({
        projectionRevenue, projectionCharge, budgetRevenue, budgetCharge
      })),
      map(entries => ({
        x: 'x',
        columns: [
          ...entries.map(([key, byMonth]) => [conf.get(key).name, ...byMonth.reduce(accumulate, [])]),
          ['x', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        ],
        regions: Object.assign({}, ...entries.map(([key]) => ({
          ...(conf.get(key).style && { [conf.get(key).name]: [{ start: budget.validatedMonth, style: conf.get(key).style }] })
        }))),
        colors: Object.assign({}, ...entries.map(([key]) => (
          { [conf.get(key).name]: conf.get(key).color }
        )))
      } as Pick<Data, 'columns' | 'regions' | 'colors' | 'x'>)
      )
    );
  }
}
