import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent {

  form: FormGroup;

  constructor(private _serviceUsuarios: UsuarioService, private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: { email: string }){
    this.form = this.formBuilder.group({
      EMAIL: [''],
      PASSWORD: ['']
    });
    this.form.patchValue( { EMAIL: data.email });
  }

  eliminarUsuario(){
    const DATA = {
      EMAIL: this.form.value.EMAIL,
      PASSWORD: this.form.value.PASSWORD
    }
    this._serviceUsuarios.deleteUser(DATA).subscribe( (data) => {
      console.log(data);
    });
  }
}
