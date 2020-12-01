import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManageActorsComponent } from './admin-manage-actors/admin-manage-actors.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AdministrationRoutingModule} from './administration-routing.module';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ActorsDialogComponent} from './admin-manage-actors/dialog/actors-dialog.component';
import {ActorsUserDialogComponent} from './admin-actor-users/dialog/actors-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {AdminFunctionalitiesComponent} from './admin-functionalities/admin-functionalities.component';
import {AdminActorDetailsComponent} from './admin-actor-details/admin-actor-details.component';
import {AdminActorUsersComponent} from './admin-actor-users/admin-actor-users.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [AdminManageActorsComponent, ActorsDialogComponent, AdminFunctionalitiesComponent, AdminActorDetailsComponent, AdminActorUsersComponent, ActorsUserDialogComponent, AdminUsersComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTooltipModule,
    AdministrationRoutingModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,
    MatPaginatorModule,
    MatRadioModule,
    MatListModule,
    MatProgressSpinnerModule
  ]
})
export class AdministrationModule { }
