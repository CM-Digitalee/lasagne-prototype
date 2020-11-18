import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ItemsMenuService} from '../../../service/items-menu.service';
import {KeycloakBearerInterceptor} from 'keycloak-angular';
import {TranslationService} from '../../../service/translation.service';

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

  constructor(public itemsService: ItemsMenuService, public tl: TranslationService) {
  }

  ngOnInit(): void {
  }
  toggleMenu(list, key): void{
    if (this.activeMenu !== key) {
      list[key].show = true;
      this.activeMenu = key;
    }else{
      list[key].show = false;
      this.activeMenu = null ;
    }
  }
  getLabel(element): any{
    let label = element.label && typeof element.label === 'object' ? Object.values(element.label)[0] : '';
    return label;
  }

}
