import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent {

  checkEliminar: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private _serviceUsuarios: UsuarioService){
    this.form = this.formBuilder.group({
      EMAIL: ['',  [Validators.required, Validators.email]],
      PASSWORD: ['',  Validators.required]
    });
  }

  eliminarUsuario(){
    const USER: Usuario = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      FECHA_NACIMIENTO: this.form.value.FECHA_NACIMIENTO,
      EMAIL: this.form.value.EMAIL,
      CARGO: this.form.value.CARGO,
      PASSWORD: this.form.value.PASSWORD
    };
    console.log(USER);
  }
}
