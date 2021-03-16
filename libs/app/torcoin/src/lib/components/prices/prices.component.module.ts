import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { PricesComponent } from './prices.component';

const routes: Routes = [
  { path: '', component: PricesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NbCardModule,
    NbIconModule,
    NbInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [PricesComponent],
  exports: [PricesComponent]
})
export class PricesComponentModule {}
