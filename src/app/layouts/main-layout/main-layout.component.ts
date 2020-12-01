import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {TranslationService} from '../../service/translation.service';
@Component({
  selector: 'app-main-layout',
  template: `
    <app-header #header></app-header>
    <div class="flex fill">
<!--
      <app-sidenav class="no-shrink"></app-sidenav>
-->
      <app-sidemenu class="no-shrink"></app-sidemenu>
      <div class="fill ov-auto" style="height: calc(100vh - 60px); background-color:#E9EAFF">
        <div class="p-100" style="height:95%;position:relative;">
            <div class="panel-header">
                <h2 class="overline">{{overline}}</h2>
                <h1>{{title}}</h1>
            </div>
<!--        <div class="p-40" style="height:100%;overflow-y: auto;">-->
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    `,
  styleUrls: ['./main-layout.component.scss'],
  host: { class: 'flex column full-view ov-hidden' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent  implements OnDestroy {
  public title;
  public overline;
  subs: Array<Subscription> = [];

  constructor(private router: Router, private route: ActivatedRoute, private tl: TranslationService) {
    this.subs[0] = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route.snapshot),
        map(routeM => {
          while (routeM.firstChild && routeM.data.title !== 'not_found') {
            routeM = routeM.firstChild;
          }
          return routeM;
        })
      )
      .subscribe((routeM: ActivatedRouteSnapshot) => {
        console.log(routeM)
        console.log(routeM.data)
        console.log('title', this.route.root.firstChild.snapshot.data.title);
        if (routeM.data){
          this.title = this.tl.translate(routeM.data.title, 'capitalize');
          this.overline = this.tl.translate(routeM.data.overline, 'uppercase');
        }
      });
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}

