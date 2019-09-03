import * as fromApp from '../../app-store/app.reducer';
import {StudentActions, TRY_SET_SUBJECTS, TRY_SET_TEACHERS, SET_TEACHERS} from './student.actions';

import {SET_SUBJECTS} from './student.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Subject} from 'src/app/shared/models/subject.model';
import {Teacher} from 'src/app/shared/models/teacher.model';

export interface StudentState {
    subjects: Subject[];
    teachers: Teacher[];
}

export interface State extends fromApp.State {
    student: StudentState;
}

export const initialState: StudentState = {
    subjects: [],
    teachers: []
};

export function studentReducer(state = initialState, action: StudentActions) {
    switch (action.type) {
        case TRY_SET_SUBJECTS: {
            return {
                ...state,
            }
        }
        case TRY_SET_TEACHERS: {
            return {
                ...state,
            }
        }
        case SET_SUBJECTS: {
            return {
                ...state,
                subjects: action.payload
            }
        }
        case SET_TEACHERS: {
            return {
                ...state,
                teachers: action.payload
            }
        }
        default: {
            return {
                ...initialState
            }
        }
    }
}

export const getStudentState = createFeatureSelector<StudentState>('student');

export const getSubjects = createSelector(getStudentState, (studentState: StudentState) => studentState.subjects);

export const getTeachers = createSelector(getStudentState, (studentState: StudentState) => studentState.teachers);

