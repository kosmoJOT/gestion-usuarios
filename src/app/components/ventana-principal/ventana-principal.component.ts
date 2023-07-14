import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs'

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


import { PeticionListaUsuarios, Usuario } from 'src/app/interfaces/Usuario';
import { RespuestaCrear } from 'src/app/interfaces/RespuestasBack';

import { UsuarioService } from 'src/app/services/usuario.service';

import { CrearUsuarioComponent } from '../operaciones/crear-usuario/crear-usuario.component';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-ventana-principal',
  templateUrl: './ventana-principal.component.html',
  styleUrls: ['./ventana-principal.component.css']
})
export class VentanaPrincipalComponent implements OnInit {

  obsSubject = new Subject<any>();
  listaUsuarios: Usuario[] = [];

  constructor(
    public dialog: MatDialog,
    private _serviceUsuario: UsuarioService,
    private _serviceUsuarios: UsuarioService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obsSubject.subscribe((data: any) => {
      this.listaUsuarios = data;
    });
    this.refrescarTabla(true);
  }

  abrirModalCrear() {
    const dialog = this.dialog.open(CrearUsuarioComponent);
    dialog.afterClosed().subscribe((res) => {
      /*this._serviceUsuarios.newUser(res).subscribe((data: any) => {
        this.refrescarTabla(true);
        this.openSnackBar(data.message);
      });*/
      this._serviceUsuarios.newUser(res).subscribe(
        {
          next: (response: RespuestaCrear) => {
            this.refrescarTabla(true);
            this.openSnackBar(response.message);
          },
          error: () => {
            this.openSnackBar('Error al crear');
          }
        }
      );
    });
  }

  refrescarTabla(opero: any) {
    if (opero) {
      this._serviceUsuario.getUserList().subscribe((data: PeticionListaUsuarios) => {
        this.obsSubject.next(data.data);
      });
    }
  }

  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.openFromComponent(AvisoComponent, {
      data: {
        message: message
      },
      duration: 2000
    });
  }
}
