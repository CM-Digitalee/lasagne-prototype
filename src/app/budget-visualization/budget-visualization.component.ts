import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { asyncScheduler, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { nodeToggle } from '../shared';

@Component({
  selector: 'app-budget-visualization',
  templateUrl: './budget-visualization.component.html',
  styleUrls: ['./budget-visualization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [nodeToggle]
})
export class BudgetVisualizationComponent {
  data$ = of([
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
  ]).pipe(
    tap(() => asyncScheduler.schedule(() => this.cdr.detectChanges())),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  constructor(private cdr: ChangeDetectorRef) { }
}
