// globals.ts
import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  role: string = 'test';
  languageId: string = 'en';
  sideMenus: Array<any>;
}
