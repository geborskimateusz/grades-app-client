import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  @Output() sidenavTemplateReference = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSideNav(): void {
    this.sidenavTemplateReference.emit();
  }

}
