import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs'
import { concatMap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


import { PeticionListaUsuarios, Usuario } from 'src/app/interfaces/Usuario';
import { RespuestaCrear } from 'src/app/interfaces/RespuestasBack';
import { Cargo } from 'src/app/interfaces/Cargo';

import { UsuarioService } from 'src/app/services/usuario.service';

import { CrearUsuarioComponent } from '../operaciones/crear-usuario/crear-usuario.component';
import { AvisoComponent } from '../helpers/aviso/aviso.component';
import { CargoService } from 'src/app/services/cargo.service';

@Component({
  selector: 'app-ventana-principal',
  templateUrl: './ventana-principal.component.html',
  styleUrls: ['./ventana-principal.component.css']
})
export class VentanaPrincipalComponent implements OnInit {

  obsSubject = new Subject<any>();
  listaUsuarios: Usuario[] = [];
  listaCargos: Cargo[];

  constructor(
    public dialog: MatDialog,
    private _serviceUsuario: UsuarioService,
    private _snackBar: MatSnackBar,
    private _serviceCargos: CargoService
  ) {
    this.listaCargos = [];
  }

  ngOnInit(): void {
    this.obsSubject.subscribe((data: any) => {
      this.listaUsuarios = data;
    });
    this.refrescarTabla(true);
    this.cargarCargos();
  }

  abrirModalCrear() {
    const dialog = this.dialog.open(CrearUsuarioComponent, {
      data: { listadoCargos: this.listaCargos }
    });
    /*dialog.afterClosed().subscribe( (res: any) => {
      if(res.operar){
        this._serviceUsuario.newUser(res.usuario).subscribe(
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
      }
    });*/
    dialog.afterClosed().pipe(
      concatMap( (res) => {
        return this._serviceUsuario.newUser(res.usuario);
      })
    ).subscribe(
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

  cargarCargos() {
    this._serviceCargos.getAllCargos().subscribe( (data) => {
      this.listaCargos = data.data;
    });
  }
}
