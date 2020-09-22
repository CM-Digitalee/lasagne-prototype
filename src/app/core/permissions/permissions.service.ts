import { Injectable } from '@angular/core';

import { User } from 'src/app/shared';
import { UserService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  currentUser: User = null;

  constructor(userService: UserService) {
    userService.currentUser$.subscribe(user => this.currentUser = user);
  }
}
