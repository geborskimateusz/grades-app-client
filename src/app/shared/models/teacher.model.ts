import { UserDetails } from 'src/app/shared/user/user-details.model';

export interface Teacher extends UserDetails {
    subjects: string[];

}