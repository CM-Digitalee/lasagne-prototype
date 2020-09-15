import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: { 'class': 'flex align-center px-10 py-15' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent { }
