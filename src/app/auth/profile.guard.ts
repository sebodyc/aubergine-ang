import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import JwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {UserComponent} from "./user.component";

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private user : UserComponent) {}
  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean | UrlTree {

    const id =JwtDecode(this.auth.getToken()).id;

   console.log()
    if (!this.auth.isAuthenticated() ) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
