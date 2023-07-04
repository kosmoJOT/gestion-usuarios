import { Component, Input, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Usuario } from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-ventana-modal',
  templateUrl: './ventana-modal.component.html',
  styleUrls: ['./ventana-modal.component.css']
})
export class VentanaModalComponent {

  form: FormGroup;
  banderaAgregar: boolean;
  banderaEditar: boolean;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: {form: Usuario}) {
    this.form = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      fechaNacimiento: [''],
      email: [''],
      cargo: [''],
      password: ['']
    });
    if(data){
      this.banderaAgregar = false;
      this.banderaEditar = true;
      this.form.setValue(data);
    }
    else{
      this.banderaAgregar = true;
      this.banderaEditar = false;
    }
  }

  prepararUsuario(): Usuario {
    const USER: Usuario = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      fechaNacimiento: this.form.value.fechaNacimiento,
      email: this.form.value.email,
      cargo: this.form.value.cargo,
      password: this.form.value.password
    }
    return USER;
  }

  subirInformacion(): void {
    const USER = this.prepararUsuario();
    if(this.banderaAgregar===true && this.banderaEditar===false){
      this.agregarUsuario();
    }
    if(this.banderaAgregar===false && this.banderaEditar===true){
      this.editarUsuario();
    }
  }

  agregarUsuario(): void {
    const USER = this.prepararUsuario();
    console.log('Agregar', USER);
  }

  editarUsuario(): void {
    const USER = this.prepararUsuario();
    console.log('Editar', USER);
  }
}
