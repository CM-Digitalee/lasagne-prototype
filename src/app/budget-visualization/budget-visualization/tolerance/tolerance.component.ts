import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SimulationTolerance } from 'src/app/shared';
import {TranslationService} from '../../../service/translation.service';

@Component({
  selector: 'app-tolerance',
  templateUrl: './tolerance.component.html',
  styleUrls: ['./tolerance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToleranceComponent {
  tolerance: SimulationTolerance = { ...this.data.toleranceForm.value };

  constructor(
    public dialogRef: MatDialogRef<ToleranceComponent>,
    public tl: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: { post, toleranceForm: FormControl }
  ) { }

  validate() {
    this.data.toleranceForm.setValue(this.tolerance);
    this.dialogRef.close();
  }
}
