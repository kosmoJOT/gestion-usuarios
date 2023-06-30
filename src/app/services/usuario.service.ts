import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'http://localhost:3700';
  listado: Usuario[] = [
    {
      "nombre":"Alejandro",
      "apellido": "Torres",
      "fechaNacimiento": new Date('2001/09/13'),
      "email": "jaot037@gmail.com",
      "cargo": "Desarrollador",
      "password": "123"
    },
    {
      "nombre":"Jose",
      "apellido": "Olarte",
      "fechaNacimiento": new Date('2001/09/13'),
      "email": "jaot037@gmail.com",
      "cargo": "Desarrollador",
      "password": "123"
    }
  ];

  constructor(private http: HttpClient) { }

  /*getUserList(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('../data/Usuarios.json');
  }*/
  getUserList(): any {
    return this.listado.slice();
  }

  newUser(data: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/newUser`, { data: data });
  }

  updateUser(data: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/updateUser`, { data: data });
  }

  /*deleteUser(data: Usuario): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.baseUrl}/deleteUser`, { data: data });
  }*/
}
