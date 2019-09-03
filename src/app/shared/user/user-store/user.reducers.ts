import { UserDetails } from '../user-details.model';
import { UserDetailsActions, SET_USER_DETAILS, GET_USER_DETAILS } from './user.actions';
import * as fromApp from '../../../app-store/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserDetailsState {
    userDetails: UserDetails,
}

export interface State extends fromApp.State {
    userDetails: UserDetailsState;
}

export const initialState: UserDetailsState = {
    userDetails: undefined,
}

export function userDetailsReducer(state = initialState, action: UserDetailsActions) {
    switch (action.type) {
        case GET_USER_DETAILS: {
            return {
                ...state
            }
        }
        case SET_USER_DETAILS: {
            return {
                ...state,
                userDetails: action.payload,
            }   
        }
        default:
            return {
                ...state
            }
    }
}


export const getUserDetailsState = createFeatureSelector<UserDetailsState>('userDetails')
export const getUserDetails  = createSelector(getUserDetailsState, (userDetailsState: UserDetailsState) => userDetailsState.userDetails);

