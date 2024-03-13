import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

    public router = inject(Router)
    private authService= inject(AuthService)
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | Promise<boolean> {
      let isAuthenticated = this.authService.isLoggedIn;
      if (!isAuthenticated) {
          this.router.navigate(['/home']);
      }
      return isAuthenticated;
  }
}
