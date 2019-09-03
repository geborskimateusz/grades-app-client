import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromApp from '../../app-store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth-store/auth.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UIService } from 'src/app/shared/ui/service/ui.service';
import { AuthService } from '../auth-service';
import { UserDetailsService } from 'src/app/shared/user/service/user-details.service';
import { Observable } from 'rxjs';
import { UserDetails } from 'src/app/shared/user/user-details.model';

export interface UserRole {
  value: string,
  viewValue: string;
}


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  roleCheckboxValues: UserRole[] = [
    {
      value: 'PARENT',
      viewValue: `<i class="fa fa-users"></i> Parent`
    },
    {
      value: 'TEACHER',
      viewValue: `<i class="fa fa-university"></i> Teacher`
    }
  ];

  @ViewChild('formRef') formRef;
  loginForm: FormGroup;

  isAuth$: Observable<boolean>;
  userDetails$: Observable<UserDetails>;

  constructor(private store: Store<fromApp.State>,
    private uiService: UIService,
    private authService: AuthService,
    private userDetailsService: UserDetailsService,
    private router: Router) { }

  ngOnInit() {
    this.isAuth$ = this.authService.isAuthenticated();
    this.userDetails$ = this.userDetailsService.getUserDetails();

    this.initForm();
  }

  initForm() {
    let username = '';
    let password = '';
    let role = '';

    this.loginForm = new FormGroup({
      'username': new FormControl(username, [
        Validators.required
      ]),
      'password': new FormControl(password, [
        Validators.required
      ]),
      'role': new FormControl(role, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    if (this.loginForm.value.role === 'TEACHER') {
      this.signinWithTeacherNotAllowed();
    } else {
      this.store.dispatch(new AuthActions.TrySignin({
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        role: this.loginForm.value.role
      }));
    }

    this.clearForm();
  }

  private clearForm() {
    setTimeout(() => {
      this.loginForm.reset();
      this.formRef.resetForm();
    }, 500);
  }

  private signinWithTeacherNotAllowed(): void {
    this.uiService.openSnackbar(
      'Teacher UI is not developed yet',
      null,
      3000
    );
  }

  onUserInfo(): void {
    this.router.navigate(['student/info']);
}

onLogout() {
    this.authService.logout();
}
}
