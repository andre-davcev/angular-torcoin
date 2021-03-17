import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateAuthModel } from './auth.state.model';

export const StateAuthOptions: StoreOptions<StateAuthModel> = {
  name: 'auth',

  defaults: {
    token: null,
    user: null
  }
};
