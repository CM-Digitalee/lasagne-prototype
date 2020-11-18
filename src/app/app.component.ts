import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ItemsMenuService} from './service/items-menu.service';
import {AppLanguagesService} from './service/app-languages.service';
import {Globals} from './common/global';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(public itemsService: ItemsMenuService, public appLanguageService: AppLanguagesService, public globals: Globals) {
    if (localStorage.getItem('language')){
      this.globals.languageId = localStorage.getItem('language');
    }else{
       localStorage.setItem('language', this.globals.languageId);
    }
  }

}
