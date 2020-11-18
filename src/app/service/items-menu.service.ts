import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Tools} from '../tools/function';
import {Globals} from '../common/global';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ItemsMenuService {

  // URL which returns list of JSON items (API end-point URL)
  private readonly URL = 'https://ns-msrv-backend-dev.xtech.io/ui/menus';
  private _itemsMenu$ = new BehaviorSubject<any>(null);
  private language = 'en';
  get itemsMenu$() {
    // return JSON.parse(localStorage.getItem('user'));
    return this._itemsMenu$.asObservable();
  }
  constructor(private tools: Tools, public globals: Globals, public router: Router) { }

  public setItems(value): void{
    this._itemsMenu$.next(value);
    this.globals.sideMenus = value ;
  }
}
