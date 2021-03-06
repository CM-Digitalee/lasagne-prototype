import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {TranslationService} from '../../service/translation.service';
import {Tools} from '../../tools/function';
@Component({
  selector: 'app-main-layout',
  template: `
    <app-header #header></app-header>
    <div class="flex fill">
<!--
      <app-sidenav class="no-shrink"></app-sidenav>
-->
      <app-sidemenu class="no-shrink"></app-sidemenu>
        <div class="spinner-wrapper-global" *ngIf="(tools.displayOverlay | async)">
            <mat-spinner *ngIf="(tools.isLoading | async) > 0">
            </mat-spinner>
        </div>

        <div class="fill ov-auto" style="height: calc(100vh - 60px); background-color:#E9EAFF">
        <div class="p-100" style="height:95%;position:relative;">
            <div class="panel-header">
                <div *ngIf="!(tools.hideMainTitle | async)">
                    <h2 class="overline">{{overline}}</h2>
                    <h1>{{title}}</h1>
                </div>
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

  constructor(private router: Router, private route: ActivatedRoute, private tl: TranslationService, public tools: Tools) {
    this.tools.showTitle();
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
        console.log( routeM.component)
        console.log( this.route.component)
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

