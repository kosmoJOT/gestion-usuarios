import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginUsuario, RespuestLogin } from 'src/app/interfaces/LoginUsuario';
import { Usuario } from 'src/app/interfaces/Usuario';

import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { AvisoComponent } from '../../aviso/aviso.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  form: FormGroup;
  listaUsuarios: Usuario[];

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _usuarioService: UsuarioService,
    private router:Router,
    private _snackBar: MatSnackBar
  ){
    this.form = this.formBuilder.group({
      EMAIL: ['',  [Validators.required, Validators.email]],
      PASSWORD: ['',  Validators.required],
      RECORDAR: false
    });
    this.listaUsuarios = [];
  }

  iniciarSesion(){
    const USER: LoginUsuario = {
      EMAIL: this.form.value.EMAIL,
      PASSWORD: this.form.value.PASSWORD
    };
    /*this._loginService.newLogin(USER).subscribe((data: RespuestLogin) => {
      document.cookie = `access_token=${data.token};`;
      localStorage.setItem('access_token', data.token);
      this.router.navigate(['gestion-usuarios']);
    });*/
    this._loginService.newLogin(USER).subscribe(
      {
        next: (response: RespuestLogin) => {
          document.cookie = `access_token=${response.token};`;
          localStorage.setItem('access_token', response.token);
          this.router.navigate(['gestion-usuarios']);
          this.openSnackBar(response.message);
        },
        error: () => {
          this.openSnackBar('Error al iniciar sesión');
        }
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(AvisoComponent, {
      duration: 2000,
      data: {
        message: message
      }
    });
  }
}
