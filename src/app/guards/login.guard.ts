import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class loginGuard implements CanActivate {

  constructor(private _loginService:LoginService, private router: Router){}

  canActivate():boolean {
    if(!this._loginService.isLogged()){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
};
