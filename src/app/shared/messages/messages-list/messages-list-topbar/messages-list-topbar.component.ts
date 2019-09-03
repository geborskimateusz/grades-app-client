import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from "../../../models/message.model";
import {DeleteMessagesDialogComponent} from "../../delete-message-dialog/delete-messages-dialog.component";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MessageContainer} from "../../../models/message-container-enum";
import {MessageService} from "../../service/message-service";
import {MatDialog} from "@angular/material";
import {SearchMessageService} from "../search-message.service";

@Component({
    selector: 'app-messages-list-topbar',
    templateUrl: './messages-list-topbar.component.html',
    styleUrls: ['./messages-list-topbar.component.scss']
})
export class MessagesListTopbarComponent implements OnInit {

    enumMessageContainer = MessageContainer;

    @Input() messagesContainerTitle = MessageContainer.RECEIVED_MESSAGES;

    messagesFormGroup: FormGroup;

    @Input() searchMessagesArray = [];
    @Output() foundMessagesArray = new EventEmitter<Message[]>();

    @Output() initMessagesArray = new EventEmitter<void>();

    isMessageFound = false;

    constructor(private messageService: MessageService,
                public deleteMessagesDialog: MatDialog,
                private formBuilder: FormBuilder,
                private searchMessageService: SearchMessageService) {
    }

    ngOnInit() {
        this.initFormGroup();
    }


    onSearchChange(searchValue: string) {
        let foundMessages = [];
        let isEmpty = this.isEmpty(searchValue);

        if (isEmpty) {
            this.searchMessageService.setFoundMessages(foundMessages);
            this.initMessagesArray.emit();
        } else {
            foundMessages = this.searchMessagesArray.filter(
                (message: Message) => {
                    const fullName = this.getSenderFullName(message);

                    const fullNameContainsCharacters = fullName.includes(searchValue);
                    if (fullNameContainsCharacters) {
                        this.isMessageFound = true
                    } else {
                        this.isMessageFound = false;
                    }
                    return fullNameContainsCharacters;
                }
            );

            let messagesWereFound = foundMessages.length !== 0;
            if (messagesWereFound) {
                this.searchMessageService.setFoundMessages(foundMessages)
            }
        }
    }

    isAnyMessageSelected() {
        return this.messagesFormGroup.value.messagesArray.length !== 0;
    }

    deleteCheckedMessages() {
        const messagesFormArray = this.getMessagesFormArray();
        const messagesToDelete: Message[] = this.getMessagesFromFormArray(messagesFormArray);

        if (this.removeFromDeleted()) {
            this.openConfirmDialog(messagesToDelete);
        } else {
            messagesToDelete.forEach(message => {
                this.messageService.moveMessageToDeleted(this.messagesContainerTitle, message);
            });
        }
        this.clearFormArray();
    }

    onCheckboxChange(event) {
        const checkedMessages = this.getMessagesFormArray();

        if (event.checked) {
            checkedMessages.push(new FormControl(event.source.value))
        } else {
            this.removeUnselected(checkedMessages, event);
        }
    }

    getMessagesFormArray() {
        return <FormArray>this.messagesFormGroup.get('messagesArray') as FormArray;
    }

    private getSenderFullName(message: Message) {
        return `${message.owner.firstName} ${message.owner.lastName}`;
    }

    private openConfirmDialog(messagesToDelete: Message[]) {
        this.deleteMessagesDialog.open(DeleteMessagesDialogComponent, {
            width: '600px',
            height: '400px',
            data: {
                messages: messagesToDelete
            }
        })
    }

    private clearFormArray() {
        this.getMessagesFormArray().controls = [];
    }

    private getMessagesFromFormArray(messagesFormArray: FormArray) {
        let messages: Message[] = [];

        for (let i = 0; i < messagesFormArray.length; i++) {
            const message = messagesFormArray.at(i).value;
            messages.push(message);
        }

        return messages;
    }

    private initFormGroup() {
        this.messagesFormGroup = this.formBuilder.group({
            messagesArray: this.formBuilder.array(this.searchMessagesArray)
        });
    }

    private removeFromDeleted() {
        return this.messagesContainerTitle === this.enumMessageContainer.DELETED_MESSAGES;
    }

    private removeUnselected(checkedMessages, event) {
        const index = checkedMessages.controls.findIndex(x => x.value === event.source.value);
        checkedMessages.removeAt(index);
    }

    private isEmpty(searchValue: string) {
        return searchValue === '';
    }
}


