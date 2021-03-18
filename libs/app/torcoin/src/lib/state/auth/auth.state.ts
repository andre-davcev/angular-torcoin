import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs/operators'
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
import { from } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { ActionUserLogin } from '../user';

@State<StateAuthModel>(StateAuthOptions)
@Injectable()
export class StateAuth implements NgxsOnInit {

  @Selector() static user(state: StateAuthModel): firebase.User {
    return state.user;
  }

  @Selector() static authenticated(state: StateAuthModel): boolean {
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
    { patchState, dispatch }: StateContext<StateAuthModel>
  ) {
    return this.authFirebase.authState.pipe(
      tap(t => console.log(t)),
      tap((user: firebase.User) =>
        patchState({ user })
      ),
      switchMap((user: firebase.User) =>
        dispatch(new ActionUserLogin(user))
      )
    );
  }

  @Action(ActionAuthLogout)
  logout({ dispatch, patchState }: StateContext<StateAuthModel>) {
    return from(this.authFirebase.signOut()).pipe(
      tap(() =>
        patchState({ user: null })
      ),
      switchMap(() =>
        dispatch(new Navigate(['/auth/login']))
      )
    );
  }
}
