import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { asyncScheduler } from 'rxjs';
import { tap } from 'rxjs/operators';

import { nodeToggle } from '../../shared';
import { BudgetService } from '../../core';
import { BudgetVisualizationLayoutComponent } from '../budget-visualization-layout/budget-visualization-layout.component';

@Component({
  selector: 'app-budget-visualization',
  templateUrl: './budget-visualization.component.html',
  styleUrls: ['./budget-visualization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [nodeToggle]
})
export class BudgetVisualizationComponent {
  budget$ = this.fakeDataService.budget$.pipe(
    tap(() => asyncScheduler.schedule(() => this.cdr.detectChanges()))
  );

  constructor(
    public budgetService: BudgetService,
    private cdr: ChangeDetectorRef,
    private fakeDataService: BudgetVisualizationLayoutComponent
  ) { }

  trackByFn(index: number) { return index; }
}
