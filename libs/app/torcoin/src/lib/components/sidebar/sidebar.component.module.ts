import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar.component';
import { NbMenuModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbMenuModule
  ],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class SidebarComponentModule {}
