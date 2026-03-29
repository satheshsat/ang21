import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resetpass } from './resetpass';
import { ActivatedRoute, Router } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '../../interceptor/token.interceptor';

describe('Resetpass', () => {
  let component: Resetpass;
  let fixture: ComponentFixture<Resetpass>;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resetpass],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        { provide: Router, useValue: mockRouter },
        provideHttpClient(withFetch(), withInterceptors([tokenInterceptor]) )
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Resetpass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
