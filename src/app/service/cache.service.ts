import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  constructor() { }

  // tslint:disable-next-line:typedef
  save(options: LocalStorageSaveOptions) {
    // Set default values for optionals
    options.expirationMins = options.expirationMins || 0;

    // Set expiration date in miliseconds
    const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0;

    const record = {
      value: typeof options.data === 'string' ? options.data : JSON.stringify(options.data),
      expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
      hasExpiration: expirationMS !== 0 ? true : false
    };
    localStorage.setItem(options.key, JSON.stringify(record));
  }

  // tslint:disable-next-line:typedef
  load(key: string) {
    // Get cached data from localstorage
    console.log(key);
    const item = localStorage.getItem(key);
    if (item !== null) {
      const record = JSON.parse(item);
      const now = new Date().getTime();
      // Expired data will return null
      if (!record || (record.hasExpiration && record.expiration <= now)) {
        return null;
      } else {
        console.log(record);
        console.log(JSON.parse(record.value));
        return JSON.parse(record.value);
      }
    }
    return null;
  }

  updateTranslation(id, value, options){
    const url = 'https://ns-msrv-backend-dev.xtech.io/ui/translations_for_translators';
    const item = localStorage.getItem(url);
    if (item !== null) {
      const record = JSON.parse(item);
      if (record.answer.hasOwnProperty(id)){
         record.answer[id] = value;
         options.expirationMins = options.expirationMins || 0;

        // Set expiration date in miliseconds
         const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0;


         record.expiration =  expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
         record.hasExpiration = expirationMS !== 0 ? true : false;
         localStorage.removeItem(url);
         localStorage.setItem(url, JSON.stringify(record));
      }
    }
  }
  cleanOneEntry(uid){
    localStorage.removeItem('https://ns-msrv-backend-dev.xtech.io/ui/translations/' + uid);
  }
  cleanOneTranslation(uid, lg){
    localStorage.removeItem('https://ns-msrv-backend-dev.xtech.io/ui/translations/' + uid + '/' + lg);
  }

  cleanTranslations(){
    localStorage.removeItem('https://ns-msrv-backend-dev.xtech.io/ui/translations_for_translators');
  }

  // tslint:disable-next-line:typedef
  remove(key: string) {
    localStorage.removeItem(key);
  }

  // tslint:disable-next-line:typedef
  updateCache(key: string) {
    localStorage.removeItem(key);
  }

  // tslint:disable-next-line:typedef
  cleanLocalStorage() {
    localStorage.clear();
  }
}

export class LocalStorageSaveOptions {
  key: string;
  data: any;
  expirationMins?: number;
}
