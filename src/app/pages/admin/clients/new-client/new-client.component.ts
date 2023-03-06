import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as Global from 'src/app/globals';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  Global = Global;
  clientData: any;
  newClient!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NewClientComponent>) {
    this.clientData = data;
    this.newClient = this.fb.group({
      first_name: [null, Validators.compose([Validators.required])],
      last_name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
    })

  }
  ngOnInit(): void {
    if (this.clientData) {
      this.newClient.patchValue({
        'first_name': this.clientData.first_name,
        'last_name': this.clientData.last_name,
        'email': this.clientData.email,
        'phone': this.clientData.phone,
      })
    }
  }
  submitClient(event: any) {
    this.newClient.markAllAsTouched();
    Global.scrollToQuery(".form-control.is-invalid.ng-invalid");

    if (this.newClient.valid) {
      event.target.classList.add('btn-loading');

      this.adminService.submitClient({
        '_id': this.clientData ? this.clientData._id : null,
        'first_name': this.newClient.value.first_name,
        'last_name': this.newClient.value.last_name,
        'email': this.newClient.value.email,
        'phone': this.newClient.value.phone,
      }).subscribe((res: any) => {
        if (res.status == 'success') {
          this.toastr.success(res.message);
          this.dialogRef.close(res)
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
