import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetVisualizationLayoutComponent } from './budget-visualization-layout/budget-visualization-layout.component';

import { BudgetVisualizationComponent } from './budget-visualization/budget-visualization.component';

const routes: Routes = [{
  path: '', component: BudgetVisualizationLayoutComponent, children: [
    { path: ':id', component: BudgetVisualizationComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetVisualizationRoutingModule { }
