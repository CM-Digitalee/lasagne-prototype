import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetComponent } from './budget.component';

const routes: Routes = [
  { path: '', component: BudgetComponent },
  { path: ':id', component: BudgetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
