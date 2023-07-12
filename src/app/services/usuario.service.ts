import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, EliminarUsuario, PeticionListaUsuarios } from '../interfaces/Usuario';
import { RUTA } from '../interfaces/Ruta';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private _loginService: LoginService) { }

  getUserList(): Observable<PeticionListaUsuarios> {
    const TOKEN = this._loginService.getToken();
    return this.http.get<PeticionListaUsuarios>(`${RUTA}/getUserList`, { withCredentials: true });
  }

  newUser(data: Usuario): Observable<any> {
    return this.http.post<any>(`${RUTA}/newUser`, data, { headers: {'Content-Type': 'application/json'} });
  }

  updateUser(data: Usuario): Observable<any> {
    return this.http.patch<any>(`${RUTA}/updateUser`, data, { headers: {'Content-Type': 'application/json'} });
  }

  deleteUser(data: EliminarUsuario): Observable<any> {
    return this.http.delete<any>(`${RUTA}/deleteUser`, {
      headers: {'Content-Type': 'application/json'}, body: data});
  }
}
