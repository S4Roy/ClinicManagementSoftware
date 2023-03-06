import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as Global from 'src/app/globals';
import PaginationOptions from 'src/app/models/PaginationOptions';
import TableFilterOptions from 'src/app/models/TableFiilterOptions';
import { AdminService } from 'src/app/services/admin.service';
import { CustomTableloaderComponent } from '../../includes/custom-tableloader/custom-tableloader.component';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent {
  Global = Global;
  paginationOptions: PaginationOptions;
  tableFilterOptions: TableFilterOptions;
  rows: any[] = [];
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private tableLoader: CustomTableloaderComponent,
  ) {

    this.paginationOptions = Global.resetPaginationOption();
    this.tableFilterOptions = Global.resetTableFilterOptions();

  }

  async ngOnInit() {
    setTimeout(() => {
      this.fetchCif();
    });
  }



  fetchCif({ page = <any>null } = {}) {
    if (page != null) {
      this.paginationOptions.page = page;
    }

    this.tableLoader.show();
    this.adminService.fetchAppointement({
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
    this.fetchCif({
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
    this.fetchCif({
      page: 1,
    })
  }

}
