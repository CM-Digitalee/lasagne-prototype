import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { AuthGuard } from './core';
import { MainLayoutComponent, MainLayoutModule } from './layouts';
import { NotFoundComponent } from './not-found/not-found.component';
import { Globals } from './common/global';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  {
    // data : {roles : ''}
    path: '', canActivate: [AuthGuard], component: MainLayoutComponent, children: [
      { path: 'budget', loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule) },
      { path: 'budget-simulation', loadChildren: () => import('./budget-simulation/budget-simulation.module').then(m => m.BudgetSimulationModule) },
      { path: 'test-load', component: DashboardComponent },
      { path: 'administration', data: {title: 'Administration', overline: 'Administration'}, loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
      { path: 'administration/translations', data: {title: 'Translations', overline: 'Administration'}, loadChildren: () => import('./translation/translation.module').then(m => m.TranslationModule) },
      {path: '404', component: NotFoundComponent},

    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MainLayoutModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(router: Router, global: Globals) {
  }
}
