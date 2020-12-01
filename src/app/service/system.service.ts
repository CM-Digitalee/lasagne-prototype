import { Injectable } from '@angular/core'
import { CacheService } from './cache.service'
import { environment } from 'src/environments/environment'

@Injectable()
export class SystemService {

  // List of cached queries that'll removed from localStorage after each new release
  cachedQueries = {
    // MENU_LIST: `${environment.API_DOMAIN}/menus`,
    // LANGUAGES_LIST: `${environment.API_DOMAIN}/ui/languages`,
    // TRANSLATIONS_LIST: `${environment.API_DOMAIN}/ui/translations`,
    // TRANSLATIONS_TRANSLATOR_LIST: `${environment.API_DOMAIN}/ui/translations_for_translators`,
  }
  versionCookie = 'STREETS-version'

  constructor(
    private _cacheService: CacheService
  ) { }

  checkVersion(): void {
    console.log(this.userHasOlderVersion())
    if (this.userHasOlderVersion()) {
      // clean local storage after version update
      this._cacheService.cleanLocalStorage();

      // Set new version
      this._cacheService.save({ key: this.versionCookie, data: environment.VERSION })
      // Cleanup cached queries to avoid inconsistencies
      //this._cacheService.cleanCachedQueries(this.cachedQueries);

    }
  }

  userHasOlderVersion(): boolean {
    const userVersion = this._cacheService.load( this.versionCookie )
    console.log(userVersion)
    if (userVersion === null) {
      return true;
    }

    return userVersion !== environment.VERSION;
  }

}
