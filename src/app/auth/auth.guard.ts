import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromApp from '../app-store/app.reducer';

@Injectable()
export class AuthGuard implements CanLoad {

    constructor(private store: Store<fromApp.State>) { }

    canLoad() {
        return this.store.select(fromApp.getIsAuth).pipe(take(1));
    }
}