import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { FooterComponentModule, HeaderComponentModule, SidebarComponentModule } from '@atd/torcoin';
import { StatePrices } from '@atd/crypto';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    AppRoutingModule,

    HeaderComponentModule,
    SidebarComponentModule,
    FooterComponentModule,

    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([StatePrices]),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
