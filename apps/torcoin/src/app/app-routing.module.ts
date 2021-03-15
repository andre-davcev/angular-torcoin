import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { PricesComponentModule } from '@atd/torcoin';

const routes: Routes = [
  { path: '', redirectTo: 'prices', pathMatch: 'full' },
  { path: 'prices', loadChildren: () => PricesComponentModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
