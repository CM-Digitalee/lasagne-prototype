import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortefoliosService {
  private readonly URL = 'https://ns-msrv-backend-dev.xtech.io/ui/menus';

  constructor() { }

  // resolvePortfolios(): Observable<any> {
  //   const url = this.tools.apiUrl + '/portefolio
  //   return this.tools.get(url);
  // }
}
