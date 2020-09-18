import { NgModule } from '@angular/core';

import { PermissionsDirective } from './permissions.directive';

@NgModule({
  declarations: [PermissionsDirective],
  exports: [PermissionsDirective]
})
export class PermissionsModule { }
