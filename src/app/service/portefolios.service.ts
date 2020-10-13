import { Injectable } from '@angular/core';
import {Tools} from '../tools/function';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortefoliosService {
  private readonly URL = 'https://ns-msrv-backend-dev.xtech.io/ui/menus';

  constructor(private tools: Tools) { }
  // create a method named: resolveItems()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object
  resolvePortfolios(): Observable<any> {
    const url = this.tools.apiUrl + '/portefolio
    return this.tools.get(url);
  }
}
