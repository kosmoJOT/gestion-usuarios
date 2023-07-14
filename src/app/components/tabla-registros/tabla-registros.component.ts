import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { concatMap } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Usuario } from 'src/app/interfaces/Usuario';
import { Cargo } from 'src/app/interfaces/Cargo';

import { UsuarioService } from 'src/app/services/usuario.service';
import { CargoService } from 'src/app/services/cargo.service';

import { EditarUsuarioComponent } from '../operaciones/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from '../operaciones/eliminar-usuario/eliminar-usuario.component';
import { AvisoComponent } from '../helpers/aviso/aviso.component';
import { RespuestaCrear } from 'src/app/interfaces/RespuestasBack';


@Component({
  selector: 'app-tabla-registros',
  templateUrl: './tabla-registros.component.html',
  styleUrls: ['./tabla-registros.component.css']
})
export class TablaRegistrosComponent implements OnInit, OnChanges {

  @Input() usuarios: any;
  @Input() cargos: Cargo[];
  @Output() operacionEnTabla = new EventEmitter<boolean>();

  editarFila?: number;
  usuarioEditar: Usuario;
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['NOMBRE', 'APELLIDO', 'FECHA_NACIMIENTO', 'EMAIL', 'ID_CARGO', 'PASSWORD', 'ACCIONES'];
  toolTipPosition: TooltipPosition = 'above';

  form: FormGroup;

  constructor(
    private _serviceUsuarios: UsuarioService,
    private _serviceCargos: CargoService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.cargos = [];
    this.form = this.formBuilder.group({
      NOMBRE: [''],
      APELLIDO: [''],
      FECHA_NACIMIENTO: [''],
      EMAIL: [''],
      ID_CARGO: [''],
      PASSWORD: ['']
    });
    this.usuarioEditar = {
      NOMBRE: '',
      APELLIDO: '',
      FECHA_NACIMIENTO: new Date(),
      EMAIL: '',
      ID_CARGO: 0,
      PASSWORD: ''
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.dataSource = new MatTableDataSource(this.usuarios);
  }

  obtenerCargo(id: number): string {
    return this._serviceCargos.obtenerNombreCargo(id, this.cargos);
  }

  editarUsuario(index: number) {
    this.editarFila = index;
    this.usuarioEditar = this.usuarios[index];
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      data: { usuario: this.usuarioEditar, listadoCargos: this.cargos }
    });
    /*dialogRef.afterClosed().subscribe((res: any) => {
      if (res.operar) {
        this._serviceUsuarios.updateUser(res.usuario).subscribe(
          {
            next: (response: RespuestaCrear) => {
              this.operacionEnTabla.emit(true);
              this.openSnackBar(response.message);
            },
            error: () => {
              this.openSnackBar('Error al editar');
            }
          }
        );
      }
    });*/
    dialogRef.afterClosed().pipe(
      concatMap( (res) => {
        return this._serviceUsuarios.updateUser(res.usuario);
      })
    ).subscribe(
      {
        next: (response: RespuestaCrear) => {
          this.operacionEnTabla.emit(true);
              this.openSnackBar(response.message);
        },
        error: () => {
          this.openSnackBar('Error al editar');
        }
      }
    );
  }

  eliminarUsuario(index: number) {
    this.editarFila = index;
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      data: { email: this.usuarios[index].EMAIL }
    });
    /*dialogRef.afterClosed().subscribe((res) => {
      this._serviceUsuarios.deleteUser(res).subscribe(
        {
          next: (response: RespuestaCrear) => {
            this.operacionEnTabla.emit(true);
            this.openSnackBar(response.message);
          },
          error: () => {
            this.openSnackBar('Error al eliminar');
          }
        }
      );
    });*/
    dialogRef.afterClosed().pipe(
      concatMap( (res) => {
        return this._serviceUsuarios.deleteUser(res);
      })
    ).subscribe(
      {
        next: (response: RespuestaCrear) => {
          this.operacionEnTabla.emit(true);
              this.openSnackBar(response.message);
        },
        error: () => {
          this.openSnackBar('Error al eliminar');
        }
      }
    );
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
