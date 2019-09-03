import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StudentComponent } from 'src/app/student/student.component';
import { GradesComponent } from 'src/app/student/grades/grades.component';
import { TeachersComponent } from 'src/app/student/teachers/teachers.component';
import { routes } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { AuthEffects } from 'src/app/auth/auth-store/auth.effects';
import { UserDetailsEffects } from 'src/app/shared/user/user-store/user.effects';
import { studentReducer } from 'src/app/student/student-store/student.reducers';
import { StudentEffects } from 'src/app/student/student-store/student.effects';
import { MessageService } from 'src/app/shared/messages/service/message-service';
import { StudentService } from 'src/app/student/service/student.service';
import { AuthService } from 'src/app/auth/auth-service';
import { WelcomeComponent } from 'src/app/welcome/welcome.component';
import { ProjectInfoComponent } from 'src/app/project-info/project-info.component';
import { AuthModule } from 'src/app/auth/auth.module';



describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let router: Router
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentComponent,
        GradesComponent,
        TeachersComponent,
        WelcomeComponent,
        ProjectInfoComponent
      ],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
        SharedModule,
        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([AuthEffects, UserDetailsEffects]),
        StoreModule.forFeature('student', studentReducer),
        EffectsModule.forFeature([StudentEffects]),
        AuthModule
      ],
      providers: [
        MessageService,
        StudentService,
        AuthService
      ]
    }).compileComponents()
      .then(() => {
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(StudentComponent);
        component = fixture.componentInstance;
        router.initialNavigation();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /info should retrun false', fakeAsync(() => {
    router.navigate(['/info'])
    tick();
    expect(component.routesAreNotUsed()).toBe(false);
  }));
});
