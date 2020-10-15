import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocaleService } from './core';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { PunchlistComponent } from './punchlist/punchlist.component';
import { DocumentValidationComponent } from './document-validation/document-validation.component';
import { SettingsComponent } from './settings/settings.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticsReferenceDataComponent } from './analytics/analytics-reference-data/analytics-reference-data.component';
import { AnalyticsRentalDataComponent } from './analytics/analytics-rental-data/analytics-rental-data.component';
// import { ItemsMenuComponent } from './items-menu/items-menu.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, UploadDataComponent, PunchlistComponent, DocumentValidationComponent, SettingsComponent, AnalyticsComponent, AnalyticsReferenceDataComponent, AnalyticsRentalDataComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory: (localeService: LocaleService) => localeService.getLocale()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
