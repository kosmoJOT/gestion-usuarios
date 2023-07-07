import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, PeticionListaUsuarios } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'http://kosmetikon.myqnapcloud.com:44444';

  constructor(private http: HttpClient) { }

  getUserList(): Observable<PeticionListaUsuarios> {
    return this.http.get<PeticionListaUsuarios>(`${this.baseUrl}/getUserList`);
  }

  newUser(data: Usuario): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/newUser`, data, { headers: {'Content-Type': 'application/json'} });
  }

  updateUser(data: Usuario): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/updateUser`, data, { headers: {'Content-Type': 'application/json'} });
  }

  deleteUser(data: {EMAIL: string, PASSWORD: string}): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteUser`, {
      headers: {'Content-Type': 'application/json'}, body: data});
  }
}
