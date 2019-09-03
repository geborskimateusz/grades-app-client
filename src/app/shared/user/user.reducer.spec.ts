import { FAKE_USER_DETAILS } from 'src/app/test/data-factory/user-details-factory';

import * as UserActions from './user-store/user.actions';
import { initialState, userDetailsReducer } from './user-store/user.reducers';

describe('UserReducer', () => {
    describe('UserDetailsActions.SET_USER_DETAILS', () => {
        it('should set userDetails', () => {
            const userDetails = FAKE_USER_DETAILS;
            const action = new UserActions.SetUserDetails(userDetails);
            const newState = userDetailsReducer(initialState, action);
            const expectedState = {...initialState, userDetails}
            expect(newState).toEqual(expectedState);
        })
    })
})