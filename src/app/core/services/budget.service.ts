import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import budgets from '../../../fake-data/budgets';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budgets$ = new BehaviorSubject(budgets);

  add(formValue) {
    this.budgets$.next([...this.budgets$.value, { ...formValue, id: Date.now() }]);
  }
}
