import { TestBed } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Subject } from 'src/app/shared/models/subject.model';
import { Teacher } from 'src/app/shared/models/teacher.model';
import { FAKE_SUBJECTS } from 'src/app/test/data-factory/subject-factory';
import { TEACHERS } from 'src/app/test/data-factory/user-details-factory';

import * as StudentActions from '../student-store/student.actions';
import { StudentService } from './student.service';

describe('StudentService', () => {

    let studentService: StudentService,
        studentStoreSpy: any;

    const subjects: Subject[] = FAKE_SUBJECTS,
        teachers: Teacher[] = TEACHERS;

    beforeEach(() => {

        studentStoreSpy = jasmine.createSpyObj("Store", ["select", "dispatch"])

        TestBed.configureTestingModule({
            providers: [
                StudentService,
                { provide: Store, useValue: studentStoreSpy }
            ]
        });

        studentService = TestBed.get(StudentService);
    });

    it('Should dispatch StudentActions.TrySetSubjects()', () => {
        let action: Action = new StudentActions.TrySetSubjects;

        studentStoreSpy.dispatch.and.callThrough();

        studentService.trySetSubjects();

        expect(studentStoreSpy.dispatch).toHaveBeenCalled();
        expect(studentStoreSpy.dispatch).toHaveBeenCalledWith(action);
    });

    it('Should return fake Subject[]', () => {
        let fakeSubjectArr: Subject[] = subjects;

        spyOn(studentService, 'getObservableOfSubjects').and.returnValue(of(fakeSubjectArr));

        let setSubjectsArray: Observable<Subject[]> = studentService.getObservableOfSubjects();

        setSubjectsArray.subscribe(subjects => {
            expect(subjects).toBe(fakeSubjectArr);
        })
    });

    it('Should select Teachers whhich are related with current Student user', () => {
        let teacherArr: Teacher[] = teachers;

        spyOn(studentService, 'getObservableOfTeachers').and.returnValue(of(teacherArr));

        studentService.getObservableOfTeachers().subscribe(selectedTeachers => {
            expect(selectedTeachers).toBe(teacherArr);
        })
    })

    it('Should return new Teacher arr with only one Teacher', () => {
        let teacherArr: Teacher[] = teachers;

        const actualTeacherArr: Teacher[] = studentService.getUniqueTeachers(teacherArr);

        expect(actualTeacherArr.length).toEqual(1);
    })

});