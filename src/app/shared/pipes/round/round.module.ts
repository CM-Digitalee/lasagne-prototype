import { NgModule } from '@angular/core';

import { RoundPipe } from './round.pipe';

@NgModule({
  declarations: [RoundPipe],
  exports: [RoundPipe]
})
export class RoundModule { }
