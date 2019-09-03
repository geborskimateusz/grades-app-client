import {Component, Inject, OnInit} from '@angular/core';
import {Message} from "../../models/message.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MessageService} from "../service/message-service";
import {Observable} from "rxjs";
import {UIService} from "../../ui/service/ui.service";

export interface DeleteMessagesDialogData {
    messages: Message[]
}

@Component({
    selector: 'app-delete-message-dialog',
    templateUrl: './delete-messages-dialog.component.html',
    styleUrls: ['./delete-messages-dialog.component.scss'],
})
export class DeleteMessagesDialogComponent implements OnInit {

    isLoading$: Observable<boolean>;

    constructor(public dialogRef: MatDialogRef<DeleteMessagesDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DeleteMessagesDialogData,
                private messageService: MessageService,
                private uiService: UIService) {
    }

    ngOnInit(): void {
        this.isLoading$ = this.uiService.getIsLoading();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onDelete(): void {
        this.deleteMessages();
    }

    private deleteMessages(): void {
        this.uiService.startLoading();

        this.data.messages.forEach(message => {
            this.messageService.deleteMessagePermanently(message);
        });

        this.closeDialog();
    }

    //wait if loading ends
    private closeDialog(): void {
        this.isLoading$.subscribe(isLoading => {
            if (isLoading === false) {
                this.dialogRef.close()
            }
        })
    }
}
