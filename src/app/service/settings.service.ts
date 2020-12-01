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
          .get<any>({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/menus/' + this.globals.languageId, cacheMins: 1440 }) // cache data for 7 days
          .subscribe(
            response => {
              const menus = [];
              const headerMenus = [];
              for (const property in response.answer){
                if (response.answer.hasOwnProperty(property) && response.answer[property].hasOwnProperty('menus')){
                  this.currentSettings = response.answer[property].menus;
                  let menu ;
                  if(property === 'headerMenus'){
                    menu = [...response.answer[property].menus]
                    headerMenus.push(menu);
                  }else{
                    menu = [...response.answer[property].menus]
                    menus.push(menu);
                  }

                  // this.itemsMenu.setItems(response.answer[property].menus);
                  menu.forEach(element => {
                    this.buildRoutes(router, element);
                    if (element.menus){
                      element.menus.forEach(subMenu => {
                        this.buildRoutes(router, subMenu, element);
                      });
                    }
                  });
                }
              }
              this.itemsMenu.setMenus(menus);
              resolve(true);
            },
            err => {
              reject(false);
            }
          );
        const promise2 = this._http.get<any>({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translationsui/' + this.globals.languageId, cacheMins: 1440 }).subscribe(
          response => {
            this.globals.translationJson = response.answer;
            resolve(true);
          },
          err => {
            reject(false);
          }
        );
        Promise.all([promise1, promise2]).then((values) => {
          this.globals.isAppInit = true;
          resolve();
        });
      });
    });
  }
  buildRoutes(router, element, parent?): void{
    if (element.resources && element.resources.resourcesUrl){
      for (const rs of element.resources.resourcesUrl){
        if (rs.type === 'IFRAME'){
          const label = element.label && typeof element.label === 'object' ? Object.values(element.label)[0] : '';
          const rdata = {
            text : label, // rs.description.translated,
            title: label,
            url: rs.url,
            overline: undefined
          };
          if(parent && parent.label){
            const lb = parent.label && typeof parent.label === 'object' ? Object.values(parent.label)[0] : '';
            rdata.overline = lb ;
          }
          router.config[0].children.push({ path: `${element.applicationRoute.charAt(0) === '/' ? element.applicationRoute.substring(1) : element.applicationRoute}`, component: IframeViewComponent, data: Object.assign({}, rdata) });
        }
      }
    }
    else if (element.applicationRoute && element.applicationComponent){
      const label = element.label && typeof element.label === 'object' ? Object.values(element.label)[0] : '';
      const rdata = {
        title : label, // element.label.translated,
        component: element.applicationComponent,
        overline: undefined
      };
      if(parent && parent.label){
        const lb = parent.label && typeof parent.label === 'object' ? Object.values(parent.label)[0] : '';
        rdata.overline = lb ;
      }
      // Register app component
      router.config[0].children.push({ path: `${element.applicationRoute.charAt(0) === '/' ? element.applicationRoute.substring(1) : element.applicationRoute}`, component: ComponentLoaderComponent, data: Object.assign({}, rdata) });
    }
  }
}
