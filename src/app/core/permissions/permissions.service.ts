import { Injectable } from '@angular/core';

import { UserService } from '../services';
import { Permission } from './permission';
import { Role, User } from '../../../app/shared';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  currentUser: User = null;

  constructor(userService: UserService) {
    userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  getPermission(permissions: Permission | Permission[], fallback: boolean) {
    const userPermissions =
      (Array.isArray(permissions) ? permissions : [permissions])
        .reduce((permissions: { role: Role, condition: boolean }[], { roles, condition = true }) =>
          [...permissions, ...roles.map(role => ({ role, condition }))]
          , []
        )
        .filter(({ role }) => role === this.currentUser.role);

    return !userPermissions.length && fallback || userPermissions.some(({ condition }) => condition);
  }
}
