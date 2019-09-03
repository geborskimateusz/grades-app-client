import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { FAKE_USER_DETAILS } from 'src/app/test/data-factory/user-details-factory';

import { reducers } from '../../app-store/app.reducer';
import { MaterialModule } from '../../material.module';
import { UserDetailsService } from './service/user-details.service';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userDetailsService: UserDetailsService;
  class FakeUserDetailsService {
    getUserDetails() {
      return of(FAKE_USER_DETAILS)
    }

    getAge() {
      return 20;
    }

    getResidence() {
      return 'Cracow Stanislawa Moniuszki'
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        CommonModule,
        MaterialModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        { provide: UserDetailsService, useClass: FakeUserDetailsService }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UserComponent);
        userDetailsService = TestBed.get(UserDetailsService);
        component = fixture.componentInstance;
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return age as 20', () => {
    let getAge = component.getAge();
    expect(getAge).toBe(20);
  })

  it('should return Cracow Stanislawa Moniuszki', () => {
    const getResidence = component.getResidence();
    expect(getResidence).toBe('Cracow Stanislawa Moniuszki');
  })
});
