import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

import { Role } from '../../../app/shared';
import { UserService } from '../services';

@Directive({
  selector: '[permissions]'
})
export class PermissionsDirective implements OnChanges {
  @Input() permissions: { [key in Role]: boolean };

  constructor(
    private vcr: ViewContainerRef,
    private tmpl: TemplateRef<any>,
    private userService: UserService
  ) { }

  ngOnChanges() {
    if (this.permissions[this.userService.currentUser$.value.role]) {
      this.vcr.createEmbeddedView(this.tmpl);
    }
  }
}
