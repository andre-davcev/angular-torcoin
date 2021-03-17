import { StoreOptions } from '@ngxs/store/src/symbols';

import { StatePricesModel } from './prices.state.model';

export const StatePricesOptions: StoreOptions<StatePricesModel> = {
  name: 'prices',

  defaults: {
    response: null,
    page: 0,
    pageSize: 10,
    loading: false,
    errored: false
  }
};
