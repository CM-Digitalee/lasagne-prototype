import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iframe-view',
  templateUrl: './iframe-view.component.html',
  styleUrls: ['./iframe-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IframeViewComponent implements OnInit, OnDestroy {
  private url;
  private title;
  private sub;
  private id;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
