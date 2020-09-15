import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  host: { 'class': 'flex column align-center py-15' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent { }
