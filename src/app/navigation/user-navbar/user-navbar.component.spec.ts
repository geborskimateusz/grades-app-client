import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavbarComponent } from './user-navbar.component';
import { MaterialModule } from '../../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as fromStudent from '../../student/student-store/student.reducers';
import { StudentService } from 'src/app/student/service/student.service';

describe('UserNavbarComponent', () => {
  let component: UserNavbarComponent;
  let fixture: ComponentFixture<UserNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNavbarComponent ],
      imports: [
        MaterialModule,
        RouterTestingModule,
        StoreModule.forRoot(fromStudent.studentReducer)
      ],
      providers: [
        StudentService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onToggleSideNav() should emit event', () => {
    spyOn(component.sidenavTemplateReference, 'emit');
    component.onToggleSideNav();
    fixture.detectChanges();
    expect(component.sidenavTemplateReference.emit).toHaveBeenCalled();
  })
});
