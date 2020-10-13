import { Injectable } from '@angular/core';
import {Tools} from '../tools/function';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  constructor(private tools: Tools) { }
  // create a method named: resolveItems()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object
  getBudget(id): Observable<any> {
    const path = this.tools.apiUrl + '/budgets/' + id
    return this.tools.get(path);
  }
  addBudget(data): Observable<any> {
    const path = this.tools.apiUrl + '/budgets/'
    return this.tools.post(path, data);
  }
  addBudgetVersion(budgetId, data): Observable<any> {
    const path = this.tools.apiUrl + '/budgets/' + budgetId + '/versions'
    return this.tools.post(path, data);
  }
  patchVersion(budgetId, versionId, data): Observable<any> {
    const path = this.tools.apiUrl + '/budgets/' + budgetId + '/versions/' + versionId
    return this.tools.patch(path, data);
  }
}
