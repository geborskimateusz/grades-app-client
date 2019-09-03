import {UserDetails} from 'src/app/shared/user/user-details.model';

export interface  Message {
  id: number;
  owner: UserDetails;
  title: string;
  details: string;
  dateOfSending: Date;
  messageContainer: string
}
