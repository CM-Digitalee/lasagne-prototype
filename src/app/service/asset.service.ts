import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private readonly URL = 'https://ns-msrv-backend-dev.xtech.io/ui/menus';

  constructor() { }
  // resolveAsset(): Observable<any> {
  //   return this.tools.get(this.URL);
  // }
}
