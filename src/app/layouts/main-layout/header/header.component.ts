import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../../../app/core';
import {AppLanguagesService} from '../../../service/app-languages.service';
import {Globals} from '../../../common/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: { 'class': 'flex align-center px-10 py-15' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(public userService: UserService, public appLanguages: AppLanguagesService, public globals: Globals) {
  }
}
