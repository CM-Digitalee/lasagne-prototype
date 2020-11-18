// globals.ts
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class Globals {
  languageId = 'en';
  sideMenus: Array<any>;
  translationJson: object;
  isAppInit: boolean;
}
