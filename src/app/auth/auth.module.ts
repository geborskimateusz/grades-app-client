import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth-service';
import { StudentService } from '../student/service/student.service';
import { UserDetailsService } from '../shared/user/service/user-details.service';

@NgModule({
    declarations: [
        SigninComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CommonModule
    ],
    exports: [
        SigninComponent
    ],
    providers: [
        AuthGuard,
        UserDetailsService,
        AuthService,
        StudentService
    ]
})
export class AuthModule { }
