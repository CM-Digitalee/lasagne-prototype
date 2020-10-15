import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { User } from '../../../app/shared';
import users from '../../../fake-data/users';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = users;

  // TODO
  private _currentUser$ = new BehaviorSubject<User>(this.users[0]);
  // private _currentUser$ = new BehaviorSubject<User>(null);
  get currentUser$() { return this._currentUser$.asObservable(); }

  constructor(private router: Router, private keycloakService: KeycloakService) { }
  login(user: User) {
    this._currentUser$.next(user);
    this.router.navigate(['']);
  }

  loginKeycloak(keycloak) {
    // @TODO : Add role from keycloak
    const user = { id: 1, name: keycloak.username, role: 'AO' } as User;
    this._currentUser$.next(user);
  }
  logoutKeycloak() {
    this.keycloakService.logout().then(() => {
      this._currentUser$.next(null);
      this.router.navigate(['login']);
    });
  }

  logout() {
    this._currentUser$.next(null);
    this.router.navigate(['login']);
  }
}
