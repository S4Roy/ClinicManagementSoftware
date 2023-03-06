import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as Global from "src/app/globals";
import PaginationOptions from 'src/app/models/PaginationOptions';
@Component({
  selector: 'custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent {
  Global = Global;
  @Input() rows: any[] = [];
  @Input() paginationOptions: PaginationOptions = {
    hasNextPage: false,
    hasPrevPage: false,
    limit: Global.TABLE_LENGTH,
    nextPage: null,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 0,
    totalPages: 1,
  };

  @Output() onPageClicked: EventEmitter<any> = new EventEmitter<any>();

}
