import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';
import { TotalDirective } from './total.directive';

@NgModule({
  declarations: [BudgetComponent, TotalDirective],
  imports: [
    CommonModule,
    FormsModule,
    CdkAccordionModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
