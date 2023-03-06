import { Injectable } from '@angular/core';
import * as Global from 'src/app/globals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly BASE_URL;

  constructor(
    private http: HttpClient,
  ) {
    this.BASE_URL = Global.BACKEND_URL;
  }

  get(uri: string) {
    return this.http.get<any>(`${this.BASE_URL}/${uri}`);
  }

  post(uri: string, payload: any,) {
    return this.http.post<any>(`${this.BASE_URL}/${uri}`, payload);
  }

  postFormData(uri: string, payload: any) {
    var formData = new FormData();
    for (var key in payload) {
      formData.append(key, payload[key]);
    }
  }
}
