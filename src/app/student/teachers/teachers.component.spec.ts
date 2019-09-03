import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service';
import { AuthEffects } from 'src/app/auth/auth-store/auth.effects';
import { UserDetailsEffects } from 'src/app/shared/user/user-store/user.effects';
import { TEACHERS } from 'src/app/test/data-factory/user-details-factory';

import { MaterialModule } from '../../material.module';
import { StudentService } from '../service/student.service';
import { StudentModule } from '../student.module';
import { TeachersComponent } from './teachers.component';

describe('TeachersComponent', () => {
  let component: TeachersComponent;
  let fixture: ComponentFixture<TeachersComponent>;
  let el: DebugElement;
  let studentService: any;
  let authService: any;
  let matDialog: any;

  beforeEach(async(() => {

    const studentServiceSpy = jasmine.createSpyObj('StudentService', ['trySetTeachers', 'getObservableOfTeachers', 'getUniqueTeachers']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUserId', 'getToken']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);



    TestBed.configureTestingModule({
      imports: [
        StudentModule,
        RouterTestingModule,
        MaterialModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([AuthEffects, UserDetailsEffects])
      ],
      providers: [
        { provide: StudentService, useValue: studentServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TeachersComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        studentService = TestBed.get(StudentService);
        authService = TestBed.get(AuthService)
        matDialog = TestBed.get(MatDialog)
      });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    matDialog.open.and.returnValue({ afterClosed: () => EMPTY });
    component.openPostMessageDialog('', TEACHERS[0]);

    expect(matDialog.open).toHaveBeenCalled();
  })

});
