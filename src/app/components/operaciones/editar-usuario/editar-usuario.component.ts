import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Usuario } from 'src/app/interfaces/Usuario';
import { Cargo } from 'src/app/interfaces/Cargo';

import { UsuarioService } from 'src/app/services/usuario.service';
import { CargoService } from 'src/app/services/cargo.service';

import { AvisoComponent } from '../../helpers/aviso/aviso.component';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{

  form: FormGroup;
  filteredOptions!: Observable<Cargo[]>;

  constructor(
    private formBuilder: FormBuilder,
    private _serviceUsuarios: UsuarioService,
    private _serviceCargo: CargoService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario, listadoCargos: Cargo[] }
  ){
    this.form = this.formBuilder.group({
      NOMBRE: ['',  Validators.required],
      APELLIDO: ['',  Validators.required],
      FECHA_NACIMIENTO: ['',  Validators.required],
      EMAIL: ['',  [Validators.required, Validators.email]],
      ID_CARGO: ['',  Validators.required],
      PASSWORD: ['',  Validators.required]
    });
  }

  ngOnInit() {
    this.form.setValue({
      NOMBRE: this.data.usuario.NOMBRE,
      APELLIDO: this.data.usuario.APELLIDO,
      FECHA_NACIMIENTO: this.data.usuario.FECHA_NACIMIENTO,
      EMAIL: this.data.usuario.EMAIL,
      ID_CARGO: this._serviceCargo.obtenerNombreCargo(this.data.usuario.ID_CARGO, this.data.listadoCargos),
      PASSWORD: ''
    });
    this.filteredOptions = this.form.controls['ID_CARGO'].valueChanges.pipe(
      startWith(this.form.value.ID_CARGO),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): Cargo[] {
    const filterValue = value.toLowerCase();
    return this.data.listadoCargos.filter(option => option.CARGO.toLowerCase().includes(filterValue));
  }

  editarUsuario(){
    const USER: Usuario = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      FECHA_NACIMIENTO: this.form.value.FECHA_NACIMIENTO,
      EMAIL: this.form.value.EMAIL,
      ID_CARGO: this._serviceCargo.obtenerIdCargo(this.form.value.ID_CARGO, this.data.listadoCargos),
      PASSWORD: this.form.value.PASSWORD
    };
    this.dialogRef.close( {usuario: USER, operar: true} );
  }

  openSnackBar() {
    this._snackBar.openFromComponent(AvisoComponent, {
      duration: 1000,
      data: {
        message: "Usuario Editado"
      }
    });
  }
}
