import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ItemsMenuService} from '../../../service/items-menu.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
