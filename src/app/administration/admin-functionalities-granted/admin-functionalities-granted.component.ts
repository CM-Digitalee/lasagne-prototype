import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AdministrationService} from '../../service/administration.service';
import {HttpClientService} from '../../service/http-client.service';
import {TranslationService} from '../../service/translation.service';
import {BehaviorSubject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-functionalities-granted',
  templateUrl: './admin-functionalities-granted.component.html',
  styleUrls: ['./admin-functionalities-granted.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFunctionalitiesGrantedComponent implements OnInit {
  private _functionalities = new BehaviorSubject<any>(null);

  constructor(private administrationService: AdministrationService,
              private http: HttpClientService,
              public tl: TranslationService) { }

  ngOnInit(): void {
  }

  get functionalities() {
    return this._functionalities.asObservable();
  }
  refreshFunctionalities(): void{
    this.administrationService.getFunctionalities().subscribe(x => {
      const list = x.answer.functionalities;
      const dataSource = new MatTableDataSource<any>(list);
      // dataSource.paginator = this.paginator;
      this._functionalities.next(dataSource);
    });
  }

}
