import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {HttpClientService} from '../../service/http-client.service';
import {AdministrationService} from '../../service/administration.service';
import {TranslationService} from '../../service/translation.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminUsersComponent implements OnInit {

  private _users = new BehaviorSubject<any>(null);

  constructor(private  http: HttpClientService,
              private administrationService: AdministrationService,
              public tl: TranslationService,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              public dialog: MatDialog) { }
  get users() {
    return this._users.asObservable();
  }
  ngOnInit(): void {
    this.refreshUsers();
  }

  refreshUsers(): void {
    this.administrationService.getFoundationUsers().subscribe(elmt => {
      if(elmt && elmt.answer && elmt.answer.users){
        const list = elmt.answer.users;
        const dataSource = new MatTableDataSource<any>(list);
        // dataSource.paginator = this.paginator;
        // this.jsonActorFunctionalities = x.answer.functionalities
        this._users.next(dataSource);
        const anAsyncFunction = async (item, idx) => {
          // return functionWithPromise(item);
          console.log(item);
          return this.getActorPromise(item.id).then(x => {
            item.actors = x;
            return item;
          });
        };

        const getData = async () => {
          return Promise.all(list.map((item, idx) => anAsyncFunction(item, idx)));
        };
        getData().then(lista => {
          const dataSourceL = new MatTableDataSource<any>(lista);
          // dataSourceL.paginator = this.paginatorL;
          this._users.next(dataSourceL);
          this.cdr.detectChanges();
        }).catch(err => {
          console.log(err);
        });


      }else{
        this._users.next([]);
      }

    });
  }
  getActorPromise(userId): Promise<any> {
    return this.administrationService.getFoundationUsers(userId, true).toPromise()
      .then(item => {
        if (item && item.answer){
          return Promise.resolve(item.answer.actors);
        }else{
          return Promise.resolve([]);
        }

      } ).catch( error => {console.log(error); return Promise.resolve(null);});
  }
  getActorDetails(userId) {
    // return this.administrationService.getFoundationUsers(userId, true);
    return this.administrationService.getFoundationUsers(userId, true).subscribe(x => {
      let list = []
      if (x && x.answer && x.answer.actors){
        list = x.answer.actors;
      }
      return list;

    });
  }

}
