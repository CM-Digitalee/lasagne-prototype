import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AdministrationService} from '../../service/administration.service';
import {TranslationService} from '../../service/translation.service';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClientService} from '../../service/http-client.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-admin-functionalities',
  templateUrl: './admin-functionalities.component.html',
  styleUrls: ['./admin-functionalities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFunctionalitiesComponent implements OnInit {
  private _functionalities = new BehaviorSubject<any>(null);
  public dataSource;
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private administrationService: AdministrationService,
              private http: HttpClientService,
              public tl: TranslationService) { }
  @ViewChild('paginator') paginator: MatPaginator;

  get functionalities() {
    return this._functionalities.asObservable();
  }


  ngOnInit(): void {
    this.refreshFunctionalities() ;
  }
  refreshFunctionalities(): void{
    this.isLoading$.next(true);
    this.administrationService.getFunctionalities().subscribe(x => {
      const list = x.answer.functionalities;
      this.administrationService.getFunctionalitiesActors().subscribe(fActors => {
        const actorsList = fActors.answer.functionalities;
        const updatedList = list.map(elmt => {
          const idx = actorsList.findIndex(k => k.id === elmt.id);
          if (idx !== -1){
            elmt.actors = actorsList[idx].actors;
            elmt.hasGrantedActors = true;
          }
          return elmt ;
        }) ;
        this.dataSource = new MatTableDataSource<any>(updatedList);
        this._functionalities.next(this.dataSource);
        this.isLoading$.next(false);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        // this.dataSource.paginator = this.paginator;



      }, error => {
        this.isLoading$.next(false);
      });
    });
  }
  switchEnabled(elmt): void {
    const pl = {enabled: !elmt.enabled};
    this.http.put({ url: 'https://ns-msrv-backend-dev.xtech.io/data/actors/' + elmt.id, body: pl }).subscribe(value => {
      this.refreshFunctionalities();
    });
  }
}
