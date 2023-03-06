import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as Global from 'src/app/globals';

@Component({
  selector: 'custom-tableoption',
  templateUrl: './custom-tableoption.component.html',
  styleUrls: ['./custom-tableoption.component.scss']
})
export class CustomTableoptionComponent {
  filterForm: FormGroup;
  @Input() placeholder: String = 'Search...'
  @Output() onFilterChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.filterForm = formBuilder.group({
      searchkey: [null],
      limit: [Global.TABLE_LENGTH],
    });
  }
}
