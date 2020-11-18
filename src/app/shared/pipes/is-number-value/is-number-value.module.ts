import { NgModule } from '@angular/core';

import { IsNumberValuePipe } from './is-number-value.pipe';

@NgModule({
  declarations: [IsNumberValuePipe],
  exports: [IsNumberValuePipe]
})
export class IsNumberValueModule { }
