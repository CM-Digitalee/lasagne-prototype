import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { FilterByModule, OrderByModule } from '../shared';
import { PermissionsModule } from '../core/permissions';
import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';
import { TotalDirective } from './total.directive';

@NgModule({
  declarations: [
    BudgetComponent,
    TotalDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CdkAccordionModule,
    BudgetRoutingModule,
    FilterByModule,
    OrderByModule,
    PermissionsModule
  ]
})
export class BudgetModule { }
