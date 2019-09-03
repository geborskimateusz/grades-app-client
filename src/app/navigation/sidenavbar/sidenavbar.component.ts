import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
    selector: 'app-sidenavbar',
    templateUrl: './sidenavbar.component.html',
    styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {

    @Output() sidenavTemplateReference = new EventEmitter<void>();


    constructor(private authService: AuthService) {}

    ngOnInit(): void {
    }

    onClose(): void {
        this.sidenavTemplateReference.emit();
    }

    onLogout(): void {
        this.authService.logout();
    }
}
