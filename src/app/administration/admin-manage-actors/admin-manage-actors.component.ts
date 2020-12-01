import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClientService} from '../../service/http-client.service';
import {AdministrationService} from '../../service/administration.service';
import {MatTableDataSource} from '@angular/material/table';
import {TranslationService} from '../../service/translation.service';
import {ActorsDialogComponent} from './dialog/actors-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {Tools} from '../../tools/function';

@Component({
  selector: 'app-admin-manage-actors',
  templateUrl: './admin-manage-actors.component.html',
  styleUrls: ['./admin-manage-actors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminManageActorsComponent implements OnInit {
  private _actors = new BehaviorSubject<any>(null);
  private _foundations = new BehaviorSubject<any>(null);
  public isLoadingBack$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoadingStreets$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private jsonActors = [];
  public comboActor = "nadi";


  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorL') paginatorL: MatPaginator;

  constructor(private  http: HttpClientService,
              private administrationService: AdministrationService,
              private router: Router,
              public tl: TranslationService,
              public dialog: MatDialog, private tools: Tools) { }
  ngOnInit(): void {
    this.refreshFoundation();
    this.refreshActors();
  }
  get actors() {
    return this._actors.asObservable();
  }
  get foundations() {
    return this._foundations.asObservable();
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
    this.router.navigate(['/administration/manage-actors/' + id + '/users']);
  }
  actorIsCreated(actor, corporateName): boolean {
    // return this.jsonActors.length !== 0 && this.jsonActors.findIndex(x => x.details.actor === actor && x.details.corporateName === corporateName) !== -1;
    return this.jsonActors.length !== 0 && this.jsonActors.findIndex(x => x.actor === actor && x.corporateName === corporateName) !== -1;
  }
  refreshActors(): void{
    this.isLoadingBack$.next(true);
    this.isLoadingStreets$.next(true);
    this.administrationService.getActors().subscribe(x => {
      const list = x.answer.actors;
      const dataSource = new MatTableDataSource<any>(list);
      dataSource.paginator = this.paginatorL;
      setTimeout(() => dataSource.paginator = this.paginatorL);
      this.jsonActors = list ;
      this._actors.next(list);
      this.isLoadingBack$.next(false);
      this.isLoadingStreets$.next(false);
    });
  }
  refreshFoundation(): void{
    this.isLoadingBack$.next(true);
    this.administrationService.getFoundations('actors').subscribe(x => {
      const list = x.answer.actors;
      const dataSource = new MatTableDataSource<any>(list);
      setTimeout(() => dataSource.paginator = this.paginator);
      this._foundations.next(dataSource);
      this.isLoadingBack$.next(false);
    });
  }
  clickAddFoundationActor(actorId): void{
    const payload = {foundationActorId : parseInt(actorId, 10)};
    this.administrationService.addActors('foundation', null, payload).subscribe(x => {
      this.refreshFoundation();
      this.refreshActors();
    });
  }
  deleteFoundationActor(id): void{
    this.tools.displayDeleteConfirmBox((result) => {
      if (result) {
        if (!id || id === '') {
          console.log('actor id must be specified');
          return;
        }
        this.administrationService.deleteFoundationsActor(id).subscribe(x => {
          this.refreshFoundation();
          this.refreshActors();
        });
      }
    });
  }
  switchEnabled(elmt): void {
    const pl = {enabled: !elmt.enabled};
    this.http.put({ url: 'https://ns-msrv-backend-dev.xtech.io/data/actors/' + elmt.id, body: pl }).subscribe(value => {
      this.refreshActors();
    });
  }

}
