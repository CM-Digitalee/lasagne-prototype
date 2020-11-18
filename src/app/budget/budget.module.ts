import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { AmountModule, FilterByModule, InputAmountModule, OrderByModule } from '../shared';
import { PermissionsModule } from '../core/permissions';
import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';
import { TotalDirective } from './total.directive';
import { StartPreviousYearPipe } from './start-previous-year.pipe';
import { EndPreviousYearPipe } from './end-previous-year.pipe';
import { EndNextYearPipe } from './end-next-year.pipe';
import { StartNextYearPipe } from './start-next-year.pipe';
import { StartPreviousTwoYearsPipe } from './start-previous-two-years.pipe';
import { EndPreviousTwoYearsPipe } from './end-previous-two-years.pipe';

@NgModule({
  declarations: [
    BudgetComponent,
    TotalDirective,
    StartPreviousYearPipe,
    EndPreviousYearPipe,
    EndNextYearPipe,
    StartNextYearPipe,
    StartPreviousTwoYearsPipe,
    EndPreviousTwoYearsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CdkAccordionModule,
    BudgetRoutingModule,
    FilterByModule,
    OrderByModule,
    PermissionsModule,
    InputAmountModule,
    AmountModule
  ]
})
export class BudgetModule { }
