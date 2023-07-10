import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUsuario, RespuestLogin } from '../interfaces/LoginUsuario';
import { RUTA } from '../interfaces/Ruta';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  newLogin(data: LoginUsuario): Observable<RespuestLogin> {
    return this.http.post<RespuestLogin>(`${RUTA}/login`, data, { headers: {'Content-Type': 'application/json', credentials: "include",} });
  }

  isLogged():boolean{
    const TOKEN = localStorage.getItem('access_token');
    if(this.jwtHelper.isTokenExpired(TOKEN) || !TOKEN) return false;
    return true;
  }

  getToken(): string {
    const TOKEN = localStorage.getItem('access_token');
    if(!TOKEN) return '';
    return TOKEN;
  }
}
