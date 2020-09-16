import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { User } from '../../../app/shared';
import users from '../../../fake-data/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = users;

  currentUser$ = new BehaviorSubject<User>(null);

  constructor(private router: Router) { }

  login(user: User) {
    this.currentUser$.next(user);
    this.router.navigate(['']);
  }

  logout() {
    this.currentUser$.next(null);
    this.router.navigate(['login']);
  }
}
