import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{

  form: FormGroup;
  options: string[] = ['Desarrollador', 'Two', 'Three', 'Four', 'Five', 'Six'];
  filteredOptions!: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, private _serviceUsuarios: UsuarioService, @Inject(MAT_DIALOG_DATA) public data: { form: Usuario }){
    this.form = this.formBuilder.group({
      NOMBRE: ['',  Validators.required],
      APELLIDO: ['',  Validators.required],
      FECHA_NACIMIENTO: ['',  Validators.required],
      EMAIL: ['',  [Validators.required, Validators.email]],
      ID_CARGO: ['',  Validators.required],
      PASSWORD: ['',  Validators.required]
    });
    console.log(this.data)
    this.form.setValue(this.data);
  }

  ngOnInit() {
    this.filteredOptions = this.form.controls['CARGO'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  editarUsuario(){
    const USER: Usuario = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      FECHA_NACIMIENTO: this.form.value.FECHA_NACIMIENTO,
      EMAIL: this.form.value.EMAIL,
      ID_CARGO: this.form.value.CARGO,
      PASSWORD: this.form.value.PASSWORD
    };
    this._serviceUsuarios.updateUser(USER).subscribe((data) => {
      console.log(data)
    });
  }
}
