import { Subject } from '../../shared/models/subject.model';

export const FAKE_SUBJECTS: Subject[] = [
    {
        name: 'History',
        grades: [
            { id: 1, letter: 'A', dateOfIssue: new Date(2013, 13, 1), topic: 'Test about medival cities.' },
            { id: 2, letter: 'F', dateOfIssue: new Date(2013, 13, 1), topic: 'Test about prehistoric animals.' },
            { id: 3, letter: 'B', dateOfIssue: new Date(2013, 13, 1), topic: 'Test about Vikings.' },
            { id: 4, letter: 'D', dateOfIssue: new Date(2013, 13, 1), topic: 'Test about ancient Rome.' },
        ]
    },
    {
        name: 'Science',
        grades: [
            { id: 1, letter: 'D+', dateOfIssue: new Date(2013, 13, 1), topic: 'Test about atoms.' },
            { id: 2, letter: 'C', dateOfIssue: new Date(2013, 13, 1), topic: 'Homework exercises.' },
        ]
    }
];