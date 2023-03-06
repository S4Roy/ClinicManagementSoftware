import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (this.authService.adminLoggedIn()) {
      this.router.navigate(['/admin']);
      return false;
    } else if (this.authService.userLoggedIn()) {
      this.router.navigate(['/user']);
      return false;
    } else {
      return true;
    }
  }
  
}
