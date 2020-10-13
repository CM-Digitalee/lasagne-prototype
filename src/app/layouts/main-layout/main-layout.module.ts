import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';


import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BrowserModule } from '@angular/platform-browser';
//import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SidemenuModule } from './sidemenu/sidemenu.module';


// tslint:disable-next-line:typedef
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        realm: 'New STREETS',
        url: 'https://openid.xtech.io/auth',
        clientId: 'iccube-dev-public'
      },
      bearerExcludedUrls: ['/assets'],
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
        // onLoad: 'check-sso',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html',
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer'
    });
}

@NgModule({
  declarations: [MainLayoutComponent, SidenavComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, BrowserModule, KeycloakAngularModule, HttpClientModule, SidemenuModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ]
})
export class MainLayoutModule { }
