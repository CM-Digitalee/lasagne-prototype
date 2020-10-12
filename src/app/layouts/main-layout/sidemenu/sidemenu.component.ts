import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ItemsMenuService} from '../../../service/items-menu.service';
import {KeycloakBearerInterceptor} from 'keycloak-angular';
import { HTTP_INTERCEPTORS } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    }
  ]
})
export class SidemenuComponent implements OnInit {

  @Input()
  result$: Observable<any>;

  constructor(private itemsService: ItemsMenuService) {
    this.result$ = itemsService.resolveItems();
    console.log(this.result$);
  }

  ngOnInit(): void {
  }

}
