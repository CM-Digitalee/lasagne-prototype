import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClientService} from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClientService) { }
  getActors(type?: string, id?: string): Observable<any>{

    let url = 'https://ns-msrv-backend-dev.xtech.io/data/actors/';
    if (type && type === 'foundation') {
      url += 'foundation/';
    }
    else if (type && type === 'functionality') {
      url += 'with_functionality/';
    }
    if (id && id !== '') {
      url += id;
    }
    return this.http.get({url});
  }
  getActor(id): Observable<any>{
    let url = 'https://ns-msrv-backend-dev.xtech.io/data/actors/';
    if (id && id !== '') {
      url += id;
    }
    return this.http.get({url});
  }
  addActors(type?: string, id?: string, payload?: object): Observable<any>{
    let durl = 'https://ns-msrv-backend-dev.xtech.io/data/actors/';
    if (type && type === 'foundation') {
      durl += 'foundation';
    }

    if (id && id !== '') {
      durl += '/' + id;
    }
    return this.http.post({url: durl, body: payload});
  }
  getFoundations(type?: string): Observable<any>{
    let url = 'https://ns-msrv-backend-dev.xtech.io/foundation/';
    if (type && type === 'users') {
      url += 'users/';
    }
    else if (type && type === 'actors') {
      url += 'actors/';
    }
    return this.http.get({url});
  }
  getFunctionalities(code?: string): Observable<any>{
    let url = 'https://ns-msrv-backend-dev.xtech.io/data/functionalities/';
    if (code && code !== '') {
      url += code;
    }
    return this.http.get({url});
  }
  getFunctionalitiesActors(actorId?: string): Observable<any>{
    let url = 'https://ns-msrv-backend-dev.xtech.io/data/functionalities/actors/';
    if (actorId && actorId !== '') {
      url += actorId;
    }
    return this.http.get({url});
  }
  addFunctionalitiesActors(actorId: string, payload: object): Observable<any>{
    const url = 'https://ns-msrv-backend-dev.xtech.io/data/functionalities/actors/' + actorId;
    return this.http.post({url, body: payload});
  }
  deleteFunctionalitiesActor(actorId: string, code: string): Observable<any>{

    if ((!actorId || actorId === '') || (!code || code === '')) {
      return ;
    }
    const url = 'https://ns-msrv-backend-dev.xtech.io/data/functionalities/actors/' + actorId + '/' + code;
    return this.http.delete({url});
  }
  deleteFoundationsActor(actorId: any): Observable<any>{
    if ((!actorId || actorId === '')) {
      console.log('actor id must be specified');
      return ;
    }
    const url = 'https://ns-msrv-backend-dev.xtech.io/data/actors/foundation/' + actorId ;
    return this.http.delete({url});
  }
  getUserActors(id?: string): Observable<any>{
    const url = 'https://ns-msrv-backend-dev.xtech.io/foundation/actors/' + id + '/users';
    return this.http.get({url});
  }
  getActorsUser(id?: string): Observable<any>{
    const url = 'https://ns-msrv-backend-dev.xtech.io/foundation/users/' + id + '/actors';
    return this.http.get({url});
  }
  getFoundationUsers(id?: string, withActors?: boolean): Observable<any>{
    let url = 'https://ns-msrv-backend-dev.xtech.io/foundation/users/' ;
    if (id) {
      url += id ;
    }
    if (id && withActors) {
      url += '/actors';
    }
    return this.http.get({url});
  }
}
