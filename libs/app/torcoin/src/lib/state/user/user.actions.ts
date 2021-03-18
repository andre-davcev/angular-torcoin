import { NbUser } from '@nebular/auth';
import { User } from '../../models';

import { ActionsUser } from './user.actions.enum';

import firebase from 'firebase/app';

export class ActionUserLogin { static readonly type = ActionsUser.Login; constructor(public firebaseUser: firebase.User) { } }
export class ActionUserRegister { static readonly type = ActionsUser.Register; constructor(public nbUser: NbUser) { } }
export class ActionUserSetEmail { static readonly type = ActionsUser.SetEmail; constructor(public email: string) { } }
export class ActionUserSet { static readonly type = ActionsUser.Set; constructor(public user: User) { } }
export class ActionUserSaveFavorite { static readonly type = ActionsUser.SaveFavorite; constructor(public symbol: string, public isFavorite: boolean) {} }
export class ActionUserGet { static readonly type = ActionsUser.Get; constructor(public user: User) { } }
