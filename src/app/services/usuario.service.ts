import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, PeticionListaUsuarios } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'http://localhost:3700';
  listado: Usuario[] = [
    {
      "NOMBRE":"Alejandro",
      "APELLIDO": "Torres",
      "FECHA_NACIMIENTO": new Date('2001/09/13'),
      "EMAIL": "jaot037@gmail.com",
      "CARGO": "Desarrollador",
      "PASSWORD": "123"
    },
    {
      "NOMBRE":"Jose",
      "APELLIDO": "Olarte",
      "FECHA_NACIMIENTO": new Date('2001/09/13'),
      "EMAIL": "jaot037@gmail.com",
      "CARGO": "Desarrollador",
      "PASSWORD": "123"
    }
  ];

  constructor(private http: HttpClient) { }

  getUserList(): Observable<PeticionListaUsuarios> {
    return this.http.get<PeticionListaUsuarios>('http://kosmetikon.myqnapcloud.com:8769/getUserList');
  }
  /*getUserList(): any {
    return this.listado.slice();
  }*/

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
