import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MaterialModule } from 'src/app/material.module';
import { FAKE_MAT_DIALOG_DATA } from 'src/app/test/data-factory/mat-dialog-data';

import { MessageService } from '../service/message-service';
import { PostMessageDialogComponent } from './post-message-dialog.component';

describe('PostMessageDialogComponent', () => {
  let component: PostMessageDialogComponent;
  let fixture: ComponentFixture<PostMessageDialogComponent>;
  let matDialogRef: any;
  let messageService: any;
  let matDialogData: any;

  beforeEach(async(() => {

    let matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    let messageServiceSpy = jasmine.createSpyObj('MessageService', ['postMessage']);
    let matDialogDataSpy = FAKE_MAT_DIALOG_DATA;

    TestBed.configureTestingModule({
      declarations: [ PostMessageDialogComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: matDialogRefSpy},
        {provide: MessageService, useValue: messageServiceSpy},
        {provide: MAT_DIALOG_DATA, useValue: matDialogDataSpy}
      ]
    })
    .compileComponents()
    .then(()=> {
      matDialogRef = TestBed.get(MatDialogRef);
      messageService = TestBed.get(MessageService);
      matDialogData = TestBed.get(MAT_DIALOG_DATA)
      fixture = TestBed.createComponent(PostMessageDialogComponent);
      component = fixture.componentInstance;
    })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should valid FormGroup', () => {
    initForm();

    expect(component.messageForm.valid).toBeTruthy();
  })

  it('is Valid should be false', () => {
    component.messageForm.controls['messageTitle'].setValue('');
    component.messageForm.controls['messageDetails'].setValue('');

    expect(component.messageForm.valid).toBeFalsy();
  })

  it('should close dialogRef and clear form', () => {
    initForm();
    component.onNoClick();
    expect(matDialogRef.close).toHaveBeenCalled();
    expect(component.messageForm.value.messageTitle).toBeNull();
    expect(component.messageForm.value.messageDetails).toBeNull();
  })

  function initForm() {
    component.messageForm.controls['messageTitle'].setValue('not empty');
    component.messageForm.controls['messageDetails'].setValue('not empty');
  }
  
});

