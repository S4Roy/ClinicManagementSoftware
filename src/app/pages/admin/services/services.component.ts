import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as Global from 'src/app/globals';
import PaginationOptions from 'src/app/models/PaginationOptions';
import TableFilterOptions from 'src/app/models/TableFiilterOptions';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
import { CustomTableloaderComponent } from '../../includes/custom-tableloader/custom-tableloader.component';
import { NewServiceComponent } from './new-service/new-service.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  Global = Global;
  paginationOptions: PaginationOptions;
  tableFilterOptions: TableFilterOptions;
  rows: any[] = [];
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private tableLoader: CustomTableloaderComponent,
    private dialog:MatDialog
  ) {

    this.paginationOptions = Global.resetPaginationOption();
    this.tableFilterOptions = Global.resetTableFilterOptions();

  }

  async ngOnInit() {
    setTimeout(() => {
      this.fetchServices();
    });
  }



  fetchServices({ page = <any>null } = {}) {
    if (page != null) {
      this.paginationOptions.page = page;
    }

    this.tableLoader.show();
    this.adminService.fetchServices({
        'page': this.paginationOptions.page,
        'limit': this.tableFilterOptions.limit,
        'searchkey': this.tableFilterOptions.searchkey,
    }).subscribe(res => {
        if (res.status == 'success') {
            this.rows = res?.data?.docs ?? [];
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
            this.rows = [];
            this.paginationOptions = Global.resetPaginationOption();
            this.tableFilterOptions = Global.resetTableFilterOptions();
        }

        this.tableLoader.hide();
    }, (err) => {
        this.rows = [];
        this.tableLoader.hide();
        this.toastr.error(Global.showServerErrorMessage(err));
        this.paginationOptions = Global.resetPaginationOption();
        this.tableFilterOptions = Global.resetTableFilterOptions();
    });
  }
  changePage(page: number) {
    this.fetchServices({
      page: page,
    })
  }
  filterTable(options: any) {
    this.tableFilterOptions = Global.resetTableFilterOptions()
    if (options.searchkey) {
      this.tableFilterOptions.searchkey = options.searchkey.trim();
    }
    if (options.limit) {
      this.tableFilterOptions.limit = options.limit;
    }
    this.fetchServices({
      page: 1,
    })
  }
  addNew() {
    this.dialog.open(NewServiceComponent, {
      data: null,
      width: '500px'
    }).afterClosed().subscribe((res: any) => {
      if (res?.status == 'success') {
        this.fetchServices();
      }
    })
  }
  editService(item: any) {
    this.dialog.open(NewServiceComponent, {
      data: item,
      width: '500px'
    }).afterClosed().subscribe((res: any) => {
      if (res?.status == 'success') {
        this.fetchServices();
      }
    })
  }

  changeStatus(item: any, action: any = 'changestatus') {
    let status = 'A';
    if (action == 'changestatus') status = (item.status == 'A') ? 'I' : 'A';
    else if (action == 'delete') status = 'D';

    this.spinner.show();
    this.adminService.changeServiceStatus({
      '_id': item._id,
      'status': status,
    }).subscribe(res => {
      const data = res.data;
      if (res.status == 'success') {
        this.fetchServices();
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }

      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
      this.toastr.error(Global.showServerErrorMessage(err));
    });
  }

  deleteService(item: any) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        container: "delete-swal",
      },
    }).then((result) => {
      if (result.value) {
        this.changeStatus(item, 'delete');
      }
    })
  }
}
