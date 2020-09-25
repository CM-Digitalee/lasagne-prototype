import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {
  private localeMapping = {
    'fr-CH': 'de-CH'
  };

  constructor(@Inject(LOCALE_ID) private locale) { }

  transform(
    value: any,
    currencyCode?: string,
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
    digitsInfo?: string,
    locale?: string
  ): string | null {
    return (new CurrencyPipe(this.localeMapping[this.locale] || this.locale))
      .transform(value, currencyCode || '', display || '', digitsInfo || '', locale || '');
  }
}
