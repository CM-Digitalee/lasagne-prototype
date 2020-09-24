import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  supportedLocales = [
    'fr-FR',
    'fr-CH',
    'de-CH',
    'it-CH'
  ];

  getLocale() {
    return this.supportedLocales.find(locale => locale === navigator.language) || 'en';
  }
}
