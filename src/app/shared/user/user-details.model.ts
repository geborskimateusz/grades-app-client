import { Address } from '../models/address.model';
import { Contact } from 'src/app/shared/models/contact.model';
import { ProfileImage } from 'src/app/shared/models/profile-image.model';

export interface UserDetails {
    id: number,
    firstName: string;
    lastName: string;
    motherName?: string;
    fatherName?: string;
    personalIdentityNum?: string;
    dateOfBirth?: Date;
    address?: Address
    contact?: Contact;
    profileImage?: ProfileImage;
    roles?: []
}