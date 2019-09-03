import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { reducers } from './app-store/app.reducer';
import { AppComponent } from './app.component';
import { AuthEffects } from './auth/auth-store/auth.effects';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { SharedModule } from './shared/shared.module';
import { UserDetailsEffects } from './shared/user/user-store/user.effects';
import { WelcomeComponent } from './welcome/welcome.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        AuthModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([AuthEffects, UserDetailsEffects]),
        AngularFontAwesomeModule,
        SharedModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        WelcomeComponent,
        ProjectInfoComponent
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
