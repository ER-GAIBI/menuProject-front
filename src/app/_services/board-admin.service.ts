import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

const API_URL = 'http://46.101.151.85:8080/api/admin';

@Injectable({
  providedIn: 'root'
})

export class BoardAdminService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(API_URL + '/allUsers');
  }

  lock(id: string) {
    return this.http.get(API_URL + '/lock?id=' + id);
  }

  open(id: string) {
    return this.http.get(API_URL + '/open?id=' + id);
  }

  getCodes(): Observable<any> {
    return this.http.get(API_URL + '/getCodes');
  }

  getCode(id: string) {
    return this.http.get(API_URL + '/getCode?id=' + id);
  }

}
