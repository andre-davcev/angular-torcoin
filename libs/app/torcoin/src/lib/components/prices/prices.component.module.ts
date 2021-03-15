import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PricesComponent } from './prices.component';

const routes: Routes = [
  { path: '', component: PricesComponent }
];

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(routes)
  ],
  declarations: [PricesComponent],
  exports: [PricesComponent]
})
export class PricesComponentModule {}
