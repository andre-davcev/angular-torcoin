import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FooterComponentModule, HeaderComponentModule, SidebarComponentModule, StateUser } from '@atd/torcoin';
import { StatePrices } from '@atd/crypto';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NbAuthModule } from '@nebular/auth';
import { NbFirebasePasswordStrategy } from '@nebular/firebase-auth';
import { environment } from '../environments/environment';
import { StateAuth } from '@atd/torcoin';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBi0RilHu2DvJsFcsMPBOEE_kffPTQ0lZ0',
      authDomain: 'torcoin-d7a64.firebaseapp.com',
      projectId: 'torcoin-d7a64',
      storageBucket: 'torcoin-d7a64.appspot.com',
      messagingSenderId: '603406295829',
      appId: '1:603406295829:web:f8baaa0038a0c760677f1c'
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,

    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbAuthModule.forRoot({
      forms: {
        login: {
          strategy: 'password',
          rememberMe: false,
          socialLinks: [],
        },
        register: {
          strategy: 'password',
          terms: true,
          socialLinks: [],
        },
        logout: {
          strategy: 'password',
        },
        validation: {
          password: {
            required: true,
            minLength: 6,
            maxLength: 50,
          },
          email: {
            required: true,
          },
          fullName: {
            required: false,
            minLength: 4,
            maxLength: 50,
          },
        },
      },
      strategies: [
        NbFirebasePasswordStrategy.setup({
          name: 'password',
          login: {
            redirect: {
              success: 'home',
            },
          },
          register: {
            redirect: {
              success: 'home',
            },
          },
          logout: {
            redirect: {
              success: 'auth/login',
            }
          }
        })
      ]
    }),
    AppRoutingModule,

    HeaderComponentModule,
    SidebarComponentModule,
    FooterComponentModule,

    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([
      StateAuth,
      StateUser,
      StatePrices
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production})
  ],
  providers: [NbFirebasePasswordStrategy],
  bootstrap: [AppComponent],
})
export class AppModule {}
