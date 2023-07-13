import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EditarUsuarioComponent } from '../operaciones/editar-usuario/editar-usuario.component';
import { CargoService } from 'src/app/services/cargo.service';
import { Cargo } from 'src/app/interfaces/Cargo';
import { EliminarUsuarioComponent } from '../operaciones/eliminar-usuario/eliminar-usuario.component';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-tabla-registros',
  templateUrl: './tabla-registros.component.html',
  styleUrls: ['./tabla-registros.component.css']
})
export class TablaRegistrosComponent implements OnInit {

  editarFila?: number;
  cargos: Cargo[];
  usuarios: Usuario[];
  usuarioEditar: Usuario;
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['NOMBRE', 'APELLIDO', 'FECHA_NACIMIENTO', 'EMAIL', 'ID_CARGO', 'PASSWORD', 'acciones'];
  toolTipPosition: TooltipPosition = 'above';

  form: FormGroup;

  constructor(
    private _serviceUsuarios: UsuarioService,
    private _serviceCargos: CargoService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog)
  {
    this.cargos = [];
    this.usuarios = [];
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
    this.getUsuarios();
    this.getCargos();
  }

  getUsuarios(): void {
    this._serviceUsuarios.getUserList().subscribe((data) => {
      this.usuarios = data.data;
      this.dataSource = new MatTableDataSource(this.usuarios);
    });
  }

  getCargos(): void {
    this._serviceCargos.getAllCargos().subscribe((data) => {
      this.cargos = data.data;
    });
  }

  obtenerCargo(id:number): string {
    return this._serviceCargos.obtenerNombreCargo(id, this.cargos);
  }

  editarUsuario(index: number) {
    this.editarFila = index;
    this.usuarioEditar = this.usuarios[index];
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      data: { usuario: this.usuarioEditar, listadoCargos: this.cargos }
    });
    /*const dialogRef = this.dialog.open(VentanaModalComponent, {
      data: this.usuarioEditar
    });*/
  }

  eliminarUsuario(index: number) {
    this.editarFila = index;
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      data: { email: this.usuarios[index].EMAIL }
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
