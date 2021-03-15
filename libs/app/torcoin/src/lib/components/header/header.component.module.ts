import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoComponentModule } from '@atd/core'

import { HeaderComponent } from './header.component';
import { NbActionsModule } from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    LogoComponentModule,
    NbActionsModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {}
