
import { AuthActions, SIGNIN_USER, LOGOUT, SET_TOKEN, SET_LOGIN_STATE, AUTHENTICATE_USER } from './auth.actions';

export interface State {
    isAuth: boolean
    userRole: string
    token: string,
}

export const initialState: State = {
    isAuth: false,
    userRole: null,
    token: null,
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SIGNIN_USER: {
            return {
                ...state,
              };
        }
        case LOGOUT: {
            return {
                ...state,
                token: null,
                isAuth: false
              };
        }
          
        case SET_TOKEN: {
            return {
              ...state,
              token: action.payload,
            };
        }
         
        case SET_LOGIN_STATE: {
            return{
              ...state,
              loginState: action.payload
            };
        }
        case AUTHENTICATE_USER: {
            return {
                ...state,
                isAuth: true
              };
        }
        default:
          return state;
      }
}

export const getIsAuth = (state: State) => state.isAuth;
export const getToken = (state: State) => state.token;
