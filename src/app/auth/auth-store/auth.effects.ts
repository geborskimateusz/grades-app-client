import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { AppProperties } from 'src/app/api-enum';
import { UIService } from 'src/app/shared/ui/service/ui.service';
import { UserDetailsService } from 'src/app/shared/user/service/user-details.service';
import { UserDetails } from 'src/app/shared/user/user-details.model';

import { AuthService } from '../auth-service';
import * as AuthActions from './auth.actions';


@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions,
        private authService: AuthService,
        private userDetailsService: UserDetailsService,
        private uiService: UIService,
        private router: Router,
        private http: HttpClient) { }


    @Effect()
    authSignin$ = this.actions$
        .pipe(
            ofType(AuthActions.TRY_SIGNIN),
            map((action: AuthActions.TrySignin) => {
                return action.payload;
            }),
            exhaustMap((authData: any) => {

                const username = authData.username;
                const password = authData.password;

                return this.http.post<any>(`${AppProperties.API_URL}authenticate`,
                    { username, password },
                    { reportProgress: true })
                    .pipe(
                        map(data => {
                            localStorage.setItem('token', `Bearer ${data.token}`);
                            return data.token;
                        }
                        )
                    )
            }),
            exhaustMap(token => {
                return [
                    new AuthActions.SetToken(token),
                    new AuthActions.SigninUser,
                ];
            })
        );

    @Effect()
    setDetailsAndRedirect = this.actions$
        .pipe(
            ofType(AuthActions.SIGNIN_USER),
            exhaustMap(() => {
                const username = this.authService.getTokenSub();

                return this.http.get(`${AppProperties.API_V1_URL}user/${username}`)
                    .pipe(
                        map((user: UserDetails) => {
                            this.userDetailsService.trySetUserDetails(user)
                            localStorage.setItem('currentUserId', user.id.toString());

                            return JSON.stringify(user.roles)
                        })
                    )
            }),
            map(roles => {
                this.navigateByUserRoles(roles)
                return new AuthActions.AuthenticateUser();
            })
        );

    private navigateByUserRoles(roles: string) {
        let role = roles.includes('STUDENT') ? 'student' : 'teacher';
        this.router.navigate([`/${role}`]);
    }

    @Effect({ dispatch: false })
    logout$ = this.actions$
        .pipe(
            ofType(AuthActions.LOGOUT),
            map(() => {
                this.router.navigate(['/'])
            }),
        )


    @Effect()
    init$ = defer((): Observable<AuthActions.SigninUser | AuthActions.Logout> => {
        const token = this.authService.getToken();
        return (token)
            ? of(new AuthActions.SigninUser())
            : of(new AuthActions.Logout())
    });




}
