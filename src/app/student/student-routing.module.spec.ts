import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from 'src/app/auth/auth-store/auth.effects';
import { AuthModule } from 'src/app/auth/auth.module';
import { MaterialModule } from 'src/app/material.module';
import { ProjectInfoComponent } from 'src/app/project-info/project-info.component';
import { MessageService } from 'src/app/shared/messages/service/message-service';
import { GradesService } from 'src/app/shared/service/grades.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsEffects } from 'src/app/shared/user/user-store/user.effects';
import { GradesComponent } from 'src/app/student/grades/grades.component';
import { StudentService } from 'src/app/student/service/student.service';
import { StudentEffects } from 'src/app/student/student-store/student.effects';
import { studentReducer } from 'src/app/student/student-store/student.reducers';
import { StudentComponent } from 'src/app/student/student.component';
import { TeachersComponent } from 'src/app/student/teachers/teachers.component';
import { WelcomeComponent } from 'src/app/welcome/welcome.component';

import { TEST_ROUTES } from '../test/data-factory/routes-factory';



describe('StudentRoutingModule', () => {

    let router: Router
    let location: Location;
    let fixture;
    let component: StudentComponent

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
                RouterTestingModule.withRoutes(TEST_ROUTES),
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
                Location,
                MessageService,
                GradesService,
                StudentService]
        }).compileComponents();

        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(StudentComponent);
        router.initialNavigation();

    }));

    it('fakeAsync works', fakeAsync(() => {
        const promise = new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => done = true);
        tick(50);
        expect(done).toBeTruthy();
    }));

    it('should navigate to info', fakeAsync(() => {
        router.navigateByUrl('/info');
        tick();
        expect(location.path()).toBe('/info');
    }));

    it('should navigate to grades', fakeAsync(() => {
        router.navigateByUrl('/grades');
        tick();
        expect(location.path()).toBe('/grades');
    }));

    it('should navigate to teachers', fakeAsync(() => {
        router.navigateByUrl('/teachers');
        tick();
        expect(location.path()).toBe('/teachers');
    }));

    it('should navigate to teachers/:id/info', fakeAsync(() => {
        let id = '1';
        router.navigateByUrl(`/teachers/${id}/info`);
        tick();
        expect(location.path()).toBe('/teachers/1/info');
    }));

    it('should navigate to messages', fakeAsync(() => {
        router.navigateByUrl('/messages');
        tick();
        expect(location.path()).toBe('/messages');
    }));

    it('should navigate to messages/message/:messageType/:id', fakeAsync(() => {
        let messageType = 'SENT';
        let id = '1';
        router.navigateByUrl(`/messages/message/${messageType}/${id}`);
        tick();
        expect(location.path()).toBe('/messages/message/SENT/1');
    }));

})
