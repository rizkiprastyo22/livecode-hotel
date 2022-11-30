import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router
  ){}

  canActivate(): boolean {
    return this.authorize()
  }
  canActivateChild(): boolean {
    return this.authorize()
  }
  
  private authorize(): boolean{
    const authToken: boolean = (sessionStorage.getItem('token') !== null)
    if(!authToken){
      Swal.fire({
        icon:'error',
        title: 'Oops...',
        text: 'Kamu belum ada akses untuk halaman ini, silakan login'
      });
      this.router.navigateByUrl('/auth/login')
    }
    return authToken
  }
  
}
