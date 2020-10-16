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
  getUrl(): string {
    return 'https://ns-iccube-dev.xtech.io/icCube/doc/ic3report?name=%2Fshared%2Fct%2F1)%20Donn%C3%A9es%20de%20r%C3%A9f%C3%A9rences'
  }

}
