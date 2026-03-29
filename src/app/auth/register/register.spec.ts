import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { ActivatedRoute, Router } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../../interceptor/token.interceptor';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        { provide: Router, useValue: mockRouter },
        provideHttpClient(withFetch(), withInterceptors([tokenInterceptor]) )
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
