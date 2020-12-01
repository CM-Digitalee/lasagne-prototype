import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {HttpClientService} from '../../service/http-client.service';
import {AdministrationService} from '../../service/administration.service';
import {TranslationService} from '../../service/translation.service';
import { ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject, observable, Observable, of as observableOf } from 'rxjs';
import {Tools} from '../../tools/function';

@Component({
  selector: 'app-admin-actor-details',
  templateUrl: './admin-actor-details.component.html',
  styleUrls: ['./admin-actor-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminActorDetailsComponent implements OnInit {
  public actorId ;
  public actor ;
  private newFunctionalityId ;
  private _functionalities = new BehaviorSubject<any>(null);
  private _actorFunctionalities = new BehaviorSubject<any>(null);
  private jsonFunctionalities = [];
  private jsonActorFunctionalities = [];
  public selectedFunctionalities = [];
  public selectedActorFunctionalities = [];

  constructor(private  http: HttpClientService,
              private administrationService: AdministrationService,
              public tl: TranslationService, private route: ActivatedRoute, private tools : Tools) { }
  get functionalities() {
    return this._functionalities.asObservable();
  }
  get actorFunctionalities() {
    return this._actorFunctionalities.asObservable();
  }
  ngOnInit(): void {
    // this.refreshFunctionalities();
    this.actorId = this.route.snapshot.paramMap.get('id');
    this.administrationService.getActor(this.actorId).subscribe(x => {
      this.actor = x.answer.actor;
    }, err => {
      alert("Actor with id" + this.actorId + " not found. ");
      this.tools.redirectNotFound();
    });
    this.refreshList();
    this.tools.updateTitles('test')
    // this.getActor();
    // this.refreshActorFunctionalities();
  }
  deleteActorFunctionality(functionality): void{
    this.administrationService.deleteFunctionalitiesActor(this.actorId, functionality.code).subscribe(
      x => console.log(x)
    );
  }
  isOnGlobal(code): boolean {
    console.log(this.jsonFunctionalities);
    console.log(code);
    console.log(this.jsonFunctionalities.length !== 0 && this.jsonFunctionalities.findIndex(x => x.code === code) !== -1);
    return this.jsonFunctionalities.length !== 0 && this.jsonFunctionalities.findIndex(x => x.code === code) !== -1;
  }
  isOnActor(code): boolean {
    return this.jsonActorFunctionalities.length !== 0 && this.jsonActorFunctionalities.findIndex(x => x.code === code) !== -1;
  }
  getActor(): void {
    this.administrationService.getFunctionalitiesActors(this.actorId).subscribe(
      x => console.log(x)
    );
  }
  addFunctionalityActor(): void{
    if (!this.actorId || this.actorId === ''){
      console.log('actor id must be specified');
      return;
    }
    const payload = {foundationActorId : parseInt(this.actorId, 10)};
    this.administrationService.addActors('foundation', null, payload).subscribe(x => {
      this.refreshActorFunctionalities();
    });
  }
  refreshActorFunctionalities(): void {
    console.log(this.actorId);
    this.administrationService.getFunctionalitiesActors(this.actorId).subscribe(x => {

      this.jsonActorFunctionalities = x.answer.functionalities;
      const list = [...this.jsonActorFunctionalities] ;
      list.forEach(element => {
        const idx = this.jsonFunctionalities.findIndex(actor => element.id === actor.id);
        if (idx !== -1){
          list.splice(idx, 1);
        }
      });
      this._actorFunctionalities.next( list);
    });
  }
  removeActorFunctionality(functionality): void{
    this.administrationService.deleteFunctionalitiesActor(this.actorId, functionality.code).subscribe(
      x => {console.log(x); this.refreshActorFunctionalities();  this.refreshFunctionalities(); }
    );
  }
  refreshFunctionalities(): void{
    this.administrationService.getFunctionalities().subscribe(x => {

      // dataSource.paginator = this.paginator;
      this.jsonFunctionalities = x.answer.functionalities;
      const list = [...this.jsonFunctionalities] ;
      list.forEach(element => {
        const idx = this.jsonActorFunctionalities.findIndex(actor => element.id === actor.id);
        if (idx !== -1){
          list.splice(idx, 1);
        }
      });

      const dataSource = new MatTableDataSource<any>(list);
      this._functionalities.next(list);
      // this._functionalities.next(dataSource);
    });
  }
  refreshList(): void{
    this.tools.loadElements()
    this.administrationService.getFunctionalities().subscribe(x => {
      this.administrationService.getFunctionalitiesActors(this.actorId).subscribe(y => {

        this.jsonFunctionalities = x.answer.functionalities;
        this.jsonActorFunctionalities = y.answer.functionalities;


        const list = [...this.jsonFunctionalities] ;
        list.forEach(element => {
          console.log(element);
          const idx = this.jsonActorFunctionalities.findIndex(actor => element.id === actor.id);
          if (idx !== -1){
            list.splice(idx, 1);
          }
        });

        const dataSource = new MatTableDataSource<any>(list);
        this._functionalities.next(list);

        const alist = [...this.jsonActorFunctionalities] ;
        this._actorFunctionalities.next( alist);
        this.tools.finishLoad();
      });
    });
  }
  addFunctionalities(): void {
    const promises = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedFunctionalities.length; i++ ){
      let code = '' + this.selectedFunctionalities[i].code
      promises.push(new Promise((resolve, reject) => {
        const payload = {code : code};
        this.administrationService.addFunctionalitiesActors(this.actorId, payload).subscribe(
        x => {resolve(true);
        },
        err => {
          reject(false);
        }
      ); }
));
    }
    Promise.all(promises).then((values) => {
      this.refreshList();
    });
  }
  removeFunctionalities(): void{
    const promises = [];
    for (let i = 0; i < this.selectedActorFunctionalities.length; i++ ){
      promises.push(new Promise((resolve, reject) => {
        let code = "" + this.selectedActorFunctionalities[i].code
        this.administrationService.deleteFunctionalitiesActor(this.actorId, code).subscribe(
          x => {resolve(true);
          },
          err => {
            reject(false);
          }
        ); }
      ));
    }
    Promise.all(promises).then((values) => {
      this.refreshList();
    });
  }

}
