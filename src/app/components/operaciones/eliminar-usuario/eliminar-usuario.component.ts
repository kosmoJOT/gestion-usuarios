import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EliminarUsuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit{

  checkEliminar: boolean = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _serviceUsuarios: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
  ){
    this.form = this.formBuilder.group({
      EMAIL: [this.data.email,  [Validators.required, Validators.email]],
      PASSWORD: ['',  Validators.required]
    });
  }

  ngOnInit(): void {
  }

  eliminarUsuario(){
    const USER: EliminarUsuario = {
      EMAIL: this.form.value.EMAIL,
      PASSWORD: this.form.value.PASSWORD
    };
    this._serviceUsuarios.deleteUser(USER).subscribe( (data) => {
      console.log(data);
    });
  }
}
