import {APP_INITIALIZER, NgModule, PLATFORM_INITIALIZER} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';


import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BrowserModule } from '@angular/platform-browser';
// import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SidemenuModule } from './sidemenu/sidemenu.module';
import {UserService} from '../../core/services';
import {FormsModule} from '@angular/forms';
import {ItemsMenuService} from '../../service/items-menu.service';
import {SettingsService} from '../../service/settings.service';


// tslint:disable-next-line:typedef
function initializeKeycloak(keycloak: KeycloakService, userService: UserService) {
  return () =>
    keycloak.init({
      config: {
        realm: 'New STREETS',
        url: 'https://openid.xtech.io/auth',
        clientId: 'newstreets' // Client Streets
      },
      bearerExcludedUrls: ['/assets'],
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        redirectUri: window.location.href
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer'
    }).then(authenticated => {
      if (authenticated){
        keycloak.loadUserProfile().then(profile => {
          userService.loginKeycloak(profile);
          localStorage.setItem('profile', JSON.stringify(profile));
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
  imports: [CommonModule, RouterModule.forRoot([]), BrowserModule, KeycloakAngularModule, HttpClientModule, SidemenuModule, FormsModule],
  providers: [
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, UserService, ItemsMenuService, SettingsService],
    },
  ],
  bootstrap: [MainLayoutComponent]
})
export class MainLayoutModule {
}
