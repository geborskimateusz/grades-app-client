import { Grade } from '../../shared/models/grade.model';

export const GRADES: Grade[] = [
    { id: 1, letter: 'A-', dateOfIssue: new Date(2013, 13, 1), topic: 'Test about medival cities.' },
    { id: 2, letter: 'C+', dateOfIssue: new Date(2013, 13, 1), topic: 'Test about prehistoric animals.' },
    { id: 3, letter: 'F', dateOfIssue: new Date(2013, 13, 1), topic: 'Test about Vikings.' },
    { id: 4, letter: 'B', dateOfIssue: new Date(2013, 13, 1), topic: 'Test about ancient Rome.' },
];