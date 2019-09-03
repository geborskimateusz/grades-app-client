import {Action} from '@ngrx/store';
import {Message} from '../../models/message.model';
import {RequestMessage} from "../../models/request-message";

export const TRY_SET_MESSAGES = '[MESSAGES] Try Set Messages';
export const SET_MESSAGES = '[MESSAGES] Set Messages';
export const DELETE_MESSAGE = '[MESSAGES] Delete Message';
export const DELETE_MESSAGE_PERMANENTLY = '[MESSAGES] Delete Message Permanently';
export const TRY_SET_ACTIVE_MESSAGE_BY_MESSAGE_ID_AND_CONTAINER = '[MESSAGES] Try Set Active Message By Message Id And Container';
export const SET_ACTIVE_MESSAGE = '[MESSAGES] Set Active Message';
export const POST_MESSAGE = '[MESSAGES] Post Message';
export const TRY_UPDATE_SELECTED_MESSAGES = '[MESSAGES] Try Update Selected Messages';
export const UPDATE_SELECTED_MESSAGES = '[MESSAGES] Update Selected Messages';

export class TrySetMessages implements Action {
    readonly type = TRY_SET_MESSAGES;

    constructor(public payload: { messagesContainer: string, pageNumber: number }) {
    }
}

export class SetMessages implements Action {
    readonly type = SET_MESSAGES;

    constructor(public payload: { messagesContainer: string, messages: Message[] }) {
    }
}

export class DeleteMessage implements Action {
    readonly type = DELETE_MESSAGE;

    constructor(public payload: {messageContainer: string, message: Message}) {
    }
}

export class DeleteMessagePermanently implements Action {
    readonly type = DELETE_MESSAGE_PERMANENTLY;

    constructor(public payload: Message) {
    }
}

export class TrySetActiveMessageByIdAndContainer implements Action {
    readonly type = TRY_SET_ACTIVE_MESSAGE_BY_MESSAGE_ID_AND_CONTAINER;

    constructor(public payload: { messageId: number, messageContainer: string }) {
    }
}

export class SetActiveMessage implements Action {
    readonly type = SET_ACTIVE_MESSAGE;

    constructor(public payload: Message) {
    }
}

export class PostMessage {
    readonly type = POST_MESSAGE;

    constructor(public payload: RequestMessage) {
    }
}

export class TryUpdateSelectedMessages {
    readonly type = TRY_UPDATE_SELECTED_MESSAGES;

    constructor(public payload: { messagesContainer: string, pageNumber: number }) {
    }
}

export class UpdateSelectedMessages {
    readonly type = UPDATE_SELECTED_MESSAGES;

    constructor(public payload: { messagesContainer: string, messages: Message[] }) {
    }
}

export type MessagesActions =
    TrySetMessages |
    SetMessages |
    DeleteMessage |
    DeleteMessagePermanently |
    TrySetActiveMessageByIdAndContainer |
    SetActiveMessage |
    PostMessage |
    TryUpdateSelectedMessages |
    UpdateSelectedMessages;