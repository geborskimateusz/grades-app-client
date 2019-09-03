import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth-service';
import { AuthEffects } from 'src/app/auth/auth-store/auth.effects';
import { MessageComponent } from 'src/app/shared/messages/message/message.component';
import { MessageService } from 'src/app/shared/messages/service/message-service';
import { UserDetailsEffects } from 'src/app/shared/user/user-store/user.effects';

import { UIService } from '../../ui/service/ui.service';
import { UserDetailsService } from '../../user/service/user-details.service';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let messageService: any;

  beforeEach(async(() => {
    let messageServiceSpy = jasmine.createSpyObj('MessageService', ['getActiveMessage']);

    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([AuthEffects, UserDetailsEffects]),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: AuthService, useValue: {} },
        { provide: UserDetailsService, useValue: {} },
        { provide: UIService, useValue: {} }  
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents()
      .then(() => {
        messageService = TestBed.get(MessageService);
        fixture = TestBed.createComponent(MessageComponent);
        component = fixture.componentInstance;
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
