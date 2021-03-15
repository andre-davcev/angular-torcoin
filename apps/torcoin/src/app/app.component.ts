import { Component, OnInit } from '@angular/core';
import { PricesService } from '@atd/crypto';

@Component({
  selector: 'atd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  private title: string = 'torcoin';

  constructor(private prices: PricesService) {

  }

  ngOnInit(): void {
    this.prices.latest().subscribe();
  }
}
