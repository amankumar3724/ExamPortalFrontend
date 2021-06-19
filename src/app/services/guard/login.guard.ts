import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private login:LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  if(this.login.isLoggedIn() && this.login.getUserRole()=="Admin"){
    this.router.navigateByUrl('/admin-dashboard');
    return true;
  }
  else if(this.login.isLoggedIn() && this.login.getUserRole()=="Customer"){
    this.router.navigateByUrl('/user-dashboard');
    return true;
  }

  this.router.navigateByUrl('/login');
  return false;
  }

}
