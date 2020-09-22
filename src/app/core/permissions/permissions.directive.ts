import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';

import { Role } from '../../../app/shared';
import { PermissionsService } from './permissions.service';

@Directive({
  selector: '[permissions]'
})
export class PermissionsDirective implements OnChanges {
  @Input() permissions: { [key in Role]: boolean };

  constructor(
    private vcr: ViewContainerRef,
    private tmpl: TemplateRef<any>,
    private permissionService: PermissionsService
  ) { }

  ngOnChanges() {
    if (this.permissions[this.permissionService.currentUser.role]) {
      this.vcr.createEmbeddedView(this.tmpl);
    }
  }
}
