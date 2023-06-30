import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-ventana-modal',
  templateUrl: './ventana-modal.component.html',
  styleUrls: ['./ventana-modal.component.css']
})
export class VentanaModalComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      fechaNacimiento: [''],
      email: [''],
      cargo: [''],
      password: ['']
    });
  }

  agregarUsuario(){
    console.log('entra')
    const USER: Usuario = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      fechaNacimiento: this.form.value.fechaNacimiento,
      email: this.form.value.email,
      cargo: this.form.value.cargo,
      password: this.form.value.password
    }
    console.log(USER);
  }
}
