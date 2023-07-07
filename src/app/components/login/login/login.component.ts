import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUsuario } from 'src/app/interfaces/LoginUsuario';
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

  constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private _usuarioService: UsuarioService){
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
    this._loginService.newLogin(USER).subscribe((data: any) => {
      console.log(data);
    });
  }
}
