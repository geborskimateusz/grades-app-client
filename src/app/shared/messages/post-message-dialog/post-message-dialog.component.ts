import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { RequestMessage } from '../../models/request-message';
import { MessageService } from '../service/message-service';

export interface PostMessageDialogData {
    senderId: string,
    receiverDetails: {
        receiverId: string,
        subject: string,
        name: string,
    }
}

@Component({
    selector: 'app-post-message-dialog',
    templateUrl: './post-message-dialog.component.html',
    styleUrls: ['./post-message-dialog.component.scss']
})
export class PostMessageDialogComponent {
    messageForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<PostMessageDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: PostMessageDialogData,
                private messageService: MessageService) {
        this.initMessageForm(data);
    }

    private initMessageForm(data: PostMessageDialogData): void {
        this.messageForm = new FormGroup({
            messageTitle: new FormControl(`Ask about ${data.receiverDetails.subject}.`, Validators.required),
            messageDetails: new FormControl('', Validators.required)
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
        this.messageForm.reset();
    }

    sendMessage(): void {
        const newMessage: RequestMessage = {
            title: this.messageForm.value.messageTitle,
            details: this.messageForm.value.messageDetails,
            senderId: this.data.senderId,
            receiverId: this.data.receiverDetails.receiverId
        };
        this.messageService.postMessage(newMessage);
        this.dialogRef.close();
    }

}
