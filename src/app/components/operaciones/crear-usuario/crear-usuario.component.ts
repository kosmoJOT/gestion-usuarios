import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable, of, pipe } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { CargoService } from 'src/app/services/cargo.service';
import { Cargo, ListaCargos } from 'src/app/interfaces/Cargo';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit{

  form: FormGroup;
  listadoCargos: Cargo[];
  filteredOptions!: Observable<Cargo[]>;

  constructor(
    private formBuilder: FormBuilder,
    private _serviceUsuarios: UsuarioService,
    private _serviceCargos: CargoService
    ){
    this.form = this.formBuilder.group({
      NOMBRE: ['',  Validators.required],
      APELLIDO: ['',  Validators.required],
      FECHA_NACIMIENTO: ['',  Validators.required],
      EMAIL: ['',  [Validators.required, Validators.email]],
      ID_CARGO: ['',  Validators.required],
      PASSWORD: ['',  Validators.required]
    });
    this.listadoCargos=[];
  }

  ngOnInit() {
    this.obtenerCargos();
    this.filteredOptions = this.form.controls['ID_CARGO'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  obtenerCargos() {
    this._serviceCargos.getAllCargos().subscribe( (data: ListaCargos) =>{
      this.listadoCargos = data.data;
    });
  }

  private _filter(value: string): Cargo[] {
    const filterValue = value.toLowerCase();
    return this.listadoCargos.filter(option => option.CARGO.toLowerCase().includes(filterValue));
  }

  crearUsuario(){
    const USER: Usuario = {
      NOMBRE: this.form.value.NOMBRE,
      APELLIDO: this.form.value.APELLIDO,
      FECHA_NACIMIENTO: this.form.value.FECHA_NACIMIENTO,
      EMAIL: this.form.value.EMAIL,
      ID_CARGO: this._serviceCargos.obtenerIdCargo(this.form.value.ID_CARGO, this.listadoCargos),
      PASSWORD: this.form.value.PASSWORD
    };
    this._serviceUsuarios.newUser(USER).subscribe((data) => {
      console.log(data)
    });
  }
}
