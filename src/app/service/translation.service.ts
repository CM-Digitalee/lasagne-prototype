import { Injectable } from '@angular/core';
import {Globals} from '../common/global';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(
    private globals: Globals
) { }

  translate(word: string, transform?: string): any {
    if (this.globals.translationJson && this.globals.translationJson[word]){
      const translated = this.globals.translationJson[word];
      if (transform === 'uppercase'){
            return translated.toUpperCase();
          }else if (transform === 'capitalize'){
            return translated[0].toUpperCase() +
              translated.slice(1);
          }else if (transform === 'lowercase'){
            return translated.toLowerCase();
          }
      return translated;
    }else{
      return word;
    }
}
}
