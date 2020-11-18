import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetSimulationLayoutComponent } from './budget-simulation-layout/budget-simulation-layout.component';

import { BudgetSimulationComponent } from './budget-simulation/budget-simulation.component';

const routes: Routes = [{
  path: '', component: BudgetSimulationLayoutComponent, children: [
    { path: ':id', component: BudgetSimulationComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetSimulationRoutingModule { }
