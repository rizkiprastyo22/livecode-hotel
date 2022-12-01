import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ApiResponse } from 'src/app/shared/api-response';
import Swal from 'sweetalert2';
import { Login } from '../model/login';
import { LoginResponse } from '../model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storage: Storage = sessionStorage

  constructor(
    private http: HttpClient
  ) { }

  baseUrl: string = '/api/v1/auth/login';

  login(payload: Login): Observable<ApiResponse<LoginResponse>> {
    try {
      return this.http.post<ApiResponse<LoginResponse>>(this.baseUrl, payload);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
