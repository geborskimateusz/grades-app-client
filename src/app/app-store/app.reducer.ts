import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromAuth from '../auth/auth-store/auth.reducers';
import * as fromUI from '../shared/ui/ui-store/ui.reducer';

export interface State {
    auth: fromAuth.State;
    ui: fromUI.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.authReducer,
    ui: fromUI.uiReducer
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getToken = createSelector(getAuthState, fromAuth.getToken)

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);