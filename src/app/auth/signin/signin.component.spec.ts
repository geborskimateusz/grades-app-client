import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { SigninComponent } from 'src/app/auth/signin/signin.component';
import { MaterialModule } from 'src/app/material.module';
import { UIService } from 'src/app/shared/ui/service/ui.service';
import { UserDetailsService } from 'src/app/shared/user/service/user-details.service';

import * as fromApp from '../../app-store/app.reducer';
import { AuthService } from '../auth-service';
import * as AuthActions from '../auth-store/auth.actions';


describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let store: Store<fromApp.State>;
  let uiService: any;
  let authService: any;
  let userDetailsService: any;

  beforeEach(async(() => {
    let uiServiceSpy = jasmine.createSpyObj('UIService', ['openSnackbar']);

    let authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'logout']);

    let userDetailsServiceSpy = jasmine.createSpyObj('UserDetailsService', ['getUserDetails']);

    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [
        MaterialModule,
        StoreModule.forRoot(fromApp.reducers),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: UIService, useValue: uiServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserDetailsService, useValue: userDetailsServiceSpy }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents()
      .then(() => {
        uiService = TestBed.get(UIService);
        authService = TestBed.get(AuthService);
        userDetailsService = TestBed.get(UserDetailsService);
        store = TestBed.get(Store);
        fixture = TestBed.createComponent(SigninComponent);
        component = fixture.componentInstance;
      })

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loginForm invalid when empty', () => {
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should check if loginForm was initialized', () => {
    component.initForm();
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.controls['username']).toBeTruthy();
  })

  it('check if role from loginform is required', () => {
    let errors = {};

    fixture.detectChanges();

    let role = component.loginForm.controls['role'];
    errors = role.errors || {};

    expect(errors['required']).toBeTruthy();
  })

  it('should initForm() in ngOnInit() ', () => {
    spyOn(component, 'initForm');

    component.ngOnInit();

    expect(component.initForm).toHaveBeenCalled();
  });

  it('check if submiting call onSubmit() and form returns correct values', () => {
    spyOn(component, 'onSubmit');

    fixture.detectChanges();

    component.loginForm.controls['username'].setValue("111111");

    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.loginForm.value.username).toBe('111111');
  })

  it('should dispatch AuthActions.TrySignin on onsubmit()', () => {
    let fakeUserCredentials = {
      username: '',
      password: '',
      role: ''
    }
    const action = new AuthActions.TrySignin(fakeUserCredentials)

    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
