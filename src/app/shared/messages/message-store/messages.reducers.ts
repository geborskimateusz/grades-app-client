import {Message} from '../../models/message.model';
import * as fromApp from '../../../app-store/app.reducer';
import {
    MessagesActions,
    TRY_SET_ACTIVE_MESSAGE_BY_MESSAGE_ID_AND_CONTAINER,
    SET_ACTIVE_MESSAGE,
    POST_MESSAGE,
    DELETE_MESSAGE_PERMANENTLY,
    UPDATE_SELECTED_MESSAGES,
    TRY_UPDATE_SELECTED_MESSAGES, TRY_SET_MESSAGES, SET_MESSAGES, DELETE_MESSAGE
} from './messages.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MessageContainer} from "../../models/message-container-enum";


export interface MessagesState {
    receivedMessages: Message[];
    sentMessages: Message[];
    deletedMessages: Message[];
    activeMessage: Message;
}

export interface State extends fromApp.State {
    messages: MessagesState;
}

export const initialState: MessagesState = {
    receivedMessages: [],
    sentMessages: [],
    deletedMessages: [],
    activeMessage: null,
};

export function messagesReducer(state = initialState, action: MessagesActions) {
    switch (action.type) {

        case TRY_SET_MESSAGES: {
            return {
                ...state
            }
        }

        case SET_MESSAGES: {
            const messagesContainer = action.payload.messagesContainer;
            const newMessages: Message[] = action.payload.messages;


            switch (messagesContainer) {
                case MessageContainer.RECEIVED_MESSAGES: {
                    return {
                        ...state,
                        receivedMessages: [...newMessages]
                    }
                }
                case MessageContainer.SENT_MESSAGES: {
                    return {
                        ...state,
                        sentMessages: [...newMessages]
                    }
                }
                case MessageContainer.DELETED_MESSAGES: {
                    return {
                        ...state,
                        deletedMessages: [...newMessages]
                    }
                }
            }
        }

        case TRY_SET_ACTIVE_MESSAGE_BY_MESSAGE_ID_AND_CONTAINER: {
            return {
                ...state
            }
        }

        case DELETE_MESSAGE: {

            let oldMessages: Message[] = [];
            const messagesContainer = action.payload.messageContainer;
            let message = action.payload.message;

            switch (messagesContainer) {
                case MessageContainer.RECEIVED_MESSAGES: {

                    oldMessages = [...state.receivedMessages];
                    let messageIndex = oldMessages.indexOf(message);
                    oldMessages.splice(messageIndex, 1);

                    return {
                        ...state,
                        receivedMessages: [...oldMessages],
                        deletedMessages: [...state.deletedMessages, message]
                    }
                }
                case MessageContainer.SENT_MESSAGES: {

                    oldMessages = [...state.sentMessages];
                    let messageIndex = oldMessages.indexOf(message);
                    oldMessages.splice(messageIndex, 1);

                    return {
                        ...state,
                        sentMessages: [...oldMessages],
                        deletedMessages: [...state.deletedMessages, message]
                    }
                }
            }
        }

        case DELETE_MESSAGE_PERMANENTLY: {

            let oldMessages;
            let message = action.payload;

            oldMessages = [...state.deletedMessages];

            let messageIndex = oldMessages.indexOf(message);

            oldMessages.splice(messageIndex, 1);

            return {
                ...state,
                deletedMessages: [...oldMessages],
            }
        }

        case SET_ACTIVE_MESSAGE: {
            return {
                ...state,
                activeMessage: action.payload
            }
        }

        case POST_MESSAGE: {
            return {
                ...state
            }
        }

        case TRY_UPDATE_SELECTED_MESSAGES: {
            return {
                ...state
            }
        }

        case UPDATE_SELECTED_MESSAGES: {
            const messagesContainer = action.payload.messagesContainer;
            const newMessages: Message[] = action.payload.messages;
            let oldMessages: Message[] = [];

            switch (messagesContainer) {
                case MessageContainer.RECEIVED_MESSAGES: {
                    oldMessages = state.receivedMessages;
                    return {
                        ...state,
                        receivedMessages: [...oldMessages, ...newMessages]
                    }
                }
                case MessageContainer.SENT_MESSAGES: {
                    oldMessages = state.sentMessages;
                    return {
                        ...state,
                        sentMessages: [...oldMessages, ...newMessages]
                    }
                }
                case MessageContainer.DELETED_MESSAGES: {
                    oldMessages = state.deletedMessages;
                    return {
                        ...state,
                        deletedMessages: [...oldMessages, ...newMessages]
                    }
                }
            }
        }

        default: {
            return state;
        }
    }
}

export const getMessagesState = createFeatureSelector<MessagesState>('messages');

export const getReceivedMessages = createSelector(getMessagesState, (messagesState: MessagesState) => messagesState.receivedMessages);
export const getSentMessages = createSelector(getMessagesState, (messagesState: MessagesState) => messagesState.sentMessages);
export const getDeletedMessages = createSelector(getMessagesState, (messagesState: MessagesState) => messagesState.deletedMessages);

export const getActiveMessage = createSelector(getMessagesState, (messagesState: MessagesState) => messagesState.activeMessage);

export const getReceivedMessageByIndex = (index: number) => createSelector(getMessagesState, (messagesState: MessagesState) => messagesState.receivedMessages[index]);
export const getSentMessageByIndex = (index: number) => createSelector(getMessagesState, (messagesState: MessagesState) => messagesState.sentMessages[index]);
export const getDeletedMessageByIndex = (index: number) => createSelector(getMessagesState, (messagesState: MessagesState) => messagesState.deletedMessages[index]);


