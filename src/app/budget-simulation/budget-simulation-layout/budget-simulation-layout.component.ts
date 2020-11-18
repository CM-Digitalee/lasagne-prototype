import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, iif, of } from 'rxjs';
import { filter, map, pluck, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

import { BudgetSimulation, BudgetVersionState } from '../../shared';
import { AssetService, PortfolioService } from '../../core';

@Component({
  selector: 'app-budget-simulation-layout',
  templateUrl: './budget-simulation-layout.component.html',
  styleUrls: ['./budget-simulation-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetSimulationLayoutComponent {
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
              oldBudgets: [
                { amount: 150000, date: (new Date('2018-11-08')).getTime() },
                { amount: 200000, date: (new Date('2018-11-05')).getTime() }],
              realised: [
                { month: 1, value: 5000 },
                { month: 2, value: 15000 },
                { month: 3, value: 8000 },
                { month: 4, value: 9000 },
                { month: 5, value: 13000 }
              ],
              distribution: [
                { month: 1, value: 10.5 },
                { month: 2, value: 12 },
                { month: 3, value: 10.5 },
                { month: 4, value: 12 },
                { month: 5, value: 5 },
                { month: 6, value: 10 },
                { month: 7, value: 5 },
                { month: 8, value: 10 },
                { month: 9, value: 5 },
                { month: 10, value: 15 },
                { month: 11, value: 5 },
                { month: 12, value: 15 }
              ],
              oldDistributions: [
                {
                  distribution: [
                    { month: 1, value: 7 },
                    { month: 2, value: 8 },
                    { month: 3, value: 7 },
                    { month: 4, value: 8 },
                    { month: 5, value: 7 },
                    { month: 6, value: 8 },
                    { month: 7, value: 7 },
                    { month: 8, value: 8 },
                    { month: 9, value: 7 },
                    { month: 10, value: 13 },
                    { month: 11, value: 7 },
                    { month: 12, value: 13 }
                  ],
                  date: (new Date('2018-11-07')).getTime()
                }
              ]
            },
            {
              id: 2, description: 'Revenu 2', pastYear: 20000, budget: 30000, ytd: 40000, nextBudget: 30000, accountIsRevenue: true,
              distribution: [
                { month: 1, value: 10.5 },
                { month: 2, value: 12 },
                { month: 3, value: 10.5 },
                { month: 4, value: 12 },
                { month: 5, value: 5 },
                { month: 6, value: 10 },
                { month: 7, value: 5 },
                { month: 8, value: 10 },
                { month: 9, value: 5 },
                { month: 10, value: 15 },
                { month: 11, value: 5 },
                { month: 12, value: 15 }
              ]
            }
          ]
        },
        {
          label: 'Total Charges',
          children: [
            {
              id: 3, description: 'Charge 1', pastYear: 30000, budget: 25000, ytd: 10000, nextBudget: 20000,
              distribution: [
                { month: 1, value: 10.5 },
                { month: 2, value: 12 },
                { month: 3, value: 10.5 },
                { month: 4, value: 12 },
                { month: 5, value: 5 },
                { month: 6, value: 10 },
                { month: 7, value: 5 },
                { month: 8, value: 10 },
                { month: 9, value: 5 },
                { month: 10, value: 15 },
                { month: 11, value: 5 },
                { month: 12, value: 15 }
              ]
            },
            {
              id: 4, description: 'Charge 2', pastYear: 10000, budget: 15000, ytd: 20000, nextBudget: 15000,
              distribution: [
                { month: 1, value: 10.5 },
                { month: 2, value: 12 },
                { month: 3, value: 10.5 },
                { month: 4, value: 12 },
                { month: 5, value: 5 },
                { month: 6, value: 10 },
                { month: 7, value: 5 },
                { month: 8, value: 10 },
                { month: 9, value: 5 },
                { month: 10, value: 15 },
                { month: 11, value: 5 },
                { month: 12, value: 15 }
              ]
            }
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
    assetId: null
  };

  constructor(
    public portfolioService: PortfolioService,
    public assetService: AssetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  goToBudget(assetId: number) {
    if (assetId) {
      this.budgets$.subscribe(budgets => {
        const budgetId = budgets.find(budget => budget.assetId === assetId)?.id;
        this.router.navigate([budgetId || './'], { relativeTo: this.route });
      });
    } else {
      this.router.navigate(['./'], { relativeTo: this.route });
    }
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
