import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Tools} from '../tools/function';
import {User} from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ItemsMenuService {

  // URL which returns list of JSON items (API end-point URL)
  private readonly URL = 'https://ns-msrv-backend-dev.xtech.io/ui/menus';
  private _itemsMenu$ = new BehaviorSubject<any>(null);
  get itemsMenu$() {
    // return JSON.parse(localStorage.getItem('user'));
    return this._itemsMenu$.asObservable();
  }
  constructor(private tools: Tools) { }
  // create a method named: resolveItems()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object
  resolveItems(): void {
    this.tools.get(this.URL).subscribe((data) => { this._itemsMenu$.next(data.answer.sideMenus); console.log(data.answer.sideMenus); } );
  }
}
