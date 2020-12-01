import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmboxComponent} from '../layouts/confirmbox/confirmbox.component';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class Tools {

  constructor(private router: Router, public dialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }
  public isLoading$: BehaviorSubject<number> = new BehaviorSubject(0);

  loadElements(nb?: number): void{
    if (nb){
      this.isLoading$.next(this.isLoading$.value + nb);
    }else{
      this.isLoading$.next(this.isLoading$.value + 1);
    }
  }
  finishLoad(nb?: number): void{
    if (this.isLoading$.value !== 0){
      if (nb){
        this.isLoading$.next(this.isLoading$.value - nb);
      }else{
        this.isLoading$.next(this.isLoading$.value - 1);
      }
    }
  }
  displayConfirmBox(element, callback): void{

      const dialogRef = this.dialog.open(ConfirmboxComponent, {
        width: '60%',
        data:  element
      });

      dialogRef.afterClosed().subscribe(result => {
      callback(result);
    });

  }
  displayDeleteConfirmBox(callback): void{

    const dialogRef = this.dialog.open(ConfirmboxComponent, {
      width: '40%',
      data:  {title: 'Warning', message: 'Do you really want to delete this item?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      callback(result);
    });

  }
  // not working yet
  updateTitles(title, overline?): void{
    console.log(this.activatedRoute.data);
    // in EventTemplateComponent  ngOnInit function
//     this.activatedRoute.data['value']['title'] = title;
// // for child component
//     this.activatedRoute.parent.data['value']['title'] = title ;
  }
  redirectNotFound(): void{
    this.router.navigate(['/404']);
  }
  removeSpace(str): string{
    return str.replace(/\s/g, '');
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

