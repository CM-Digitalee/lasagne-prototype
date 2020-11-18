import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from './cache.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export enum Verbs {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

@Injectable()
export class HttpClientService {

  constructor(
    private http: HttpClient,
    private _cacheService: CacheService,
  ) { }

  get<T>(options: HttpOptions): Observable<StreetResponse> {
    return this.httpCall(Verbs.GET, options);
  }

  delete<T>(options: HttpOptions): Observable<StreetResponse> {
    return this.httpCall(Verbs.DELETE, options);
  }

  post<T>(options: HttpOptions): Observable<StreetResponse> {
    return this.httpCall(Verbs.POST, options);
  }

  put<T>(options: HttpOptions): Observable<StreetResponse> {
    return this.httpCall(Verbs.PUT, options);
  }

  private httpCall<T>(verb: Verbs, options: HttpOptions): Observable<StreetResponse> {

    // Setup default values
    options.body = options.body || null;
    options.cacheMins = options.cacheMins || 0;

    if (options.cacheMins > 0) {
      // Get data from cache
      const data = this._cacheService.load(options.url);
      // Return data from cache
      if (data !== null) {
        return of<StreetResponse>(data);
      }
    }

    return this.http.request<StreetResponse>(verb, options.url, {
      body: options.body
    })
      .pipe(
        switchMap(response => {
          if (options.cacheMins > 0) {
            // Data will be cached
            this._cacheService.save({
              key: options.url,
              data: response,
              expirationMins: options.cacheMins
            });
          }
          return of<StreetResponse>(response);
        })
      );
  }
}

export class HttpOptions {
  url: string;
  body?: any;
  cacheMins?: number;
}

export class StreetResponse {
  answer: any;
  streets: object;
  timestamp: string;
}
