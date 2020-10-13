import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { SidemenuComponent } from './sidemenu.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SidemenuComponent],
  imports: [CommonModule, BrowserModule, RouterModule],
  exports: [SidemenuComponent]
})
export class SidemenuModule { }
