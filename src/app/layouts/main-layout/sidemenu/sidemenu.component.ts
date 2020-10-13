import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ItemsMenuService} from '../../../service/items-menu.service';
import {KeycloakBearerInterceptor} from 'keycloak-angular';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidemenuComponent implements OnInit {

  @Input()
  result$: Observable<any>;
  itemsMenu: Array<any>;
  activeMenu: number;

  constructor(private itemsService: ItemsMenuService) {
    this.result$ = itemsService.resolveItems();
    this.result$.subscribe((data) => { this.itemsMenu = data[1].menus; console.log(data[1]); } );
    // tslint:disable-next-line:max-line-length
    // this.result$ = [{labelTranslationId: 1, iconId: 1, resourceUrl: 'https://streets.realestate', genericLabel: 'tableau de bord'}, {labelTranslationId: 2, iconId: 2, resourceUrl: 'https://streets.realestate', counter: 2, genericLabel: 'punchlist'}, {labelTranslationId: 3, iconId: 2, resourceUrl: 'https://streets.realestate', counter: 7, menus: [{labelTranslationId: 4, resourceUrl: 'https://streets.realestate', counter: 2, genericLabel: 'etats locatifs'}, {labelTranslationId: 5, resourceUrl: 'https://streets.realestate', counter: 2, genericLabel: 'bilan'}, {labelTranslationId: 6, resourceUrl: 'https://streets.realestate', counter: 1, genericLabel: 'P&P'}, {labelTranslationId: 7, resourceUrl: 'https://streets.realestate', counter: 2, genericLabel: 'Contentieux'}], genericLabel: 'automatic control'}, {labelTranslationId: 8, iconId: 3, resourceUrl: 'https://streets.realestate', genericLabel: 'soldes comptables'}, {labelTranslationId: 9, iconId: 3, resourceUrl: 'https://streets.realestate', menus: [{labelTranslationId: 10, resourceUrl: 'https://streets.realestate', genericLabel: 'données locatives'}, {labelTranslationId: 11, resourceUrl: 'https://streets.realestate', genericLabel: 'etat des vacants'}, {labelTranslationId: 12, resourceUrl: 'https://streets.realestate', genericLabel: 'données de référence'}], genericLabel: 'analyses'}];
    console.log(this.result$);
  }

  ngOnInit(): void {
  }
  toggleMenu(key): void{
    // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < this.itemsMenu.length; i++){
    //   this.itemsMenu[i].show = false;
    // }
    if (this.activeMenu !== key) {
      this.itemsMenu[key].show = true;
      this.activeMenu = key;
    }else{
      this.itemsMenu[key].show = false;
      this.activeMenu = null ;
    }
  }

}
