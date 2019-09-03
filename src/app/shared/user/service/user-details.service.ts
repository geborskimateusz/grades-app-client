import { Injectable } from '@angular/core';
import * as fromUserDetails from '../../../shared/user/user-store/user.reducers'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDetails } from '../user-details.model';
import * as UserDetailsAction from '../user-store/user.actions';

@Injectable()
export class UserDetailsService {



  constructor(private userDetailsStore: Store<fromUserDetails.State>, ) { }


  trySetUserDetails(user: UserDetails): void {
    this.userDetailsStore.dispatch(new UserDetailsAction.SetUserDetails(user));
  }

  getUserDetails(): Observable<UserDetails> {
    return this.userDetailsStore.select(fromUserDetails.getUserDetails);
  }

  getAge() {
    let age: number;

    this.userDetailsStore.select(fromUserDetails.getUserDetails)
      .subscribe(
        userDetailsData => {
          age = this.calculateAge(userDetailsData, age);
        }, err => console.log(err))
    return age;
  }

  private calculateAge(userDetailsData: UserDetails, age: number): number {
    let currentYear = new Date().getFullYear();
    let yearOfBirth = new Date(userDetailsData.dateOfBirth).getFullYear();
    age = currentYear - yearOfBirth;
    return age;
  }

  getResidence() {
    let residence: string;

    this.userDetailsStore.select(fromUserDetails.getUserDetails).subscribe(userDetailsData => {
      residence = `${userDetailsData.address.city}  ${userDetailsData.address.street}  ${userDetailsData.address.homeNumber}`
    });

    return residence;
  }
}