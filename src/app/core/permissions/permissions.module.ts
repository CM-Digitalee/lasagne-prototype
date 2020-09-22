import { NgModule } from '@angular/core';

import { PermissionsDirective } from './permissions.directive';
import { PermissionsPipe } from './permissions.pipe';

@NgModule({
  declarations: [PermissionsDirective, PermissionsPipe],
  exports: [PermissionsDirective, PermissionsPipe]
})
export class PermissionsModule { }
