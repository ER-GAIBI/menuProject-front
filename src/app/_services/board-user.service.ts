import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'http://46.101.151.85:8080/api/user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BoardUserService {

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File, name: string) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('name', name);
    return this.http.post(API_URL + '/saveMenu', formData);
  }

  editFile(fileToUpload: File, name: string, id: string) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('name', name);
    formData.append('id', id);
    return this.http.post(API_URL + '/editMenu', formData);
  }

  getCode(id: string) {
    return this.http.get(API_URL + '/getCode?id=' + id);
  }

  getCodeForScan(id: string) {
    return this.http.get(API_URL + '/getCodeForScan?id=' + id);
  }

  setViewedTime(qrCodeId: string, time: any, viewerId: string) {
    const formData: FormData = new FormData();
    formData.append('time', time);
    formData.append('id', viewerId);
    formData.append('qrCodeId', qrCodeId);
    return this.http.post(API_URL + '/setTime', formData);
  }

  newViewer() {
    return this.http.get(API_URL + '/newViewer');
  }

}
