import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, EliminarUsuario, PeticionListaUsuarios } from '../interfaces/Usuario';
import { RUTA } from '../interfaces/Ruta';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'http://kosmetikon.myqnapcloud.com:44444';

  constructor(private http: HttpClient) { }

  getUserList(): Observable<PeticionListaUsuarios> {
    return this.http.get<PeticionListaUsuarios>(`${RUTA}/getUserList`);
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
