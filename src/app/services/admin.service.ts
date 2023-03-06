import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private httpService: HttpService) { }
  fetchClients(payload: any) {
    return this.httpService.post('admin/client/list', payload);
  }
  changeClientStatus(payload: any) {
    return this.httpService.post('admin/client/status-change', payload);
  }
  submitClient(payload: any) {
    if (payload._id) {
      return this.httpService.post('admin/client/update', payload);
    }
    else {
      return this.httpService.post('admin/client/add', payload);
    }
  }
  fetchServices(payload: any) {
    return this.httpService.post('admin/service/list', payload);
  }
  changeServiceStatus(payload: any) {
    return this.httpService.post('admin/service/status-change', payload);
  }
  submitService(payload: any) {
    if (payload._id) {
      return this.httpService.post('admin/service/update', payload);
    }
    else {
      return this.httpService.post('admin/service/add', payload);
    }
  }
  fetchAppointement(payload: any) {
    return this.httpService.post('admin/appointment/list', payload);
  }
}
