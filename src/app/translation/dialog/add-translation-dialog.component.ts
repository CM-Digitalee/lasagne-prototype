import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {TranslationService} from '../../service/translation.service';

export interface DialogData {
  ui_id: string;
  translated: string;
  description: string;
  language: string;
  title: string;
  enabled: boolean;
}
@Component({
  selector: 'add-translation-dialog',
  templateUrl: 'add-translation-dialog.html',
  styleUrls: ['../translation.component.scss'],
})
export class AddTranslationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddTranslationDialogComponent>,
    public tl: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  isDisabled(): boolean {
    return (!this.data.description || this.data.description === '')  || (!this.data.ui_id || this.data.ui_id === '');
  }

}
