import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }
  fetchClients(payload: any) {
    return this.httpService.post('employee/client/list', payload);
  }

  submitClient(payload: any) {
    if (payload._id) {
      return this.httpService.post('employee/client/update', payload);
    }
    else {
      return this.httpService.post('employee/client/add', payload);
    }
  }
  fetchServices(payload: any) {
    return this.httpService.post('employee/service/list', payload);
  }
  addAppointement(payload: any) {
    return this.httpService.post('employee/appointment/add', payload);
  }  
  fetchAppointement(payload: any) {
    return this.httpService.post('employee/appointment/list', payload);
  }
}
