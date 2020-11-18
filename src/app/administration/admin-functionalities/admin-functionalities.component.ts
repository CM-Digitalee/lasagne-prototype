import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AdministrationService} from '../../service/administration.service';
import {TranslationService} from '../../service/translation.service';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClientService} from '../../service/http-client.service';

@Component({
  selector: 'app-admin-functionalities',
  templateUrl: './admin-functionalities.component.html',
  styleUrls: ['./admin-functionalities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFunctionalitiesComponent implements OnInit {
  private _functionalities = new BehaviorSubject<any>(null);
  constructor(private administrationService: AdministrationService,
              private http: HttpClientService,
              public tl: TranslationService) { }
  get functionalities() {
    return this._functionalities.asObservable();
  }
  ngOnInit(): void {
    this.refreshFunctionalities() ;
  }
  refreshFunctionalities(): void{
    this.administrationService.getFunctionalitiesActors().subscribe(x => {
      const list = x.answer.functionalities;
      const dataSource = new MatTableDataSource<any>(list);
      // dataSource.paginator = this.paginator;
      this._functionalities.next(dataSource);
    });
  }
  switchEnabled(elmt): void {
    const pl = {enabled: !elmt.enabled};
    this.http.put({ url: 'https://ns-msrv-backend-dev.xtech.io/data/actors/' + elmt.id, body: pl }).subscribe(value => {
      this.refreshFunctionalities();
    });
  }
}
