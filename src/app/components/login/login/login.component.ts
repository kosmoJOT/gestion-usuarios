import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario, RespuestLogin } from 'src/app/interfaces/LoginUsuario';
import { Usuario, PeticionListaUsuarios } from 'src/app/interfaces/Usuario';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: FormGroup;
  listaUsuarios: Usuario[];

  constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private _usuarioService: UsuarioService, private router:Router){
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
    this._loginService.newLogin(USER).subscribe((data: RespuestLogin) => {
      document.cookie = `access_token=${data.token};`;
      localStorage.setItem('access_token', data.token);
      this.router.navigate(['gestion-usuarios']);
    });
  }
}
