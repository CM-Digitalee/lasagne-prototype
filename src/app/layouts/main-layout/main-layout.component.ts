import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-header #header></app-header>
    <div class="flex fill ov-auto">
      <app-sidenav class="no-shrink"></app-sidenav>
      <div class="fill">
        <router-outlet></router-outlet>
      </div>
    </div>
    `,
  host: { 'class': 'flex column full-view ov-hidden' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent { }
