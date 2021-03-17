import { Component, OnInit } from '@angular/core';
import { CryptoWithMetadata, StatePrices } from '@atd/crypto';
import { Select } from '@ngxs/store';

@Component({
  selector: 'atd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(StatePrices.favoritesGrouped) favoritesGrouped$: Array<Array<CryptoWithMetadata>>;

  constructor() { }

  ngOnInit(): void {
  }

}
