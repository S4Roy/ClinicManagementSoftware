import { Component } from '@angular/core';

@Component({
  selector: 'custom-tableloader',
  templateUrl: './custom-tableloader.component.html',
  styleUrls: ['./custom-tableloader.component.scss']
})
export class CustomTableloaderComponent {
  show({
    id = <string>""
  } = {}) {
    let loaderElement: any = null;
    if (id)
      loaderElement = document.getElementById(id)?.querySelector('#table-processing');
    else
      loaderElement = document.getElementById('table-processing');


    if (loaderElement) {
      loaderElement.style.display = 'block';
    }
  }

  hide({
    id = <any>null
  } = {}) {
    let loaderElement: any = null;
    if (id)
      loaderElement = document.getElementById(id)?.querySelector('#table-processing');
    else
      loaderElement = document.getElementById('table-processing');


    if (loaderElement) {
      loaderElement.style.display = 'none';
    }
  }
}
