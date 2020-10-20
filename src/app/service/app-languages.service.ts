import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Tools} from '../tools/function';
import {Globals} from '../common/global';
import {ItemsMenuService} from '../service/items-menu.service';


@Injectable({
  providedIn: 'root'
})
export class AppLanguagesService {
  private readonly URL = 'https://ns-msrv-backend-dev.xtech.io/ui/languages';
  private _appLanguages = new BehaviorSubject<any>(null);
  public currentLanguageId = 'en';
  get appLanguages() {
    // return JSON.parse(localStorage.getItem('user'));
    return this._appLanguages.asObservable();
  }
  constructor(private tools: Tools, public globals: Globals, public itemsMenu: ItemsMenuService) {
    this.currentLanguageId = globals.languageId ;
  }
  resolveItems(): void {
    this.tools.get(this.URL).subscribe((data) => {
      this._appLanguages.next(data.answer.languages);
      console.log(data.answer.languages);
    } );
  }
  updateLanguage(event): void {
    this.currentLanguageId = event.target.value;
    this.globals.languageId =  event.target.value;

    localStorage.setItem('language', event.target.value);
    // this.resolveItems();
    this.itemsMenu.resolveItems();

  }
}
