import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminManageActorsComponent } from './admin-manage-actors/admin-manage-actors.component';
import { AdminFunctionalitiesComponent } from './admin-functionalities/admin-functionalities.component';
import { AdminActorDetailsComponent } from './admin-actor-details/admin-actor-details.component';
import {BudgetComponent} from '../budget/budget.component';
import {AdminActorUsersComponent} from './admin-actor-users/admin-actor-users.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';

const routes: Routes = [
  { path: '', component: AdminManageActorsComponent },
  { path: 'manage-actors', children: [
      { path: '', component: AdminManageActorsComponent, data: {title: 'ST.MENU.ADMINISTRATION_ACTORS', overline : 'ST.MENU.ADMINISTRATION'} },
      {
        path: ':id', // child route path
        children: [
          {
            path: 'functionalities',
            component: AdminActorDetailsComponent,
            data: {title: 'ST.MENU.ADMINISTRATION_MANAGE_ACTORS', overline : 'ST.MENU.ADMINISTRATION'}
          },
          {
            path: 'users',
            component: AdminActorUsersComponent,
            data: {title: 'ST.MENU.ADMINISTRATION_USERS', overline : 'ST.MENU.ADMINISTRATION'}
          }
        ]
      }
    ] },
  { path: 'functionalities', component: AdminFunctionalitiesComponent, data: {title: 'ST.MENU.ADMINISTRATION_FUNCTIONALITIES', overline : 'ST.MENU.ADMINISTRATION'} },
  { path: 'users', component: AdminUsersComponent, data: {title: 'ST.MENU.ADMINISTRATION_USERS', overline : 'ST.MENU.ADMINISTRATION'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
