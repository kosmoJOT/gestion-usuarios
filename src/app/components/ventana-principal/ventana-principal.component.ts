import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-ventana-principal',
  templateUrl: './ventana-principal.component.html',
  styleUrls: ['./ventana-principal.component.css']
})
export class VentanaPrincipalComponent {

  constructor(private dialog: MatDialog){}

  openDialog(){
    const dialogRef = this.dialog.open(VentanaModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
