import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../interfaces/LoginUsuario';
import { RUTA } from '../interfaces/Ruta';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  newLogin(data: LoginUsuario): Observable<any> {
    return this.http.post<any>(`${RUTA}/login`, data, { headers: {'Content-Type': 'application/json'}, observe: 'response', withCredentials: true });
  }
}
