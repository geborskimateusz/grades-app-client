import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import * as fromApp from '../../../app-store/app.reducer'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as UIActions from "../ui-store/ui.actions";

@Injectable()
export class UIService {

    constructor(private snackBar: MatSnackBar,
                private store: Store<fromApp.State>) {
    }

    openSnackbar(message: string, action: any, duration: number): void {
        this.snackBar.open(
            message,
            action,
            {
                duration: duration,
            },
        );
    }

    getIsLoading(): Observable<boolean> {
        return this.store.select(fromApp.getIsLoading);
    }

    startLoading(): void {
        this.store.dispatch(new UIActions.StartLoading());
    }

    stopLoading(): void {
        this.store.dispatch(new UIActions.StopLoading());
    }
}