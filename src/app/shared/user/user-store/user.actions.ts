import { Action } from '@ngrx/store';
import { UserDetails } from '../user-details.model';

export const SET_USER_DETAILS = '[USER_DETAILS] Set user Details';
export const GET_USER_DETAILS = '[USER_DETAILS] Get User Details';


export class SetUserDetails implements Action {
    readonly type = SET_USER_DETAILS;
    constructor(public payload: UserDetails ){}
}

export class GetUserDetails implements Action {
    readonly type = GET_USER_DETAILS;
}


export type UserDetailsActions =
 SetUserDetails 
 | GetUserDetails;