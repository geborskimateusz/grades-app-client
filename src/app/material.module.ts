import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatStepperModule,
        MatSidenavModule,
        MatListModule,
        MatChipsModule,
        MatTableModule,
        MatCardModule,
        MatDividerModule,
        MatListModule,
        DragDropModule,
        MatBottomSheetModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatStepperModule,
        MatSidenavModule,
        MatListModule,
        MatChipsModule,
        MatTableModule,
        MatCardModule,
        MatDividerModule,
        MatListModule,
        DragDropModule,
        MatBottomSheetModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatDialogModule
    ]
})
export class MaterialModule {

}
