import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Tools} from '../tools/function';

@Injectable({
  providedIn: 'root'
})
export class ItemsMenuService {

  // URL which returns list of JSON items (API end-point URL)
  private readonly URL = 'https://ns-msrv-backend-dev.xtech.io/ui/menus';

  constructor(private tools: Tools) { }
  // create a method named: resolveItems()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object
  resolveItems(): Observable<any> {
    return this.tools.get(this.URL);
  }
}
