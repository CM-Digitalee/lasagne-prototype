import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Budget, BudgetVersion, BudgetVersionState, BudgetWithVersionsAndRealised } from '../../../app/shared';
import budgets from '../../../fake-data/budgets';
import budgetVersions from '../../../fake-data/budget-versions';
import blpps from '../../../fake-data/asset_bl-pp_2019-2020';

@Injectable({
  providedIn: 'root'
})
export class BudgetFakeServerService {
  budgets$ = new BehaviorSubject<Budget[]>(budgets);
  budgetVersions$ = new BehaviorSubject<BudgetVersion[]>(budgetVersions);

  getAll() {
    return combineLatest([
      this.budgets$,
      this.budgetVersions$
    ]).pipe(
      map(([budgets, versions]) => budgets.map(budget => ({
        ...budget,
        versions: versions.filter(({ budgetId }) => budget.id === budgetId),
        previousYear: blpps.filter(blpp => +blpp.asset === budget.assetId && blpp.date.includes('2019')),
        currentYear: blpps.filter(blpp => +blpp.asset === budget.assetId && blpp.date.includes('2020'))
      }) as BudgetWithVersionsAndRealised))
    );
  }

  get(id: number) {
    return this.getAll().pipe(map(budgets => budgets.find(budget => budget.id === id)));
  }

  postBudget(budget: Budget) {
    const newBudget = { id: Date.now(), ...budget };
    const newVersion = { id: Date.now(), budgetId: newBudget.id, number: 1, state: BudgetVersionState.Pending, accountingPlan: {} };
    this.budgets$.next([...this.budgets$.value, newBudget]);
    this.budgetVersions$.next([...this.budgetVersions$.value, newVersion]);
    return this.get(newBudget.id);
  }

  patchVersion(id: number, data: Partial<BudgetVersion>) {
    const budgetVersions = this.budgetVersions$.value;
    const colIndex = budgetVersions.findIndex(version => version.id === id);
    const updatedVersion = { ...budgetVersions[colIndex], ...data };
    this.budgetVersions$.next([
      ...budgetVersions.slice(0, colIndex),
      updatedVersion,
      ...budgetVersions.slice(colIndex + 1)
    ]);
    return of(updatedVersion);
  }
}
