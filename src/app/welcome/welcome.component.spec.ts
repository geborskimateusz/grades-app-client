import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { reducers } from '../app-store/app.reducer';
import { AuthModule } from '../auth/auth.module';
import { UIService } from '../shared/ui/service/ui.service';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let uiService: any;

  beforeEach(async(() => {
    let uiServiceSpy = jasmine.createSpyObj('UIService', [''])
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      imports: [
        AuthModule,
        StoreModule.forRoot(reducers),
        BrowserAnimationsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: UIService, useValue: uiServiceSpy}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WelcomeComponent);
        uiService = TestBed.get(UIService)
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
