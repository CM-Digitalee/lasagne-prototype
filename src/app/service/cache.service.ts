import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  constructor() { }

  save(options: LocalStorageSaveOptions): void {
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
  load(key) {

    const item = localStorage.getItem(key);
    if (item !== null) {
      const record = JSON.parse(item);
      const now = new Date().getTime();
      if (!record || (record.hasExpiration && record.expiration <= now)) {
        return null;
      } else {
        if (key === 'STREETS-version') {
        return record.value;
        }
        return JSON.parse(record.value) ;
      }
    }
    return null;
  }

  updateTranslation(id, value, options): void{
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
  cleanOneEntry(uid): void{
    localStorage.removeItem('https://ns-msrv-backend-dev.xtech.io/ui/translations/' + uid);
  }
  cleanOneTranslation(uid, lg): void{
    localStorage.removeItem('https://ns-msrv-backend-dev.xtech.io/ui/translations/' + uid + '/' + lg);
  }

  cleanTranslations(): void{
    localStorage.removeItem('https://ns-msrv-backend-dev.xtech.io/ui/translations_for_translators');
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  updateCache(key: string): void {
    localStorage.removeItem(key);
  }

  cleanLocalStorage(): void  {
    localStorage.clear();
  }
  cleanCachedQueries(queries: object): void {
    queries = Object.values(queries);

    // @ts-ignore
    for (const query of queries) {
      localStorage.removeItem(query);
    }
  }
}

export class LocalStorageSaveOptions {
  key: string;
  data: any;
  expirationMins?: number;
}
