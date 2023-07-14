import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    public dialogRef: MatDialogRef<EliminarUsuarioComponent>
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
    this.dialogRef.close(USER);
  }
}
