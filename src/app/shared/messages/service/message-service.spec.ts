import { TestBed } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MESSAGES } from 'src/app/test/data-factory/message-factory';

import { Message } from '../../models/message.model';
import { RequestMessage } from '../../models/request-message';
import * as MessagesAction from '../message-store/messages.actions';
import { MessageService } from './message-service';


describe('MessageService', () => {
    let messageService: MessageService,
        messagesStoreSpy: any;

    const messageContainer: string = 'sent',
        messageId: number = 1,
        messagesDataSource: Message[] = [...MESSAGES],
        firstMessage: Message = { ...MESSAGES[0] },
        pageNum: number = 1,
        senderId: string = '1',
        receiverId: string = '1';

    beforeEach(() => {

        messagesStoreSpy = jasmine.createSpyObj('Store', ["select", "dispatch"]);

        TestBed.configureTestingModule({
            providers: [
                MessageService,
                { provide: Store, useValue: messagesStoreSpy }
            ]
        })

        messageService = TestBed.get(MessageService);
    });

    it('should dispatch new MessagesAction.TrySetMessages()', () => {
        let action: Action = new MessagesAction.TrySetMessages(
            { messagesContainer: messageContainer, pageNumber: pageNum });

        messagesStoreSpy.dispatch.and.callThrough();

        messageService.trySetMessagesBasedOnContainer(messageContainer, pageNum);

        expect(messagesStoreSpy.dispatch).toHaveBeenCalled();
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledWith(action);
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch new MessagesAction.TrySetActiveMessageByIdAndContainer()', () => {
        let action: Action = new MessagesAction.TrySetActiveMessageByIdAndContainer(
            { messageId: messageId, messageContainer: messageContainer })

        messagesStoreSpy.dispatch.and.callThrough();

        messageService.trySetActiveMessage(messageId, messageContainer);

        expect(messagesStoreSpy.dispatch).toHaveBeenCalled();
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledWith(action);
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledTimes(1);
    })

    it('should return Observable of messages.', () => {
        const messages: Message[] = messagesDataSource;
        let selectedList: string = messageContainer;

        messagesStoreSpy.select.and.returnValue(of(messages));

        spyOn(messageService, 'getMessagesDataSource').and.returnValue(of(messages));

        messageService.getMessagesDataSource(selectedList).subscribe(selectedMessage => {
            expect(selectedMessage).toBe(messagesDataSource);
        });
    });



    it('should dispatch MessagesAction.DeleteMessageByIndex()', () => {
        const messageToDelete: Message = firstMessage;

        let action: Action = new MessagesAction.DeleteMessage(
            { message: messageToDelete, messageContainer: messageContainer })

        messagesStoreSpy.dispatch.and.callThrough();

        messageService.moveMessageToDeleted(messageContainer, messageToDelete);

        expect(messagesStoreSpy.dispatch).toHaveBeenCalledWith(action);
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch new MessagesAction.DeleteMessagePermanently()', () => {
        let message: Message = firstMessage;
        let action: Action = new MessagesAction.DeleteMessagePermanently(message);

        messagesStoreSpy.dispatch.and.callThrough();

        messageService.deleteMessagePermanently(message);

        expect(messagesStoreSpy.dispatch).toHaveBeenCalled();
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledWith(action);
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledTimes(1);
    })

    it('should return Observable of selected message.', () => {
        const selectedList: string = messageContainer;
        const messageId: number = firstMessage.id;
        const message: Message = firstMessage;

        messagesStoreSpy.select.and.returnValue(of(message));

        messageService.getMessageByIndex(selectedList, messageId).subscribe(selectedMessage => {
            expect(selectedMessage).toBe(message);
        });
    });

    it('should return Observable of active message.', () => {
        let activeMessage = firstMessage;

        messagesStoreSpy.select.and.returnValue(of(activeMessage));

        messageService.getActiveMessage().subscribe(selectedMessage => {
            expect(selectedMessage).toBe(activeMessage);
        })
    })


    it('should dispatch new MessagesAction.PostMessage()', () => {
        let requestMessage: RequestMessage = {
            title: firstMessage.title,
            details: firstMessage.details,
            senderId: senderId,
            receiverId: receiverId
        }
        let action: Action = new MessagesAction.PostMessage(requestMessage);

        messagesStoreSpy.dispatch.and.callThrough();

        messageService.postMessage(requestMessage);

        expect(messagesStoreSpy.dispatch).toHaveBeenCalled();
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledWith(action);
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledTimes(1);
    })

    it('should dispatch new MessagesAction.TryUpdateSelectedMessages()', () => {
        let messagesContainer = messageContainer;
        let pageNumber = pageNum;

        let action: Action = new MessagesAction.TryUpdateSelectedMessages({ messagesContainer, pageNumber });

        messagesStoreSpy.dispatch.and.callThrough();

        messageService.updateSelectedList(messageContainer, pageNumber);

        expect(messagesStoreSpy.dispatch).toHaveBeenCalled();
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledWith(action);
        expect(messagesStoreSpy.dispatch).toHaveBeenCalledTimes(1);
    })
})