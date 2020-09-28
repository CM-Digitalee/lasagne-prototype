import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private supportedLocaleMapping = {
    'fr': 'fr-FR',
    'fr-FR': 'fr-FR',
    'fr-CH': 'fr-CH',
    'de-CH': 'de-CH',
    'it-CH': 'it-CH'
  };

  getLocale() {
    return this.supportedLocaleMapping[navigator.language] || 'en';
  }
}
