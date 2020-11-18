import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {TranslationService} from '../../../service/translation.service';

export interface DialogDataActor {
  title: '';
  actors: [];
}
@Component({
  selector: 'actors-dialog',
  templateUrl: 'actors-dialog.html',
  styleUrls: ['../admin-actor-users.component.scss']
})
export class ActorsUserDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ActorsUserDialogComponent>,
    public tl: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataActor) {}

  onNoClick(): void {
    this.dialogRef.close();
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
