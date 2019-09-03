import {authReducer, initialState} from './auth.reducers'
import * as AuthActions from './auth.actions';

describe('AuthReducer', () => {
        it('should set isAuth to true', () => {
            const action = new AuthActions.SigninUser;
            const newState = authReducer(initialState, action);
            const expectedState = { ...initialState}

            expect(newState).toEqual(expectedState)
        })

        it('should set isAuth to true', () => {
            const action = new AuthActions.Logout;
            const token = null;
            const isAuth = false;

            const newState = authReducer(initialState, action);
            const expectedState = { ...initialState, token, isAuth}

            expect(newState).toEqual(expectedState)
        })
})