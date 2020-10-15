import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core';
import { MainLayoutComponent, MainLayoutModule } from './layouts';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UploadDataComponent} from './upload-data/upload-data.component';
import {DocumentValidationComponent} from './document-validation/document-validation.component';
import {PunchlistComponent} from './punchlist/punchlist.component';


const routes: Routes = [
  {
    // data : {roles : ''}
    path: '', canActivate: [AuthGuard], component: MainLayoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'budget' },
      { path: 'budget', loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule) },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'upload-data', component: UploadDataComponent},
      { path: 'document-validation', component: DocumentValidationComponent},
      { path: 'punchlist', component: PunchlistComponent},

    ]
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MainLayoutModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
