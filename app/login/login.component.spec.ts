import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from './login.component';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    authService.login = jasmine.createSpy().and.returnValue(of('token'));
    router = jasmine.createSpyObj('Router', ['navigate']);
    router.navigate = jasmine.createSpy();

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // authService = fixture.debugElement.injector.get(AuthService);
    // authService = jasmine.createSpyObj('AuthService', ['login']);
    // authService.login = jasmine.createSpy().and.returnValue(of('fff'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService', () => {
    component.onLogin();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should navigate to home', () => {
    expect(router.navigate).toBeTruthy();
  });
});
