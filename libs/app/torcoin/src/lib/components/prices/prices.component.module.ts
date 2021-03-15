import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PricesComponent } from './prices.component';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';

const routes: Routes = [
  { path: '', component: PricesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule
  ],
  declarations: [PricesComponent],
  exports: [PricesComponent]
})
export class PricesComponentModule {}
