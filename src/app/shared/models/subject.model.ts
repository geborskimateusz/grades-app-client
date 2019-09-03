import { Grade } from './grade.model';

export interface Subject {
    name: string;
    grades: Grade[];
}
