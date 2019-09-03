import 'rxjs/add/operator/do';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppProperties } from '../../../api-enum';
import { MessageContainer } from '../../models/message-container-enum';
import { Message } from '../../models/message.model';
import { MessageService } from '../service/message-service';
import { SearchMessageService } from './search-message.service';


@Component({
    selector: 'app-messages-list',
    templateUrl: './messages-list.component.html',
    styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {


    messagesDataSource$: Observable<Message[]>;

    messagesContainerTitle = MessageContainer.RECEIVED_MESSAGES;

    messagesArray: Message[] = [];

    pageNumber: number = AppProperties.DEFAULT_PAGINATION_PAGE;

    constructor(private messageService: MessageService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private searchMessageService: SearchMessageService) {

        this.searchMessageService.foundMessages
            .subscribe(foundMessages => this.messagesArray = foundMessages)

    }

    ngOnInit(): void {
        this.messagesDataSource$ = this.messageService.getMessagesDataSource(this.messagesContainerTitle);
    }


    showMessageDetails(message: Message): void {
        this.messageService.trySetActiveMessage(message.id, message.messageContainer);
        this.router.navigate(['./message', this.messagesContainerTitle, message.id], {relativeTo: this.activatedRoute});
    }


    initMessagesArray(): void {
        this.messagesDataSource$ = this.messageService.getMessagesDataSource(this.messagesContainerTitle)
        this.messagesDataSource$.subscribe((messages: Message[]) => {
            this.messagesArray = messages;
        });
    }


    setMessageContainerTitle(selectedList: string): void {
        switch (selectedList) {
            case MessageContainer.SENT_MESSAGES: {
                this.messagesContainerTitle = MessageContainer.SENT_MESSAGES;
                break;
            }
            case MessageContainer.DELETED_MESSAGES: {
                this.messagesContainerTitle = MessageContainer.DELETED_MESSAGES;
                break;
            }
            default: {
                this.messagesContainerTitle = MessageContainer.RECEIVED_MESSAGES;
                break;
            }
        }
    }

    onScroll(): void {
        this.pageNumber++;
        this.messageService.updateSelectedList(this.messagesContainerTitle, this.pageNumber);
    }


}
