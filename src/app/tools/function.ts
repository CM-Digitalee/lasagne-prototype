import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class Tools {

  menuUrl;
  apiUrl;

  constructor(private http: HttpClient) {
    this.menuUrl = 'https://ns-msrv-backend-dev.xtech.io/ui/menus';
    this.apiUrl = 'https://ns-msrv-backend-dev.xtech.io/ui/menus';
  }
  // create a method named: resolveItems()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object
  get(url): Observable<any> {
    console.log(' Get Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API
    const pheaders = new HttpHeaders({
      // Authorization: 'Authorization: Bearer ' + access_token
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials' : 'true'
    });
    return this.http.get(url, {withCredentials: true, headers: pheaders})
      .pipe(
      catchError(error => {
        console.log('Caught in CatchError. Returning 0')
        return of(0);
      })
    );
  }
  post(url, data): Observable<any> {
    console.log('Post Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API
    const pheaders = new HttpHeaders({
      // Authorization: 'Authorization: Bearer ' + access_token
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials' : 'true'
    });
    return this.http.post<any>(url, data, {withCredentials: true, headers: pheaders})
      .pipe(
        catchError(error => {
          console.log('Caught in CatchError. Returning 0')
          return of(0);
        })
      );
  }
  delete(url): Observable<any> {
    console.log('Delete Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API
    const pheaders = new HttpHeaders({
      // Authorization: 'Authorization: Bearer ' + access_token
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials' : 'true'
    });
    return this.http.delete(url, {withCredentials: true, headers: pheaders})
      .pipe(
        catchError(error => {
          console.log('Caught in CatchError. Returning 0')
          return of(0);
        })
      ); //.suscribe();
  }
  put(url, data): Observable<any> {
    console.log('Put Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API
    const pheaders = new HttpHeaders({
      // Authorization: 'Authorization: Bearer ' + access_token
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials' : 'true'
    });
    return this.http.put(url, data,{withCredentials: true, headers: pheaders})
      .pipe(
        catchError(error => {
          console.log('Caught in CatchError. Returning 0')
          return of(0);
        })
      ); //.suscribe();
  }
  patch(url, data): Observable<any> {
    console.log('Put Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API
    const pheaders = new HttpHeaders({
      // Authorization: 'Authorization: Bearer ' + access_token
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials' : 'true'
    });
    return this.http.patch(url, data, {withCredentials: true, headers: pheaders})
      .pipe(
        catchError(error => {
          console.log('Caught in CatchError. Returning 0')
          return of(0);
        })
      ); //.suscribe();
  }
}

