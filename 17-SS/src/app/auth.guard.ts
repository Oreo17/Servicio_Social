import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { AuthServiceService } from './service/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isTokenValid()) {
      const allowedUserType = route.data['allowedUserType'] as string;

      if (!allowedUserType) {
        return true;
      }

      const userType = this.authService.getUserType();
      console.log('User Type:', userType);
      console.log('Allow User Type:', allowedUserType);

      if (userType === allowedUserType) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    } else {
      // Si el token no es válido, maneja el token expirado
      this.authService.handleExpiredToken();
      return false;
    }
  }
}
