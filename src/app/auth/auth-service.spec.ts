import { Store } from '@ngrx/store';
import {TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { UIService } from '../shared/ui/service/ui.service';
import { Observable } from 'rxjs';

describe('AuthService', () => {
    let authService: AuthService,
        storeSpy: any,
        uiServiceSpy: any;

    const currentUserId: number = 5;

    //PAYLOAD:DATA
    //"sub": "1234567890",
    //"name": "John Doe",
    //"iat": 1516239022
    const JWT_TOKEN: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


    beforeEach(() => {
        storeSpy = jasmine.createSpyObj('Store', ["select", "dispatch"]);
        uiServiceSpy = jasmine.createSpyObj('UIService', ['openSnackbar']);

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: Store, useValue: storeSpy },
                { provide: UIService, useValue: uiServiceSpy }
            ]
        })

        authService = TestBed.get(AuthService);

        localStorage.setItem('currentUserId', JSON.stringify(currentUserId));
        localStorage.setItem('token', JSON.stringify(JWT_TOKEN));
    });

    it('Should return Observable of true when user is authenticated.', () => {

        storeSpy.select.and.returnValue(true);

        const isAuth: Observable<boolean> = authService.isAuthenticated();

        expect(isAuth).toBeTruthy();
        expect(storeSpy.select).toHaveBeenCalledTimes(1);
    })

    it('Should return current user id from local storage as number.', () => {

        const expectedId: number = currentUserId;
        const actualId: number = +JSON.parse(localStorage.getItem('currentUserId'));

        expect(expectedId).toBe(actualId);
    })

    it('Should return 1234567890 as a sub.', () => {
        const PAYLOAD_DATA_sub: string = '1234567890';
        const sub: string = authService.getTokenSub();
        expect(sub).toBe(PAYLOAD_DATA_sub);
    })

    it('Should return JWT token.', () => {
        const token: string = authService.getToken();

        expect(token).toContain(JWT_TOKEN)
    })

    it('Should clear localStorage', () => {
        storeSpy.dispatch.and.callThrough();
        uiServiceSpy.openSnackbar.and.callThrough();

        authService.logout();

        expect(localStorage.getItem('currentUserId')).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();

        expect(storeSpy.dispatch).toHaveBeenCalledTimes(1);
        expect(uiServiceSpy.openSnackbar).toHaveBeenCalledTimes(1);

    })
})