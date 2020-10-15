import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetVisualizationComponent } from './budget-visualization.component';

const routes: Routes = [{ path: '', component: BudgetVisualizationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetVisualizationRoutingModule { }
