import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private jwtHelper: JwtHelperService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
              Authorization: `${this.auth.getToken()}`
            }
          });
          return next.handle(req).pipe(
            tap(
              (event) => {
                if (event instanceof HttpResponse){
                  console.log('Server response');
                }
              },
              (err) => {
                if (err instanceof HttpErrorResponse) {
                  console.log(this.auth.getToken());
                  if (err.status == 401){
                    console.log('Unauthorized');
                    alert('401 Unauthorized');
                  }
                  if (this.jwtHelper.isTokenExpired(this.auth.getToken())){
                    console.log('Expired');
                  }
                }
              }
            )
          )

    }
}
