import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CdkDragDrop, transferArrayItem } from '../../../../../node_modules/@angular/cdk/drag-drop';
import { MessageContainer } from '../../models/message-container-enum';
import { MessageService } from '../service/message-service';

@Component({
    selector: 'app-messages-sidebar',
    templateUrl: './messages-sidebar.component.html',
    styleUrls: ['./messages-sidebar.component.scss']
})
export class MessagesSidebarComponent implements OnInit {

    @Output() selectedMessageContainer = new EventEmitter<string>();

    @Output() initMessagesArray = new EventEmitter<void>();

    enumMessageContainer = MessageContainer;

    messagesMovedToDelete = [];

    @Input() messagesContainerTitle: string;

    @Input() pageNumber: number;
    @Output() pageNumberChange = new EventEmitter<number>();


    constructor(private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.onSelectedList(this.messagesContainerTitle, this.pageNumber);
    }

    dropAndDelete(event: CdkDragDrop<string[]>): void {
        const isNotDroppedInTheSameContainer = event.previousContainer != event.container;
        if (isNotDroppedInTheSameContainer) {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }

        const draggedMessage = this.messagesMovedToDelete[0];

        this.messageService.moveMessageToDeleted(this.messagesContainerTitle, draggedMessage);
        this.clearMessagesMovedToDelete();
        this.initMessagesArray.emit();
    }

    onSelectedList(selectedListTitle: string, pageNumber: number): void {
        this.clearMessagesMovedToDelete();
        this.messageService.trySetMessagesBasedOnContainer(selectedListTitle, pageNumber);
        this.selectedMessageContainer.emit(selectedListTitle);
        this.initMessagesArray.emit();
    }

    onContainerChange(messageContainer: MessageContainer): void {
        this.selectedMessageContainer.emit(messageContainer);

        let containerWasChanged = messageContainer !== this.messagesContainerTitle;
        if (containerWasChanged) {
            this.messagesContainerTitle = messageContainer;
            this.resetPageNumber();
            this.onSelectedList(this.messagesContainerTitle, this.pageNumber);
        }
    }

    private resetPageNumber(): void {
        this.pageNumber = 0;
        this.pageNumberChange.emit(this.pageNumber);
    }

    private clearMessagesMovedToDelete(): void {
        this.messagesMovedToDelete = [];
    }


}
