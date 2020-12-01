import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ItemsMenuService} from './service/items-menu.service';
import {AppLanguagesService} from './service/app-languages.service';
import {Globals} from './common/global';
import {SystemService} from './service/system.service';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  constructor( private _systemService: SystemService, public globals: Globals) {
    if (localStorage.getItem('language')){
      this.globals.languageId = localStorage.getItem('language');
    }else{
       localStorage.setItem('language', this.globals.languageId);
    }
  }
  ngOnInit(): void {
    this._systemService.checkVersion();
  }

}
