import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslationComponent } from './translation.component';

const routes: Routes = [
  { path: '', data: {title: 'Internationalisation', overline: 'Administration'}, component: TranslationComponent },
  { path: ':id', component: TranslationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationRoutingModule { }
