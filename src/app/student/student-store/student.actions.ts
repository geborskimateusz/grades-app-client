import { Action } from '@ngrx/store';
import { Subject } from 'src/app/shared/models/subject.model';
import { Teacher } from 'src/app/shared/models/teacher.model';

export const TRY_SET_SUBJECTS = '[STUDENT] Try Set Subjects';
export const TRY_SET_TEACHERS = '[STUDENT] Try Set Teachers';
export const SET_SUBJECTS = '[STUDENT] Set Subjects';
export const SET_TEACHERS = '[STUDENT] Set teachers';

export class TrySetSubjects implements Action {
    readonly type = TRY_SET_SUBJECTS;
}

export class TrySetTeachers implements Action {
    readonly type = TRY_SET_TEACHERS;
}

export class SetSubjects implements Action {
    readonly type = SET_SUBJECTS;
    constructor(public payload: Subject[]) { }
}

export class SetTeachers implements Action {
    readonly type = SET_TEACHERS;
    constructor(public payload: Teacher[]) { }
}

export type StudentActions =
    TrySetSubjects |
    TrySetTeachers |
    SetSubjects |
    SetTeachers;