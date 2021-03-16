import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@atd/core';
import { CryptoWithMetadata, StatePrices } from '@atd/crypto';

import { PricesColumnKey } from './prices-column-key.enum';

@Component({
  selector: 'atd-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss'],
})
export class PricesComponent extends BaseComponent implements AfterViewInit {
  @Select(StatePrices.dataWithMetadata) data$: Observable<Array<CryptoWithMetadata>>;

  public PricesColumnKey: any = PricesColumnKey;

  public displayedColumns: Array<string> = Object.values(PricesColumnKey);
  public dataSource: MatTableDataSource<CryptoWithMetadata>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor() {
    super();
  }

  public ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.data$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: Array<CryptoWithMetadata>) => {
      this.dataSource.data = data;
    });
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public clickedFavorite(row: CryptoWithMetadata) {
    row.favorite = !row.favorite;
  }
}
