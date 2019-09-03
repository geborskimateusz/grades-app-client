import {Component, OnInit, Input} from '@angular/core';
import {Message} from '../../models/message.model';
import {Observable} from 'rxjs';
import {MessageService} from '../service/message-service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

    selectedMessage$: Observable<Message>;
    messageIndex: number;
    messageType: string;

    constructor(private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.selectedMessage$ = this.messageService.getActiveMessage();
    }
}
