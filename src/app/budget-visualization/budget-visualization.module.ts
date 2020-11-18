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

import { AmountModule, DraggableModalModule, FilterByModule, RoundModule } from '../shared';
import { BudgetVisualizationRoutingModule } from './budget-visualization-routing.module';
import { BudgetVisualizationComponent } from './budget-visualization/budget-visualization.component';
import { TotalDirective } from './total.directive';
import { BudgetVisualizationLayoutComponent } from './budget-visualization-layout/budget-visualization-layout.component';
import { DistributionComponent } from './budget-visualization/distribution/distribution.component';
import { ToleranceComponent } from './budget-visualization/tolerance/tolerance.component';
import { DistributionFormDirective } from './budget-visualization/directives/distribution-form.directive';
import { ToleranceFormDirective } from './budget-visualization/directives/tolerance-form.directive';
import { SimulationDirective } from './budget-visualization/directives/simulation.directive';
import { WarningDirective } from './budget-visualization/directives/warning.directive';
import { LineChartDirective } from './budget-visualization/directives/line-chart.directive';
import { PercentConverterPipe } from './budget-visualization/distribution/percent-converter.pipe';

@NgModule({
  declarations: [
    BudgetVisualizationComponent,
    TotalDirective,
    BudgetVisualizationLayoutComponent,
    DistributionComponent,
    ToleranceComponent,
    DistributionFormDirective,
    ToleranceFormDirective,
    SimulationDirective,
    WarningDirective,
    LineChartDirective,
    PercentConverterPipe
  ],
  imports: [
    CommonModule,
    BudgetVisualizationRoutingModule,
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
    RoundModule
  ]
})
export class BudgetVisualizationModule { }
