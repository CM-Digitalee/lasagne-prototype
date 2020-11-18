import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {TranslationService} from '../../service/translation.service';

export interface DialogData {
  title: string;
  translated: string;
  enabled: boolean;
}
@Component({
  selector: 'add-translation-to-entry-dialog',
  templateUrl: 'add-translation-to-entry-dialog.html',
  styleUrls: ['../translation.component.scss'],
})
export class AddTranslationToEntryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddTranslationToEntryDialogComponent>,
    public tl: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  isDisabled(): boolean {
    return (!this.data.translated || this.data.translated === '');
  }

}
