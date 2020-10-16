import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { AmountModule, FilterByModule } from '../shared';
import { BudgetVisualizationRoutingModule } from './budget-visualization-routing.module';
import { BudgetVisualizationComponent } from './budget-visualization/budget-visualization.component';
import { TotalDirective } from './total.directive';
import { BudgetVisualizationLayoutComponent } from './budget-visualization-layout/budget-visualization-layout.component';

@NgModule({
  declarations: [
    BudgetVisualizationComponent,
    TotalDirective,
    BudgetVisualizationLayoutComponent
  ],
  imports: [
    CommonModule,
    BudgetVisualizationRoutingModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    CdkAccordionModule,
    MatTooltipModule,
    AmountModule,
    FilterByModule
  ]
})
export class BudgetVisualizationModule { }
