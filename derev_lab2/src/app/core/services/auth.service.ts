import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly accessTokenKey = 'access_token';
  private readonly userNameClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

  constructor() {
  }

  getToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);

    // TODO: navigate to login page
  }

  getUserName(): void {
    const token = this.getToken();

    const jwtHelperService = new JwtHelperService();
    const decodedToken = jwtHelperService.decodeToken(token);

    return decodedToken[this.userNameClaim];
  }
}
