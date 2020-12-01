import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetComponent } from './budget.component';
import {AdminFunctionalitiesComponent} from '../administration/admin-functionalities/admin-functionalities.component';

const routes: Routes = [
  { path: '', component: BudgetComponent , data: {title: 'ST.MENU.BUDGET_MONITORING', overline : 'ST.MENU.BUDGET'} },
  { path: ':id', component: BudgetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
