import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminManageActorsComponent } from './admin-manage-actors/admin-manage-actors.component';
import { AdminFunctionalitiesComponent } from './admin-functionalities/admin-functionalities.component';
import { AdminActorDetailsComponent } from './admin-actor-details/admin-actor-details.component';
import {BudgetComponent} from '../budget/budget.component';
import {AdminActorUsersComponent} from './admin-actor-users/admin-actor-users.component';
import {AdminFunctionalitiesGrantedComponent} from './admin-functionalities-granted/admin-functionalities-granted.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';

const routes: Routes = [
  { path: '', component: AdminManageActorsComponent },
  { path: 'manage-actors', children: [
      { path: '', component: AdminManageActorsComponent },
      {
        path: ':id', // child route path
        children: [
          {
            path: 'functionalities',
            component: AdminActorDetailsComponent
          },
          {
            path: 'users',
            component: AdminActorUsersComponent
          }
        ]
      }
    ] },
  { path: 'functionalities', component: AdminFunctionalitiesComponent },
  { path: 'users', component: AdminUsersComponent },
  { path: 'granted-functionalities', component: AdminFunctionalitiesGrantedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
