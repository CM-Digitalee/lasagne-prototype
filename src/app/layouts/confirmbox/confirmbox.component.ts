import {Component, OnInit, ChangeDetectionStrategy, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslationService} from '../../service/translation.service';
import {MatIconModule} from '@angular/material/icon';


export interface DialogData{
  title: string;
  message: string;
}
@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrls: ['./confirmbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation : ViewEncapsulation.None,
})

export class ConfirmboxComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<ConfirmboxComponent>,
                  public tl: TranslationService,
                  @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
