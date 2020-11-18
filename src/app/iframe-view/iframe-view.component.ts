import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-iframe-view',
  templateUrl: './iframe-view.component.html',
  styleUrls: ['./iframe-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IframeViewComponent implements OnInit, OnDestroy  {
  public title;
  public url;
  private sub;
  private id;

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, public tl: TranslationService) { }

  ngOnInit(): void {
    this.sub = this.route
      .data
      .subscribe(v => {this.url = v.url; this.title = v.text });
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
