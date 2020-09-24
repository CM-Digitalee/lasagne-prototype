import { registerLocaleData } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import localeFr from '@angular/common/locales/fr';
import localefrCH from '@angular/common/locales/fr-CH';
import localeDeCH from '@angular/common/locales/de-CH';
import localeIt from '@angular/common/locales/it-CH';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

registerLocaleData(localeFr, 'fr-FR');
registerLocaleData(localefrCH, 'fr-CH');
registerLocaleData(localeDeCH, 'de-CH');
registerLocaleData(localeIt, 'it-CH');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
