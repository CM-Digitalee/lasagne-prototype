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

  constructor(public itemsService: ItemsMenuService) {
    itemsService.resolveItems();
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

}
