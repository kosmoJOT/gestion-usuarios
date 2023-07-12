import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';

import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { EditarUsuarioComponent } from '../operaciones/editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-tabla-registros',
  templateUrl: './tabla-registros.component.html',
  styleUrls: ['./tabla-registros.component.css']
})
export class TablaRegistrosComponent implements OnInit{

  editarFila?: number;
  usuarios: Usuario[];
  usuarioEditar: Usuario;
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['NOMBRE', 'APELLIDO', 'FECHA_NACIMIENTO', 'EMAIL', 'ID_CARGO', 'PASSWORD', 'acciones'];

  form: FormGroup;

  constructor(private _serviceUsuarios: UsuarioService, private formBuilder: FormBuilder, private dialog: MatDialog){
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
  }

  getUsuarios(): void {
    this._serviceUsuarios.getUserList().subscribe( (data) => {
      this.usuarios = data.data;
      console.log(this.usuarios);
      this.dataSource = new MatTableDataSource(this.usuarios);
    });
  }

  editarUsuario(index: number){
    this.editarFila = index;
    this.usuarioEditar = this.usuarios[index];
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      data: this.usuarioEditar
    });
    /*const dialogRef = this.dialog.open(VentanaModalComponent, {
      data: this.usuarioEditar
    });*/
  }

  eliminarUsuario(index: number){
    this.editarFila = index;
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      data: { email:  this.usuarios[index].EMAIL }
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
