import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { AmountModule } from '../shared';
import { BudgetVisualizationRoutingModule } from './budget-visualization-routing.module';
import { BudgetVisualizationComponent } from './budget-visualization.component';
import { TotalDirective } from './total.directive';

@NgModule({
  declarations: [
    BudgetVisualizationComponent,
    TotalDirective
  ],
  imports: [
    CommonModule,
    BudgetVisualizationRoutingModule,
    CdkAccordionModule,
    MatTooltipModule,
    AmountModule
  ]
})
export class BudgetVisualizationModule { }
