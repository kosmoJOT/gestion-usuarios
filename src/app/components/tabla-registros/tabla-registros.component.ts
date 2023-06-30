import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';

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

  constructor(private _serviceUsuarios: UsuarioService, private formBuilder: FormBuilder){
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
    const usuarioEditar = {};
    if(this.editarFila===undefined){
      this.editarFila = index;
      this.usuarioEditar = this.usuarios[index];
    }
  }

  cancelarUsuario(index: number){
    this.editarFila = undefined;
  }

  guardarUsuario(index: number){
    console.log(this.usuarioEditar)
    this.editarFila = undefined;
  }

  eliminarUsuario(index: number){
    console.log(this.usuarioEditar)
    this.editarFila = undefined;
  }

}
