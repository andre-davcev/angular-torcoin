import { NbAuthJWTToken } from '@nebular/auth';
import firebase from 'firebase/app';

export interface StateAuthModel {
  token: NbAuthJWTToken;
  user: firebase.User | null;
}
