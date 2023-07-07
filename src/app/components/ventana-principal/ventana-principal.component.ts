import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';
import { CrearUsuarioComponent } from '../operaciones/crear-usuario/crear-usuario.component';

@Component({
  selector: 'app-ventana-principal',
  templateUrl: './ventana-principal.component.html',
  styleUrls: ['./ventana-principal.component.css']
})
export class VentanaPrincipalComponent {

  constructor(public dialog: MatDialog){}

  abrirModalCrear(){
    this.dialog.open(CrearUsuarioComponent);
  }
}
