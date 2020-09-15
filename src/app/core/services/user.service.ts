import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Role, User } from '../../../app/shared';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    { name: 'PM user', role: Role.PM },
    { name: 'AM user', role: Role.AM }
  ];

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
