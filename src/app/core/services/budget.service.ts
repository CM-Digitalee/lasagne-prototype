import { Injectable } from '@angular/core';

import { Budget, BudgetVersion, BudgetVersionState, BudgetWithVersionsAndRealised } from '../../../app/shared';
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

  saveVersion(version: BudgetVersion) {
    return this.budgetFakeServerService.patchVersion(version.id, version);
  }

  submitVersion(version: BudgetVersion) {
    return this.budgetFakeServerService.submitVersion(version.id, version);
  }

  acceptVersion(version: BudgetVersion) {
    return this.budgetFakeServerService.acceptVersion(version.id, version);
  }

  rejectVersion(version: BudgetVersion) {
    return this.budgetFakeServerService.rejectVersion(version.id, version);
  }
}
