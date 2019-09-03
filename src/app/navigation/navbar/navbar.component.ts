import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service';
import { UserDetailsService } from 'src/app/shared/user/service/user-details.service';
import { UserDetails } from 'src/app/shared/user/user-details.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    isAuth$: Observable<boolean>;
    userDetails$: Observable<UserDetails>;


    constructor(private authService: AuthService,
                private userDetailsService: UserDetailsService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.isAuth$ = this.authService.isAuthenticated();
        this.userDetails$ = this.userDetailsService.getUserDetails();
    }

    onUserInfo(): void {
        this.router.navigate(['student/info']);
    }

    onLogout() {
        this.authService.logout();
    }


}
