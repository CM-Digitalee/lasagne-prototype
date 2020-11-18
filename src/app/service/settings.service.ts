import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {IframeViewComponent} from '../iframe-view/iframe-view.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {ItemsMenuService} from './items-menu.service';
import {ComponentLoaderComponent} from '../component-loader/component-loader.component';
import {Globals} from '../common/global';
import {HttpClientService} from './http-client.service';


@Injectable()
export class SettingsService {

  currentSettings: any;

  constructor(
    private injector: Injector,
    private itemsMenu: ItemsMenuService,
    private globals: Globals,
    private _http: HttpClientService
  ) {   }

  loadSettings(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const router = this.injector.get(Router);
        const promise1 = this._http
          .get<any>({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/menus/' + this.globals.languageId, cacheMins: 10080 }) //cache data for 7 days
          .subscribe(
            response => {
              this.currentSettings = response.answer.sideMenus.menus;
              this.itemsMenu.setItems(this.currentSettings);
              this.currentSettings.forEach(element => {
                this.buildRoutes(router, element);
                if (element.menus){
                  element.menus.forEach(subMenu => {
                    this.buildRoutes(router, subMenu);
                  });
                }
              });
              resolve(true);
            },
            err => {
              reject(false);
            }
          );
        const promise2 = this._http.get<any>({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translationsui/' + this.globals.languageId, cacheMins: 10080 }).subscribe(
          response => {
            this.globals.translationJson = response.answer;
            resolve(true);
          },
          err => {
            reject(false);
          }
        );
        Promise.all([promise1, promise2]).then((values) => {
          this.globals.isAppInit = true
          resolve();
        });
      });
    });
  }
  buildRoutes(router, element): void{
    if (element.resources && element.resources.resourcesUrl){
      for (const rs of element.resources.resourcesUrl){
        if (rs.type === 'IFRAME'){
          let label = element.label && typeof element.label === 'object' ? Object.values(element.label)[0] : '';
          const rdata = {
            text : label, // rs.description.translated,
            url: rs.url
          };
          router.config[0].children.push({ path: `${element.applicationRoute.charAt(0) === '/' ? element.applicationRoute.substring(1) : element.applicationRoute}`, component: IframeViewComponent, data: Object.assign({}, rdata) });
        }
      }
    }
    else if (element.applicationRoute && element.applicationComponent){
      let label = element.label && typeof element.label === 'object' ? Object.values(element.label)[0] : '';
      const rdata = {
        title : label, //element.label.translated,
        component: element.applicationComponent
      };
      // Register app component
      router.config[0].children.push({ path: `${element.applicationRoute.charAt(0) === '/' ? element.applicationRoute.substring(1) : element.applicationRoute}`, component: ComponentLoaderComponent, data: Object.assign({}, rdata) });
    }
  }
}
