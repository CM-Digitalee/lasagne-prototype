import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { PermissionsService } from './permissions.service';
import { Permission } from './permission';
import { asyncScheduler } from 'rxjs';

@Directive({
  selector: '[permissions]'
})
export class PermissionsDirective {
  @Input() set permissions(permissions: Permission | Permission[]) {
    asyncScheduler.schedule(() => {
      this.vcr.clear();
      if (this.permissionService.getPermission(permissions, this.permissionsFallback)) {
        this.vcr.createEmbeddedView(this.tmpl);
      }
    });
  }

  @Input() permissionsFallback = false;

  constructor(
    private vcr: ViewContainerRef,
    private tmpl: TemplateRef<any>,
    private permissionService: PermissionsService
  ) { }
}
