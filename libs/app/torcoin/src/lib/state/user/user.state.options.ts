import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateUserModel } from './user.state.model';

export const StateUserOptions: StoreOptions<StateUserModel> = {
  name: 'users',

  defaults: {
    user: {
      id: null,
      email: '',
      fullName: '',
      favorites: {},
      picture: '//cdn.shopify.com/s/files/1/0345/8429/7516/files/AJ_Pryor.jpg?v=1584330112'
    }
  }
};
