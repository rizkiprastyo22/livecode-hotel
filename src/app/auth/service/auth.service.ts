import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import Swal from 'sweetalert2';
import { Login } from '../model/login';
import { LoginResponse } from '../model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storage: Storage = sessionStorage

  constructor() { }

  login(payload: Login): Observable<LoginResponse | null>{
    return new Observable<LoginResponse | null>((observer: Observer<LoginResponse | null>) => {
      try {
        const { username, password } = payload
        if(username === 'admin' && password === '123') {
          const loginResponse: LoginResponse = {
            username: username,
            accessToken: 'token123'
          }
          this.storage.setItem('token', JSON.stringify(loginResponse))
          observer.next(loginResponse)
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email atau Password salah!',
          })
        }
      } catch (error: any) {
        observer.error(error.message)
      }
    })
  }
}
