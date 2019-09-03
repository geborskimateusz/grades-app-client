import { Grade } from './grade.model';
import { UserDetails } from 'src/app/shared/user/user-details.model';

export interface Student extends UserDetails {
    classId: number;
    grades: Grade[];
}