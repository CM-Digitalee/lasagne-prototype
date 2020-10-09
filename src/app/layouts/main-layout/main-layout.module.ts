import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [MainLayoutComponent, SidenavComponent, HeaderComponent, SidemenuComponent],
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class MainLayoutModule { }
