import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://www.qmenusa.com:8080/api/user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ListOfCodesService {

  constructor(private http: HttpClient) { }

  getCodes(): Observable<any> {
    return this.http.get(API_URL + '/getCodes');
  }

  deleteCode(codeId: number) {
    return this.http.delete(API_URL + '/delete?id=' + codeId);
  }
}
