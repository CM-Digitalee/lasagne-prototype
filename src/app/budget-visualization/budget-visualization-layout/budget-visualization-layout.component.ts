import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iif, of } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { BudgetVersionState } from '../../shared';
import { AssetService, PortfolioService } from '../../core';

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
      accountingPlan: [
        {
          label: 'Total Revenus',
          children: [
            { description: 'Revenu 1', pastYear: 180000, budget: 190000, ytd: 110000, nextBudget: 200000, accountIsRevenue: true },
            { description: 'Revenu 2', pastYear: 20000, budget: 30000, ytd: 40000, nextBudget: 30000, accountIsRevenue: true }
          ]
        },
        {
          label: 'Total Charges',
          children: [
            { description: 'Charge 1', pastYear: 30000, budget: 25000, ytd: 10000, nextBudget: 20000 },
            { description: 'Charge 2', pastYear: 10000, budget: 15000, ytd: 20000, nextBudget: 15000 }
          ]
        }
      ]
    },
    {
      portfolioId: 1, assetId: 5, name: 'Budget 2', id: 2,
      state: BudgetVersionState.Submitted,
      accountingPlan: [
        {
          label: 'Total Revenus',
          children: [
            { description: 'Revenu 1', pastYear: 180000, budget: 190000, ytd: 110000, nextBudget: 200000, accountIsRevenue: true },
            { description: 'Revenu 2', pastYear: 20000, budget: 30000, ytd: 40000, nextBudget: 30000, accountIsRevenue: true }
          ]
        },
        {
          label: 'Total Charges',
          children: [
            { description: 'Charge 1', pastYear: 30000, budget: 25000, ytd: 10000, nextBudget: 20000 },
            { description: 'Charge 2', pastYear: 10000, budget: 15000, ytd: 20000, nextBudget: 15000 }
          ]
        }
      ]
    }
  ]);

  budget$ = this.route.firstChild?.params.pipe(
    pluck('id'),
    switchMap(id => iif(() => id,
      this.budgets$.pipe(map(budgets => budgets.find(budget => budget.id === +id))),
      of({} as { accountingPlan: any[], state: BudgetVersionState }))
    ),
    shareReplay({ refCount: true, bufferSize: 1 }),
  ) || of({} as { accountingPlan: any[], state: BudgetVersionState });

  constructor(
    public portfolioService: PortfolioService,
    public assetService: AssetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  goToBudget(id: number) {
    this.router.navigate([id || './'], { relativeTo: this.route });
  }
}
