import { Injectable } from '@angular/core';
import {Tools} from '../tools/function';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private readonly URL = 'https://ns-msrv-backend-dev.xtech.io/ui/menus';

  constructor(private tools: Tools) { }
  // create a method named: resolveItems()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object
  resolveAsset(): Observable<any> {
    return this.tools.get(this.URL);
  }
}
