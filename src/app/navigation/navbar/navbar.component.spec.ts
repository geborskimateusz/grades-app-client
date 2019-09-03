import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/auth/auth-service';
import { UserDetailsService } from 'src/app/shared/user/service/user-details.service';

import { MaterialModule } from '../../material.module';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    const fakeUser = { username: '', password: '', role: 'PARENT' }
    let router: Router;
    let authService: any;
    let userDetailsService: any;

    beforeEach(async(() => {
        let authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'logout'])

        let userDetailsServiceSpy = jasmine.createSpyObj('UserDetailsService', ['getUserDetails']);

        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            imports: [
                MaterialModule,
                RouterTestingModule
            ],
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                { provide: UserDetailsService, useValue: userDetailsServiceSpy }
            ]
        }).compileComponents()
            .then(() => {
                authService = TestBed.get(AuthService);
                userDetailsService = TestBed.get(UserDetailsService);
                router = TestBed.get(Router)
                fixture = TestBed.createComponent(NavbarComponent);
                component = fixture.componentInstance;

            })
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#onUserInfo() should navigate to student/info when onUserInfo() is invoked', fakeAsync(() => {

        let navigateSpy = spyOn(router, 'navigate');

        fixture.detectChanges();

        component.onUserInfo();

        expect(navigateSpy).toHaveBeenCalledWith(['student/info']);

    }))

});
