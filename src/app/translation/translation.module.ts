import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationComponent } from './translation.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslationRoutingModule} from './translation-routing.module';
import {MatTableModule} from '@angular/material/table';
import {AddTranslationDialogComponent} from './dialog/add-translation-dialog.component';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {AddNewLanguageDialogComponent} from './dialog/add-new-language-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AddTranslationToEntryDialogComponent} from './dialog/add-translation-to-entry-dialog.component';

@NgModule({
  declarations: [TranslationComponent, AddTranslationDialogComponent, AddTranslationToEntryDialogComponent, AddNewLanguageDialogComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTooltipModule,
    TranslationRoutingModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,
    MatPaginatorModule
  ]
})

export class TranslationModule {
}
