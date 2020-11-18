import { Injectable } from '@angular/core';

import { AccountingPlan, Budget, BudgetVersion, BudgetVersionState, BudgetWithVersionsAndRealised } from '../../../app/shared';
import { BudgetFakeServerService } from './budget-fake-server.service';
import { HttpFakeService } from './http-fake.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budgets$ = this.http.getAll<BudgetWithVersionsAndRealised[]>('budgets');

  budgetVersionState = BudgetVersionState;

  constructor(private http: HttpFakeService, private budgetFakeServerService: BudgetFakeServerService) { }

  get(id: number) {
    return this.http.get<BudgetWithVersionsAndRealised>('budgets', id);
  }

  create(newBudget: Omit<Budget, 'id'>) {
    return this.http.post<Budget>('budgets', newBudget);
  }

  createVersion(budgetId: number) {
    return this.budgetFakeServerService.createVersion(budgetId);
  }

  createExtension(budgetId: number) {
    return this.budgetFakeServerService.createExtension(budgetId);
  }

  saveVersion(versionId: number, formValue: AccountingPlan) {
    return this.budgetFakeServerService.patchVersion(versionId, formValue);
  }

  submitVersion(versionId: number, formValue: AccountingPlan) {
    return this.budgetFakeServerService.submitVersion(versionId, formValue);
  }

  acceptVersion(versionId: number, formValue: AccountingPlan) {
    return this.budgetFakeServerService.acceptVersion(versionId, formValue);
  }

  rejectVersion(versionId: number, formValue: AccountingPlan) {
    return this.budgetFakeServerService.rejectVersion(versionId, formValue);
  }
}
