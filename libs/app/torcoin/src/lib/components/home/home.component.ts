import { Component, OnInit } from '@angular/core';
import { CryptoWithMetadata } from '@atd/crypto';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { StateUser } from '../../state';

@Component({
  selector: 'atd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(StateUser.favoritesGrouped) favoritesGrouped$: Observable<Array<Array<CryptoWithMetadata>>>;
  @Select(StateUser.hasFavorites) hasFavorites$: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

}
