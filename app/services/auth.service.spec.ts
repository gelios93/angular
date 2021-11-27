import { HttpClient } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
  let jwtHelper: JwtHelperService;
  let router: Router;

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['get']);
    jwtHelper = jasmine.createSpyObj('jwtHelper', ['getTokenExpirationDate']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    service = new AuthService(http, jwtHelper, router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token from server', () => {
    let responce = [{access_token: 'access_token'}];
    http.get = jasmine.createSpy().and.returnValue(of(responce));
    service.login('admin', 'ff').subscribe(
      (result) => expect(result).toEqual(responce)
      )
    expect(http.get).toHaveBeenCalledTimes(1);
  });

  it('should give token', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token')
    expect(service.getToken()).toEqual('token');
  });

  it('should logout', () => {
    
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(router.navigate).toHaveBeenCalledOnceWith(['']);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

});
