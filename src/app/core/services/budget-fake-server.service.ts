import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Budget, BudgetVersion, BudgetVersionState, BudgetWithVersionsAndRealised, User } from '../../../app/shared';
import budgets from '../../../fake-data/budgets';
import budgetVersions from '../../../fake-data/budget-versions';
import blpps from '../../../fake-data/asset_bl-pp_2019-2020';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetFakeServerService {
  budgets$ = new BehaviorSubject<Budget[]>(budgets);
  budgetVersions$ = new BehaviorSubject<(BudgetVersion & { stateUserId: number })[]>(budgetVersions);

  currentUser: User = null;

  constructor(private userService: UserService) {
    userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  getAll() {
    return combineLatest([
      this.budgets$,
      this.budgetVersions$
    ]).pipe(
      map(([budgets, versions]) => budgets.map(budget => ({
        ...budget,
        versions: versions.filter(({ budgetId }) => budget.id === budgetId).map(version => ({
          ...version,
          stateUserName: this.userService.users.find(user => user.id === version.stateUserId).name
        })),
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
    this.budgets$.next([...this.budgets$.value, newBudget]);
    this.createVersion(newBudget.id);
    return this.get(newBudget.id);
  }

  createVersion(budgetId: number) {
    const lastVersion = this.budgetVersions$.value.find(
      version => version.number === this.budgetVersions$.value.map(v => v.number).sort((a, b) => b - a)[0]
    );

    const newVersion = {
      id: Date.now(),
      budgetId,
      number: (lastVersion?.number || 0) + 1,
      state: BudgetVersionState.Pending,
      stateDate: Date.now(),
      stateUserId: this.currentUser.id,
      accountingPlan: lastVersion?.accountingPlan || {}
    };

    this.budgetVersions$.next([...this.budgetVersions$.value, newVersion]);
    return of(newVersion);
  }

  patchVersion(id: number, data: Partial<BudgetVersion>) {
    const budgetVersions = this.budgetVersions$.value;
    const colIndex = budgetVersions.findIndex(version => version.id === id);
    const updatedVersion = {
      ...budgetVersions[colIndex],
      ...data,
      stateDate: Date.now(),
      stateUserId: this.currentUser.id
    };
    this.budgetVersions$.next([
      ...budgetVersions.slice(0, colIndex),
      updatedVersion,
      ...budgetVersions.slice(colIndex + 1)
    ]);
    return of(updatedVersion as BudgetVersion);
  }

  submitVersion(id: number, data: Partial<BudgetVersion>) {
    return this.patchVersion(id, { ...data, state: BudgetVersionState.Submitted });
  }

  acceptVersion(id: number, data: Partial<BudgetVersion>) {
    return this.patchVersion(id, { ...data, state: BudgetVersionState.Accepted });
  }

  rejectVersion(id: number, data: Partial<BudgetVersion>) {
    return this.patchVersion(id, { ...data, state: BudgetVersionState.Rejected });
  }
}
