import { Injectable } from '@angular/core';
import JwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment'
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {interval, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChanged = new Subject<boolean>();
  constructor(private http:HttpClient) {
    interval(5000).subscribe(() => {
      this.authChanged.next(this.isAuthenticated());
    });
  }

  isAuthenticated(){
    const token = window.localStorage.getItem('token');
    if(!token){
      return false;
    }
    const data = JwtDecode(token);
    return data.exp * 1000 > Date.now();
  }

  getToken(){
    return window.localStorage.getItem('token');
  }

  logout(){
    window.localStorage.removeItem('token');
    this.authChanged.next(false);
  }
  authenticate(credentials: Credentials) {
    return this.http
      .post(environment.apiUrl + '/login_token', credentials)
      .pipe(
        tap((data: { token: string }) => {
          window.localStorage.setItem('token', data.token);
          this.authChanged.next(true);
        })
      );
  }
}


export interface Credentials {
  username: string;
  password: string;
}
