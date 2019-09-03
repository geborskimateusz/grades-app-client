import { Action } from '@ngrx/store';


export const TRY_SIGNIN = '[AUTH] Try Signin';
export const SIGNIN_USER = '[AUTH] Signin';
export const LOGOUT = 'Logout';
export const SET_TOKEN = 'Set Token';
export const SET_LOGIN_STATE = 'Set login state';
export const AUTHENTICATE_USER = 'Authenticate User'

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload?: { username: string, password: string, role: string }) { }
}

export class SigninUser implements Action {
  readonly type = SIGNIN_USER;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {
  }
}

export class SetLoginState implements Action {
  readonly type = SET_LOGIN_STATE;

  constructor(public payload: string) {
  }
}

export class AuthenticateUser implements Action {
  readonly type = AUTHENTICATE_USER;
}


export type AuthActions =
  TrySignin |
  SigninUser |
  Logout |
  SetToken |
  SetLoginState |
  AuthenticateUser;