import {Injectable} from '@angular/core';
import * as fromMessages from '../message-store/messages.reducers';
import {Store} from '@ngrx/store';
import * as MessagesAction from '../message-store/messages.actions';
import {Message} from '../../models/message.model';
import {MessageContainer} from '../../models/message-container-enum';
import {Observable, of} from 'rxjs';
import {RequestMessage} from "../../models/request-message";

@Injectable()
export class MessageService {

    constructor(private messagesStore: Store<fromMessages.State>) {
    }

    trySetMessagesBasedOnContainer(messagesContainer: string, pageNumber: number): void {
        this.messagesStore.dispatch(
            new MessagesAction.TrySetMessages({messagesContainer, pageNumber}))
    }

    trySetActiveMessage(messageId: number, messageContainer: string): void {
        this.messagesStore.dispatch(
            new MessagesAction.TrySetActiveMessageByIdAndContainer({messageId, messageContainer}));
    }

    getMessagesDataSource(selectedList: string): Observable<Message[]> {

        let observableMessages: Observable<Message[]> = of([]);

        switch (selectedList) {
            case MessageContainer.SENT_MESSAGES: {
                observableMessages = this.messagesStore.select(fromMessages.getSentMessages);
                break;
            }
            case MessageContainer.DELETED_MESSAGES: {
                observableMessages = this.messagesStore.select(fromMessages.getDeletedMessages);
                break;
            }
            default: {
                observableMessages = this.messagesStore.select(fromMessages.getReceivedMessages);
                break;
            }
        }

        return observableMessages;
    }

    moveMessageToDeleted(messageContainer: string, message: Message): void {
        this.messagesStore.dispatch(
            new MessagesAction.DeleteMessage({messageContainer, message}));
    }

    deleteMessagePermanently(message: Message): void {
        this.messagesStore.dispatch(
            new MessagesAction.DeleteMessagePermanently(message));
    }

    getMessageByIndex(selectedList: string, index: number): Observable<Message> {
        switch (selectedList) {
            case MessageContainer.SENT_MESSAGES: {
                return this.messagesStore.select(fromMessages.getSentMessageByIndex(index));
            }
            case MessageContainer.DELETED_MESSAGES: {
                return this.messagesStore.select(fromMessages.getDeletedMessageByIndex(index));
            }
            default: {
                return this.messagesStore.select(fromMessages.getReceivedMessageByIndex(index));
            }
        }
    }

    getActiveMessage(): Observable<Message> {
        return this.messagesStore.select(fromMessages.getActiveMessage);
    }

    postMessage(newMessage: RequestMessage): void {
        this.messagesStore.dispatch(
            new MessagesAction.PostMessage(newMessage));
    }

    updateSelectedList(messagesContainer: string, pageNumber: number): void {
        this.messagesStore.dispatch(new MessagesAction.TryUpdateSelectedMessages({messagesContainer, pageNumber}));
    }


}