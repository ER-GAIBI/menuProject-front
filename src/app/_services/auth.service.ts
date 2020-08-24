import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      companyName: user.companyName,
      commercialRegistrationNo: user.commercialRegistrationNo,
      phone: user.phone,
    }, httpOptions);
  }

  chnagePassword(pass: any, userId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('password', pass.password);
    formData.append('newPassword', pass.newPassword);
    formData.append('id', userId);
    return this.http.post(AUTH_API + 'changePassword', formData);
  }

  confirmRegister(token: string): Observable<any> {
    return this.http.get(AUTH_API + 'regitrationConfirm?token=' + token, { responseType: 'text' });
  }
}
