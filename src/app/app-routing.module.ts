import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { AuthGuard } from './core';
import { MainLayoutComponent, MainLayoutModule } from './layouts';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { DocumentValidationComponent } from './document-validation/document-validation.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { Globals } from './common/global';


const routes: Routes = [
  {
    // data : {roles : ''}
    path: '', canActivate: [AuthGuard], component: MainLayoutComponent, children: [
      // { path: 'iframe', loadChildren: () => import('./iframe-view/iframe-view.module').then(m => m.IframeViewModule) },
      // { path: '', pathMatch: 'full', redirectTo: 'budget' },
      { path: 'budget', loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule) },
      { path: 'budget-simulation', loadChildren: () => import('./budget-simulation/budget-simulation.module').then(m => m.BudgetSimulationModule) },
      //  { path: 'dashboard', component: DashboardComponent },
      { path: 'upload-data', component: UploadDataComponent },
      { path: 'document-validation', component: DocumentValidationComponent },
      { path: 'administration/translations', loadChildren: () => import('./translation/translation.module').then(m => m.TranslationModule) },
      {
        path: 'analytics',
        component: AnalyticsComponent, // this is the component with the <router-outlet> in the template
        children: [
          // {
          //   path: 'reference-data', // child route path
          //   component: AnalyticsReferenceDataComponent, // child route component that the router renders
          // },
          // {
          //   path: 'rental-data',
          //   component: AnalyticsRentalDataComponent, // another child route component that the router renders
          // },
        ],
      },

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
export class AppRoutingModule {
  constructor(router: Router, global: Globals) {
  }
}
