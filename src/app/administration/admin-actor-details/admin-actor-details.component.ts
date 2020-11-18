import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {HttpClientService} from '../../service/http-client.service';
import {AdministrationService} from '../../service/administration.service';
import {TranslationService} from '../../service/translation.service';
import { ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject, observable, Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-admin-actor-details',
  templateUrl: './admin-actor-details.component.html',
  styleUrls: ['./admin-actor-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminActorDetailsComponent implements OnInit {
  private actorId ;
  private newFunctionalityId ;
  private _functionalities = new BehaviorSubject<any>(null);
  private _actorFunctionalities = new BehaviorSubject<any>(null);
  private jsonFunctionalities = []
  private jsonActorFunctionalities = []

  constructor(private  http: HttpClientService,
              private administrationService: AdministrationService,
              public tl: TranslationService, private route: ActivatedRoute) { }
  get functionalities() {
    return this._functionalities.asObservable();
  }
  get actorFunctionalities() {
    return this._actorFunctionalities.asObservable();
  }
  ngOnInit(): void {
    this.refreshFunctionalities();
    this.actorId = this.route.snapshot.paramMap.get('id');
    // this.getActor();
    this.refreshActorFunctionalities();
  }
  deleteActorFunctionality(functionality): void{
    this.administrationService.deleteFunctionalitiesActor(this.actorId, functionality.code).subscribe(
      x => console.log(x)
    );
  }
  addToActor(functionality): void{
    const payload = {code : functionality.code}
    this.administrationService.addFunctionalitiesActors(this.actorId, payload).subscribe(
      x => {console.log(x); this.refreshActorFunctionalities(); }
    );
  }
  isOnGlobal(code): boolean {
    console.log(this.jsonFunctionalities)
    console.log(code)
    console.log(this.jsonFunctionalities.length !== 0 && this.jsonFunctionalities.findIndex(x => x.code === code) !== -1)
    return this.jsonFunctionalities.length !== 0 && this.jsonFunctionalities.findIndex(x => x.code === code) !== -1;
  }
  isOnActor(code): boolean {
    console.log(this.jsonFunctionalities)
    console.log(code)
    console.log(this.jsonFunctionalities.length !== 0 && this.jsonFunctionalities.findIndex(x => x.code === code) !== -1)
    return this.jsonActorFunctionalities.length !== 0 && this.jsonActorFunctionalities.findIndex(x => x.code === code) !== -1;
  }
  getActor(): void {
    console.log(this.actorId);
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
      console.log(x);
      this.refreshActorFunctionalities();
      // this._foundations.next(dataSource);
    });
  }
  refreshActorFunctionalities(): void {
    console.log(this.actorId);
    this.administrationService.getFunctionalitiesActors(this.actorId).subscribe(x => {
      const list = x.answer.functionalities;
      const dataSource = new MatTableDataSource<any>(list);
      // dataSource.paginator = this.paginator;
      this.jsonActorFunctionalities = x.answer.functionalities
      this._actorFunctionalities.next(dataSource);
    });
  }
  removeActorFunctionality(functionality): void{
    this.administrationService.deleteFunctionalitiesActor(this.actorId, functionality.code).subscribe(
      x => {console.log(x); this.refreshActorFunctionalities();  this.refreshFunctionalities(); }
    );
  }
  refreshFunctionalities(): void{
    this.administrationService.getFunctionalities().subscribe(x => {
      const list = x.answer.functionalities;
      const dataSource = new MatTableDataSource<any>(list);
      // dataSource.paginator = this.paginator;
      this.jsonFunctionalities = x.answer.functionalities
      this._functionalities.next(dataSource);
    });
  }

}
