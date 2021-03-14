import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoComponentModule } from '@atd/core'

import { HeaderComponent } from './header.component';


@NgModule({
  imports: [CommonModule, LogoComponentModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {}
