import { Injectable } from '@angular/core';

import { BudgetFakeServerService } from './budget-fake-server.service';

@Injectable({
  providedIn: 'root'
})
export class HttpFakeService {
  constructor(private budgetFakeService: BudgetFakeServerService) { }
  getAll<T>(url: string) {
    switch (url) {
      case 'budgets':
        return this.budgetFakeService.getAll();
    }
  }

  get<T>(url: string, id: number) {
    switch (url) {
      case 'budgets':
        return this.budgetFakeService.get(id);
    }
  }

  post<T>(url: string, data: any) {
    switch (url) {
      case 'budgets':
        return this.budgetFakeService.postBudget(data);
    }
  }

  patch<T>(url: string, id: number, data: any) {
    switch (url) {
      case 'budgets/versions':
        return this.budgetFakeService.patchVersion(id, data);
    }
  }
}
