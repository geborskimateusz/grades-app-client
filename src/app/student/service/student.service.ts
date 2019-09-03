import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStudent from '../student-store/student.reducers';
import * as StudentActions from '../student-store/student.actions';
import {Subject} from '../../shared/models/subject.model';
import {Observable} from 'rxjs';
import { Teacher } from 'src/app/shared/models/teacher.model';

@Injectable()
export class StudentService {

    constructor(private studentStore: Store<fromStudent.State>) {
    }

    trySetSubjects(): void {
        this.studentStore.dispatch(new StudentActions.TrySetSubjects);
    }

    getObservableOfSubjects(): Observable<Subject[]> {
        this.trySetSubjects();
        return this.studentStore.select(fromStudent.getSubjects);
    }

    trySetTeachers(): void {
        this.studentStore.dispatch(new StudentActions.TrySetTeachers);
    }

    getObservableOfTeachers(): Observable<Teacher[]> {
        return this.studentStore.select(fromStudent.getTeachers);
    }

     getUniqueTeachers(teachers: Teacher[]): Teacher[] {
        let teachersToRemove: Teacher[] = [];

        for (let i = 0; i < teachers.length; i++) {
            let teacher = teachers[i];

            for (let j = i + 1; j < teachers.length; j++) {
                let comparedTeacher = teachers[j];

                if (teacher.id === comparedTeacher.id) {
                    teacher.subjects.push(...comparedTeacher.subjects);
                    teachersToRemove.push(comparedTeacher);
                }
            }
        }

        teachersToRemove.forEach(teacherToRemove => {
            teachers.splice(teachers.indexOf(teacherToRemove), 1);
        });

        return teachers;
    }

}