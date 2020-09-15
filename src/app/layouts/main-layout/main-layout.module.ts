import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [MainLayoutComponent, SidenavComponent, HeaderComponent],
  imports: [CommonModule, RouterModule]
})
export class MainLayoutModule { }
