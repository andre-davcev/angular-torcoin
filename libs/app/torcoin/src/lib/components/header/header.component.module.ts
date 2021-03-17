import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoComponentModule } from '@atd/core'

import { HeaderComponent } from './header.component';
import { NbActionsModule, NbContextMenuModule, NbIconModule, NbSidebarModule, NbUserModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    LogoComponentModule,
    NbActionsModule,
    NbUserModule,
    NbContextMenuModule,
    NbIconModule,
    NbSidebarModule,
    RouterModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {}
