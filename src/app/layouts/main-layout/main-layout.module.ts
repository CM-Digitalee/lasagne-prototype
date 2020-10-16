import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';


import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BrowserModule } from '@angular/platform-browser';
// import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SidemenuModule } from './sidemenu/sidemenu.module';
import {UserService} from '../../core/services';


// tslint:disable-next-line:typedef
function initializeKeycloak(keycloak: KeycloakService, userService: UserService) {
  return () =>
    keycloak.init({
      config: {
        // realm: 'New STREETS',
        // url: 'https://openid.xtech.io/auth',
        // clientId: 'iccube-dev-public' // Client pour récupérer les menus
        realm: 'New STREETS',
        url: 'https://openid.xtech.io/auth',
        clientId: 'newstreets' //Client Streets
      },
      bearerExcludedUrls: ['/assets'],
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        redirectUri: window.location.href
        // onLoad: 'check-sso',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html',
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer'
    }).then(authenticated => {
      if (authenticated){
        keycloak.loadUserProfile().then(profile => {
          userService.loginKeycloak(profile);
          localStorage.setItem('profile', JSON.stringify(profile));
          console.log(profile) ;
        }).catch(() => {
          this.user = null ;
        });
      }else{
        this.user = null ;
      }
    }).catch((e) => {
      console.log(e);
      alert('failed to initialize');
      this.user = null ;
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
      deps: [KeycloakService, UserService],
    },
  ]
})
export class MainLayoutModule {
}
