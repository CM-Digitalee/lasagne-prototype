import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-header></app-header>
    <div class="flex">
      <app-sidenav></app-sidenav>
      <router-outlet></router-outlet>
    </div>
    `,
  host: { 'class': 'flex column full-view ov-hidden' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent { }
