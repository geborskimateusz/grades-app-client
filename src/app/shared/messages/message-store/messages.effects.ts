import {Injectable} from "@angular/core";
import {Effect, ofType, Actions} from '@ngrx/effects';

import * as MessagesActions from './messages.actions';
import {mergeMap, concatMap, map, switchMap} from 'rxjs/operators';
import {Message} from '../../models/message.model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from 'src/app/auth/auth-service';
import {AppProperties} from 'src/app/api-enum';
import {MessageContainer} from '../../models/message-container-enum';
import 'rxjs/add/operator/catch';
import {RequestMessage} from "../../models/request-message";
import {UIService} from "../../ui/service/ui.service";

@Injectable()
export class MessagesEffects {

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private authService: AuthService,
        private uiService: UIService
    ) {
    }

    @Effect()
    getMessages = this.actions$
        .pipe(
            ofType(MessagesActions.TRY_SET_MESSAGES),
            switchMap((action: MessagesActions.TrySetMessages) => {
                const id = this.authService.getCurrentUserId();
                const messagesContainer = action.payload.messagesContainer;
                const pageNumber = action.payload.pageNumber;
                return this.httpClient.get(`${AppProperties.API_V1_URL}messages/${messagesContainer}/${id}/?page=${pageNumber}`)
                    .pipe(
                        map((response: any[]) => {
                            const responseMessages = response['messages'];
                            const messages: Message[] = this.JSONtoMessages(responseMessages, messagesContainer);

                            return {messagesContainer, messages}
                        })
                    )
            }),
            map(({messagesContainer, messages}) => {
                return new MessagesActions.SetMessages({messagesContainer, messages});
            })
        );

    @Effect({dispatch: false})
    getDeletedMessages = this.actions$
        .pipe(
            ofType(MessagesActions.DELETE_MESSAGE),
            map((action: MessagesActions.DeleteMessage) => {
                console.log('MessagesEffects -> getDeletedMessages', action)
                return this.putMessagesToDeleted(action);
            })
        );

    @Effect()
    deleteMessagePermanently = this.actions$
        .pipe(
            ofType(MessagesActions.DELETE_MESSAGE_PERMANENTLY),
            mergeMap((action: MessagesActions.DeleteMessagePermanently) => {
                const messageId = action.payload.id;
                return this.httpClient.delete(`${AppProperties.API_V1_URL}messages/deleted/${messageId}`);
            }),
            concatMap(() => {
                this.uiService.stopLoading();
                this.uiService.openSnackbar(
                    'Message was deleted successfully. ☑️',
                    null,
                    3000
                );
                return [
                    new MessagesActions.TrySetMessages({messagesContainer: MessageContainer.DELETED_MESSAGES, pageNumber: 0})
                ]
            })
        );

    @Effect()
    setActiveMessage = this.actions$
        .pipe(
            ofType(MessagesActions.TRY_SET_ACTIVE_MESSAGE_BY_MESSAGE_ID_AND_CONTAINER),
            mergeMap((action: MessagesActions.TrySetActiveMessageByIdAndContainer) => {
                const messageId = action.payload.messageId;
                const messageContainer = action.payload.messageContainer;

                return this.httpClient.get(`${AppProperties.API_V1_URL}messages/${messageContainer}/${messageId}/message`)
                    .pipe(
                        map(message => {
                            return MessagesEffects.extractJSONmessage(message, messageContainer);
                        })
                    );
            }),
            concatMap((message: Message) => {
                return [
                    new MessagesActions.SetActiveMessage(message)
                ];
            })
        );

    @Effect()
    postMessage = this.actions$
        .pipe(
            ofType(MessagesActions.POST_MESSAGE),
            switchMap((action: MessagesActions.PostMessage) => {
                const messageToPost: RequestMessage = action.payload;
                return this.httpClient.post(`${AppProperties.API_V1_URL}messages/message`, messageToPost);
            }),
            map(() => {
                this.uiService.openSnackbar(
                    'Message was sent successfully. ☑️',
                    null,
                    3000
                );
                return new MessagesActions.TrySetMessages({messagesContainer: MessageContainer.SENT_MESSAGES, pageNumber: 0})
            })
        );

    @Effect()
    updateMessages = this.actions$
        .pipe(
            ofType(MessagesActions.TRY_UPDATE_SELECTED_MESSAGES),
            switchMap((action: MessagesActions.TryUpdateSelectedMessages) => {
                const messagesContainer = action.payload.messagesContainer;
                const id = this.authService.getCurrentUserId();
                const pageNumber = action.payload.pageNumber;

                return this.httpClient.get(`${AppProperties.API_V1_URL}messages/${messagesContainer}/${id}/?page=${pageNumber}`)
                    .pipe(
                        map((response: any[]) => {
                            const responseMessages = response['messages'];
                            const messages: Message[] = this.JSONtoMessages(responseMessages, messagesContainer);

                            return {messagesContainer, messages}
                        })
                    )
            }),
            map(({messagesContainer, messages}) => {
                return new MessagesActions.UpdateSelectedMessages({messagesContainer, messages});
            })
        );


    private putMessagesToDeleted(action: any) {
        const messageContainer = action.payload.messageContainer;
        const messageId = action.payload.message.id;
        console.log(`${AppProperties.API_V1_URL}messages/deleted/temp/${messageId}/${messageContainer}`);
        return this.httpClient.put(`${AppProperties.API_V1_URL}messages/deleted/temp/${messageId}/${messageContainer}`, {
            messageId,
            messageContainer
        }).toPromise();
    }

    private JSONtoMessages(messages: any[], messageContainer: string): Message[] {

        return messages.reduce((messageArr, JSONmessage) => {

            const message = MessagesEffects.extractJSONmessage(JSONmessage, messageContainer);

            messageArr.push(message);

            return messageArr;
        }, []);
    }


    private static extractJSONmessage(JSONmessage, messageContainer: string) {
        return {
            id: JSONmessage['id'],
            owner: JSONmessage['userDetails'],
            title: JSONmessage['title'],
            details: JSONmessage['details'],
            dateOfSending: JSONmessage['dateOfSending'],
            messageContainer: messageContainer
        };
    }
}