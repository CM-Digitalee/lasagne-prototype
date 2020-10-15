import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-analytics-reference-data',
  templateUrl: './analytics-reference-data.component.html',
  styleUrls: ['./analytics-reference-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsReferenceDataComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
