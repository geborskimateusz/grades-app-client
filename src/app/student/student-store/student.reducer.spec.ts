import { studentReducer, initialState } from './student.reducers';
import * as StudentActions from './student.actions';
import { Subject } from 'src/app/shared/models/subject.model';
import { FAKE_SUBJECTS } from 'src/app/test/data-factory/subject-factory';

const SUBJECTS: Subject[] = FAKE_SUBJECTS;

describe('StudentReducer', () => {

    describe('StudentActions.SET_SUBJECTS', () => {
        it('should set subjects', () => {
            const subjects = SUBJECTS;
            const action = new StudentActions.SetSubjects(subjects);
            const newState = studentReducer(initialState, action);
            const expectedState = { ...initialState, subjects }

            expect(newState).toEqual(expectedState);
        })
    })
})