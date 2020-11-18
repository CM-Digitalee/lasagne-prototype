import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {CompComponent} from '../component-loader/comp.component';
import {TranslationService} from '../service/translation.service';

@Component({
  selector: 'app-punchlist',
  templateUrl: './punchlist.component.html',
  styleUrls: ['./punchlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PunchlistComponent  implements CompComponent {
  @Input() data: any;
  constructor(public tl: TranslationService) { }

}
