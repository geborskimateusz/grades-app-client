export interface User {
    userId: string;
    peselBasedUserName: string;
    password;
    userRole: 'TEACHER' | 'PARENT' ;
}