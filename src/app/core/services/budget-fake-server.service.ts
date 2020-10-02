import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AccountingPlan, Budget, BudgetVersion, BudgetVersionState, BudgetWithVersionsAndRealised, Role, User } from '../../../app/shared';
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
      map(([budgets, allVersions]) => budgets.map(budget => {
        const versions = allVersions
          .filter(({ budgetId }) => budget.id === budgetId)
          .sort((a, b) => a.number - b.number);

        if (versions.length) {
          const lastVersionState = versions[versions.length - 1].state;
          const lastVersionUserRole = this.userService.users.find(user => user.id === versions[versions.length - 1].stateUserId).role;
          const currentUserRole = this.currentUser.role;
          if (
            lastVersionState === BudgetVersionState.Pending && !(
              [lastVersionUserRole, currentUserRole].every(role => role === Role.PM) ||
              [lastVersionUserRole, currentUserRole].every(role => role === Role.AM || role === Role.AO)
            )
          ) {
            versions.pop();
          }
        }

        return {
          ...budget,
          versions: versions.map(version => ({
            ...version,
            stateUserName: this.userService.users.find(user => user.id === version.stateUserId).name
          })),
          previousYear: blpps.filter(blpp => +blpp.asset === budget.assetId && blpp.date.includes('2019')),
          currentYear: blpps.filter(blpp => +blpp.asset === budget.assetId && blpp.date.includes('2020'))
        } as BudgetWithVersionsAndRealised;
      })),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  get(id: number) {
    return this.getAll().pipe(map(budgets => budgets.find(budget => budget.id === id)));
  }

  createBudget(budget: Budget) {
    const newBudget = { id: Date.now(), ...budget };
    this.budgets$.next([...this.budgets$.value, newBudget]);
    this.createVersion(newBudget.id);
    return this.get(newBudget.id);
  }

  createVersion(budgetId: number) {
    const lastVersion = this.budgetVersions$.value
      .filter(version => version.budgetId === budgetId)
      .sort((a, b) => b.number - a.number)[0];

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

  patchVersion(id: number, data: AccountingPlan, state?: BudgetVersionState) {
    const budgetVersions = this.budgetVersions$.value;
    const colIndex = budgetVersions.findIndex(version => version.id === id);
    const updatedVersion = {
      ...budgetVersions[colIndex],
      accountingPlan: Object.assign(
        budgetVersions[colIndex].accountingPlan,
        ...Object.entries(data).map(([key, value]) =>
          (typeof value === 'object' && value !== null)
            ? { [key]: { ...budgetVersions[colIndex].accountingPlan[key] as object, ...value } }
            : { [key]: value }
        )),
      stateDate: Date.now(),
      stateUserId: this.currentUser.id,
      ...(state && { state })
    };

    this.budgetVersions$.next([
      ...budgetVersions.slice(0, colIndex),
      updatedVersion,
      ...budgetVersions.slice(colIndex + 1)
    ]);
    return of(updatedVersion as BudgetVersion);
  }

  submitVersion(id: number, data: AccountingPlan) {
    return this.patchVersion(id, data, BudgetVersionState.Submitted);
  }

  acceptVersion(id: number, data: AccountingPlan) {
    return this.patchVersion(id, data, BudgetVersionState.Accepted);
  }

  rejectVersion(id: number, data: AccountingPlan) {
    return this.patchVersion(id, data, BudgetVersionState.Rejected);
  }
}
