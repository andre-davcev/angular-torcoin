import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { StateAuthModel } from './auth.state.model';
import { StateAuthOptions } from './auth.state.options';
import {
  ActionAuthLogout,
  ActionAuthWatchToken,
  ActionAuthWatchFirebase
} from './auth.actions';

@State<StateAuthModel>(StateAuthOptions)
@Injectable()
export class StateAuth implements NgxsOnInit {

  @Selector() static user(state: StateAuthModel): firebase.User {
    return state.user;
  }

  @Selector() static authenticated(state: StateAuthModel): boolean {
    console.log(state.user);
    return state.user != null;
  }

  @Selector() static token(state: StateAuthModel): NbAuthJWTToken {
    return state.token;
  }

  @Selector() static tokenIsValid(state: StateAuthModel): boolean {
    return StateAuth.token(state)?.isValid();
  }

  @Selector() static tokenUser(state: StateAuthModel): any {
    return StateAuth.tokenIsValid(state) ? StateAuth.token(state) : {};
  }

  constructor(
    private auth: NbAuthService,
    private authFirebase : AngularFireAuth
  ) {}

  public ngxsOnInit(context: StateContext<StateAuthModel>) {
    context.dispatch([
      new ActionAuthWatchToken(),
      new ActionAuthWatchFirebase()
    ]);
  }

  @Action(ActionAuthWatchToken, { cancelUncompleted: true })
  watchUser(
    { patchState }: StateContext<StateAuthModel>
  ) {
    return this.auth.onTokenChange().pipe(
      tap((token: NbAuthJWTToken) =>
        patchState({ token })
      )
    );
  }

  @Action(ActionAuthWatchFirebase, { cancelUncompleted: true })
  watchFirebase(
    { patchState }: StateContext<StateAuthModel>
  ) {
    return this.authFirebase.authState.pipe(
      tap((user: firebase.User) =>
        patchState({ user })
      )
    );
  }

  @Action(ActionAuthLogout)
  logout(
    { patchState }: StateContext<StateAuthModel>
  ) {
    patchState({ user: null });

    return this.auth.logout('email');
  }
}
