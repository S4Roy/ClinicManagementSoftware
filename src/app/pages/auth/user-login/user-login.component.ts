import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as Global from 'src/app/globals';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  Global = Global;
  loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.loginForm = formBuilder.group({
      email: [null, Validators.compose([Validators.required,Validators.email])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
  }

  login(event: any) {
    this.loginForm.markAllAsTouched();
    Global.scrollToQuery(".form-control.is-invalid.ng-invalid");

    if (this.loginForm.valid) {
      event.target.classList.add('btn-loading');

      this.authService.userLogin({
        'email': this.loginForm.value.email,
        'password': this.loginForm.value.password,
      }).subscribe((res: any) => {
        if (res.status == 'success') {
          if (res.employee) {
            this.toastr.success(res.message);
            localStorage.setItem('clinic-user-token', res.token);
            localStorage.setItem('clinic-user-user', JSON.stringify(res.employee));
            this.router.navigate(['/user']);
          } else {
            this.toastr.error("Unquthorized Access");
          }
        } else if (res.status == 'val_error') {
          this.toastr.error(Global.showValidationMessage(res.errors));
        } else {
          this.toastr.error(res.message);
        }

        event.target.classList.remove('btn-loading');
      }, (err: any) => {
        event.target.classList.remove('btn-loading');
        this.toastr.error(Global.showServerErrorMessage(err));
      });
    }
  }
}
