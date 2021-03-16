import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoComponentModule } from '@atd/core'

import { HeaderComponent } from './header.component';
import { NbActionsModule, NbContextMenuModule, NbUserModule } from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    LogoComponentModule,
    NbActionsModule,
    NbUserModule,
    NbContextMenuModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {}
