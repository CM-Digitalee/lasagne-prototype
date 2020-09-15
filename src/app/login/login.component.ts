import { Component, ChangeDetectionStrategy } from '@angular/core';

import { UserService } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(public userService: UserService) { }
}
