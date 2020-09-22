import { Injectable } from '@angular/core';

import { Budget, BudgetVersion, BudgetWithVersionsAndRealised } from '../../../app/shared';
import { HttpFakeService } from './http-fake.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budgets$ = this.http.getAll<BudgetWithVersionsAndRealised[]>('budgets');

  constructor(private http: HttpFakeService) { }

  get(id: number) {
    return this.http.get<BudgetWithVersionsAndRealised>('budgets', id);
  }

  create(newBudget: Omit<Budget, 'id'>) {
    return this.http.post<Budget>('budgets', newBudget);
  }

  saveVersion(version: BudgetVersion) {
    return this.http.patch<BudgetVersion>('budgets/versions', version.id, version);
  }
}
