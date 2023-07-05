import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ventana-modal',
  templateUrl: './ventana-modal.component.html',
  styleUrls: ['./ventana-modal.component.css']
})
export class VentanaModalComponent {

  checkEditar = false;
  form: FormGroup;
  banderaAgregar: boolean;
  banderaEditar: boolean;

  constructor(public dialogRef: MatDialogRef<VentanaModalComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: { form: Usuario }, private _serviceUsuarios: UsuarioService) {
    this.form = this.formBuilder.group({
      NOMBRE: [''],
      APELLIDO: [''],
      FECHA_NACIMIENTO: [''],
      EMAIL: [''],
      CARGO: [''],
      PASSWORD: ['']
    });
    if (data) {
      this.banderaAgregar = false;
      this.banderaEditar = true;
      this.form.setValue(data);
    }
    else {
      console.log('entraaa')
      this.banderaAgregar = true;
      this.banderaEditar = false;
    }
  }

  prepararUsuario(): Usuario {
    const USER: Usuario = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      FECHA_NACIMIENTO: this.form.value.FECHA_NACIMIENTO,
      EMAIL: this.form.value.EMAIL,
      CARGO: this.form.value.CARGO,
      PASSWORD: this.form.value.PASSWORD
    }
    return USER;
  }

  subirInformacion(): void {
    const USER = this.prepararUsuario();
    if (this.banderaAgregar === true && this.banderaEditar === false) {
      this.agregarUsuario();
    }
    if (this.banderaAgregar === false && this.banderaEditar === true) {
      this.editarUsuario();
    }
  }

  agregarUsuario(): void {
    const USER = this.prepararUsuario();
    this._serviceUsuarios.newUser(USER).subscribe((data) => {
      console.log(data)
    });
  }

  editarUsuario(): void {
    if (this.checkEditar) {
      const USER = this.prepararUsuario();
      this._serviceUsuarios.updateUser(USER).subscribe((data) => {
        console.log(data)
      });
    }
  }

  cerrarDialog(){
    this.dialogRef.close();
  }
}
