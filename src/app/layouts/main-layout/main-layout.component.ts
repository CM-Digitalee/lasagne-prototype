import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-header></app-header>
    <div class="flex" style="height: 100%; width: 100%;">
      <app-sidenav class="no-shrink"></app-sidenav>
      <div class="fill ov-auto">
        <router-outlet></router-outlet>
      </div>
    </div>
    `,
  host: { 'class': 'flex column full-view ov-hidden' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent { }
