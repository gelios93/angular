import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly accessTokenKey = 'access_token';
  tokenSubscription = new Subscription();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  private setToken(token: string): void{
    localStorage.setItem(this.accessTokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.accessTokenKey) || '';
  }

  login(username: string, password: string): Observable<any> {
    
    return this.http.get<{access_token: string}>('https://pnitfunctions.azurewebsites.net/api/token?userName='
    + username + '&password=' + password).pipe(
      tap(
        (resp) => {
          alert(resp.access_token);
          this.setToken(resp.access_token);
          let timeout = this.jwtHelper.getTokenExpirationDate(resp.access_token)!.valueOf() - new Date().valueOf();
          this.expirCounter(timeout);
        }
      )
    );
  }

  private expirCounter(timeout: number): void {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      console.log('token is exspired');
      this.logout();
      alert('auto logout');
    });
  }

  logout(): void {
    alert('you are logged out now')
    localStorage.removeItem(this.accessTokenKey);
    this.router.navigate(['']);
  }
}
