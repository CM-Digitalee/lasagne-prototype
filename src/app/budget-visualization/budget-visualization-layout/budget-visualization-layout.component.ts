import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, iif, of } from 'rxjs';
import { filter, map, pluck, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

import { BudgetSimulation, BudgetVersionState } from '../../shared';
import { AssetService, PortfolioService } from '../../core';
import {TranslationService} from '../../service/translation.service';

@Component({
  selector: 'app-budget-visualization-layout',
  templateUrl: './budget-visualization-layout.component.html',
  styleUrls: ['./budget-visualization-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetVisualizationLayoutComponent {
  budgets$ = of([
    {
      portfolioId: 1, assetId: 5, name: 'Budget 1', id: 1,
      state: BudgetVersionState.Accepted,
      validatedMonth: 5,
      accountingPlan: [
        {
          label: 'Total Revenus',
          children: [
            {
              id: 1, description: 'Revenu 1', pastYear: 180000, budget: 100000, ytd: 50000, nextBudget: 200000, accountIsRevenue: true,
              oldBudgets: [150000, 200000],
              realised: [
                { month: 1, value: 5000 },
                { month: 2, value: 15000 },
                { month: 3, value: 8000 },
                { month: 4, value: 7000 },
                { month: 5, value: 11000 }
              ],
            },
            { id: 2, description: 'Revenu 2', pastYear: 20000, budget: 30000, ytd: 40000, nextBudget: 30000, accountIsRevenue: true }
          ]
        },
        {
          label: 'Total Charges',
          children: [
            { id: 3, description: 'Charge 1', pastYear: 30000, budget: 25000, ytd: 10000, nextBudget: 20000 },
            { id: 4, description: 'Charge 2', pastYear: 10000, budget: 15000, ytd: 20000, nextBudget: 15000 }
          ]
        }
      ]
    },
    {
      portfolioId: 1, assetId: 5, name: 'Budget 2', id: 2,
      state: BudgetVersionState.Submitted,
      validatedMonth: 5,
      accountingPlan: [
        {
          label: 'Total Revenus',
          children: [
            { id: 1, description: 'Revenu 1', pastYear: 180000, budget: 190000, ytd: 220000, nextBudget: 200000, accountIsRevenue: true },
            { id: 2, description: 'Revenu 2', pastYear: 20000, budget: 30000, ytd: 40000, nextBudget: 30000, accountIsRevenue: true }
          ]
        },
        {
          label: 'Total Charges',
          children: [
            { id: 3, description: 'Charge 1', pastYear: 30000, budget: 25000, ytd: 10000, nextBudget: 20000 },
            { id: 4, description: 'Charge 2', pastYear: 10000, budget: 15000, ytd: 20000, nextBudget: 15000 }
          ]
        }
      ]
    }
  ]);

  private emptyBudget = {} as { id: number, portfolioId: number, assetId: number, validatedMonth: number, accountingPlan: any[], state: BudgetVersionState };

  budget$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(true),
    switchMap(() => this.route.firstChild?.params.pipe(
      pluck('id'),
      switchMap(id => iif(() => !!id,
        this.budgets$.pipe(
          map(budgets => budgets.find(budget => budget.id === +id)),
          tap(({ portfolioId, assetId, id }) => Object.assign(this.filters, { portfolioId, assetId, id }))
        ),
        of(this.emptyBudget)
      )),
      shareReplay({ refCount: true, bufferSize: 1 }),
    ) || of(this.emptyBudget))
  );

  private _simulations$ = new BehaviorSubject<BudgetSimulation[]>([]);

  get simulations$() {
    return this.budget$.pipe(
      pluck('id'),
      switchMap(id => iif(() => !!id,
        this._simulations$.pipe(map(simulations => simulations.filter(({ budgetId }) => budgetId === id))),
        of([])
      ))
    );
  }

  filters = {
    portfolioId: null,
    assetId: null,
    budgetId: null
  };

  constructor(
    public portfolioService: PortfolioService,
    public assetService: AssetService,
    private route: ActivatedRoute,
    private router: Router,
    public tl: TranslationService
  ) { }

  goToBudget(id: number) {
    this.router.navigate([id || './'], { relativeTo: this.route });
  }

  createSimulation(simulation: Omit<BudgetSimulation, 'id'>) {
    const createdSimulation = { id: Date.now(), ...simulation };
    this._simulations$.next([...this._simulations$.value, createdSimulation]);
    return of(createdSimulation);
  }

  updateSimulation(simulation: BudgetSimulation) {
    const simulations = this._simulations$.value;
    const simulationIndex = simulations.findIndex(({ id }) => id === simulation.id);
    this._simulations$.next([
      ...simulations.slice(0, simulationIndex),
      simulation,
      ...simulations.slice(simulationIndex + 1)
    ]);
    return of(simulation);
  }
}
