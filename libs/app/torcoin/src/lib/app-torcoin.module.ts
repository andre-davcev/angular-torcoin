import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponentModule, HeaderComponentModule, SidebarComponentModule } from './components';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderComponentModule,
    SidebarComponentModule,
    FooterComponentModule
  ],
  declarations: []
})
export class AppTorcoinModule {}
