import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as Global from 'src/app/globals';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent {
  Global = Global;
  serviceData: any;
  newService!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NewServiceComponent>) {
    this.serviceData = data;
    this.newService = this.fb.group({
      service_name: [null, Validators.compose([Validators.required])],
      duration: [null, Validators.compose([Validators.required])],
      fee: [null, Validators.compose([Validators.required])],
    })

  }
  ngOnInit(): void {
    if (this.serviceData) {
      this.newService.patchValue({
        'service_name': this.serviceData.service_name,
        'duration': this.serviceData.duration,
        'fee': this.serviceData.fee,
      })
    }
  }
  submitService(event: any) {
    this.newService.markAllAsTouched();
    Global.scrollToQuery(".form-control.is-invalid.ng-invalid");

    if (this.newService.valid) {
      event.target.classList.add('btn-loading');

      this.adminService.submitService({
        '_id': this.serviceData ? this.serviceData._id : null,
        'service_name': this.newService.value.service_name,
        'duration': this.newService.value.duration,
        'fee': this.newService.value.fee,
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
