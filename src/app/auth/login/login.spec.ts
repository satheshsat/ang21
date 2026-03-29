import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { ActivatedRoute, Router } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../../interceptor/token.interceptor';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        { provide: Router, useValue: mockRouter },
        provideHttpClient(withFetch(), withInterceptors([tokenInterceptor]) )
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
