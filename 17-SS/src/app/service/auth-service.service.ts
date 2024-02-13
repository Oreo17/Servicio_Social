import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private loginUrl = `http://localhost:3006/api/auth/login`;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router, private localStorage:LocalStorageService) {}

  login(matricula: string, password: string) {
    const body = {
      matricula,
      password,
    };
    return this.http.post(this.loginUrl, body);
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const tokenPayload = this.jwtHelper.decodeToken(token);
        const tokenExpirationDate = tokenPayload.exp * 1000;
        const currentTimestamp = Date.now();
        return tokenExpirationDate > currentTimestamp;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
  

  getUserType(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const tokenPayload = this.jwtHelper.decodeToken(token);
        return tokenPayload.role;
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  handleExpiredToken() {
    console.log('Token has expired. Redirecting to login page...');
    this.localStorage.clearToken(); 
    this.router.navigate(['login']);
  }
}
