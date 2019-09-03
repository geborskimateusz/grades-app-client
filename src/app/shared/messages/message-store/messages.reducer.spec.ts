import { messagesReducer, initialState } from './messages.reducers';
import * as MessagesActions from './messages.actions';
import { Message } from '../../models/message.model';
import { MESSAGES } from 'src/app/test/data-factory/message-factory';
import { MessageContainer } from '../../models/message-container-enum';

describe('MessagesReducer', () => {
    const RECEIVED_MESSAGES: Message[] = [...MESSAGES];
    const SENT_MESSAGES: Message[] = [...MESSAGES]
    const DELETED_MESSAGES: Message[] = [...MESSAGES]
    
    const fakeMessageState = {
        receivedMessages: RECEIVED_MESSAGES,
        sentMessages: SENT_MESSAGES,
        deletedMessages: DELETED_MESSAGES,
        activeMessage: undefined
    }

    it('should set received messages', () => {
        const receivedMessages = RECEIVED_MESSAGES;
        const action = new MessagesActions.SetMessages({ messagesContainer: MessageContainer.RECEIVED_MESSAGES, messages: receivedMessages });
        const newState = messagesReducer(initialState, action);
        const expectedState = { ...initialState, receivedMessages }

        expect(newState).toEqual(expectedState);
    })

    it('should set sent messages', () => {
        const sentMessages = SENT_MESSAGES;
        const action = new MessagesActions.SetMessages({ messagesContainer: MessageContainer.SENT_MESSAGES, messages: sentMessages });
        const newState = messagesReducer(initialState, action);
        const expectedState = { ...initialState, sentMessages }

        expect(newState).toEqual(expectedState);
    })

    it('should set deleted messages', () => {
        const deletedMessages = DELETED_MESSAGES;
        const action = new MessagesActions.SetMessages({messagesContainer: MessageContainer.DELETED_MESSAGES, messages: deletedMessages});
        const newState = messagesReducer(initialState, action);
        const expectedState = { ...initialState, deletedMessages }

        expect(newState).toEqual(expectedState);
    })

    it('should delete message on given index', () => {
        const fakeInitialState = fakeMessageState;
        const messageToDelete = RECEIVED_MESSAGES[0];
        const receivedMessages = [];
        const deletedMessages = [...DELETED_MESSAGES, messageToDelete];

        const action = new MessagesActions.DeleteMessage({messageContainer: MessageContainer.RECEIVED_MESSAGES, message: messageToDelete});
        const newState = messagesReducer(fakeInitialState, action);
        const expectedState = { ...fakeInitialState, receivedMessages, deletedMessages }

        expect(newState).toEqual(expectedState);
    })
})
