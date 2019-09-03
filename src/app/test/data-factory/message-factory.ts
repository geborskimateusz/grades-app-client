import { Message } from '../../shared/models/message.model';

export const MESSAGES:  Message[] = [
    {
        id: 1,
        owner: {
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
        },
        title: `RECEIVED_MESSAGES_DATA_SOURCE Inbox Trip do Italy `,
        details: 'LorLorem ipsum dolor sit amet consectetur adipisicing elit. Tempore asperiores, omnis ducimus nulla harum numquam sequi doloremque atque voluptatibus accusantium.em',
        dateOfSending: new Date('December 17, 1995 03:24:00'), messageContainer: 'received'
    }
]