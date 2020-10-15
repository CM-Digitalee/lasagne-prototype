import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-document-validation',
  templateUrl: './document-validation.component.html',
  styleUrls: ['./document-validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentValidationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
