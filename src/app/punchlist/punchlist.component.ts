import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-punchlist',
  templateUrl: './punchlist.component.html',
  styleUrls: ['./punchlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PunchlistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
