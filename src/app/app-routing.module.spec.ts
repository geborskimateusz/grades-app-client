import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModuleFactoryLoader } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { routes } from './app-routing.module';
import { reducers } from './app-store/app.reducer';
import { AppComponent } from './app.component';
import { AuthEffects } from './auth/auth-store/auth.effects';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { SharedModule } from './shared/shared.module';
import { UserDetailsEffects } from './shared/user/user-store/user.effects';
import { StudentModule } from './student/student.module';
import { WelcomeComponent } from './welcome/welcome.component';

describe('Router: App', () => {
    let location: Location;
    let router: Router;
    let fixture;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                RouterTestingModule.withRoutes(routes),
                SharedModule,
                AuthModule,
                MaterialModule,
                StoreModule.forRoot(reducers),
                EffectsModule.forRoot([AuthEffects, UserDetailsEffects]),
                HttpClientModule
            ],
            declarations: [
                AppComponent,
                WelcomeComponent,
                NavbarComponent,
                ProjectInfoComponent
            ],
            providers: [
                Location
            ]
        }).compileComponents()
        .then(()=> {
            router = TestBed.get(Router);
            location = TestBed.get(Location);
            fixture = TestBed.createComponent(AppComponent);
            router.initialNavigation();
        })
    });

    it('fakeAsync works', fakeAsync(() => {
        const promise = new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => done = true);
        tick(50);
        expect(done).toBeTruthy();
    }));

    it('should navigate from empty path to welcome', fakeAsync(() => {
        router.navigate(['']);
        tick();
        expect(location.path()).toBe('/welcome');
    }))

    it('should navigate to /student lazy loaded module', fakeAsync(() => {
        
        const loader = TestBed.get(NgModuleFactoryLoader);
        loader.stubbedModules = {
            './student/student.module#StudentModule': StudentModule
        };
      
        router.resetConfig([
          {path: 'student', loadChildren: () => StudentModule },
        ]);
      
        router.navigate(['student']);
      
        tick();

        expect(location.path()).toBe('/student');
      }));

    it('should navigate form welcome path to welcome', fakeAsync(() => {
        router.navigate(['welcome']);
        tick();
        expect(location.path()).toBe('/welcome');
    }))

    it('should navigate form ** path to 404', fakeAsync(() => {
        router.navigate(['**']);
        tick();
        expect(location.path()).toBe('/404');
    }))
})
