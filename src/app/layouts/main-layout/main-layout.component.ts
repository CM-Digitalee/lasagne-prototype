import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-header #header></app-header>
    <div class="flex fill">
<!--
      <app-sidenav class="no-shrink"></app-sidenav>
-->
      <app-sidemenu class="no-shrink"></app-sidemenu>
      <div class="fill ov-auto" style="height: calc(100vh - 60px)">
        <router-outlet></router-outlet>
      </div>
    </div>
    `,
  host: { 'class': 'flex column full-view ov-hidden' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent { }
