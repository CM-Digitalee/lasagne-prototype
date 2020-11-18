import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Globals} from '../common/global';
import {SettingsService} from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class AppLanguagesService {
  private readonly URL = 'https://ns-msrv-backend-dev.xtech.io/ui/languages';
  private readonly URLTRANSLATION = 'https://ns-msrv-backend-dev.xtech.io/ui/translations';
  private _appLanguages = new BehaviorSubject<any>(null);
  public currentLanguageId = 'en';
  get appLanguages() {
    // return JSON.parse(localStorage.getItem('user'));
    return this._appLanguages.asObservable();
  }
  constructor(public globals: Globals, public settings: SettingsService) {
    this.currentLanguageId = globals.languageId ;
  }

  updateLanguage(event): void {
    this.currentLanguageId = event.target.value;
    this.globals.languageId =  event.target.value;

    localStorage.setItem('language', event.target.value);

    this.settings.loadSettings();

  }
}
