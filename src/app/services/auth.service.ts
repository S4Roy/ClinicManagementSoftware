import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }
  adminLogin(payload: any) {
    return this.httpService.post('admin/login', payload);
  }

  adminLogout() {
    localStorage.removeItem('clinic-admin-token');
    localStorage.removeItem('clinic-admin-user');
    this.router.navigate(['/auth/admin/login'])
  }

  adminLoggedIn() {
    return !!localStorage.getItem('clinic-admin-token')
  }

  getAdminToken() {
    return localStorage.getItem('clinic-admin-token')
  }

  getAdminAccountDetails() {
    return this.httpService.post('admin/get-account', {});
  }

  userLogin(payload: any) {
    return this.httpService.post('employee/login', payload);
  }

  userLogout() {
    localStorage.removeItem('clinic-user-token');
    localStorage.removeItem('clinic-user-user');
    this.router.navigate(['/auth/user/login'])
  }

  userLoggedIn() {
    return !!localStorage.getItem('clinic-user-token')
  }

  getUserToken() {
    return localStorage.getItem('clinic-user-token')
  }

  getUserAccountDetails() {
    return this.httpService.post('user/userDetails', {});
  }

  getToken() {
    if (this.getAdminToken()) {
      return localStorage.getItem('clinic-admin-token')
    } else if (this.getUserToken()) {
      return localStorage.getItem('clinic-user-token')
    } else {
      return null;
    }
  }

}
