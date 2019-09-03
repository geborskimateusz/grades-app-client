import { UIService } from "./ui.service";
import { TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import * as UIActions from "../ui-store/ui.actions";

describe('UIService', () => {
    let uiService: UIService,
        matSnackBarSpy: any,
        storeSpy: any;

    beforeEach(async(() => {
        matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ["open"]);
        storeSpy = jasmine.createSpyObj('Store', ["select", "dispatch"])

        TestBed.configureTestingModule({
            providers: [
                UIService,
                { provide: Store, useValue: storeSpy },
                { provide: MatSnackBar, useValue: matSnackBarSpy }
            ]
        }).compileComponents()
        .then(() => {
            uiService = TestBed.get(UIService);
        })
    }))

    it('should open MatSnackBar', () => {
        matSnackBarSpy.open.and.callThrough();

        matSnackBarSpy.open('random message', null, 1);

        expect(matSnackBarSpy.open).toHaveBeenCalled();
    })

    it('should return true when spinner is loading', () => {

        storeSpy.select.and.returnValue(true);

        const isLoading: Observable<boolean> = uiService.getIsLoading();

        expect(isLoading).toBeTruthy();
        expect(storeSpy.select).toHaveBeenCalledTimes(1);
    })

    it('should dispatch new UIActions.StartLoading()', () => {
        storeSpy.dispatch.and.callThrough();

        uiService.startLoading();

        expect(storeSpy.dispatch).toHaveBeenCalledTimes(1);
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new UIActions.StartLoading());
    })

    it('should dispatch new UIActions.StartLoading()', () => {
        storeSpy.dispatch.and.callThrough();

        uiService.stopLoading();

        expect(storeSpy.dispatch).toHaveBeenCalledTimes(1);
        expect(storeSpy.dispatch).toHaveBeenCalledWith(new UIActions.StopLoading());
    })

})