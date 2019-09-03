import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth-service';
import { SharedModule } from 'src/app/shared/shared.module';

import { SidenavbarComponent } from './sidenavbar.component';

describe('SidenavbarComponent', () => {
  let component: SidenavbarComponent;
  let fixture: ComponentFixture<SidenavbarComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ["logout"]);

    TestBed.configureTestingModule({
      imports: [
        EffectsModule.forRoot([]),
        StoreModule.forRoot({}),
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SidenavbarComponent);
        authService = TestBed.get(AuthService);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

  }));

  beforeEach(() => {

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should emit event on close.', () => {
    spyOn(component.sidenavTemplateReference, 'emit');
    component.onClose();
    fixture.detectChanges();
    expect(component.sidenavTemplateReference.emit).toHaveBeenCalled();
  })

  it('Should call logout.', () => {
    component.onLogout();

    expect(authService.logout).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalledTimes(1);
  })
});
