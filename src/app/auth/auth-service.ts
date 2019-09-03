import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import * as fromApp from '../app-store/app.reducer'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../auth/auth-store/auth.actions'
import { UIService } from '../shared/ui/service/ui.service';

@Injectable()
export class AuthService {

    constructor(private store: Store<fromApp.State>,
                private uiService: UIService) { }

    isAuthenticated(): Observable<boolean> {
        return this.store.select(fromApp.getIsAuth);
    }

    getCurrentUserId(): number {
        return +JSON.parse(localStorage.getItem('currentUserId'))
    }

    getTokenSub(): string {
        let token = this.getToken();

        token = token.replace('Bearer ', '')
        return jwt_decode(token).sub;
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    logout(): void {
        this.store.dispatch(new AuthActions.Logout);
        localStorage.clear();
        this.uiService.openSnackbar(
            'You have been succesgfully logged out.',
            null,
            3000
        );
    }

}