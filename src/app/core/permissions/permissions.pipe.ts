import { Pipe, PipeTransform } from '@angular/core';
import { Role } from 'src/app/shared';

import { PermissionsService } from './permissions.service';

@Pipe({
  name: 'permissions'
})
export class PermissionsPipe implements PipeTransform {
  constructor(private permissionService: PermissionsService) { }

  transform(permissions: { roles: Role[], condition: boolean }[], fallBack = true): boolean {
    // TODO: create function in permissions service to use in permissions pipe and permissions directive
    const userPermissions =
      (Array.isArray(permissions) ? permissions : [permissions])
        .reduce((permissions: { role: Role, condition: boolean }[], { roles, condition }) =>
          [...permissions, ...roles.map(role => ({ role, condition }))]
          , []
        )
        .filter(({ role }) => role === this.permissionService.currentUser.role);

    return !userPermissions.length && fallBack || userPermissions.some(({ condition }) => condition);
  }
}
