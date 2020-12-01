import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AdministrationService} from '../../service/administration.service';
import {HttpClientService} from '../../service/http-client.service';
import {TranslationService} from '../../service/translation.service';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ActorsUserDialogComponent} from './dialog/actors-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Tools} from '../../tools/function';

@Component({
  selector: 'app-admin-actor-users',
  templateUrl: './admin-actor-users.component.html',
  styleUrls: ['./admin-actor-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminActorUsersComponent implements OnInit {
  public actorId ;
  public actor ;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _actorsUser = new BehaviorSubject<any>(null);

  constructor(private  http: HttpClientService,
              private administrationService: AdministrationService,
              public tl: TranslationService,
              private route: ActivatedRoute,
              public dialog: MatDialog, private tools: Tools) { }
  get actorsUser() {
    return this._actorsUser.asObservable();
  }
  ngOnInit(): void {
    this.actorId = this.route.snapshot.paramMap.get('id');
    // this.getActor();
    this.refreshActorUsers();
  }
  refreshActorUsers(): void {
    this.tools.loadElements()
    this.administrationService.getUserActors(this.actorId).subscribe(x => {
      if (x && x.answer && x.answer.users){
        const list = x.answer.users;
        const dataSource = new MatTableDataSource<any>(list);
        // dataSource.paginator = this.paginator;
        // this.jsonActorFunctionalities = x.answer.functionalities
        this._actorsUser.next(dataSource);
      }else{
        this._actorsUser.next([]);
      }
        this.tools.finishLoad();

    }, err => {//this.tools.redirectNotFound();
        this.tools.finishLoad();
       },
      () => {

        this.tools.finishLoad();
        console.log(this.isLoading$);
      });
    this.administrationService.getActor(this.actorId).subscribe(x => {
      this.actor = x.answer.actor;
    }, err => {this.tools.redirectNotFound(); });
  }
  showAllowedUsers(userid): void {
    this.administrationService.getActorsUser(userid).subscribe(x => {
      if (x && x.answer && x.answer.actors){
        const list = x.answer.actors;
        this.openDialogActor(userid, list);
      }else{
        // this._actorsUser.next([]);
      }

    });
  }
  openDialogActor(userid, dataSource): void {
    const dialogRef = this.dialog.open(ActorsUserDialogComponent, {
      width: '60%',
      data:  {title: 'Allowed actors on user ' + userid, actors: dataSource}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
