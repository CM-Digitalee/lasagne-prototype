import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-analytics-rental-data',
  templateUrl: './analytics-rental-data.component.html',
  styleUrls: ['./analytics-rental-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsRentalDataComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
