import { registerLocaleData } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import localeFr from '@angular/common/locales/fr';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

registerLocaleData(localeFr, 'fr');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
