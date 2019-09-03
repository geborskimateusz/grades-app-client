import { Student } from './student.model';

export interface ClassModel {
    classId: number;
    students: Student[];
}