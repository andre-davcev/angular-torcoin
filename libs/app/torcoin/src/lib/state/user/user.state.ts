import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../../models';
import { ActionUserGet, ActionUserLogin, ActionUserRegister, ActionUserSaveFavorite, ActionUserSet, ActionUserSetEmail } from './user.actions';

import { StateUserModel } from './user.state.model';
import { StateUserOptions } from './user.state.options';

import { filter, switchMap, take } from 'rxjs/operators';
import { Cryptocurrency, CryptoWithMetadata, Currency, StatePrices } from '@atd/crypto';

@State<StateUserModel>(StateUserOptions)
@Injectable()
export class StateUser {

  @Selector() static user(state: StateUserModel): User {
    return state.user;
  }

  @Selector() static id(state: StateUserModel): string {
    return StateUser.user(state)?.id;
  }

  @Selector() static email(state: StateUserModel): string {
    return StateUser.user(state)?.email || '';
  }

  @Selector() static fullName(state: StateUserModel): string {
    return StateUser.user(state)?.fullName || '';
  }

  @Selector() static favoritesLookup(state: StateUserModel): Record<string, boolean> {
    return StateUser.user(state)?.favorites || {};
  }

  @Selector() static picture(state: StateUserModel): string {
    return StateUser.user(state)?.picture || '';
  }

  @Selector([StatePrices.data])
  static dataWithMetadata(state: StateUserModel, data: Array<CryptoWithMetadata>): Array<CryptoWithMetadata>
  {
    const favoritesLookup: Record<string, boolean> = StateUser.favoritesLookup(state);

    return data
      .map((value: Cryptocurrency, index: number) =>
        ({
          ...value,
          rank: index + 1,
          price: value.quote[Currency.USD].price,
          change: value.quote[Currency.USD].percent_change_24h,
          marketCap: value.quote[Currency.USD].market_cap,
          favorite:
            favoritesLookup == null ?
              false :
              favoritesLookup[value.symbol] == null ?
                false :
                favoritesLookup[value.symbol]
        })
      );
  }

  @Selector([StatePrices.data])
  static favorites(state: StateUserModel, data: Array<CryptoWithMetadata>): Array<CryptoWithMetadata> {
    return StateUser.dataWithMetadata(state, data)
      .filter((value: CryptoWithMetadata) =>
        value.favorite
      );
  }

  @Selector([StatePrices.data])
  static hasFavorites(state: StateUserModel, data: Array<CryptoWithMetadata>): boolean {
    return StateUser.favorites(state, data).length > 0;
  }

  @Selector([StatePrices.data])
  static favoritesGrouped(state: StateUserModel, data: Array<CryptoWithMetadata>): Array<Array<CryptoWithMetadata>> {
    const favorites: Array<CryptoWithMetadata> = StateUser.favorites(state, data);
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

  constructor(
    private firestore: AngularFirestore,
    private store: Store
  ) { }

  @Action(ActionUserLogin)
  login(
    { getState, dispatch }: StateContext<StateUserModel>,
    { firebaseUser }: ActionUserLogin
  ) {
    const user: User = {
      ...StateUser.user(getState()),
      id: firebaseUser?.uid,
      email: firebaseUser?.email
    };

    return dispatch(new ActionUserSet(user)).pipe(
      filter(() =>
        firebaseUser != null
      ),
      switchMap(() =>
        dispatch(new ActionUserGet(user))
      )
    );
  }

  @Action(ActionUserRegister)
  register(
    { getState, dispatch }: StateContext<StateUserModel>,
    { nbUser }: ActionUserRegister
  ) {
    const user: User = {
      ...StateUser.user(getState()),
      email: nbUser.email,
      fullName: nbUser.fullName
    };

    return dispatch(new ActionUserSet(user)).pipe(
      switchMap(() =>
        this.store.select(StateUser.id)
      ),
      filter((id: string) =>
        id != null
      ),
      take(1),
      switchMap((id) =>
        this.firestore.collection('users').doc(id).set(StateUser.user(getState()))
      )
    );
  }

  @Action(ActionUserSetEmail)
  setEmail(
    { getState, dispatch }: StateContext<StateUserModel>,
    { email }: ActionUserSetEmail
  ) {
    const user: User = {
      ...StateUser.user(getState()),
      email
    };

    return dispatch(new ActionUserSet(user));
  }

  @Action(ActionUserSet)
  set(
    { getState, patchState }: StateContext<StateUserModel>,
    { user }: ActionUserSet
  ) {
    user = {
      ...StateUser.user(getState()),
      ...user
    };

    patchState({ user });
  }

  @Action(ActionUserSaveFavorite)
  saveFavorite(
    { getState, dispatch }: StateContext<StateUserModel>,
    { symbol, isFavorite }: ActionUserSaveFavorite
  ) {
    const user: User = StateUser.user(getState());

    user.favorites[symbol] = isFavorite;

    return dispatch(new ActionUserSet(user)).pipe(
      switchMap(() =>
        this.firestore.collection('users').doc(user.id).update(user)
      )
    );
  }

  @Action(ActionUserGet)
  get(
    { dispatch }: StateContext<StateUserModel>,
    { user }: ActionUserGet
  ) {
    return this.firestore
      .collection<User>('users')
      .doc(user.id)
      .valueChanges()
      .pipe(
        switchMap((user: User) =>
          dispatch(new ActionUserSet(user))
        )
      );
  }
}
