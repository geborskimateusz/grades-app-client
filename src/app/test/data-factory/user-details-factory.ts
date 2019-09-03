import { UserDetails } from '../../shared/user/user-details.model';
import { Teacher } from 'src/app/shared/models/teacher.model';

export const FAKE_USER_DETAILS: UserDetails = {
    id: 0,
    firstName: 'Indiana',
    lastName: 'Jones',
    motherName: 'Kate',
    fatherName: 'Stephen',
    personalIdentityNum: '222222',
    dateOfBirth: new Date(2000, 13, 1),
    address: {
        city: 'Cracow',
        street: 'Stanislawa Moniuszki',
        homeNumber: '12/3',
        postalCode: '43-321',
    },
    contact: {
        id: 0,
        phoneNumber: '111222333',
        email: 'john@gmail.com'
    },
    profileImage: {
        id: 0,
        imageUrl: 'http://www.seowptheme.com/wp-content/uploads/avatar-2-1.png'
    }
  };


  export const TEACHERS: Teacher[] = [
    {
        id: 0,
        firstName: 'Indiana',
        lastName: 'Jones',
        motherName: 'Kate',
        fatherName: 'Stephen',
        personalIdentityNum: '222222',
        dateOfBirth: new Date(2000, 13, 1),
        address: {
            city: 'Cracow',
            street: 'Stanislawa Moniuszki',
            homeNumber: '12/3',
            postalCode: '43-321',
        },
        contact: {
            id: 0,
            phoneNumber: '111222333',
            email: 'john@gmail.com'
        },
        profileImage: {
            id: 0,
            imageUrl: 'http://www.seowptheme.com/wp-content/uploads/avatar-2-1.png'
        },
        subjects: []
      },
      {
        id: 0,
        firstName: 'Indiana',
        lastName: 'Jones',
        motherName: 'Kate',
        fatherName: 'Stephen',
        personalIdentityNum: '222222',
        dateOfBirth: new Date(2000, 13, 1),
        address: {
            city: 'Cracow',
            street: 'Stanislawa Moniuszki',
            homeNumber: '12/3',
            postalCode: '43-321',
        },
        contact: {
            id: 0,
            phoneNumber: '111222333',
            email: 'john@gmail.com'
        },
        profileImage: {
            id: 0,
            imageUrl: 'http://www.seowptheme.com/wp-content/uploads/avatar-2-1.png'
        },
        subjects: []
      }
  ]