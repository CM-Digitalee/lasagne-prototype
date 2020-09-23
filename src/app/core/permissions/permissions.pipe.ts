import { Pipe, PipeTransform } from '@angular/core';

import { PermissionsService } from './permissions.service';
import { Permission } from './permission';

@Pipe({
  name: 'permissions'
})
export class PermissionsPipe implements PipeTransform {
  constructor(private permissionService: PermissionsService) { }

  transform(permissions: Permission | Permission[], fallback = false): boolean {
    return this.permissionService.getPermission(permissions, fallback);
  }
}
