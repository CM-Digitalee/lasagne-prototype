import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClientService} from '../../service/http-client.service';
import {AdministrationService} from '../../service/administration.service';
import {MatTableDataSource} from '@angular/material/table';
import {TranslationService} from '../../service/translation.service';
import {ActorsDialogComponent} from './dialog/actors-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-manage-actors',
  templateUrl: './admin-manage-actors.component.html',
  styleUrls: ['./admin-manage-actors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminManageActorsComponent implements OnInit {
  private _actors = new BehaviorSubject<any>(null);
  private _foundations = new BehaviorSubject<any>(null);
  private _foundationActors = new BehaviorSubject<any>(null);
  private jsonFoundationsActors = [];
  public comboActor ;
  public newActorId ;
  constructor(private  http: HttpClientService,
              private administrationService: AdministrationService,
              private router: Router,
              public tl: TranslationService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.administrationService.getActors('foundation').subscribe(x => {
      const list = x.answer.actors;
      const dataSource = new MatTableDataSource<any>(list);
      // dataSource.paginator = this.paginator;
      this.jsonFoundationsActors = list ;
      this._foundationActors.next(dataSource);
      this.refreshActors();
    });
   // this.refreshActors();
  }
  get actors() {
    return this._actors.asObservable();
  }
  get foundations() {
    return this._foundations.asObservable();
  }
  get foundationActors() {
    return this._foundationActors.asObservable();
  }
  switchType(event): void{
    if (event.value === 'nadi'){
      this.refreshFoundation();
    }else{

    }
  }
  openActorFunctionalities(id): void {
    this.router.navigate(['/administration/manage-actors/' + id + '/functionalities']);
  }
  openActorUser(id): void {
    this.router.navigate(['/administration/manage-actors/' + id + '/actors']);
  }
  refreshFoundationActors(): void{
    this.administrationService.getActors('foundation').subscribe(x => {
      const list = x.answer.actors;
      const dataSource = new MatTableDataSource<any>(list);
      // dataSource.paginator = this.paginator;
      this.jsonFoundationsActors = list ;
      this._foundationActors.next(dataSource);
    });
  }
  refreshActors(): void{
    this.administrationService.getActors().subscribe(x => {
      const list = x.answer.actors;
      const dataSource = new MatTableDataSource<any>(list);
       // dataSource.paginator = this.paginator;
      const updatedList = list.map(elmt => {
        const idx = this.jsonFoundationsActors.findIndex(k => k.id === elmt.id);
        if (idx !== -1){
          elmt.details = this.jsonFoundationsActors[idx];
          elmt.foundation = true;
        }
        return elmt ;
      }) ;
      console.log(updatedList)
      this._actors.next(updatedList);
    });
  }
  refreshFoundation(): void{
    this.administrationService.getFoundations('actors').subscribe(x => {
      const list = x.answer.actors;
      const dataSource = new MatTableDataSource<any>(list);
      // dataSource.paginator = this.paginator;
      this._foundations.next(dataSource);
    });
  }
  addFoundationActor(): void{
    if (!this.newActorId || this.newActorId === ''){
      console.log('actor id must be specified');
      return;
    }
    const payload = {foundationActorId : parseInt(this.newActorId, 10)};
    this.administrationService.addActors('foundation', null, payload).subscribe(x => {
      console.log(x);
      this.refreshFoundationActors();
      // this._foundations.next(dataSource);
    });
  }
  deleteFoundationActor(id): void{
    if (!id || id === ''){
      console.log('actor id must be specified');
      return;
    }
    this.administrationService.deleteFoundationsActor(id).subscribe(x => {
      console.log(x);
      this.refreshFoundationActors();
      // this._foundations.next(dataSource);
    });
  }
  openDialogActor(): void {
    const dialogRef = this.dialog.open(ActorsDialogComponent, {
      width: '60%',
      data:  {title: 'Add new entry', enabled: true, description: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
    });
  }
  switchEnabled(elmt): void {
    const pl = {enabled: !elmt.enabled};
    this.http.put({ url: 'https://ns-msrv-backend-dev.xtech.io/data/actors/' + elmt.id, body: pl }).subscribe(value => {
      this.refreshActors();
    });
  }

}
