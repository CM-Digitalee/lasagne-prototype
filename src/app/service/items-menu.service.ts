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
    // this.tools.get(this.URL).subscribe((data) => { this._itemsMenu$.next(data[1].menus); console.log(data[1]); } );
    const fakeDatas = {
      streets: {
        security: false
      },
      answer: {
        sideMenus: [
          {
            iconMaterialDesign: 'dashboard',
            route: '/dashboard',
            component: 'dashboard',
            resources: {
              resourcesUrl: [
                {
                  description: {
                    id: 1,
                    text: 'Dashboard'
                  },
                  type: 'IFRAME',
                  url: 'http://ns-iccube-dev.xtech.io/icCube/doc/ic3report?name=%2Fshared%2Fct%2F0)%20Tableau%20de%20Bord'
                }
              ]
            },
            label: {
              id: 1,
              text: 'Dashboard'
            }
          },
          {
            iconMaterialDesign: 'check_box',
            route: '/punchlist',
            component: 'punchlist',
            resources: {
              description: {
                id: 2,
                text: 'Punchlist'
              },
              type: 'TARGET',
              url: 'https://streets-uat.xtech.io/nadi/w/Streets/punchlist',
              target: '_blank'
            },
            label: {
              id: 2,
              text: 'Punchlist'
            },
            counter: 2
          },
          {
            iconMaterialDesign: 'search',
            resources: null,
            route: '/automatic-controls',
            component: 'automatic-controls',
            label: {
              id: 3,
              text: 'Automatic contols'
            },
            counter: 7,
            menus: [
              {
                resources: null,
                label: {
                  id: 4,
                  text: 'Etat locatifs'
                },
                counter: 2
              },
              {
                resources: null,
                label: {
                  id: 5,
                  text: 'Bilan'
                },
                counter: 2
              },
              {
                resources: null,
                label: {
                  id: 6,
                  text: 'P&L'
                },
                counter: 1
              },
              {
                resources: null,
                label: {
                  id: 7,
                  text: 'Aging'
                },
                counter: 2
              }
            ]
          },
          {
            iconMaterialDesign: 'account_balance',
            resources: null,
            route: '/soldes-comptables',
            component: 'soldes-comptables',
            label: {
              id: 8,
              text: 'Soldes comptables'
            }
          },
          {
            iconMaterialDesign: 'analytics',
            route: '/analytics',
            component: 'analytics',
            resources: null,
            label: {
              id: 9,
              text: 'Analyses'
            },
            menus: [
              {
                resources: {
                  resourcesUrl: [
                    {
                      description: {
                        id: 10,
                        text: 'Données locatives'
                      },
                      type: 'IFRAME',
                      url: 'https://ns-iccube-dev.xtech.io/icCube/doc/ic3report?name=%2Fshared%2Fct%2F2)%20Don%C3%A9es%20locatives'
                    }
                  ]
                },
                label: {
                  id: 10,
                  text: 'Données locatives'
                },
                route: '/analytics/rental-data',
                component: 'analytics-rental-data',
              },
              {
                resources: {
                  resourcesUrl: [
                    {
                      description: {
                        id: 11,
                        text: 'Etat des vacants'
                      },
                      type: 'IFRAME',
                      url: 'https://ns-iccube-dev.xtech.io/icCube/doc/ic3report?name=%2Fshared%2Fct%2F3)%20Etats%20de%20Vacants'
                    }
                  ]
                },
                label: {
                  id: 11,
                  text: 'Etat des vacants'
                },
                route: '/analytics/reference-data',
                component: 'analytics-reference-data',
              },
              {
                resources: {
                  resourcesUrl: [
                    {
                      description: {
                        id: 12,
                        text: 'Données de référence'
                      },
                      type: 'IFRAME',
                      url: 'https://ns-iccube-dev.xtech.io/icCube/doc/ic3report?name=%2Fshared%2Fct%2F1)%20Donn%C3%A9es%20de%20r%C3%A9f%C3%A9rences'
                    }
                  ]
                },
                label: {
                  id: 12,
                  text: 'Données de référence'
                }
              }
            ]
          }
        ],
        headerMenus: [],
        companyMenus: []
      },
      timestamp: '2020-10-18 18:41:23.56'
    };
    this._itemsMenu$.next(fakeDatas.answer.sideMenus);
  }
}
