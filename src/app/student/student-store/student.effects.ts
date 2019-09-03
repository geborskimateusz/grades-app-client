import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap, mergeMap } from 'rxjs/operators';
import { AppProperties } from 'src/app/api-enum';
import { AuthService } from 'src/app/auth/auth-service';
import { Subject } from 'src/app/shared/models/subject.model';
import { Teacher } from 'src/app/shared/models/teacher.model';

import { StudentService } from '../service/student.service';
import * as StudentActions from './student.actions';

@Injectable()
export class StudentEffects {

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private authService: AuthService,
        private studentService: StudentService
    ) {
    }

    @Effect()
    getGrades = this.actions$
        .pipe(
            ofType(StudentActions.TRY_SET_SUBJECTS),
            mergeMap((action: StudentActions.TrySetSubjects) => {
                const id = this.authService.getCurrentUserId();
                return this.getStudentSubjectsWitGrades(id);
            }),
            concatMap((response: any[]) => {
                const subjects: Subject[] = response['subjects'];

                return [
                    new StudentActions.SetSubjects(subjects)
                ]
            })
        );

    @Effect()
    getTeachers = this.actions$
        .pipe(
            ofType(StudentActions.TRY_SET_TEACHERS),
            mergeMap((action: StudentActions.TrySetTeachers) => {
                const id = this.authService.getCurrentUserId();
                return this.getClassroomId(id);
            }),
            mergeMap((response: any) => {
                let classroomId = response['id'];
                return this.getStudentTeachers(classroomId);
            }),
            concatMap((response: any[]) => {
                const teachersResponse: Teacher[] = this.JSONtoTeacher(response);
                return [
                    new StudentActions.SetTeachers(teachersResponse)
                ]
            })
        );


    private getStudentSubjectsWitGrades(studentId: number) {
        return this.httpClient.get(`${AppProperties.API_V1_URL}student/${studentId}/grades`);
    }

    private getClassroomId(classroomId: number) {
        return this.httpClient.get(`${AppProperties.API_V1_URL}student/${classroomId}/classroom`);
    }

    private getStudentTeachers(classroomId: number) {
        return this.httpClient.get(`${AppProperties.API_V1_URL}classroom/${classroomId}/teachers`);
    }

    private JSONtoTeacher(response: any[]): Teacher[] {
        const responseArr = 'teachers';
        const teacher = 'teacher';
        const address = 'address';
        const contact = 'contact';

        return response[responseArr]
            .reduce((teachersAcc, jsonTeacher) => {

                const teacherResponse: Teacher = {
                    id: jsonTeacher[teacher]['id'],
                    subjects: [jsonTeacher['subject']],
                    firstName: jsonTeacher[teacher]['firstName'],
                    lastName: jsonTeacher[teacher]['lastName'],
                    dateOfBirth: jsonTeacher[teacher]['dateOfBirth'],
                    motherName: jsonTeacher[teacher]['motherName'],
                    fatherName: jsonTeacher[teacher]['fatherName'],
                    personalIdentityNum: jsonTeacher[teacher]['personalIdentityNum'],
                    address: {
                        city: jsonTeacher[teacher][address]['city'],
                        street: jsonTeacher[teacher][address]['street'],
                        homeNumber: jsonTeacher[teacher][address]['homeNumber'],
                        postalCode: jsonTeacher[teacher][address]['postalCode']
                    },
                    contact: {
                        phoneNumber: jsonTeacher[teacher][contact]['phoneNumber'],
                        email: jsonTeacher[teacher][contact]['email']
                    },
                    profileImage: {
                        imageUrl: jsonTeacher[teacher]['profileImage']['imageUrl']
                    }
                };

                teachersAcc.push(teacherResponse)

                return teachersAcc;
            }, []);
    }
}