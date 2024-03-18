import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | Promise<boolean> {
      let isAuthenticated = this.authService.isLoggedIn;
      let isAuthorizedUser = this.authService.isAuthorizedUser
      if (!isAuthenticated) {
          this.router.navigate(['/home']);
      }
      return (isAuthenticated && isAuthorizedUser);
  }
}
