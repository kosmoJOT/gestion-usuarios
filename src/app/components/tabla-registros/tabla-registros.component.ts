import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';

import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'email', 'cargo', 'password', 'acciones'];

  form: FormGroup;

  constructor(private _serviceUsuarios: UsuarioService, private formBuilder: FormBuilder, private dialog: MatDialog){
    this.usuarios = [];
    this.form = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      fechaNacimiento: [''],
      email: [''],
      cargo: [''],
      password: ['']
    });
    this.usuarioEditar = {
      nombre: '',
      apellido: '',
      fechaNacimiento: new Date(),
      email: '',
      cargo: '',
      password: ''
    }
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarios = this._serviceUsuarios.getUserList();
    this.dataSource = new MatTableDataSource(this.usuarios);
  }

  editarUsuario(index: number){
    this.editarFila = index;
    this.usuarioEditar = this.usuarios[index];
    const dialogRef = this.dialog.open(VentanaModalComponent, {
      data: this.usuarioEditar
    });
  }

  eliminarUsuario(index: number){
    console.log(this.usuarioEditar)
    this.editarFila = undefined;
  }

}
