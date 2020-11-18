import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class Tools {

  constructor() {
  }

  removeSpace(str): string{
    return str.replace(/\s/g, '');
  }
  isAlphaNumeric(str): boolean {
    let code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  }

}

