import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { store } from '@angular/core/src/render3';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

import * as fromApp from '../app-store/app.reducer';
import { AuthService } from '../auth/auth-service';
import { UIService } from './ui/service/ui.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {


    constructor(private uiService: UIService,
        private authService: AuthService,
        private store: Store<fromApp.State>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authService.getToken();

        if (token) {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': token,
                },
            })
        }

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        if (ResponseInterceptor.serverIsDown(error.status)) {
                            this.initSnackBar(`Ups❗ Server side error 😨`);
                        }
                        if (ResponseInterceptor.authenticationError(error.status)) {
                            this.initSnackBar(`Invalid username or password.`);
                        }
                    }

                    return EMPTY
                })
            );
    }


    private initSnackBar(message: string): void {
        this.uiService.openSnackbar(
            message,
            null,
            3000
        );
    }

    private static serverIsDown(status: number): boolean {
        return status === 0;
    }
    private static authenticationError(status: number): boolean {
        return status === 401;
    }
}
