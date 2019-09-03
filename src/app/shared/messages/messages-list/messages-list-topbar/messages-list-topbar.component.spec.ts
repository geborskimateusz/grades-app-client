import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesListTopbarComponent } from './messages-list-topbar.component';
import { MessageService } from '../../service/message-service';
import { SearchMessageService } from '../search-message.service';
import { MaterialModule } from 'src/app/material.module';
import { NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MESSAGES } from 'src/app/test/data-factory/message-factory';

describe('MessagesListTopbarComponent', () => {
  let component: MessagesListTopbarComponent;
  let fixture: ComponentFixture<MessagesListTopbarComponent>;
  let messageService: any;
  let searchMessageService: any;
  let formBuilder: any;

  beforeEach(async(() => {
    let messageServiceSpy = jasmine.createSpyObj('MessageService', ['moveMessageToDeleted'])

    let searchMessageServiceSpy = jasmine.createSpyObj('SearchMessageService', ['setFoundMessages'])

    TestBed.configureTestingModule({
      declarations: [MessagesListTopbarComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: SearchMessageService, useValue: searchMessageServiceSpy }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents()
      .then(() => {
        formBuilder = TestBed.get(FormBuilder)
        messageService = TestBed.get(MessageService);
        searchMessageService = TestBed.get(SearchMessageService);
        fixture = TestBed.createComponent(MessagesListTopbarComponent);
        component = fixture.componentInstance;
      })
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find messages', () => {
    component.searchMessagesArray = MESSAGES;
    component.onSearchChange('Indiana');

    expect(searchMessageService.setFoundMessages).toHaveBeenCalled();
    expect(searchMessageService.setFoundMessages).toHaveBeenCalledWith(MESSAGES);
  })

  it('should not find messages', () => {
    component.searchMessagesArray = MESSAGES;
    component.onSearchChange('Marry');

    expect(searchMessageService.setFoundMessages).not.toHaveBeenCalled();
  })

  it('should move messages to deleted', () => {
    initFormGroup();
    component.searchMessagesArray = MESSAGES;
    component.deleteCheckedMessages();

    expect(messageService.moveMessageToDeleted).toHaveBeenCalled();
    expect(messageService.moveMessageToDeleted).toHaveBeenCalledTimes(1);
  })

  let initFormGroup = () => {
    component.messagesFormGroup = formBuilder.group({
      messagesArray: formBuilder.array(MESSAGES)
    });
  }
});


