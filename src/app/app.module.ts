import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { reducers } from './app-store/app.reducer';
import { AppComponent } from './app.component';
import { AuthEffects } from './auth/auth-store/auth.effects';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ResponseInterceptor } from './shared/response-interceptor';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectInfoComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    AngularFontAwesomeModule,
    SharedModule,
    HttpClientModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  exports: [WelcomeComponent],
  bootstrap: [AppComponent],
  entryComponents: [WelcomeComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ]
})
export class AppModule { }
