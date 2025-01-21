import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    const expectedRole = route.data['expectedRole'] as string;

    if (currentUser && currentUser.role === expectedRole) {
      // User has the expected role
      return true;
    }

    // Role mismatch, redirect to signin
    this.router.navigate(['/signin']);
    return false;
  }
}
