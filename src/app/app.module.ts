import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocaleService } from './core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PunchlistComponent } from './punchlist/punchlist.component';
import { Globals } from './common/global';
import { IframeViewComponent } from './iframe-view/iframe-view.component';

import {SettingsService} from './service/settings.service';
import { ComponentLoaderComponent } from './component-loader/component-loader.component';
import { ComponentLoaderService } from './component-loader/component-loader.service';
import { ComponentLoaderDirective } from './component-loader/component-loader.directive';
import { TranslationService } from './service/translation.service';
// import {AddTranslationDialogComponent} from './translation/dialog/add-translation-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClientService} from './service/http-client.service';
import {CacheService} from './service/cache.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmboxComponent } from './layouts/confirmbox/confirmbox.component';
import {MatIconModule} from '@angular/material/icon';
import {SystemService} from './service/system.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// tslint:disable-next-line:typedef
export function initSettings(settings: SettingsService) {
  return () => settings.loadSettings();
}

@NgModule({
  declarations: [AppComponent, DashboardComponent, PunchlistComponent, IframeViewComponent, ComponentLoaderComponent, ComponentLoaderDirective, NotFoundComponent, ConfirmboxComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [
    HttpClientModule,
    MatPaginator,
    TranslationService,
    SettingsService,
    CacheService,
    SystemService,
    HttpClientService,
    ComponentLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: initSettings,
      deps: [SettingsService],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory: (localeService: LocaleService) => localeService.getLocale()
    },
    Globals
  ],
  entryComponents: [PunchlistComponent, DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
