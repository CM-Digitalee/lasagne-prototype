import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnDestroy {
  public message = 'Element not found';
  public title;
  public overline;
  subs: Array<Subscription> = [];

  constructor(private router: Router, private route: ActivatedRoute, private tl: TranslationService) {
    this.subs[0] = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route.snapshot),
        map(routeM => {
          while (routeM.firstChild) {
            routeM = routeM.firstChild;
          }
          return routeM;
        })
      )
      .subscribe((routeM: ActivatedRouteSnapshot) => {
        console.log(routeM);
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
