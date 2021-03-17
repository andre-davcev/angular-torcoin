import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs/operators'

import { StatePricesModel } from './prices.state.model';
import { StatePricesOptions } from './prices.state.options';
import {
  ActionPricesGet,
  ActionPricesPage
} from './prices.actions';
import { PricesService } from '../../services';
import { of } from 'rxjs';
import { ResponseCryptocurrency } from '../../responses';
import { Cryptocurrency, CryptoWithMetadata, StatusList } from '../../interfaces';
import { Currency } from '../../enums';

@State<StatePricesModel>(StatePricesOptions)
@Injectable()
export class StatePrices {

  @Selector() static response(state: StatePricesModel): ResponseCryptocurrency | null {
    return state.response;
  }
  @Selector() static page(state: StatePricesModel): number {
    return state.page;
  }
  @Selector() static pageSize(state: StatePricesModel): number {
    return state.pageSize;
  }
  @Selector() static loading(state: StatePricesModel): boolean {
    return state.loading;
  }
  @Selector() static errored(state: StatePricesModel): boolean {
    return state.errored;
  }

  @Selector() static data(state: StatePricesModel): Array<Cryptocurrency> {
    return StatePrices.response(state)?.data || [];
  }

  @Selector() static dataWithMetadata(state: StatePricesModel): Array<CryptoWithMetadata> {
    return StatePrices.data(state)
      .map((value: Cryptocurrency, index: number) =>
        ({
          ...value,
          rank: index + 1,
          price: value.quote[Currency.USD].price,
          change: value.quote[Currency.USD].percent_change_24h,
          marketCap: value.quote[Currency.USD].market_cap,
          favorite: index < 6 ? true : false
        })
      );
  }

  @Selector() static favorites(state: StatePricesModel): Array<CryptoWithMetadata> {
    return StatePrices.dataWithMetadata(state)
      .filter((value: CryptoWithMetadata) =>
        value.favorite
      );
  }

  @Selector() static favoritesGrouped(state: StatePricesModel): Array<Array<CryptoWithMetadata>> {
    const favorites: Array<CryptoWithMetadata> = StatePrices.favorites(state);
    const grouped: Array<Array<CryptoWithMetadata>> = [];

    let group: Array<CryptoWithMetadata> = [];
    let mod: number;

    favorites.forEach((crypto: CryptoWithMetadata, index: number) => {
      if ((index % 4) === 0) {
        if (index !== 0) {
          grouped.push(group);
        }

        group = [];
      }

      group.push(crypto);
    });

    grouped.push(group);

    return grouped;
  }

  @Selector() static status(state: StatePricesModel): StatusList | null {
    return StatePrices.response(state)?.status || null;
  }

  @Selector() static totalCount(state: StatePricesModel): number {
    return StatePrices.status(state)?.total_count || 0;
  }

  @Selector() static loaded(state: StatePricesModel): boolean {
    return StatePrices.totalCount(state) > 0;
  }


  constructor(
    private service: PricesService
  ) {}

  public ngxsOnInit(context: StateContext<StatePricesModel>) {
    context.dispatch([
      new ActionPricesGet()
    ]);
  }

  @Action(ActionPricesGet)
  get(
    { patchState }: StateContext<StatePricesModel>,
    { pageSize }: ActionPricesGet
  ) {
    patchState({ loading: true, pageSize, page: 0 });
    return this.service.latest().pipe(
      tap((response: ResponseCryptocurrency) =>
        patchState({ errored: false, response })
      ),
      catchError((error: any) =>
        of(patchState({ errored: true }))
      ),
      finalize(() =>
        patchState({ loading: false })
      )
    );
  }

  @Action(ActionPricesPage)
  page(
    { patchState, getState }: StateContext<StatePricesModel>
  ) {
    const state: StatePricesModel = getState();
    const page: number = StatePrices.page(state);

    patchState({ page: page + 1 });
  }
}
