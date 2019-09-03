import { TestBed } from "@angular/core/testing";
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { reducers } from 'src/app/app-store/app.reducer';
import * as fromApp from '../app-store/app.reducer'
import * as AuthActions from './auth-store/auth.actions'


describe('AuthGuard', () => {

    let appStore: Store<fromApp.State>
    let authGuard: AuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard],
            imports: [
                StoreModule.forRoot(reducers),
                RouterTestingModule
            ]
        });

        appStore = TestBed.get(Store);
        authGuard = TestBed.get(AuthGuard);
    });

    it('should pass if AuthActions.AuthenticateUser was dispatched', () => {

        appStore.dispatch(new AuthActions.AuthenticateUser());

        authGuard.canLoad().subscribe((isAuth: boolean) => {
            expect(isAuth).toBe(true);
        });
    })

    it('should fail if AuthActions.AuthenticateUser was not dispatched', () => {

        authGuard.canLoad().subscribe((isAuth: boolean) => {
            expect(isAuth).toBe(false);
        });
    })
})