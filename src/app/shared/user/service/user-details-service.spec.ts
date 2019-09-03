import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserDetails } from 'src/app/shared/user/user-details.model';
import { FAKE_USER_DETAILS } from 'src/app/test/data-factory/user-details-factory';

import { UserDetailsService } from './user-details.service';


describe('UserDetailsService', () => {
    let userDetailsService: UserDetailsService,
        storeSpy: any;

    beforeEach(() => {

        storeSpy = jasmine.createSpyObj('Store', ["select", "dispatch"])

        TestBed.configureTestingModule({
            providers: [
                UserDetailsService,
                {provide: Store, useValue: storeSpy}
            ]
        })

        userDetailsService = TestBed.get(UserDetailsService);
    });

    it('should select fromApp.getUserDetails()', () => {
        const userDetailsData: UserDetails = FAKE_USER_DETAILS;

        spyOn(userDetailsService, 'getUserDetails').and.returnValue(of(userDetailsData));

        let actualUserDetails: UserDetails;
        userDetailsService.getUserDetails().subscribe(subscribedUserDetails => {
            actualUserDetails = subscribedUserDetails;
            expect(actualUserDetails).toBe(userDetailsData);
        });
    });

    it('should return correct age.', () => {
        const age: number = 20;

        spyOn(userDetailsService, 'getAge').and.returnValue(age);

        const getAge: number = userDetailsService.getAge();

        expect(getAge).toBe(age);
    });

    it('should return proper residence.', () => {
        const userDetailsData: UserDetails = FAKE_USER_DETAILS;
        let residence: string = `${userDetailsData.address.city}  ${userDetailsData.address.street}  ${userDetailsData.address.homeNumber}`

        spyOn(userDetailsService, 'getResidence').and.returnValue(residence);

        const getResidence: string = userDetailsService.getResidence();

        expect(getResidence).toBe(residence);
    })
})