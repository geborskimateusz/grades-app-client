import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material.module';
import { GradesService } from 'src/app/shared/service/grades.service';
import { GradesComponent } from 'src/app/student/grades/grades.component';
import { StudentService } from 'src/app/student/service/student.service';
import { FAKE_SUBJECTS } from 'src/app/test/data-factory/subject-factory';

import * as fromStudent from '../student-store/student.reducers';

describe('GradesComponent', () => {
    let component: GradesComponent;
    let fixture: ComponentFixture<GradesComponent>;
    let el: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GradesComponent],
            imports: [
                MaterialModule,
                StoreModule.forRoot(fromStudent.studentReducer),
                BrowserAnimationsModule
            ],
            providers: [
                GradesService,
                StudentService
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(GradesComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
            })

    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should didsplay subjects with grades', () => {
        component.dataSource.data = FAKE_SUBJECTS;

        fixture.detectChanges();

        let subjectTableRows = fixture.nativeElement.querySelectorAll('tr.detail-row');
       
        expect(subjectTableRows.length).toBe(2);
        expect(subjectTableRows).toBeTruthy('Could not find subjects');
    })

    it('should didsplay subjects with grades', () => {
        component.dataSource.data = FAKE_SUBJECTS;

        fixture.detectChanges();

        let subjectTableRows = fixture.nativeElement.querySelectorAll('tr.detail-row');
       
        expect(subjectTableRows.length).toBe(2);
        expect(subjectTableRows).toBeTruthy('Could not find subjects');
    })

});
























