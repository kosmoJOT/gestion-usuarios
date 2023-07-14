import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginUsuario } from 'src/app/interfaces/LoginUsuario';
import { Usuario } from 'src/app/interfaces/Usuario';

import { LoginService } from 'src/app/services/login.service';

import { AvisoComponent } from '../../helpers/aviso/aviso.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  listaUsuarios: Usuario[];

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      EMAIL: ['', [Validators.required, Validators.email]],
      PASSWORD: ['', Validators.required],
      RECORDAR: false
    });
    this.listaUsuarios = [];
  }

  async iniciarSesion() {
    const USER: LoginUsuario = {
      EMAIL: this.form.value.EMAIL,
      PASSWORD: this.form.value.PASSWORD
    };
    /*this._loginService.newLogin(USER).subscribe(
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
    );*/
    try {
      const userValidate$ = this._loginService.newLogin(USER);
      const resultLogin = await lastValueFrom(userValidate$);
      if (resultLogin.token) {
        document.cookie = `access_token=${resultLogin.token};`;
        localStorage.setItem('access_token', resultLogin.token);
        this.router.navigate(['gestion-usuarios']);
        this.openSnackBar(resultLogin.message);
      }
    } catch (error) {
      this.openSnackBar('Error al iniciar sesión');
    }
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
