import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Message} from "../../models/message.model";

@Injectable()
export class SearchMessageService {

    private searchMessageDataSource = new Subject<Message[]>();

    foundMessages = this.searchMessageDataSource.asObservable();

    setFoundMessages(foundMessages: Message[]): void {
        this.searchMessageDataSource.next(foundMessages)
    }
}