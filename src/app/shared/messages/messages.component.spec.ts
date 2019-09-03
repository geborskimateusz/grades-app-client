import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from '../../material.module';
import { SearchMessageService } from './messages-list/search-message.service';
import { MessagesComponent } from './messages.component';
import { MessageService } from './service/message-service';


describe('MessagesComponent', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;
    let messageService: MessageService;
    let searchMessageService: SearchMessageService;

    beforeEach(async(() => {

        let messageServiceSpy = jasmine.createSpyObj('MessageService', ['getMessagesDataSource']);
        let searchMessageServiceSpy = jasmine.createSpyObj('SearchMessageService', ['']);


        TestBed.configureTestingModule({
            declarations: [MessagesComponent],
            imports: [
                MaterialModule,
                RouterModule.forRoot([]),
                FormsModule,
                ReactiveFormsModule,
                InfiniteScrollModule
            ],
            providers: [
                {provide: MessageService, useValue: messageServiceSpy},
                {provide: SearchMessageService, useValue: searchMessageServiceSpy}
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(MessagesComponent);
                component = fixture.componentInstance;
                messageService = TestBed.get(MessageService);
                searchMessageService = TestBed.get(SearchMessageService);
            })


    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
