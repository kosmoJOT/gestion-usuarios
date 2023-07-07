import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUsuario } from 'src/app/interfaces/LoginUsuario';
import { Usuario, PeticionListaUsuarios } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: FormGroup;
  listaUsuarios: Usuario[];

  constructor(private formBuilder: FormBuilder, private _usuarioService: UsuarioService){
    this.form = this.formBuilder.group({
      EMAIL: ['',  [Validators.required, Validators.email]],
      PASSWORD: ['',  Validators.required],
      RECORDAR: false
    });
    this.listaUsuarios = [];
  }

  ngOnInit(): void {
  }

  iniciarSesion(){
    const USER: LoginUsuario = {
      EMAIL: this.form.value.EMAIL,
      PASSWORD: this.form.value.PASSWORD
    };
    console.log(USER)
  }
}
