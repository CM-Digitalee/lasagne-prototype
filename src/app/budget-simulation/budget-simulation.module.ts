import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { AmountModule, DraggableModalModule, FilterByModule, InputDigitsModule, RoundModule } from '../shared';
import { BudgetSimulationRoutingModule } from './budget-simulation-routing.module';
import { BudgetSimulationComponent } from './budget-simulation/budget-simulation.component';
import { TotalDirective } from './total.directive';
import { BudgetSimulationLayoutComponent } from './budget-simulation-layout/budget-simulation-layout.component';
import { DistributionComponent } from './budget-simulation/distribution/distribution.component';
import { ToleranceComponent } from './budget-simulation/tolerance/tolerance.component';
import { DistributionFormDirective } from './budget-simulation/directives/distribution-form.directive';
import { ToleranceFormDirective } from './budget-simulation/directives/tolerance-form.directive';
import { SimulationDirective } from './budget-simulation/directives/simulation.directive';
import { WarningDirective } from './budget-simulation/directives/warning.directive';
import { LineChartDirective } from './budget-simulation/directives/line-chart.directive';
import { PercentConverterPipe } from './budget-simulation/distribution/percent-converter.pipe';
import { LastDistributionPipe } from './budget-simulation/distribution/last-distribution.pipe';
import { OldDistributionQuartersPipe } from './budget-simulation/distribution/old-distribution-quarters.pipe';

@NgModule({
  declarations: [
    BudgetSimulationComponent,
    TotalDirective,
    BudgetSimulationLayoutComponent,
    DistributionComponent,
    ToleranceComponent,
    DistributionFormDirective,
    ToleranceFormDirective,
    SimulationDirective,
    WarningDirective,
    LineChartDirective,
    PercentConverterPipe,
    LastDistributionPipe,
    OldDistributionQuartersPipe
  ],
  imports: [
    CommonModule,
    BudgetSimulationRoutingModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    CdkAccordionModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    AmountModule,
    FilterByModule,
    DraggableModalModule,
    RoundModule,
    InputDigitsModule
  ]
})
export class BudgetSimulationModule { }
