import {Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {AddTranslationDialogComponent} from './dialog/add-translation-dialog.component';
import {AddNewLanguageDialogComponent} from './dialog/add-new-language-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Tools} from '../tools/function';
import {BehaviorSubject, Observable} from 'rxjs';
import {DomSanitizer, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AddTranslationToEntryDialogComponent} from './dialog/add-translation-to-entry-dialog.component';
import {MatSelectChange} from '@angular/material/select';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {TranslationService} from '../service/translation.service';
import {HttpClientService} from '../service/http-client.service';
import {CacheService} from '../service/cache.service';
@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class TranslationComponent implements OnInit, AfterViewInit {

  tlData = {id: '', value: ''};
  private currentLanguage = {
    iso: 'en',
    label: 'English',
    enabled: true
  };
  private _downloadJsonHref = new BehaviorSubject<any>(null);
  private _languages = new BehaviorSubject<any>(null);
  private _translations = new BehaviorSubject<any>(null);
  private _entries = new BehaviorSubject<any>(null);
  private _translationsSource = new BehaviorSubject<any>(null);
  private language = 'en';
  public entrySelected = false

  get entries() {
    return this._entries.asObservable();
  }
  get downloadJsonHref() {
    return this._downloadJsonHref.asObservable();
  }
  get languages() {
    return this._languages.asObservable();
  }
  get translations() {
    return this._translations.asObservable();
  }
  get translationsSource() {
    return this._translationsSource.asObservable();
  }
  constructor(public dialog: MatDialog, public tools: Tools, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef, public tl: TranslationService, private http: HttpClientService, private cache: CacheService) {
      this.exportJson().subscribe(data => {
        const theJSON = JSON.stringify(data.answer);
        const uri = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON));
        this._downloadJsonHref.next(uri);
      });
      this.refreshLanguagesList();
      this.refreshTranslations(this.currentLanguage);
  }
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorL') paginatorL: MatPaginator;
  @ViewChild('tabGroup') tabGroup;

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    // this.languages.subscribe(value => {
    //   this.currentLanguage = value[1] ;
    //   this.refreshTranslations(this.currentLanguage);
    // });
  }
  onTabChanged(event: MatTabChangeEvent): void
  {
    if (event.index === 1){
      this.entrySelected = false
      this.languages.subscribe(value => {
        this.currentLanguage = value[1] ;
        this.refreshTranslations(this.currentLanguage);
      });
    }else{
      this.refreshEntries();
      this.entrySelected = true;
    }
  }
  onSelectionChanged(value: MatSelectChange): void
  {
      // this.currentLanguage = value.value ;
      this.refreshTranslations(this.currentLanguage);

  }
  refreshEntries(): void{
    this.getEntries().subscribe(x => {
      const list = x.answer.texts;
      const dataSource = new MatTableDataSource<any>(list);
      dataSource.paginator = this.paginator;
      this._entries.next(dataSource);
    });
  }
  refreshTranslations(lg): void{
    this.getTranslations().subscribe(data => {
      const list = data.answer.texts;
      const dataSource = new MatTableDataSource<any>(list);
      dataSource.paginator = this.paginator;
      this._entries.next(dataSource);

      const anAsyncFunction = async (item, idx) => {
        // return functionWithPromise(item);
        return this.getTranslationPromise(item.ui_id, lg.iso).then(x => {
          item.translation = x;
          item.position = idx;
          return item;
        });
      };

      const getData = async () => {
        return Promise.all(list.map((item, idx) => anAsyncFunction(item, idx)));
      };
      getData().then(lista => {
        const dataSourceL = new MatTableDataSource<any>(lista);
        dataSourceL.paginator = this.paginatorL;
        this._translationsSource.next(dataSourceL);
        this.cdr.detectChanges();
      }).catch(err => {
        console.log(err);
      });

      // this.refreshEntries(data.answer.translations);
    });
  }

  refreshLanguagesList(): void{
      this.getLanguages().subscribe(data => {
        this._languages.next(data.answer.languages);
      });
  }
  parseTranslation(payload): object{
    return {ui_id: payload.ui_id, translated: payload.translated, description: payload.description, enabled: payload.enabled};
  }
  parseLanguage(payload): object{
    return {iso: this.tools.removeSpace(payload.iso), label: this.tools.removeSpace(payload.label), enabled: payload.enabled};
  }
  getLanguages(): Observable<any>{
    return this.http.get({url: 'https://ns-msrv-backend-dev.xtech.io/ui/languages'});
  }
  addNewLanguage(data: object): Observable<any> {
    return this.http.post({url: 'https://ns-msrv-backend-dev.xtech.io/ui/languages', body: data});
  }
  editLanguage(languageId: string, data: object): Observable<any> {
    if (!languageId){
      console.log('languageId must be specified');
      return;
    }
    return this.http.put({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/languages/' + languageId, body: data });
  }
  removeLanguage(languageId: string): void{
    if (!languageId){
      console.log('languageId must be specified');
      return;
    }
    this.http.delete({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/languages/' + languageId }).subscribe(response => {
      this.refreshLanguagesList();
    });
  }
  removeTranslation(elmt): void{
    if (!elmt){
      console.log('languageId must be specified');
      return;
    }
    const tlUrl = 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' + elmt.ui_id + '/' + this.currentLanguage.iso ;

    this.http.delete({ url: tlUrl}).subscribe(response => {
      this.cache.remove(tlUrl)
      this.refreshTranslations(this.currentLanguage);
    });
  }
  addNewEntry(data: object): Observable<any> {
    return this.http.post({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/', body : data});
  }
  addTranslationToEntry(entryId, data: object): Observable<any> {
    return this.http.post({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' + entryId, body: data});
  }
  getTranslationPromise(uid, lg): Promise<any> {
    return this.http.get({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' + uid + '/' + lg }).toPromise()
      .then(item => {
        if (item && item.answer){
          return Promise.resolve(item.answer.translated_texts[0]);
        }else{
          return Promise.resolve(null);
        }

      } ).catch( error => {console.log(error); return Promise.resolve(null);});
  }
  getTranslation(uid, lg): Observable<any> {
    return this.http.get({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' + uid + '/' + lg });
  }
  getTranslations(): Observable<any> {
    return this.http.get({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' });
  }
  getEntries(): Observable<any> {
    return this.http.get({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' });
  }
  getEntry(translationId): Observable<any> {
    return this.http.get({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' + translationId });
  }
  removeEntry(translation): void {
    this.http.delete({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' + translation.ui_id }).subscribe(response => {
      this.refreshEntries();
    });
  }
  refreshCache(): void {
    this.cache.cleanLocalStorage(); location.reload();
  }
  exportJson(): Observable<any> {
    return this.http.get({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations_for_translators', cacheMins: 10080 });
  }
  openDialogTranslationToEntry(row): void {
    const dialogRef = this.dialog.open(AddTranslationToEntryDialogComponent, {
      width: '60%',
      data:  {title: 'Add ' + this.currentLanguage.label + ' translation to ' + row.ui_id, ui_id: '', translated: '', description: '', enabled: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.tlData = result;
      if (result){
        const data = {
          language_iso: this.tools.removeSpace(this.currentLanguage.iso),
          translated: result.translated,
          enabled: result.enabled ? result.enabled : false
        };
        this.addTranslationToEntry(row.ui_id, data).subscribe(value => {
          this.cache.cleanLocalStorage();
          this.refreshTranslations(this.currentLanguage);
        });
      }
    });
  }
  openDialogTranslationToEntryEdit(row): void {
    const dialogRef = this.dialog.open(AddTranslationToEntryDialogComponent, {
      width: '60%',
      data:  {title: 'Edit ' + this.currentLanguage.label + ' translation to ' + row.ui_id, ui_id: row.ui_id, translated: row.translation.translated, description: row.description, enabled: row.translation.enabled}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.tlData = result;
      const data = {
        language_iso: this.tools.removeSpace(this.currentLanguage.iso),
        translated: result.translated,
        enabled: result.enabled ? result.enabled : false
      };
      this.editTranslation(row.ui_id, this.currentLanguage.iso, data).subscribe(value => {
        this.cache.cleanLocalStorage();
        this.refreshTranslations(this.currentLanguage);
      });
    });
  }
  openDialogTranslation(): void {
    const dialogRef = this.dialog.open(AddTranslationDialogComponent, {
      width: '60%',
      data:  {title: 'Add new entry', enabled: true, description: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.tlData = result;
      const pl = {
        description: result.description,
        ui_id: this.tools.removeSpace(result.ui_id),
        enabled: result.enabled
      }
      this.addNewEntry(pl).subscribe(value => {
        this.cache.cleanLocalStorage();
        this.refreshEntries();
      });
    });
  }
  switchTranslation(elmt): void{
    const tl = elmt.translation;
    const pl = {enabled: !tl.enabled, translated: tl.translated};
    this.http.put({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' + tl.ui_id + '/' + this.currentLanguage.iso, body : pl }).subscribe(value => {
      // console.log(value);
      this.cache.cleanLocalStorage();
      this.refreshTranslations(this.currentLanguage);
    });
    // return this.tools.delete('https://ns-msrv-backend-dev.xtech.io/ui/translations/' + translationId);
  }
  switchEntry(elmt): void {
    const pl = {enabled: !elmt.enabled, description: elmt.description};
    this.http.put({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' + elmt.ui_id, body: pl }).subscribe(value => {
      this.cache.cleanLocalStorage();
      this.refreshEntries();
    });
  }
  editEntry(elmt): Observable<any> {
    const data = {
      enabled: elmt.enabled,
      description: elmt.description
    };
    return this.http.put({ url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' + elmt.ui_id, body: data });
  }
  openDialogTranslationEdit(lg): void {
    const dialogRef = this.dialog.open(AddTranslationDialogComponent, {
      width: '60%',
      data:  {title: 'Edit entry : ' + lg.ui_id, ui_id: lg.ui_id, enabled: lg.enabled, description: lg.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      // const payload = this.parseTranslation(result);
      if (result){
        this.editEntry(result).subscribe(value => {
          this.cache.cleanLocalStorage();
          this.refreshEntries();
        });
      }
    });
  }
  openDialogLanguage(): void {
    const dialogRefLg = this.dialog.open(AddNewLanguageDialogComponent, {
      width: '60%',
      data:  {title: 'Add new Language', iso: '', label: '', enabled: false}
    });

    dialogRefLg.afterClosed().subscribe(result => {
      if (!result.label || !result.iso){
        return ;
      }
      const payload = this.parseLanguage(result);
      this.addNewLanguage(payload).subscribe(value => {
        this.refreshLanguagesList();
      });
    });
  }
  openDialogLanguageEdit(lg): void {
    const dialogRefLg = this.dialog.open(AddNewLanguageDialogComponent, {
      width: '60%',
      data:  {title: 'Edit Language', iso: lg.iso, label: lg.label, enabled: lg.enabled, isEdition: true}
    });

    dialogRefLg.afterClosed().subscribe(result => {
      if (!result.label || !result.iso){
        return ;
      }
      const payload = this.parseLanguage(result);
      this.editLanguage(lg.iso, payload).subscribe(value => {
        this.refreshLanguagesList();
      });
    });
  }
  editTranslation(translationId, languageId, data): Observable<any> {
    if (!translationId){
      console.log('translationId must be specified');
      return;
    }
    const payload = {
      translated: data.translated,
      enabled: data.enabled
    };
    return this.http.put({url: 'https://ns-msrv-backend-dev.xtech.io/ui/translations/' + translationId + '/' + languageId, body: payload });
  }
}
