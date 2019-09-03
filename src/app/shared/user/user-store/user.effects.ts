import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';

import { AuthService } from '../../../auth/auth-service';

@Injectable()
export class UserDetailsEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService
    ) { }
}