import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AdministrationService} from '../../service/administration.service';
import {HttpClientService} from '../../service/http-client.service';
import {TranslationService} from '../../service/translation.service';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ActorsUserDialogComponent} from './dialog/actors-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-admin-actor-users',
  templateUrl: './admin-actor-users.component.html',
  styleUrls: ['./admin-actor-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminActorUsersComponent implements OnInit {
  private actorId ;
  private actor ;
  private _actorsUser = new BehaviorSubject<any>(null);

  constructor(private  http: HttpClientService,
              private administrationService: AdministrationService,
              public tl: TranslationService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }
  get actorsUser() {
    return this._actorsUser.asObservable();
  }
  ngOnInit(): void {
    this.actorId = this.route.snapshot.paramMap.get('id');
    // this.getActor();
    this.refreshActorUsers();
  }
  refreshActorUsers(): void {
    console.log(this.actorId);
    this.administrationService.getUserActors(this.actorId).subscribe(x => {
      if(x && x.answer && x.answer.users){
        const list = x.answer.users;
        const dataSource = new MatTableDataSource<any>(list);
        // dataSource.paginator = this.paginator;
        // this.jsonActorFunctionalities = x.answer.functionalities
        this._actorsUser.next(dataSource);
      }else{
        this._actorsUser.next([]);
      }

    });
  }
  showAllowedUsers(userid): void {
    console.log(this.actorId);
    this.administrationService.getActorsUser(userid).subscribe(x => {
      if(x && x.answer && x.answer.actors){
        const list = x.answer.actors;
        const dataSource = new MatTableDataSource<any>(list);
        // dataSource.paginator = this.paginator;
        // this.jsonActorFunctionalities = x.answer.functionalities
        // this._actorsUser.next(dataSource);
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
      console.log(result);
    });
  }

}
