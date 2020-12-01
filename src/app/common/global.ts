// globals.ts
import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  languageId = 'en';
  sideMenus: Array<any>;
  translationJson: object;
  isAppInit: boolean;
  defaultCacheMins: 1440;
}
