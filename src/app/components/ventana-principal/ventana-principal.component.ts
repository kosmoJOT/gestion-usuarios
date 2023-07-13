import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearUsuarioComponent } from '../operaciones/crear-usuario/crear-usuario.component';
import { Subject } from 'rxjs'
import { UsuarioService } from 'src/app/services/usuario.service';
import { PeticionListaUsuarios, Usuario } from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-ventana-principal',
  templateUrl: './ventana-principal.component.html',
  styleUrls: ['./ventana-principal.component.css']
})
export class VentanaPrincipalComponent implements OnInit {

  obsSubject = new Subject<any>();
  listaUsuarios: Usuario[] = [];

  constructor(public dialog: MatDialog,
    private _serviceUsuario: UsuarioService,
    private _serviceUsuarios: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.obsSubject.subscribe((data: any) => {
      this.listaUsuarios = data;
    });
    this.refrescarTabla(true);
  }

  abrirModalCrear() {
    const dialog = this.dialog.open(CrearUsuarioComponent);
    dialog.afterClosed().subscribe((res) => {
      this._serviceUsuarios.newUser(res).subscribe((data) => {
        this.refrescarTabla(true);
      });
    });
  }

  refrescarTabla(opero: any) {
    if (opero) {
      this._serviceUsuario.getUserList().subscribe((data: PeticionListaUsuarios) => {
        this.obsSubject.next(data.data);
      });
    }
  }
}
