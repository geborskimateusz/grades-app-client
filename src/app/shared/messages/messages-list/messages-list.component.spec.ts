import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { MESSAGES } from 'src/app/test/data-factory/message-factory';

import { MessageContainer } from '../../models/message-container-enum';
import { MessageService } from '../service/message-service';
import { MessagesListComponent } from './messages-list.component';
import { SearchMessageService } from './search-message.service';

describe('MessagesListComponent', () => {
  let component: MessagesListComponent;
  let fixture: ComponentFixture<MessagesListComponent>;
  let messageService: any;
  let searchMessageService: any;

  beforeEach(async(() => {
    let messageServiceSpy = jasmine.createSpyObj('MessageService', ['getMessagesDataSource', 'updateSelectedList'])
    let searchMessageServiceSpy = {
      foundMessages: EMPTY
    }

    TestBed.configureTestingModule({
      declarations: [MessagesListComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: SearchMessageService, useValue: searchMessageServiceSpy }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents()
      .then(() => {
        messageService = TestBed.get(MessageService)
        fixture = TestBed.createComponent(MessagesListComponent);
        component = fixture.componentInstance;
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch MessagesAction.TryUpdateSelectedMessages', () => {
    component.pageNumber = 0;
    component.messagesContainerTitle = MessageContainer.SENT_MESSAGES;
    component.onScroll();

    expect(messageService.updateSelectedList).toHaveBeenCalled();
    expect(messageService.updateSelectedList).toHaveBeenCalledWith(component.messagesContainerTitle, component.pageNumber);
  })

  it('should set messagesContainerTitle to MessageContainer.SENT_MESSAGES', () => {
    component.messagesContainerTitle = MessageContainer.DELETED_MESSAGES;
    component.setMessageContainerTitle(MessageContainer.SENT_MESSAGES);
    expect(component.messagesContainerTitle).toBe(MessageContainer.SENT_MESSAGES);
  })

  it('should init deleted messages array', fakeAsync(()=> {
    messageService.getMessagesDataSource.and.returnValue(of(MESSAGES));
    component.messagesContainerTitle = MessageContainer.DELETED_MESSAGES;
    component.initMessagesArray();

    tick();

    expect(messageService.getMessagesDataSource).toHaveBeenCalled();
    expect(messageService.getMessagesDataSource).toHaveBeenCalledWith(component.messagesContainerTitle);
  }));
  

});
