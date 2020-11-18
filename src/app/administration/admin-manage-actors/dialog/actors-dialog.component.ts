import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {TranslationService} from '../../../service/translation.service';

export interface DialogDataActor {
  iso: string;
  label: string;
  enabled: boolean;
  title: string;
  isEdition: boolean;
}
@Component({
  selector: 'actors-dialog',
  templateUrl: 'actors-dialog.html',
  styleUrls: ['../admin-manage-actors.component.scss']
})
export class ActorsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ActorsDialogComponent>,
    public tl: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataActor) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  isDisabled(): boolean {
    return this.data.iso.length !== 2 || (!this.data.label || this.data.label === '') || !this.isAlphaNumeric(this.data.iso);
  }
  isAlphaNumeric(str): boolean {
    let code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  }

}
