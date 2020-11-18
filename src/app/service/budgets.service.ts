import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  constructor() { }

  // getBudget(id): Observable<any> {
  //   const path = this.tools.apiUrl + '/budgets/' + id
  //   return this.tools.get(path);
  // }
  // addBudget(data): Observable<any> {
  //   const path = this.tools.apiUrl + '/budgets/'
  //   return this.tools.post(path, data);
  // }
  // addBudgetVersion(budgetId, data): Observable<any> {
  //   const path = this.tools.apiUrl + '/budgets/' + budgetId + '/versions'
  //   return this.tools.post(path, data);
  // }
  // patchVersion(budgetId, versionId, data): Observable<any> {
  //   const path = this.tools.apiUrl + '/budgets/' + budgetId + '/versions/' + versionId
  //   return this.tools.patch(path, data);
  // }
}
