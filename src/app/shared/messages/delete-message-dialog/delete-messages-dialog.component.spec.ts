import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMessagesDialogComponent } from './delete-messages-dialog.component';
import { MessageService } from '../service/message-service';
import { UIService } from '../../ui/service/ui.service';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('DeleteMessagesDialogComponent', () => {
  let component: DeleteMessagesDialogComponent;
  let fixture: ComponentFixture<DeleteMessagesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMessagesDialogComponent ],
      imports: [MaterialModule],
      providers: [
        {provide: MessageService, useValue: {}},
        {provide: UIService, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(DeleteMessagesDialogComponent);
      component = fixture.componentInstance;
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
