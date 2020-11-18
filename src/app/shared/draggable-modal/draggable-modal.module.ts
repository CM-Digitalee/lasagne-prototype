import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { DraggableModalComponent } from './draggable-modal.component';
import { DraggableModalDirective } from './draggable-modal.directive';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  declarations: [DraggableModalComponent, DraggableModalDirective, DraggableDirective],
  imports: [CommonModule, MatCardModule],
  exports: [DraggableModalDirective]
})
export class DraggableModalModule { }
