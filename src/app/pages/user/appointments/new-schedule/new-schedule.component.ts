import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import * as Global from 'src/app/globals';
import PaginationOptions from 'src/app/models/PaginationOptions';
import TableFilterOptions from 'src/app/models/TableFiilterOptions';
import { CustomTableloaderComponent } from 'src/app/pages/includes/custom-tableloader/custom-tableloader.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss']
})
export class NewScheduleComponent implements OnInit {
  Global = Global;
  scheduleData: any;
  newAppointment!: FormGroup;
  paginationOptions: PaginationOptions;
  tableFilterOptions: TableFilterOptions;
  client_list: any = []
  service_list: any = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private tableLoader: CustomTableloaderComponent,
    private dialogRef: MatDialogRef<NewScheduleComponent>
  ) {
    this.scheduleData = data;
    this.newAppointment = this.fb.group({
      client_id: [null, Validators.compose([Validators.required])],
      schedule_date: [null, Validators.compose([Validators.required])],
      schedule_time: [null, Validators.compose([Validators.required])],
      duration: [null],
      service_id: [null, Validators.compose([Validators.required])],
      fee: [null],
      // services_list: this.fb.array([this.fb.group({
      //   service_id: [null],
      //   fee: [null],
      // })])
    })
    this.paginationOptions = Global.resetPaginationOption();
    this.tableFilterOptions = Global.resetTableFilterOptions();
  }
  ngOnInit(): void {
    this.newAppointment.patchValue({
      schedule_date: moment(this.scheduleData?.date).format(
        "MM-DD-YYYY"
      ),
      schedule_time: moment(this.scheduleData?.date).format(
        "hh:mm A"
      ),
      duration: '30'
    })
    this.fetchServices();
    this.newAppointment.get('service_id')?.valueChanges.subscribe(val => {
      this.serviceChange();
    });
  }
  // get services_list(): FormArray {
  //   return this.newAppointment.get("services_list") as FormArray
  // }
  // newService(): FormGroup {
  //   return this.fb.group({
  //     service_id: [null],
  //     fee: [null],
  //   })
  // }

  // addService() {
  //   this.services_list.push(this.newService());
  // }
  serviceChange() {
    let service_id = this.newAppointment.get('service_id')?.value;
    const service = this.service_list.find((obj: any) => {
      return obj._id == service_id
    })
    console.log(service);
    if (service) {
      this.newAppointment.patchValue({
        fee: service?.fee,
        duration: service?.duration
      })
    }

  }
  fetchClients({ page = <any>null } = {}) {
    if (page != null) {
      this.paginationOptions.page = page;
    }

    this.tableLoader.show();
    this.userService.fetchClients({
      'page': this.paginationOptions.page,
      'limit': this.tableFilterOptions.limit,
      'searchkey': this.tableFilterOptions.searchkey,
    }).subscribe(res => {
      if (res.status == 'success') {
        this.client_list = res?.data?.docs ?? [];
        this.paginationOptions = {
          hasNextPage: res?.data?.hasNextPage,
          hasPrevPage: res?.data?.hasPrevPage,
          limit: res?.data?.limit,
          nextPage: res?.data?.nextPage,
          page: res?.data?.page,
          pagingCounter: res?.data?.pagingCounter,
          prevPage: res?.data?.prevPage,
          totalDocs: res?.data?.totalDocs,
          totalPages: res?.data?.totalPages,
        };
      } else {
        this.toastr.error(res.message);
        this.client_list = [];
        this.paginationOptions = Global.resetPaginationOption();
        this.tableFilterOptions = Global.resetTableFilterOptions();
      }

      this.tableLoader.hide();
    }, (err) => {
      this.client_list = [];
      this.tableLoader.hide();
      this.toastr.error(Global.showServerErrorMessage(err));
      this.paginationOptions = Global.resetPaginationOption();
      this.tableFilterOptions = Global.resetTableFilterOptions();
    });
  }
  fetchServices({ page = <any>null } = {}) {
    if (page != null) {
      this.paginationOptions.page = page;
    }

    this.tableLoader.show();
    this.userService.fetchServices({
      'page': this.paginationOptions.page,
      'limit': this.tableFilterOptions.limit,
      'searchkey': this.tableFilterOptions.searchkey,
    }).subscribe(res => {
      if (res.status == 'success') {
        this.service_list = res?.data?.docs ?? [];
        this.paginationOptions = {
          hasNextPage: res?.data?.hasNextPage,
          hasPrevPage: res?.data?.hasPrevPage,
          limit: res?.data?.limit,
          nextPage: res?.data?.nextPage,
          page: res?.data?.page,
          pagingCounter: res?.data?.pagingCounter,
          prevPage: res?.data?.prevPage,
          totalDocs: res?.data?.totalDocs,
          totalPages: res?.data?.totalPages,
        };
        this.fetchClients();
      } else {
        this.toastr.error(res.message);
        this.service_list = [];
        this.paginationOptions = Global.resetPaginationOption();
        this.tableFilterOptions = Global.resetTableFilterOptions();
      }

      this.tableLoader.hide();
    }, (err) => {
      this.service_list = [];
      this.tableLoader.hide();
      this.toastr.error(Global.showServerErrorMessage(err));
      this.paginationOptions = Global.resetPaginationOption();
      this.tableFilterOptions = Global.resetTableFilterOptions();
    });
  }
  submitAppointment(event: any) {
    this.newAppointment.markAllAsTouched();
    Global.scrollToQuery(".form-control.is-invalid.ng-invalid");

    if (this.newAppointment.valid) {
      event.target.classList.add('btn-loading');

      this.userService.addAppointement({
        'schedule_date': this.newAppointment.value.schedule_date,
        'schedule_time': this.newAppointment.value.schedule_time,
        'client_id': this.newAppointment.value.client_id,
        'service_id': this.newAppointment.value.service_id,
        'duration': this.newAppointment.value.duration,
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
