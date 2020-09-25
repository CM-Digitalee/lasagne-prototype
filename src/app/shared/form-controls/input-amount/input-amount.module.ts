import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputAmountComponent } from './input-amount.component';
import { AmountModule } from '../../pipes';

@NgModule({
  declarations: [InputAmountComponent],
  imports: [CommonModule, AmountModule],
  exports: [InputAmountComponent]
})
export class InputAmountModule { }
