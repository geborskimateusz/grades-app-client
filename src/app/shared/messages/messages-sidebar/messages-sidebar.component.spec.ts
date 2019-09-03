import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material.module';

import { MessageService } from '../service/message-service';
import { MessagesSidebarComponent } from './messages-sidebar.component';

describe('MessagesSidebarComponent', () => {
  let component: MessagesSidebarComponent;
  let fixture: ComponentFixture<MessagesSidebarComponent>;
  let messageService: any;

  beforeEach(async(() => {
    let messageServiceSpy = jasmine.createSpyObj('MessageService', ['moveMessageToDeleted', 'trySetMessagesBasedOnContainer']);

    TestBed.configureTestingModule({
      declarations: [MessagesSidebarComponent],
      imports: [
        MaterialModule
      ],
      providers: [
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    }).compileComponents()
      .then(() => {
        messageService = TestBed.get(MessageService);
        fixture = TestBed.createComponent(MessagesSidebarComponent);
        component = fixture.componentInstance;
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
